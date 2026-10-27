import React from 'react';
import { 
  Radio, 
  Database, 
  Cloud, 
  ShieldCheck, 
  LayoutDashboard, 
  CalendarClock, 
  Layers, 
  Moon, 
  Sun,
  RefreshCw,
  Car,
  Server,
  KeyRound,
  LogOut
} from 'lucide-react';

export default function Header({ 
  currentTab, 
  setCurrentTab, 
  darkMode, 
  setDarkMode, 
  onRefresh,
  isRefreshing,
  isFirebaseConnected,
  currentUser,
  onOpenLogin,
  onLogout
}) {
  const isAdmin = currentUser?.role === 'admin';

  // Definición de pestañas del sistema
  const allTabs = [
    { id: 'maqueta', label: 'Estacionamiento 3D', icon: LayoutDashboard, adminOnly: false },
    { id: 'reserva', label: 'Reservar Cupo', icon: CalendarClock, adminOnly: false },
    { id: 'crud', label: 'Operaciones CRUD', icon: Database, adminOnly: true },
    { id: 'dashboard', label: 'Dashboard & Métricas', icon: Radio, adminOnly: true },
    { id: 'arquitectura', label: 'Azure & IIS', icon: Layers, adminOnly: false },
  ];

  // Filtro estricto: el usuario normal NI SIQUIERA ve las opciones de CRUD ni Dashboard
  const visibleTabs = allTabs.filter(tab => !tab.adminOnly || isAdmin);

  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-white/95 dark:bg-[#090a0f]/95 border-b-2 border-zinc-200 dark:border-zinc-800 transition-colors duration-300 shadow-sm">
      {/* Top Telemetry Micro-Bar: Clean & Direct */}
      <div className="border-b border-zinc-200/80 dark:border-zinc-800/80 px-4 sm:px-8 py-2 text-xs sm:text-sm">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-zinc-600 dark:text-zinc-400 font-sans font-medium">
          <div className="flex items-center gap-2.5 flex-wrap">
            <span className="inline-flex items-center gap-2 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 px-3 py-1 rounded-lg border border-emerald-200 dark:border-emerald-800 font-bold text-xs">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <Cloud className="w-4 h-4" />
              <span>AZURE CLOUD · EN LÍNEA</span>
            </span>

            <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-lg border font-bold text-xs ${
              isFirebaseConnected 
                ? 'bg-amber-50 text-amber-800 border-amber-300 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800' 
                : 'bg-zinc-100 text-zinc-700 border-zinc-300 dark:bg-zinc-800 dark:text-zinc-300'
            }`}>
              <span className={`w-2.5 h-2.5 rounded-full ${isFirebaseConnected ? 'bg-amber-500 animate-pulse' : 'bg-zinc-400'}`}></span>
              <Database className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              <span>FIRESTORE · NUBARDA</span>
            </span>

            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-lg border font-bold text-xs bg-blue-50 text-blue-800 border-blue-300 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse"></span>
              <Server className="w-4 h-4" />
              <span>WINDOWS SERVER 2022</span>
            </span>
          </div>

          <div className="flex items-center gap-3 font-bold text-xs">
            <span className="hidden md:inline bg-zinc-100 dark:bg-zinc-800 px-3 py-1 rounded-lg text-zinc-700 dark:text-zinc-300">
              IPST · ARQUITECTURA + NUBE
            </span>
            <span className="inline-flex items-center gap-1.5 text-zinc-900 dark:text-white bg-zinc-200 dark:bg-zinc-800 px-3 py-1 rounded-lg">
              <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              100 PUNTOS
            </span>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4">
        {/* Brand identity */}
        <div className="flex items-center gap-3.5 cursor-pointer" onClick={() => setCurrentTab('maqueta')}>
          <div className="w-11 h-11 rounded-2xl bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 flex items-center justify-center shadow-md">
            <Car className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-baseline gap-2">
              <h1 className="font-display text-2xl sm:text-3xl font-black tracking-wide text-zinc-950 dark:text-white">
                AURA
              </h1>
              <span className="text-[11px] font-display font-bold uppercase tracking-wide text-emerald-600 dark:text-emerald-400 bg-emerald-100/70 dark:bg-emerald-950/80 px-2 py-0.5 rounded-md">
                SMART PARKING
              </span>
            </div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 font-sans font-medium">
              Gestión de Estacionamiento en Tiempo Real
            </p>
          </div>
        </div>

        {/* Wide Pill Navigation for Large Screens */}
        <nav className="hidden xl:flex items-center bg-zinc-100 dark:bg-zinc-900 p-1.5 rounded-2xl border-2 border-zinc-200 dark:border-zinc-800">
          {visibleTabs.map(tab => {
            const Icon = tab.icon;
            const isActive = currentTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => setCurrentTab(tab.id)}
                className={`relative flex items-center gap-2 px-5 py-2 rounded-xl font-display text-xs font-extrabold uppercase tracking-wide transition-all duration-200 ${
                  isActive
                    ? 'bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 shadow-md scale-[1.02]'
                    : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white dark:text-zinc-950' : 'text-zinc-500'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Action Controls & Authentication */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* User Session Pill */}
          {isAdmin ? (
            <div className="flex items-center gap-2">
              <button 
                onClick={onOpenLogin}
                className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-purple-50 dark:bg-purple-950/70 text-purple-900 dark:text-purple-300 border-2 border-purple-200 dark:border-purple-800/80 font-display font-extrabold text-xs shadow-sm hover:scale-[1.02] transition-transform"
                title="Sesión de Administrador activa. Clic para cambiar"
              >
                <ShieldCheck className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                <span className="truncate max-w-[150px]">ADMIN: {currentUser?.name || 'Paul / Fabián / Agustín'}</span>
              </button>

              <button
                onClick={onLogout}
                title="Cerrar sesión de Administrador (Volver a Conductor)"
                className="px-3 py-2 rounded-xl border-2 border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-display text-xs font-bold uppercase transition-all shadow-sm flex items-center gap-1.5"
              >
                <LogOut className="w-3.5 h-3.5 text-red-500" />
                <span className="hidden sm:inline">Salir</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <div 
                className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-blue-50 dark:bg-blue-950/70 text-blue-900 dark:text-blue-300 border-2 border-blue-200 dark:border-blue-800/80 font-display font-extrabold text-xs shadow-sm"
              >
                <Car className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span>USUARIO NORMAL</span>
              </div>

              <button
                onClick={onOpenLogin}
                title="Iniciar sesión con cuenta de Administrador"
                className="px-3.5 py-2 rounded-xl bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 hover:bg-zinc-800 dark:hover:bg-zinc-200 font-display text-xs font-bold uppercase tracking-wider transition-all shadow-md active:scale-95 flex items-center gap-1.5"
              >
                <KeyRound className="w-3.5 h-3.5 text-amber-400 dark:text-amber-500" />
                <span>Acceso Admin</span>
              </button>
            </div>
          )}

          <div className="h-6 w-px bg-zinc-200 dark:bg-zinc-800 mx-0.5"></div>

          <button
            onClick={onRefresh}
            disabled={isRefreshing}
            title="Sincronizar Datos"
            className="p-2.5 rounded-xl border-2 border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200 active:scale-95 transition-all shadow-sm"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin text-emerald-500' : ''}`} />
          </button>

          <button
            onClick={() => setDarkMode(!darkMode)}
            title="Alternar Tema Oscuro/Claro"
            className="p-2.5 rounded-xl border-2 border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200 active:scale-95 transition-all shadow-sm"
          >
            {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-zinc-700" />}
          </button>
        </div>
      </div>

      {/* Mobile / Tablet Horizontal Navigation Tabs */}
      <div className="xl:hidden overflow-x-auto border-t border-zinc-200 dark:border-zinc-800 px-4 py-2 flex items-center gap-2 scrollbar-none">
        {visibleTabs.map(tab => {
          const Icon = tab.icon;
          const isActive = currentTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setCurrentTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-xl font-display text-xs font-bold whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 shadow-sm'
                  : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>
    </header>
  );
}
