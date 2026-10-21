import React, { useState } from 'react';
import { 
  Cpu, 
  Usb, 
  Sliders, 
  Terminal, 
  Download, 
  CheckCircle2, 
  AlertTriangle, 
  FileCode,
  Zap,
  Play
} from 'lucide-react';

export default function HardwareBridge({ 
  state, 
  onSimulateDistance, 
  onToggleBarrier, 
  isSerialConnected, 
  setIsSerialConnected 
}) {
  const [activePort, setActivePort] = useState(null);
  const [serialLogs, setSerialLogs] = useState([
    '[INIT] Puente de hardware listo. Esperando conexión serial o telemetría simulada.',
    '[CONFIG] Microcontrolador: Arduino UNO R3 (ATmega328P a 16 MHz).',
    '[INFO] Umbral de presencia vehicular establecido en 10.0 cm.',
  ]);
  const [simulatedDistances, setSimulatedDistances] = useState({
    1: 45.2,
    2: 6.4,
    3: 50.0,
    4: 48.1,
    5: 42.8,
    6: 5.1,
  });

  const appendSerialLog = (msg) => {
    setSerialLogs(prev => [ `[${new Date().toLocaleTimeString('es-CL')}] ${msg}`, ...prev.slice(0, 30) ]);
  };

  const connectArduinoSerial = async () => {
    if (!('serial' in navigator)) {
      alert('La Web Serial API no está disponible en este navegador. Utiliza Google Chrome, Microsoft Edge u Opera.');
      return;
    }

    try {
      appendSerialLog('Solicitando puerto serial al usuario...');
      const port = await navigator.serial.requestPort();
      await port.open({ baudRate: 9600 });
      setActivePort(port);
      setIsSerialConnected(true);
      appendSerialLog('¡CONEXIÓN EXITOSA! Arduino UNO R3 enlazado a 9600 Baudios.');

      const textDecoder = new TextDecoderStream();
      port.readable.pipeTo(textDecoder.writable);
      const reader = textDecoder.readable.getReader();

      let buffer = '';
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        buffer += value;
        const lines = buffer.split('\n');
        buffer = lines.pop();

        for (const line of lines) {
          const trimmed = line.trim();
          if (trimmed.startsWith('{')) {
            try {
              const data = JSON.parse(trimmed);
              appendSerialLog(`RX: ${trimmed}`);
              if (data.slots && Array.isArray(data.slots)) {
                data.slots.forEach(s => {
                  onSimulateDistance(s.id, s.dist);
                });
              }
            } catch (e) {
              appendSerialLog(`RX RAW: ${trimmed}`);
            }
          }
        }
      }
    } catch (err) {
      appendSerialLog(`Error de conexión: ${err.message}`);
      setIsSerialConnected(false);
    }
  };

  const handleSliderChange = (slotId, val) => {
    const num = parseFloat(val);
    setSimulatedDistances(prev => ({ ...prev, [slotId]: num }));
    onSimulateDistance(slotId, num);
    appendSerialLog(`POTENCIÓMETRO: Slot E-0${slotId} -> ${num.toFixed(1)} cm (${num < 10 ? 'OCUPADO' : 'LIBRE'})`);
  };

  const slots = state?.slots || [];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Big Header */}
      <div className="game-card p-6 sm:p-8 bg-white dark:bg-[#13141a] flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <span className="text-xs font-display font-black tracking-wider uppercase text-emerald-600 dark:text-emerald-400">
            CONEXIÓN IOT
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-black text-zinc-950 dark:text-white mt-1">
            ARDUINO UNO & SENSORES
          </h2>
          <p className="text-base text-zinc-600 dark:text-zinc-400 font-sans font-medium mt-1">
            Enlaza el Arduino por USB o calibra los sensores con los deslizadores.
          </p>
        </div>

        <button
          onClick={connectArduinoSerial}
          className={`btn-game-primary py-4 px-6 text-xs flex items-center gap-3 ${
            isSerialConnected
              ? '!bg-emerald-600 !border-emerald-700 !shadow-none'
              : ''
          }`}
        >
          <Usb className="w-5 h-5" />
          {isSerialConnected ? 'ARDUINO CONECTADO (COM/USB)' : 'CONECTAR ARDUINO POR USB'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Sliders Grid (7 cols) */}
        <div className="lg:col-span-7 game-card p-6 sm:p-8 bg-white dark:bg-[#13141a] space-y-6">
          <div className="flex items-center justify-between border-b-2 border-zinc-100 dark:border-zinc-800 pb-4">
            <div>
              <h3 className="font-display text-xl font-black text-zinc-950 dark:text-white">
                CALIBRACIÓN DE SENSORES (CM)
              </h3>
              <p className="text-xs text-zinc-500 font-sans font-bold">
                Mueve los deslizadores: si la distancia baja de 10 cm, el auto entra inmediatamente.
              </p>
            </div>
            <span className="font-display font-black text-xs px-3 py-1 rounded-xl bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300">
              UMBRAL: &lt; 10.0 CM
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {slots.map((s) => {
              const currentDist = simulatedDistances[s.id] ?? s.distanceCm;
              const isOccupied = currentDist < 10.0;

              return (
                <div
                  key={s.id}
                  className={`p-5 rounded-2xl border-2 transition-all ${
                    isOccupied
                      ? 'border-red-400 bg-red-50/40 dark:bg-red-950/20 shadow-md'
                      : 'border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-display font-black text-2xl text-zinc-950 dark:text-white">
                      {s.code}
                    </span>
                    <span className={`pill-status-large text-xs ${
                      isOccupied 
                        ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' 
                        : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200'
                    }`}>
                      {isOccupied ? '🔴 OCUPADO' : '🟢 LIBRE'}
                    </span>
                  </div>

                  <div className="space-y-2 mt-3">
                    <div className="flex justify-between font-display font-bold text-xs">
                      <span className="text-zinc-500">DISTANCIA:</span>
                      <span className="text-lg font-black text-zinc-950 dark:text-white">{currentDist.toFixed(1)} cm</span>
                    </div>

                    <input
                      type="range"
                      min="2"
                      max="50"
                      step="0.5"
                      value={currentDist}
                      onChange={(e) => handleSliderChange(s.id, e.target.value)}
                      className="w-full accent-zinc-950 dark:accent-white h-2.5 rounded-lg cursor-pointer"
                    />

                    <div className="flex justify-between text-[11px] font-mono font-bold text-zinc-400">
                      <span>2 cm (Auto adentro)</span>
                      <span>50 cm (Vacío)</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Barrier Tests */}
          <div className="pt-4 border-t-2 border-zinc-100 dark:border-zinc-800 flex flex-wrap items-center justify-between gap-3">
            <span className="font-display font-black text-xs uppercase text-zinc-500">
              PRUEBAS RÁPIDAS DE SERVOS SG90:
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => onToggleBarrier('entry')}
                className="py-2.5 px-4 rounded-xl border-2 border-zinc-300 dark:border-zinc-700 font-display text-xs font-black uppercase hover:bg-zinc-100 dark:hover:bg-zinc-800"
              >
                Girar Servo Entrada (Pin 9)
              </button>
              <button
                onClick={() => onToggleBarrier('exit')}
                className="py-2.5 px-4 rounded-xl border-2 border-zinc-300 dark:border-zinc-700 font-display text-xs font-black uppercase hover:bg-zinc-100 dark:hover:bg-zinc-800"
              >
                Girar Servo Salida (Pin 10)
              </button>
            </div>
          </div>
        </div>

        {/* Terminal & Pinout (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="game-card p-6 bg-zinc-950 text-zinc-300 font-mono text-xs border-zinc-800 space-y-3">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800 font-display font-black text-xs text-zinc-400">
              <div className="flex items-center gap-2 text-emerald-400">
                <Terminal className="w-4 h-4" />
                <span>TERMINAL SERIAL ARDUINO (9600 BD)</span>
              </div>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            </div>

            <div className="h-64 overflow-y-auto space-y-2 text-xs font-mono scrollbar-thin">
              {serialLogs.map((log, idx) => (
                <div key={idx} className="leading-relaxed">
                  {log.includes('OCUPADO') ? (
                    <span className="text-red-400 font-bold">{log}</span>
                  ) : log.includes('CONEXIÓN') || log.includes('RX') ? (
                    <span className="text-emerald-400 font-bold">{log}</span>
                  ) : (
                    <span className="text-zinc-400">{log}</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Arduino Code & Pinout */}
          <div className="game-card p-6 sm:p-8 bg-white dark:bg-[#13141a] space-y-4">
            <div className="flex items-center gap-3">
              <FileCode className="w-6 h-6 text-zinc-600" />
              <h4 className="font-display text-lg font-black text-zinc-950 dark:text-white">
                FIRMWARE ARDUINO UNO (.INO)
              </h4>
            </div>

            <div className="bg-zinc-100 dark:bg-zinc-900 p-4 rounded-xl font-mono text-xs font-bold text-zinc-700 dark:text-zinc-300 space-y-1.5 border">
              <div>• Pin Trig Global: 2 (Disparo compartido)</div>
              <div>• Pines Echo: 3, 4, 5, 6, 7, 8 (Slots 1 a 6)</div>
              <div>• Servos SG90: Pin 9 (Entrada) y Pin 10 (Salida)</div>
              <div>• Display LCD I2C: Pines A4 (SDA) y A5 (SCL)</div>
            </div>

            <a
              href="/arduino/smart_parking_uno.ino"
              download="smart_parking_uno.ino"
              className="btn-game-primary w-full py-4 text-xs flex items-center justify-center gap-2 block text-center"
            >
              <Download className="w-4 h-4" />
              DESCARGAR SMART_PARKING_UNO.INO
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
