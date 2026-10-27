import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import MaquetaView from './components/MaquetaView';
import ReservationTerminal from './components/ReservationTerminal';
import AnalyticsDashboard from './components/AnalyticsDashboard';
import CrudOperations from './components/CrudOperations';
import ArchitectureDefense from './components/ArchitectureDefense';
import LoginModal from './components/LoginModal';
import { getCurrentUser, logout } from './services/auth';
import { 
  ShieldAlert, 
  KeyRound, 
  Car, 
  BarChart3, 
  Database 
} from 'lucide-react';
import { 
  getParkingState, 
  getLogs, 
  reserveSlot, 
  releaseSlot, 
  updateSlot, 
  sendTelemetry, 
  toggleBarrier, 
  resetParkingState 
} from './services/api';
import {
  seedInitialSlotsIfEmpty,
  subscribeToParkingSlots,
  subscribeToAuditLogs,
  createReservationInFirestore,
  updateSlotInFirestore,
  releaseSlotInFirestore
} from './services/firebase';

export default function App() {
  const [currentTab, setCurrentTab] = useState('maqueta');
  const [darkMode, setDarkMode] = useState(false);
  const [parkingState, setParkingState] = useState(null);
  const [logs, setLogs] = useState([]);
  const [preselectedSlot, setPreselectedSlot] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const [isFirebaseConnected, setIsFirebaseConnected] = useState(false);

  // Authentication & Role State
  const [currentUser, setCurrentUser] = useState(getCurrentUser);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const isAdmin = currentUser?.role === 'admin';

  const showToast = (text, type = 'info') => {
    setToastMessage({ text, type });
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleLogout = () => {
    const guest = logout();
    setCurrentUser(guest);
    showToast('Sesión de Administrador cerrada. Modo Conductor activado.', 'info');
    if (currentTab === 'crud' || currentTab === 'dashboard') {
      setCurrentTab('maqueta');
    }
  };

  const handleLoginSuccess = (user) => {
    setCurrentUser(user);
    showToast(`Sesión activa: ${user.name} (${user.roleLabel})`, 'success');
  };

  // Sync state con fallback API REST
  const loadData = async () => {
    try {
      const [stateData, logsData] = await Promise.all([
        getParkingState(),
        getLogs(),
      ]);
      setParkingState(prev => prev ? { ...stateData, slots: prev.slots || stateData.slots } : stateData);
      if (!isFirebaseConnected) {
        setLogs(logsData);
      }
    } catch (err) {
      console.error('Error synchronizing REST API:', err);
    }
  };

  // Conexión y suscripción en tiempo real a Firebase Firestore
  useEffect(() => {
    loadData();

    // 1. Sembrar cupos en Firestore si la colección está vacía
    seedInitialSlotsIfEmpty().then(() => {
      setIsFirebaseConnected(true);
    }).catch(err => {
      console.warn('[Firebase] Inicialización:', err);
    });

    // 2. Suscribirse a cambios en vivo de los cupos (Real-time listener de Firestore)
    const unsubscribeSlots = subscribeToParkingSlots((firestoreSlots) => {
      if (firestoreSlots && firestoreSlots.length > 0) {
        setIsFirebaseConnected(true);
        setParkingState(prev => {
          const availableCount = firestoreSlots.filter(s => s.status === 'available').length;
          const occupiedCount = firestoreSlots.filter(s => s.status === 'occupied').length;
          const reservedCount = firestoreSlots.filter(s => s.status === 'reserved').length;

          return {
            ...(prev || {}),
            slots: firestoreSlots,
            barriers: prev?.barriers || { entry: { status: 'closed', angle: 0 }, exit: { status: 'closed', angle: 0 } },
            pricing: prev?.pricing || { baseRatePerHour: 2000, minuteRate: 35 },
            summary: {
              total: firestoreSlots.length,
              available: availableCount,
              occupied: occupiedCount,
              reserved: reservedCount,
              occupancyPercentage: Math.round(((occupiedCount + reservedCount) / firestoreSlots.length) * 100),
            }
          };
        });
      }
    });

    // 3. Suscribirse a logs en vivo en Firestore
    const unsubscribeLogs = subscribeToAuditLogs((firestoreLogs) => {
      if (firestoreLogs && firestoreLogs.length > 0) {
        setLogs(firestoreLogs);
      }
    });

    return () => {
      if (typeof unsubscribeSlots === 'function') unsubscribeSlots();
      if (typeof unsubscribeLogs === 'function') unsubscribeLogs();
    };
  }, []);

  // Sync dark mode class
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleManualRefresh = async () => {
    setIsRefreshing(true);
    await loadData();
    setTimeout(() => setIsRefreshing(false), 500);
    showToast('Sincronizado con Firebase Firestore & Azure Cloud', 'success');
  };

  const handleReserveClick = (slot) => {
    setPreselectedSlot(slot);
    setCurrentTab('reserva');
  };

  const handleReleaseClick = async (slot) => {
    if (!isAdmin) {
      showToast('Operación restringida: Requiere perfil de Administrador', 'error');
      setIsLoginModalOpen(true);
      return;
    }

    if (!window.confirm(`¿Confirmas la liberación del espacio ${slot.code} y la emisión del cobro?`)) {
      return;
    }
    try {
      // 1. Liberar en Firebase Firestore
      await releaseSlotInFirestore(slot.id, slot.vehiclePlate || 'N/A', slot.driverName || 'Conductor', slot.totalMinutes || 45);
      
      // 2. Liberar también en API REST local como respaldo
      try { await releaseSlot(slot.id); } catch(e) {}

      showToast(`Espacio ${slot.code} liberado en Firebase Firestore. Cobro liquidado.`, 'success');
    } catch (err) {
      showToast(err.message || 'Error al liberar espacio', 'error');
    }
  };

  const handleConfirmReservation = async (slotId, vehiclePlate, driverName, durationMinutes) => {
    try {
      // 1. Guardar en Firebase Firestore (Accesible tanto para normal user como admin)
      await createReservationInFirestore(slotId, vehiclePlate, driverName, durationMinutes);

      // 2. Guardar en API REST local como respaldo
      try { await reserveSlot(slotId, vehiclePlate, driverName, durationMinutes); } catch(e) {}

      showToast(`Reserva guardada en Firestore para ${vehiclePlate}. Pase QR emitido.`, 'success');
      return { success: true, data: { code: `E-0${slotId}` } };
    } catch (err) {
      showToast(err.message || 'Error al guardar reserva', 'error');
      throw err;
    }
  };

  const handleSimulateDistance = async (slotId, distanceCm) => {
    if (!isAdmin) {
      showToast('Simulación de sensores restringida al Administrador', 'error');
      setIsLoginModalOpen(true);
      return;
    }

    try {
      const isPresent = distanceCm < 10;
      await updateSlotInFirestore(slotId, {
        distanceCm,
        status: isPresent ? 'occupied' : 'available',
        vehiclePlate: isPresent ? 'AUTO-DETECT' : null,
        driverName: isPresent ? 'Conductor Presente' : null,
      });
    } catch (e) {
      await sendTelemetry(slotId, distanceCm);
      await loadData();
    }
  };

  const handleToggleBarrier = async (gate) => {
    if (!isAdmin) {
      showToast('El control manual de barreras requiere perfil de Administrador', 'error');
      setIsLoginModalOpen(true);
      return;
    }

    const res = await toggleBarrier(gate, 'toggle');
    await loadData();
    showToast(`Barrera de ${gate === 'entry' ? 'Entrada' : 'Salida'} ${res.barrier?.status === 'open' ? 'levantada a 90°' : 'cerrada a 0°'}`, 'info');
  };

  const handleUpdateSlot = async (slotId, updateData) => {
    if (!isAdmin) {
      showToast('Modificación de base de datos denegada: Requiere Admin', 'error');
      setIsLoginModalOpen(true);
      return;
    }

    try {
      // 1. Actualizar en Firebase Firestore
      await updateSlotInFirestore(slotId, updateData);

      // 2. Actualizar en API local
      try { await updateSlot(slotId, updateData); } catch(e) {}

      showToast(`Espacio E-0${slotId} actualizado en Firestore [UPDATE]`, 'success');
      return { success: true };
    } catch (err) {
      showToast(err.message || 'Error al actualizar', 'error');
      throw err;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fafafa] dark:bg-[#09090b] text-zinc-900 dark:text-zinc-100 transition-colors duration-300">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 animate-fadeIn">
          <div className="px-4 py-3 rounded-xl bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 text-xs font-mono shadow-luxury border border-zinc-800 dark:border-zinc-200 flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${toastMessage.type === 'error' ? 'bg-red-500' : 'bg-emerald-400'} animate-pulse`}></span>
            <span>{toastMessage.text}</span>
          </div>
        </div>
      )}

      {/* Login Modal */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* Header with Auth Role Info */}
      <Header
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        onRefresh={handleManualRefresh}
        isRefreshing={isRefreshing}
        isFirebaseConnected={isFirebaseConnected}
        currentUser={currentUser}
        onOpenLogin={() => setIsLoginModalOpen(true)}
        onLogout={handleLogout}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-8 py-8 sm:py-10">
        {currentTab === 'maqueta' && (
          <MaquetaView
            state={parkingState}
            onReserveClick={handleReserveClick}
            onReleaseClick={handleReleaseClick}
            onSimulateDistance={handleSimulateDistance}
            onToggleBarrier={handleToggleBarrier}
            isAdmin={isAdmin}
          />
        )}

        {currentTab === 'reserva' && (
          <ReservationTerminal
            slots={parkingState?.slots || []}
            preselectedSlot={preselectedSlot}
            onConfirmReservation={handleConfirmReservation}
          />
        )}

        {/* Tab CRUD: Only Admin */}
        {currentTab === 'crud' && (
          isAdmin ? (
            <CrudOperations
              state={parkingState}
              onReserveClick={handleReserveClick}
              onReleaseClick={handleReleaseClick}
              onUpdateSlot={handleUpdateSlot}
              onRefresh={handleManualRefresh}
            />
          ) : (
            <div className="game-card p-8 sm:p-12 bg-white dark:bg-[#13141c] text-center max-w-2xl mx-auto my-8 border-2 border-amber-300 dark:border-amber-800/80 shadow-2xl space-y-6 animate-fadeIn">
              <div className="w-20 h-20 rounded-3xl bg-amber-100 dark:bg-amber-950/80 text-amber-600 dark:text-amber-400 flex items-center justify-center mx-auto border-2 border-amber-300 dark:border-amber-700 shadow-md">
                <ShieldAlert className="w-10 h-10" />
              </div>
              <div className="space-y-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-amber-50 dark:bg-amber-950/50 text-amber-800 dark:text-amber-300 font-display font-bold text-xs uppercase border border-amber-200 dark:border-amber-800">
                  ACCESO RESTRINGIDO
                </div>
                <h3 className="text-2xl sm:text-3xl font-display font-black text-zinc-950 dark:text-white">
                  Operaciones CRUD Exclusivas para Administradores
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 font-sans max-w-lg mx-auto leading-relaxed">
                  El <strong>Usuario Normal</strong> tiene permisos para consultar plazas y reservar cupos. Para crear, actualizar o eliminar registros en la base de datos Firestore y el servidor Azure, debes autenticarte como Administrador.
                </p>
              </div>
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={() => setIsLoginModalOpen(true)}
                  className="w-full sm:w-auto py-3 px-6 rounded-xl font-display text-xs font-bold uppercase tracking-wider bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 hover:bg-zinc-800 dark:hover:bg-zinc-200 active:scale-95 transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <KeyRound className="w-4 h-4 text-amber-400 dark:text-amber-500" />
                  <span>Iniciar Sesión como Administrador</span>
                </button>
                <button
                  onClick={() => setCurrentTab('maqueta')}
                  className="w-full sm:w-auto py-3 px-6 rounded-xl font-display text-xs font-bold uppercase border-2 border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 transition-all flex items-center justify-center gap-1.5"
                >
                  <Car className="w-4 h-4" />
                  <span>Ver Estacionamiento</span>
                </button>
              </div>
            </div>
          )
        )}

        {/* Tab Dashboard: Only Admin */}
        {currentTab === 'dashboard' && (
          isAdmin ? (
            <AnalyticsDashboard
              state={parkingState}
              logs={logs}
            />
          ) : (
            <div className="game-card p-8 sm:p-12 bg-white dark:bg-[#13141c] text-center max-w-2xl mx-auto my-8 border-2 border-purple-300 dark:border-purple-800/80 shadow-2xl space-y-6 animate-fadeIn">
              <div className="w-20 h-20 rounded-3xl bg-purple-100 dark:bg-purple-950/80 text-purple-600 dark:text-purple-400 flex items-center justify-center mx-auto border-2 border-purple-300 dark:border-purple-700 shadow-md">
                <BarChart3 className="w-10 h-10" />
              </div>
              <div className="space-y-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-purple-50 dark:bg-purple-950/50 text-purple-800 dark:text-purple-300 font-display font-bold text-xs uppercase border border-purple-200 dark:border-purple-800">
                  DASHBOARD ANALÍTICO PROTEGIDO
                </div>
                <h3 className="text-2xl sm:text-3xl font-display font-black text-zinc-950 dark:text-white">
                  Métricas de Ocupación e Ingresos para Administrador
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 font-sans max-w-lg mx-auto leading-relaxed">
                  Las estadísticas de ocupación, curvas de horas punta, facturación total y el registro de auditoría del sistema son de acceso reservado para la administración del recinto.
                </p>
              </div>
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={() => setIsLoginModalOpen(true)}
                  className="w-full sm:w-auto py-3 px-6 rounded-xl font-display text-xs font-bold uppercase tracking-wider bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 hover:bg-zinc-800 dark:hover:bg-zinc-200 active:scale-95 transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <KeyRound className="w-4 h-4 text-purple-400" />
                  <span>Desbloquear con Cuenta Admin</span>
                </button>
                <button
                  onClick={() => setCurrentTab('maqueta')}
                  className="w-full sm:w-auto py-3 px-6 rounded-xl font-display text-xs font-bold uppercase border-2 border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 transition-all flex items-center justify-center gap-1.5"
                >
                  <Car className="w-4 h-4" />
                  <span>Ver Estacionamiento</span>
                </button>
              </div>
            </div>
          )
        )}

        {currentTab === 'arquitectura' && (
          <ArchitectureDefense />
        )}
      </main>

      {/* Minimalist Apple / Farfetch Editorial Footer */}
      <footer className="border-t border-zinc-200 dark:border-zinc-800/80 bg-white/50 dark:bg-zinc-950/50 py-8 px-4 sm:px-8 transition-colors">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-zinc-500 dark:text-zinc-400">
          <div className="flex items-center gap-3">
            <span className="font-editorial font-bold text-sm tracking-tight text-zinc-950 dark:text-white">
              AURA SMART PARKING
            </span>
            <span>·</span>
            <span>Arquitectura de Sistemas & Cloud Computing (IPST)</span>
          </div>

          <div className="flex items-center gap-4 font-mono text-[11px]">
            <span>SESIÓN: {currentUser?.roleLabel || 'Usuario Normal'}</span>
            <span>·</span>
            <span>FIREBASE FIRESTORE: NUBARDA</span>
            <span>·</span>
            <span>AZURE VM + IIS</span>
            {isAdmin && (
              <>
                <span>·</span>
                <button
                  onClick={async () => {
                    if (window.confirm('¿Reiniciar estado a los valores de prueba por defecto?')) {
                      await resetParkingState();
                      await loadData();
                      showToast('Sistema reiniciado a valores por defecto', 'info');
                    }
                  }}
                  className="text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 underline"
                >
                  Reiniciar Datos Demo
                </button>
              </>
            )}
          </div>
        </div>
      </footer>
    </div>
  );
}
