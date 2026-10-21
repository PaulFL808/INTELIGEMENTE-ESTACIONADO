import React from 'react';
import { 
  Radio, 
  Cpu, 
  Cloud, 
  ShieldCheck, 
  LayoutDashboard, 
  CalendarClock, 
  Layers, 
  Moon, 
  Sun,
  RefreshCw,
  Car
} from 'lucide-react';

export default function Header({ 
  currentTab, 
  setCurrentTab, 
  darkMode, 
  setDarkMode, 
  isArduinoConnected, 
  onRefresh,
  isRefreshing 
}) {
  const tabs = [
    { id: 'maqueta', label: 'Estacionamiento 3D', icon: LayoutDashboard },
    { id: 'reserva', label: 'Reservar Cupo', icon: CalendarClock },
    { id: 'dashboard', label: 'Dashboard & Métricas', icon: Radio },
    { id: 'hardware', label: 'Arduino & Sensores', icon: Cpu },
    { id: 'arquitectura', label: 'Defensa Azure', icon: Layers },
  ];

  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-white/95 dark:bg-[#090a0f]/95 border-b-2 border-zinc-200 dark:border-zinc-800 transition-colors duration-300 shadow-sm">
      {/* Top Telemetry Micro-Bar: Clean & Direct */}
      <div className="border-b border-zinc-200/80 dark:border-zinc-800/80 px-4 sm:px-8 py-2 text-xs sm:text-sm">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-zinc-600 dark:text-zinc-400 font-sans font-medium">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="inline-flex items-center gap-2 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 px-3 py-1 rounded-lg border border-emerald-200 dark:border-emerald-800 font-bold text-xs">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <Cloud className="w-4 h-4" />
              <span>AZURE CLOUD · EN LÍNEA</span>
            </span>

            <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-lg border font-bold text-xs ${
              isArduinoConnected 
                ? 'bg-emerald-50 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300' 
                : 'bg-amber-50 text-amber-800 border-amber-300 dark:bg-amber-950/60 dark:text-amber-300'
            }`}>
              <span className={`w-2.5 h-2.5 rounded-full ${isArduinoConnected ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`}></span>
              <Cpu className="w-4 h-4" />
              <span>{isArduinoConnected ? 'ARDUINO: CONECTADO' : 'ARDUINO: MODO SIMULADOR'}</span>
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
        {/* Brand identity: Clean modern logo */}
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
              Estacionamiento Inteligente IoT
            </p>
          </div>
        </div>

        {/* Wide Pill Navigation for Large Screens */}
        <nav className="hidden xl:flex items-center bg-zinc-100 dark:bg-zinc-900 p-1.5 rounded-2xl border-2 border-zinc-200 dark:border-zinc-800">
          {tabs.map(tab => {
            const Icon = tab.icon;
            const isActive = currentTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setCurrentTab(tab.id)}
                className={`relative flex items-center gap-2.5 px-5 py-2 rounded-xl font-display text-xs font-extrabold uppercase tracking-wide transition-all duration-200 ${
                  isActive
                    ? 'bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 shadow-md scale-[1.02]'
                    : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white dark:text-zinc-950' : 'text-zinc-500'}`} />
                {tab.label}
              </button>
            );
          })}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={onRefresh}
            disabled={isRefreshing}
            title="Sincronizar"
            className="p-2.5 rounded-xl border-2 border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200 active:scale-95 transition-all shadow-sm"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin text-emerald-500' : ''}`} />
          </button>

          <button
            onClick={() => setDarkMode(!darkMode)}
            title="Modo Oscuro / Claro"
            className="p-2.5 rounded-xl border-2 border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200 active:scale-95 transition-all shadow-sm"
          >
            {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-zinc-700" />}
          </button>
        </div>
      </div>

      {/* Sub-Navigation Bar for Mobile / Tablets */}
      <div className="xl:hidden flex items-center overflow-x-auto px-4 py-2 gap-2 border-t-2 border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 no-scrollbar">
        {tabs.map(tab => {
          const Icon = tab.icon;
          const isActive = currentTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setCurrentTab(tab.id)}
              className={`flex-shrink-0 flex items-center gap-2 px-3.5 py-1.5 rounded-xl font-display text-xs font-bold uppercase tracking-wide transition-all ${
                isActive
                  ? 'bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 shadow-sm'
                  : 'bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {tab.label}
            </button>
          );
        })}
      </div>
    </header>
  );
}
