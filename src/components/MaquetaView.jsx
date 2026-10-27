import React from 'react';
import { 
  Zap, 
  Accessibility, 
  Crown, 
  ArrowRight, 
  ArrowLeft, 
  KeyRound,
  Lock,
  ShieldCheck,
  Check
} from 'lucide-react';

// Top-Down Stylized Car SVG
function TopDownCar({ color = '#3b82f6', plate = 'CL-2026' }) {
  return (
    <div className="relative w-28 h-48 mx-auto animate-car-in filter drop-shadow-xl select-none">
      <svg viewBox="0 0 110 200" className="w-full h-full">
        <ellipse cx="55" cy="105" rx="48" ry="88" fill="rgba(0,0,0,0.35)" filter="blur(4px)" />
        <rect x="15" y="15" width="80" height="170" rx="36" fill={color} stroke="#18181b" strokeWidth="3" />
        <path d="M 24 55 Q 55 45 86 55 L 82 85 Q 55 80 28 85 Z" fill="#18181b" />
        <path d="M 28 135 Q 55 140 82 135 L 85 160 Q 55 152 25 160 Z" fill="#18181b" />
        <rect x="26" y="80" width="58" height="60" rx="14" fill="#09090b" opacity="0.85" />
        <rect x="20" y="16" width="16" height="8" rx="4" fill="#fef08a" />
        <rect x="74" y="16" width="16" height="8" rx="4" fill="#fef08a" />
        <rect x="22" y="176" width="16" height="7" rx="3.5" fill="#ef4444" />
        <rect x="72" y="176" width="16" height="7" rx="3.5" fill="#ef4444" />
        <rect x="6" y="60" width="10" height="16" rx="5" fill={color} stroke="#18181b" strokeWidth="2" />
        <rect x="94" y="60" width="10" height="16" rx="5" fill={color} stroke="#18181b" strokeWidth="2" />
        <rect x="30" y="98" width="50" height="18" rx="4" fill="#ffffff" stroke="#000000" strokeWidth="1.5" />
        <text x="55" y="111" fill="#000000" fontSize="9" fontWeight="900" fontFamily="Space Grotesk, sans-serif" textAnchor="middle">
          {plate}
        </text>
      </svg>
    </div>
  );
}

export default function MaquetaView({ 
  state, 
  onReserveClick, 
  onReleaseClick, 
  onSimulateDistance, 
  onToggleBarrier,
  isAdmin = false
}) {
  const slots = state?.slots || [];
  const barriers = state?.barriers || {
    entry: { status: 'closed', angle: 0 },
    exit: { status: 'closed', angle: 0 },
  };

  const availableCount = slots.filter(s => s.status === 'available').length;
  const occupiedCount = slots.filter(s => s.status === 'occupied').length;
  const reservedCount = slots.filter(s => s.status === 'reserved').length;

  const getSlotTypeBadge = (type) => {
    switch (type) {
      case 'ev':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-blue-100 text-blue-900 dark:bg-blue-950 dark:text-blue-300 font-display font-bold text-[11px]">
            <Zap className="w-3.5 h-3.5 text-blue-600" /> EV
          </span>
        );
      case 'disabled':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-300 font-display font-bold text-[11px]">
            <Accessibility className="w-3.5 h-3.5 text-amber-600" /> Preferencial
          </span>
        );
      case 'vip':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-purple-100 text-purple-900 dark:bg-purple-950 dark:text-purple-300 font-display font-bold text-[11px]">
            <Crown className="w-3.5 h-3.5 text-purple-600" /> VIP
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Top Banner: Natural, Modern & Clean */}
      <div className="game-card p-6 sm:p-7 bg-white dark:bg-[#13141a]">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-1">
            <h2 className="text-2xl sm:text-3xl font-display font-black text-zinc-950 dark:text-white tracking-tight">
              Plazas de Estacionamiento
            </h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 font-sans">
              Monitoreo y disponibilidad en tiempo real.
            </p>
          </div>

          {/* Quick Stats Scoreboard */}
          <div className="grid grid-cols-3 gap-3 select-none">
            {/* Disponibles */}
            <div className="p-3.5 rounded-2xl bg-emerald-50/80 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/60 text-center min-w-[95px] sm:min-w-[110px]">
              <span className="block text-[11px] font-semibold text-emerald-800 dark:text-emerald-300">
                Disponibles
              </span>
              <span className="text-3xl sm:text-4xl font-display font-black text-emerald-600 dark:text-emerald-400 my-0.5 block">
                {availableCount}
              </span>
              <span className="text-[11px] text-emerald-700/80 dark:text-emerald-400/80 font-sans">
                de 6 plazas
              </span>
            </div>

            {/* Ocupados */}
            <div className="p-3.5 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-center min-w-[95px] sm:min-w-[110px]">
              <span className="block text-[11px] font-semibold text-zinc-700 dark:text-zinc-400">
                Ocupados
              </span>
              <span className="text-3xl sm:text-4xl font-display font-black text-zinc-900 dark:text-zinc-100 my-0.5 block">
                {occupiedCount}
              </span>
              <span className="text-[11px] text-zinc-500 font-sans">
                vehículos
              </span>
            </div>

            {/* Reservados */}
            <div className="p-3.5 rounded-2xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/60 text-center min-w-[95px] sm:min-w-[110px]">
              <span className="block text-[11px] font-semibold text-amber-800 dark:text-amber-300">
                Reservados
              </span>
              <span className="text-3xl sm:text-4xl font-display font-black text-amber-600 dark:text-amber-400 my-0.5 block">
                {reservedCount}
              </span>
              <span className="text-[11px] text-amber-700/80 dark:text-amber-400/80 font-sans">
                agendados
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Gates & Totem Display */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Entry Barrier Gate */}
        <div className="game-card p-5 sm:p-6 bg-white dark:bg-[#13141a] flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-display font-black border ${
                barriers.entry?.status === 'open'
                  ? 'bg-emerald-500 text-white border-emerald-600 animate-pulse'
                  : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200 border-zinc-200 dark:border-zinc-700'
              }`}>
                <ArrowRight className="w-4 h-4" />
              </div>
              <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                Barrera de Entrada
              </h4>
            </div>

            <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
              barriers.entry?.status === 'open' 
                ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' 
                : 'bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300'
            }`}>
              {barriers.entry?.status === 'open' ? 'Abierta' : 'Cerrada'}
            </span>
          </div>

          {/* Visual Barrier Arm */}
          <div className="h-14 bg-zinc-100 dark:bg-zinc-900 rounded-xl p-2.5 border border-zinc-200 dark:border-zinc-800 relative overflow-hidden flex items-center">
            <div className="w-5 h-9 bg-amber-500 rounded-md border border-zinc-900 z-10"></div>
            <div 
              className="h-3 flex-1 rounded-r-md border border-zinc-900 ml-1 origin-left transition-transform duration-500 shadow-sm flex"
              style={{
                transform: barriers.entry?.status === 'open' ? 'rotate(-65deg) translateY(-8px)' : 'rotate(0deg)',
                backgroundImage: 'repeating-linear-gradient(45deg, #ef4444, #ef4444 12px, #ffffff 12px, #ffffff 24px)'
              }}
            ></div>
          </div>

          {isAdmin ? (
            <button
              onClick={() => onToggleBarrier('entry')}
              className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 hover:opacity-90 active:scale-95 transition-all shadow-sm"
            >
              {barriers.entry?.status === 'open' ? 'Bajar Barrera' : 'Levantar Barrera'}
            </button>
          ) : (
            <div className="w-full py-2 px-3 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-500 text-center text-xs flex items-center justify-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-zinc-400" />
              <span>Control exclusivo de caseta</span>
            </div>
          )}
        </div>

        {/* LCD Totem Replica */}
        <div className="game-card p-5 sm:p-6 bg-zinc-950 text-emerald-400 font-mono border-zinc-800 flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between text-xs font-semibold text-zinc-500 border-b border-zinc-800/80 pb-2">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              PUNTO DE ACCESO
            </span>
            <span className="text-zinc-400 text-[11px]">TERMINAL 01</span>
          </div>

          <div className="space-y-1.5 py-1">
            <div className="flex justify-between items-baseline">
              <span className="text-xl font-black tracking-wider text-white">
                LIBRES: {availableCount} / 6
              </span>
              <span className={`text-xs font-bold px-2 py-0.5 rounded ${
                availableCount === 0 ? 'bg-red-950 text-red-400' : 'bg-emerald-950 text-emerald-300'
              }`}>
                {availableCount === 0 ? 'COMPLETO' : 'DISPONIBLE'}
              </span>
            </div>

            <div className="text-xs text-emerald-400 bg-zinc-900/90 p-2 rounded-lg border border-zinc-800 flex items-center justify-between">
              <span>TARIFA: $35/MIN</span>
              <span>BIENVENIDO</span>
            </div>
          </div>

          <div className="text-[11px] text-zinc-500 flex items-center justify-between">
            <span>Control automatizado</span>
            <span>En servicio</span>
          </div>
        </div>

        {/* Exit Barrier Gate */}
        <div className="game-card p-5 sm:p-6 bg-white dark:bg-[#13141a] flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-display font-black border ${
                barriers.exit?.status === 'open'
                  ? 'bg-emerald-500 text-white border-emerald-600 animate-pulse'
                  : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200 border-zinc-200 dark:border-zinc-700'
              }`}>
                <ArrowLeft className="w-4 h-4" />
              </div>
              <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                Barrera de Salida
              </h4>
            </div>

            <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
              barriers.exit?.status === 'open' 
                ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' 
                : 'bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300'
            }`}>
              {barriers.exit?.status === 'open' ? 'Abierta' : 'Cerrada'}
            </span>
          </div>

          {/* Visual Barrier Arm */}
          <div className="h-14 bg-zinc-100 dark:bg-zinc-900 rounded-xl p-2.5 border border-zinc-200 dark:border-zinc-800 relative overflow-hidden flex items-center">
            <div className="w-5 h-9 bg-amber-500 rounded-md border border-zinc-900 z-10"></div>
            <div 
              className="h-3 flex-1 rounded-r-md border border-zinc-900 ml-1 origin-left transition-transform duration-500 shadow-sm flex"
              style={{
                transform: barriers.exit?.status === 'open' ? 'rotate(-65deg) translateY(-8px)' : 'rotate(0deg)',
                backgroundImage: 'repeating-linear-gradient(45deg, #ef4444, #ef4444 12px, #ffffff 12px, #ffffff 24px)'
              }}
            ></div>
          </div>

          {isAdmin ? (
            <button
              onClick={() => onToggleBarrier('exit')}
              className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 hover:opacity-90 active:scale-95 transition-all shadow-sm"
            >
              {barriers.exit?.status === 'open' ? 'Bajar Barrera' : 'Levantar Barrera'}
            </button>
          ) : (
            <div className="w-full py-2 px-3 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-500 text-center text-xs flex items-center justify-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-zinc-400" />
              <span>Control exclusivo de caseta</span>
            </div>
          )}
        </div>
      </div>

      {/* 6 Parking Slots */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <h3 className="font-display text-lg sm:text-xl font-bold text-zinc-950 dark:text-white">
            Distribución de Plazas
          </h3>
          <span className="text-xs text-zinc-500">
            6 espacios monitoreados
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {slots.map((slot) => {
            const isOccupied = slot.status === 'occupied';
            const isReserved = slot.status === 'reserved';
            const isAvailable = slot.status === 'available';

            const carColors = ['#2563eb', '#dc2626', '#16a34a', '#d97706', '#9333ea', '#0284c7'];
            const assignedColor = carColors[slot.id - 1] || '#3b82f6';

            return (
              <div
                key={slot.id}
                className={`game-card relative overflow-hidden transition-all duration-200 flex flex-col justify-between ${
                  isOccupied
                    ? 'border-red-300 dark:border-red-800/80 bg-white dark:bg-[#15161e]'
                    : isReserved
                    ? 'border-amber-300 dark:border-amber-800/80 bg-amber-50/20 dark:bg-[#1a1714]'
                    : 'border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#13141a]'
                }`}
              >
                {/* Header */}
                <div className="p-4 border-b border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-display text-xl font-black text-zinc-950 dark:text-white">
                      {slot.code}
                    </span>
                    {getSlotTypeBadge(slot.type)}
                  </div>

                  <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700/60">
                    <span className={`w-2 h-2 rounded-full ${
                      isOccupied 
                        ? 'bg-red-500' 
                        : isReserved 
                        ? 'bg-amber-500' 
                        : 'bg-emerald-500'
                    }`} />
                    <span className="text-[11px] font-semibold text-zinc-700 dark:text-zinc-300">
                      {isOccupied ? 'Ocupado' : isReserved ? 'Reservado' : 'Disponible'}
                    </span>
                  </div>
                </div>

                {/* Road / Bay Visualization */}
                <div className="p-5 road-texture relative min-h-[240px] flex flex-col items-center justify-center border-y border-zinc-800 text-center">
                  <div className="absolute left-2 top-0 bottom-0 w-1 border-r-2 border-dashed border-yellow-400 opacity-60"></div>
                  <div className="absolute right-2 top-0 bottom-0 w-1 border-l-2 border-dashed border-yellow-400 opacity-60"></div>

                  {isOccupied && (
                    <div className="space-y-2">
                      <TopDownCar color={assignedColor} plate={slot.vehiclePlate || 'PATENTE'} />
                      <div className="bg-zinc-900/90 text-white px-3 py-1 rounded-xl border border-zinc-700 font-sans shadow-sm">
                        <div className="font-bold text-xs text-yellow-400">
                          {slot.vehiclePlate || 'VEHÍCULO'}
                        </div>
                        <div className="text-[11px] text-zinc-300">
                          {slot.driverName || 'Conductor'} · {slot.totalMinutes || 35} min
                        </div>
                      </div>
                    </div>
                  )}

                  {isReserved && (
                    <div className="space-y-2.5 animate-pulse">
                      <div className="w-16 h-16 rounded-full bg-amber-500/20 border-2 border-amber-400 flex items-center justify-center mx-auto text-amber-400 shadow-sm">
                        <KeyRound className="w-8 h-8" />
                      </div>
                      <div className="bg-zinc-900/90 text-white px-3 py-1.5 rounded-xl border border-amber-600 font-sans shadow-sm">
                        <div className="font-bold text-xs text-amber-400">
                          {slot.vehiclePlate}
                        </div>
                        <div className="text-[11px] text-zinc-300">
                          {slot.driverName}
                        </div>
                      </div>
                    </div>
                  )}

                  {isAvailable && (
                    <div className="space-y-1.5">
                      <div className="w-16 h-16 rounded-2xl border-2 border-dashed border-emerald-400/80 flex items-center justify-center mx-auto text-emerald-400 bg-emerald-950/30">
                        <span className="font-display font-black text-3xl">P</span>
                      </div>
                      <div className="text-xs font-semibold text-emerald-500">
                        Libre
                      </div>
                    </div>
                  )}
                </div>

                {/* Presence Sensor Gauge */}
                <div className="p-3 bg-zinc-50 dark:bg-zinc-900/60 border-b border-zinc-100 dark:border-zinc-800 space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-zinc-500">Sensor:</span>
                    <span className={`font-semibold ${slot.distanceCm < 10 ? 'text-red-500' : 'text-emerald-600 dark:text-emerald-400'}`}>
                      {slot.distanceCm < 10 ? 'Vehículo presente' : 'Espacio libre'}
                    </span>
                  </div>

                  <div className="w-full bg-zinc-200 dark:bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-300 rounded-full ${
                        slot.distanceCm < 10 ? 'bg-red-500' : 'bg-emerald-500'
                      }`}
                      style={{ width: `${Math.min(100, (slot.distanceCm / 50) * 100)}%` }}
                    />
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="p-3 bg-white dark:bg-[#13141a]">
                  {isAvailable && (
                    isAdmin ? (
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={() => onSimulateDistance(slot.id, 6.2)}
                          className="py-2 px-2.5 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white transition-all shadow-sm"
                        >
                          Ocupar Plaza
                        </button>

                        <button
                          onClick={() => onReserveClick(slot)}
                          className="py-2 px-2.5 rounded-xl text-xs font-semibold bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 hover:opacity-90 transition-all shadow-sm"
                        >
                          Reservar
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => onReserveClick(slot)}
                        className="w-full py-2.5 px-3 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white transition-all shadow-sm"
                      >
                        Reservar esta Plaza
                      </button>
                    )
                  )}

                  {isOccupied && (
                    isAdmin ? (
                      <button
                        onClick={() => onReleaseClick(slot)}
                        className="w-full py-2 px-3 rounded-xl text-xs font-semibold bg-red-600 hover:bg-red-500 text-white transition-all shadow-sm"
                      >
                        Liberar / Cobrar
                      </button>
                    ) : (
                      <div className="py-2 px-3 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/60 text-red-700 dark:text-red-400 text-center text-xs font-medium">
                        Plaza Ocupada
                      </div>
                    )
                  )}

                  {isReserved && (
                    isAdmin ? (
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={() => onSimulateDistance(slot.id, 6.2)}
                          className="py-2 px-2.5 rounded-xl text-xs font-semibold bg-amber-500 hover:bg-amber-400 text-zinc-950 transition-all shadow-sm"
                        >
                          Confirmar Llegada
                        </button>

                        <button
                          onClick={() => onReleaseClick(slot)}
                          className="py-2 px-2.5 rounded-xl text-xs font-semibold border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200 transition-all"
                        >
                          Cancelar
                        </button>
                      </div>
                    ) : (
                      <div className="py-2 px-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 text-amber-700 dark:text-amber-400 text-center text-xs font-medium">
                        Reservada con Pase QR
                      </div>
                    )
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
