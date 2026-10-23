import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import MaquetaView from './components/MaquetaView';
import ReservationTerminal from './components/ReservationTerminal';
import AnalyticsDashboard from './components/AnalyticsDashboard';
import CrudOperations from './components/CrudOperations';
import ArchitectureDefense from './components/ArchitectureDefense';
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

export default function App() {
  const [currentTab, setCurrentTab] = useState('maqueta');
  const [darkMode, setDarkMode] = useState(false);
  const [parkingState, setParkingState] = useState(null);
  const [logs, setLogs] = useState([]);
  const [preselectedSlot, setPreselectedSlot] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (text, type = 'info') => {
    setToastMessage({ text, type });
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Sync state
  const loadData = async () => {
    try {
      const [stateData, logsData] = await Promise.all([
        getParkingState(),
        getLogs(),
      ]);
      setParkingState(stateData);
      setLogs(logsData);
    } catch (err) {
      console.error('Error synchronizing:', err);
    }
  };

  useEffect(() => {
    loadData();
    // Polling ligero cada 2.5s para actualización en vivo
    const timer = setInterval(() => {
      loadData();
    }, 2500);
    return () => clearInterval(timer);
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
    showToast('Telemetría sincronizada con Azure Cloud', 'success');
  };

  const handleReserveClick = (slot) => {
    setPreselectedSlot(slot);
    setCurrentTab('reserva');
  };

  const handleReleaseClick = async (slot) => {
    if (!window.confirm(`¿Confirmas la liberación del espacio ${slot.code} y la emisión del cobro?`)) {
      return;
    }
    try {
      const res = await releaseSlot(slot.id);
      await loadData();
      showToast(`Espacio ${slot.code} liberado. Cobro generado: $${res.receipt?.totalFeeCLP || 1500} CLP`, 'success');
    } catch (err) {
      showToast(err.message || 'Error al liberar espacio', 'error');
    }
  };

  const handleConfirmReservation = async (slotId, vehiclePlate, driverName, durationMinutes) => {
    const res = await reserveSlot(slotId, vehiclePlate, driverName, durationMinutes);
    await loadData();
    showToast(`Reserva confirmada en ${res.data?.code || 'espacio'}. Pase emitido.`, 'success');
    return res;
  };

  const handleSimulateDistance = async (slotId, distanceCm) => {
    await sendTelemetry(slotId, distanceCm);
    await loadData();
  };

  const handleToggleBarrier = async (gate) => {
    const res = await toggleBarrier(gate, 'toggle');
    await loadData();
    showToast(`Barrera de ${gate === 'entry' ? 'Entrada' : 'Salida'} ${res.barrier?.status === 'open' ? 'levantada a 90°' : 'cerrada a 0°'}`, 'info');
  };

  const handleUpdateSlot = async (slotId, updateData) => {
    const res = await updateSlot(slotId, updateData);
    await loadData();
    showToast(`Espacio E-0${slotId} actualizado exitosamente`, 'success');
    return res;
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fafafa] dark:bg-[#09090b] text-zinc-900 dark:text-zinc-100 transition-colors duration-300">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 animate-fadeIn">
          <div className="px-4 py-3 rounded-xl bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 text-xs font-mono shadow-luxury border border-zinc-800 dark:border-zinc-200 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>{toastMessage.text}</span>
          </div>
        </div>
      )}

      {/* Header */}
      <Header
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        onRefresh={handleManualRefresh}
        isRefreshing={isRefreshing}
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
          />
        )}

        {currentTab === 'reserva' && (
          <ReservationTerminal
            slots={parkingState?.slots || []}
            preselectedSlot={preselectedSlot}
            onConfirmReservation={handleConfirmReservation}
          />
        )}

        {currentTab === 'crud' && (
          <CrudOperations
            state={parkingState}
            onReserveClick={handleReserveClick}
            onReleaseClick={handleReleaseClick}
            onUpdateSlot={handleUpdateSlot}
            onRefresh={handleManualRefresh}
          />
        )}

        {currentTab === 'dashboard' && (
          <AnalyticsDashboard
            state={parkingState}
            logs={logs}
          />
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
            <span>Arquitectura de Sistemas & Programación en la Nube (IPST)</span>
          </div>

          <div className="flex items-center gap-4 font-mono text-[11px]">
            <span>WINDOWS SERVER 2022 + IIS 10.0</span>
            <span>·</span>
            <span>MICROSOFT AZURE CLOUD</span>
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
          </div>
        </div>
      </footer>
    </div>
  );
}
