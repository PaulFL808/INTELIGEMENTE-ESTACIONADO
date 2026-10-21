import React from 'react';
import { 
  Car, 
  Zap, 
  Accessibility, 
  Crown, 
  ArrowRight, 
  ArrowLeft, 
  Clock, 
  CheckCircle2,
  AlertTriangle,
  KeyRound
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
  onToggleBarrier 
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
            <Accessibility className="w-3.5 h-3.5 text-amber-600" /> PREFERENCIAL
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
      {/* Top Banner: Concise & Clean */}
      <div className="game-card p-6 sm:p-7 bg-white dark:bg-[#13141a]">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 font-display font-bold text-xs uppercase">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
              EN TIEMPO REAL
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-black text-zinc-950 dark:text-white tracking-tight">
              ESTACIONAMIENTO 3D
            </h2>
            <p className="text-base text-zinc-600 dark:text-zinc-400 font-sans font-medium">
              Controla barreras, revisa los 6 espacios y simula autos con un clic.
            </p>
          </div>

          {/* Quick Stats Scoreboard */}
          <div className="grid grid-cols-3 gap-3 select-none">
            {/* Disponibles */}
            <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border-2 border-emerald-300 dark:border-emerald-700/60 text-center min-w-[95px] sm:min-w-[115px]">
              <span className="block text-xs font-display font-extrabold uppercase text-emerald-800 dark:text-emerald-300">
                LIBRES
              </span>
              <span className="text-4xl sm:text-5xl font-display font-black text-emerald-600 dark:text-emerald-400 my-0.5 block">
                {availableCount}
              </span>
              <span className="text-[11px] font-bold text-emerald-700 dark:text-emerald-400 font-sans">
                de 6
              </span>
            </div>

            {/* Ocupados */}
            <div className="p-4 rounded-2xl bg-red-50 dark:bg-red-950/40 border-2 border-red-300 dark:border-red-700/60 text-center min-w-[95px] sm:min-w-[115px]">
              <span className="block text-xs font-display font-extrabold uppercase text-red-800 dark:text-red-300">
                OCUPADOS
              </span>
              <span className="text-4xl sm:text-5xl font-display font-black text-red-600 dark:text-red-400 my-0.5 block">
                {occupiedCount}
              </span>
              <span className="text-[11px] font-bold text-red-700 dark:text-red-400 font-sans">
                autos
              </span>
            </div>

            {/* Reservados */}
            <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border-2 border-amber-300 dark:border-amber-700/60 text-center min-w-[95px] sm:min-w-[115px]">
              <span className="block text-xs font-display font-extrabold uppercase text-amber-800 dark:text-amber-300">
                RESERVAS
              </span>
              <span className="text-4xl sm:text-5xl font-display font-black text-amber-600 dark:text-amber-400 my-0.5 block">
                {reservedCount}
              </span>
              <span className="text-[11px] font-bold text-amber-700 dark:text-amber-400 font-sans">
                agendadas
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
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-display font-black border-2 ${
                barriers.entry?.status === 'open'
                  ? 'bg-emerald-500 text-white border-emerald-600 animate-pulse'
                  : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200 border-zinc-300 dark:border-zinc-700'
              }`}>
                <ArrowRight className="w-5 h-5" />
              </div>
              <h4 className="text-base font-display font-bold text-zinc-950 dark:text-white">
                Barrera Entrada
              </h4>
            </div>

            <span className={`pill-status-large text-xs ${
              barriers.entry?.status === 'open' 
                ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' 
                : 'bg-zinc-200 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200'
            }`}>
              {barriers.entry?.status === 'open' ? 'ABIERTA' : 'CERRADA'}
            </span>
          </div>

          {/* Visual Barrier Arm */}
          <div className="h-14 bg-zinc-100 dark:bg-zinc-900 rounded-xl p-2.5 border-2 border-zinc-200 dark:border-zinc-800 relative overflow-hidden flex items-center">
            <div className="w-5 h-9 bg-amber-500 rounded-md border-2 border-zinc-900 z-10"></div>
            <div 
              className="h-3.5 flex-1 rounded-r-md border-2 border-zinc-900 ml-1 origin-left transition-transform duration-500 shadow-md flex"
              style={{
                transform: barriers.entry?.status === 'open' ? 'rotate(-65deg) translateY(-8px)' : 'rotate(0deg)',
                backgroundImage: 'repeating-linear-gradient(45deg, #ef4444, #ef4444 12px, #ffffff 12px, #ffffff 24px)'
              }}
            ></div>
          </div>

          <button
            onClick={() => onToggleBarrier('entry')}
            className="w-full py-3 px-4 rounded-xl font-display text-xs font-bold uppercase tracking-wide bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 hover:opacity-90 active:scale-95 transition-all shadow-sm flex items-center justify-center gap-2"
          >
            {barriers.entry?.status === 'open' ? 'Bajar Barrera' : 'Levantar Barrera'}
          </button>
        </div>

        {/* LCD Totem Replica */}
        <div className="game-card p-5 sm:p-6 bg-zinc-950 text-emerald-400 font-mono border-zinc-800 flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between text-xs font-display font-bold text-zinc-500 border-b border-zinc-800 pb-2">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              DISPLAY LCD
            </span>
            <span>ARDUINO UNO</span>
          </div>

          <div className="space-y-1.5 py-1">
            <div className="flex justify-between items-baseline">
              <span className="text-xl font-display font-black tracking-wider text-white">
                LIBRES: {availableCount} / 6
              </span>
              <span className={`text-xs font-display font-bold px-2 py-0.5 rounded ${
                availableCount === 0 ? 'bg-red-950 text-red-400' : 'bg-emerald-950 text-emerald-300'
              }`}>
                {availableCount === 0 ? 'LLENO' : 'DISPONIBLE'}
              </span>
            </div>

            <div className="text-xs font-mono text-emerald-500 bg-zinc-900/90 p-2 rounded-lg border border-zinc-800 flex items-center justify-between">
              <span>TARIFA: $35/MIN</span>
              <span>BIENVENIDO</span>
            </div>
          </div>

          <div className="text-[10px] text-zinc-500 font-mono flex items-center justify-between">
            <span>Sincronizado con maqueta</span>
            <span>1 seg</span>
          </div>
        </div>

        {/* Exit Barrier Gate */}
        <div className="game-card p-5 sm:p-6 bg-white dark:bg-[#13141a] flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-display font-black border-2 ${
                barriers.exit?.status === 'open'
                  ? 'bg-emerald-500 text-white border-emerald-600 animate-pulse'
                  : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200 border-zinc-300 dark:border-zinc-700'
              }`}>
                <ArrowLeft className="w-5 h-5" />
              </div>
              <h4 className="text-base font-display font-bold text-zinc-950 dark:text-white">
                Barrera Salida
              </h4>
            </div>

            <span className={`pill-status-large text-xs ${
              barriers.exit?.status === 'open' 
                ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' 
                : 'bg-zinc-200 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200'
            }`}>
              {barriers.exit?.status === 'open' ? 'ABIERTA' : 'CERRADA'}
            </span>
          </div>

          {/* Visual Barrier Arm */}
          <div className="h-14 bg-zinc-100 dark:bg-zinc-900 rounded-xl p-2.5 border-2 border-zinc-200 dark:border-zinc-800 relative overflow-hidden flex items-center">
            <div className="w-5 h-9 bg-amber-500 rounded-md border-2 border-zinc-900 z-10"></div>
            <div 
              className="h-3.5 flex-1 rounded-r-md border-2 border-zinc-900 ml-1 origin-left transition-transform duration-500 shadow-md flex"
              style={{
                transform: barriers.exit?.status === 'open' ? 'rotate(-65deg) translateY(-8px)' : 'rotate(0deg)',
                backgroundImage: 'repeating-linear-gradient(45deg, #ef4444, #ef4444 12px, #ffffff 12px, #ffffff 24px)'
              }}
            ></div>
          </div>

          <button
            onClick={() => onToggleBarrier('exit')}
            className="w-full py-3 px-4 rounded-xl font-display text-xs font-bold uppercase tracking-wide bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 hover:opacity-90 active:scale-95 transition-all shadow-sm flex items-center justify-center gap-2"
          >
            {barriers.exit?.status === 'open' ? 'Bajar Barrera' : 'Levantar Barrera'}
          </button>
        </div>
      </div>

      {/* 6 Parking Slots (Clean, Visual, Direct) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <h3 className="font-display text-xl sm:text-2xl font-black text-zinc-950 dark:text-white">
            ESPACIOS 1 AL 6
          </h3>
          <span className="text-xs font-sans font-bold text-zinc-500">
            Detección: auto a menos de 10 cm
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
                className={`game-card relative overflow-hidden transition-all duration-300 flex flex-col justify-between ${
                  isOccupied
                    ? 'border-red-400 dark:border-red-800 bg-white dark:bg-[#15161e] shadow-glow-red'
                    : isReserved
                    ? 'border-amber-400 dark:border-amber-800 bg-amber-50/30 dark:bg-[#1a1714]'
                    : 'border-emerald-300 dark:border-emerald-800/80 bg-white dark:bg-[#13141a]'
                }`}
              >
                {/* Header */}
                <div className="p-4 border-b-2 border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-display text-2xl font-black text-zinc-950 dark:text-white">
                      {slot.code}
                    </span>
                    {getSlotTypeBadge(slot.type)}
                  </div>

                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-zinc-100 dark:bg-zinc-800 border">
                    <span className={`w-3 h-3 rounded-full transition-all ${
                      isOccupied 
                        ? 'bg-red-500 animate-pulse' 
                        : isReserved 
                        ? 'bg-amber-500' 
                        : 'bg-emerald-500 animate-pulse'
                    }`} />
                    <span className="text-[11px] font-mono font-bold">
                      {isOccupied ? 'OCUPADO' : isReserved ? 'RESERVADO' : 'LIBRE'}
                    </span>
                  </div>
                </div>

                {/* Road / Bay Visualization */}
                <div className="p-5 road-texture relative min-h-[250px] flex flex-col items-center justify-center border-y-2 border-zinc-800 text-center">
                  <div className="absolute left-2 top-0 bottom-0 w-1 border-r-2 border-dashed border-yellow-400 opacity-60"></div>
                  <div className="absolute right-2 top-0 bottom-0 w-1 border-l-2 border-dashed border-yellow-400 opacity-60"></div>

                  {isOccupied && (
                    <div className="space-y-2.5">
                      <TopDownCar color={assignedColor} plate={slot.vehiclePlate || 'PATENTE'} />
                      <div className="bg-zinc-900/90 text-white px-3.5 py-1.5 rounded-xl border border-zinc-700 font-sans shadow-md">
                        <div className="font-display font-bold text-xs text-yellow-400">
                          {slot.vehiclePlate || 'AUTO'}
                        </div>
                        <div className="text-[11px] text-zinc-300">
                          {slot.driverName || 'Conductor'} · {slot.totalMinutes || 35} min
                        </div>
                      </div>
                    </div>
                  )}

                  {isReserved && (
                    <div className="space-y-3 animate-pulse">
                      <div className="w-20 h-20 rounded-full bg-amber-500/20 border-2 border-amber-400 flex items-center justify-center mx-auto text-amber-400 shadow-md">
                        <KeyRound className="w-10 h-10" />
                      </div>
                      <div className="bg-zinc-900/90 text-white px-3 py-1.5 rounded-xl border border-amber-600 font-sans shadow-md">
                        <div className="font-display font-bold text-xs text-amber-400">
                          {slot.vehiclePlate}
                        </div>
                        <div className="text-[11px] text-zinc-300">
                          {slot.driverName}
                        </div>
                      </div>
                    </div>
                  )}

                  {isAvailable && (
                    <div className="space-y-2">
                      <div className="w-20 h-20 rounded-2xl border-4 border-dashed border-emerald-400/80 flex items-center justify-center mx-auto text-emerald-400 bg-emerald-950/40 shadow-glow-green">
                        <span className="font-display font-black text-4xl">P</span>
                      </div>
                      <div className="font-display font-bold text-xs text-emerald-400">
                        DISPONIBLE
                      </div>
                    </div>
                  )}
                </div>

                {/* Distance Gauge */}
                <div className="p-3.5 bg-zinc-50 dark:bg-zinc-900/60 border-b-2 border-zinc-100 dark:border-zinc-800 space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-mono font-bold">
                    <span className="text-zinc-500">SENSOR:</span>
                    <span className={`text-sm font-extrabold ${slot.distanceCm < 10 ? 'text-red-500 font-display' : 'text-emerald-600 dark:text-emerald-400 font-display'}`}>
                      {slot.distanceCm.toFixed(1)} cm
                    </span>
                  </div>

                  <div className="w-full bg-zinc-200 dark:bg-zinc-800 h-2 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-300 rounded-full ${
                        slot.distanceCm < 10 ? 'bg-red-500' : 'bg-emerald-500'
                      }`}
                      style={{ width: `${Math.min(100, (slot.distanceCm / 50) * 100)}%` }}
                    />
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="p-3.5 bg-white dark:bg-[#13141a]">
                  {isAvailable && (
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => onSimulateDistance(slot.id, 6.2)}
                        className="py-2.5 px-3 rounded-xl font-display text-xs font-bold uppercase bg-emerald-600 hover:bg-emerald-500 text-white active:scale-95 transition-all shadow-sm flex items-center justify-center gap-1"
                      >
                        🚗 Estacionar
                      </button>

                      <button
                        onClick={() => onReserveClick(slot)}
                        className="py-2.5 px-3 rounded-xl font-display text-xs font-bold uppercase bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 active:scale-95 transition-all shadow-sm flex items-center justify-center gap-1"
                      >
                        📝 Reservar
                      </button>
                    </div>
                  )}

                  {isOccupied && (
                    <button
                      onClick={() => onReleaseClick(slot)}
                      className="w-full py-2.5 px-3 rounded-xl font-display text-xs font-bold uppercase bg-red-600 hover:bg-red-500 text-white active:scale-95 transition-all shadow-sm flex items-center justify-center gap-2"
                    >
                      💨 Retirar Auto / Cobrar
                    </button>
                  )}

                  {isReserved && (
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => onSimulateDistance(slot.id, 6.2)}
                        className="py-2.5 px-3 rounded-xl font-display text-xs font-bold uppercase bg-amber-500 hover:bg-amber-400 text-zinc-950 active:scale-95 transition-all shadow-sm flex items-center justify-center gap-1"
                      >
                        🚗 Auto Llega
                      </button>

                      <button
                        onClick={() => onReleaseClick(slot)}
                        className="py-2.5 px-3 rounded-xl font-display text-xs font-bold uppercase border-2 border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200 active:scale-95 transition-all flex items-center justify-center gap-1"
                      >
                        Cancelar
                      </button>
                    </div>
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
