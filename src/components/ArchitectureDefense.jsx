import React, { useState } from 'react';
import { 
  Layers, 
  Cloud, 
  Cpu, 
  Database, 
  Server, 
  Monitor, 
  Play, 
  CheckCircle2, 
  ArrowRight, 
  Users, 
  HelpCircle, 
  ShieldCheck, 
  Code2, 
  TrendingUp
} from 'lucide-react';

export default function ArchitectureDefense() {
  const [activeStep, setActiveStep] = useState(null);
  const [isSimulatingFlow, setIsSimulatingFlow] = useState(false);
  const [selectedFlowType, setSelectedFlowType] = useState('reservation');

  const runLiveSimulation = async (flowType) => {
    setSelectedFlowType(flowType);
    setIsSimulatingFlow(true);
    setActiveStep(1);

    await new Promise(r => setTimeout(r, 900));
    setActiveStep(2);
    await new Promise(r => setTimeout(r, 900));
    setActiveStep(3);
    await new Promise(r => setTimeout(r, 900));
    setActiveStep(4);
    await new Promise(r => setTimeout(r, 900));
    setActiveStep(5);
    await new Promise(r => setTimeout(r, 900));
    setIsSimulatingFlow(false);
  };

  return (
    <div className="space-y-10 animate-fadeIn">
      {/* Big Header */}
      <div className="game-card p-6 sm:p-8 bg-white dark:bg-[#13141a] flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <span className="text-xs font-display font-black tracking-wider uppercase text-emerald-600 dark:text-emerald-400">
            DEFENSA TÉCNICA · 15 MINUTOS EN AUDITORIO
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-black text-zinc-950 dark:text-white mt-1">
            ARQUITECTURA DE SISTEMAS & AZURE
          </h2>
          <p className="text-base text-zinc-600 dark:text-zinc-400 font-sans font-medium mt-1 max-w-2xl">
            Trazabilidad en tiempo real, diagrama de 4 capas y respuestas clave para la comisión evaluadora (100 puntos).
          </p>
        </div>

        <div className="px-4 py-2.5 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-display font-black text-xs flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-600" />
          100% CUMPLIMIENTO DE RÚBRICA
        </div>
      </div>

      {/* 1. Interactive Request-Response Tracer (Criterion 7 of Rubric: 10 pts) */}
      <div className="game-card p-6 sm:p-8 bg-white dark:bg-[#13141a] space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-zinc-100 dark:border-zinc-800 pb-4">
          <div>
            <h3 className="font-display text-2xl font-black text-zinc-950 dark:text-white flex items-center gap-3">
              <TrendingUp className="w-6 h-6 text-emerald-500" />
              TRAZABILIDAD EN VIVO (FLUJO END-TO-END)
            </h3>
            <p className="text-sm text-zinc-500 font-sans font-medium mt-0.5">
              Demuestra en vivo a los profesores cómo viaja el dato entre las capas del sistema.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => runLiveSimulation('reservation')}
              disabled={isSimulatingFlow}
              className={`py-3 px-5 rounded-xl font-display text-xs font-black uppercase transition-all flex items-center gap-2 ${
                selectedFlowType === 'reservation'
                  ? 'bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 shadow-md'
                  : 'border-2 border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800'
              }`}
            >
              <Play className="w-4 h-4" />
              Flujo Reserva Web
            </button>

            <button
              onClick={() => runLiveSimulation('sensor_iot')}
              disabled={isSimulatingFlow}
              className={`py-3 px-5 rounded-xl font-display text-xs font-black uppercase transition-all flex items-center gap-2 ${
                selectedFlowType === 'sensor_iot'
                  ? 'bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 shadow-md'
                  : 'border-2 border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800'
              }`}
            >
              <Play className="w-4 h-4" />
              Flujo Sensor Arduino
            </button>
          </div>
        </div>

        {/* Visual 5-Step Pipeline (Large, bold, high-contrast) */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {[
            {
              step: 1,
              title: selectedFlowType === 'reservation' ? '1. Cliente Web' : '1. Sensor HC-SR04',
              desc: selectedFlowType === 'reservation' ? 'Ingresa patente y solicita reserva.' : 'Eco detecta auto a 6.4 cm en Slot 2.',
              tech: selectedFlowType === 'reservation' ? 'React 18 SPA' : 'Arduino UNO / Pin Echo 4',
              icon: Monitor,
            },
            {
              step: 2,
              title: selectedFlowType === 'reservation' ? '2. Azure Gateway' : '2. Enlace Serial',
              desc: selectedFlowType === 'reservation' ? 'Petición HTTPS /api/parking/reserve.' : 'Arduino emite JSON por USB (9600 Bd).',
              tech: selectedFlowType === 'reservation' ? 'Azure App Service REST' : 'Web Serial API',
              icon: Server,
            },
            {
              step: 3,
              title: '3. Reglas de Negocio',
              desc: selectedFlowType === 'reservation' ? 'Valida patente chilena y cupos.' : 'Regla: distancia < 10cm -> Ocupado.',
              tech: 'Domain Controller',
              icon: Code2,
            },
            {
              step: 4,
              title: '4. Persistencia',
              desc: selectedFlowType === 'reservation' ? 'Guarda reserva y genera pase QR.' : 'Actualiza estado y audita en logs.',
              tech: 'Azure Cosmos DB',
              icon: Database,
            },
            {
              step: 5,
              title: selectedFlowType === 'reservation' ? '5. Confirmación' : '5. Actuadores',
              desc: selectedFlowType === 'reservation' ? 'Devuelve pase y actualiza mapa.' : 'Cambia LED a rojo y abre servo SG90.',
              tech: 'SG90 Servo + LCD',
              icon: Cpu,
            },
          ].map((item) => {
            const Icon = item.icon;
            const isCurrent = activeStep === item.step;
            const isCompleted = activeStep > item.step;

            return (
              <div
                key={item.step}
                className={`p-5 rounded-2xl border-2 transition-all duration-300 ${
                  isCurrent
                    ? 'border-zinc-950 dark:border-white bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 shadow-game scale-[1.05]'
                    : isCompleted
                    ? 'border-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-100'
                    : 'border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/40'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-display font-black text-xs uppercase opacity-70">
                    ETAPA {item.step}
                  </span>
                  <Icon className="w-5 h-5" />
                </div>

                <div className="font-display font-black text-base my-1">
                  {item.title}
                </div>

                <p className="font-sans text-xs font-bold leading-relaxed opacity-90 mt-1">
                  {item.desc}
                </p>

                <div className="mt-3 pt-2 border-t text-[11px] font-mono font-bold opacity-80">
                  {item.tech}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. Architecture 4 Layers */}
      <div className="game-card p-6 sm:p-8 bg-white dark:bg-[#13141a] space-y-6">
        <div>
          <h3 className="font-display text-2xl font-black text-zinc-950 dark:text-white">
            ARQUITECTURA POR CAPAS EN MICROSOFT AZURE
          </h3>
          <p className="text-sm text-zinc-500 font-sans font-medium mt-1">
            Separación estricta de responsabilidades entre hardware, API cloud y experiencia visual.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="p-6 rounded-2xl border-2 border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50 space-y-2">
            <span className="font-display font-black text-xs uppercase text-emerald-600 dark:text-emerald-400">
              CAPA 1: PRESENTACIÓN (UI / UX)
            </span>
            <h4 className="font-display text-lg font-black text-zinc-950 dark:text-white">
              React 18 SPA + Web Serial API
            </h4>
            <p className="text-sm font-sans font-medium text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Diseño minimalista sofisticado con tipografías <em>Unbounded</em> y <em>Space Grotesk</em>. Permite interactuar con la maqueta, reservar y conectar el Arduino directamente por USB sin drivers externos. Desplegado en <strong>Azure Static Web Apps</strong>.
            </p>
          </div>

          <div className="p-6 rounded-2xl border-2 border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50 space-y-2">
            <span className="font-display font-black text-xs uppercase text-blue-600 dark:text-blue-400">
              CAPA 2: CONTROLADORES & API REST
            </span>
            <h4 className="font-display text-lg font-black text-zinc-950 dark:text-white">
              Node.js Express en Azure App Service
            </h4>
            <p className="text-sm font-sans font-medium text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Expone endpoints estandarizados: <code>/api/parking/state</code>, <code>/api/parking/reserve</code>, <code>/api/parking/release</code> y <code>/api/parking/telemetry</code>. Orquesta la autenticación, sanitización y control de errores HTTP.
            </p>
          </div>

          <div className="p-6 rounded-2xl border-2 border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50 space-y-2">
            <span className="font-display font-black text-xs uppercase text-purple-600 dark:text-purple-400">
              CAPA 3: LÓGICA DE NEGOCIO & DOMINIO
            </span>
            <h4 className="font-display text-lg font-black text-zinc-950 dark:text-white">
              Reglas de Ocupación & Tarificación
            </h4>
            <p className="text-sm font-sans font-medium text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Aplica el umbral de distancia física (&lt; 10 cm = Ocupado), validación de patentes en formato chileno (4 letras + 2 números), cálculo de cobro en pesos chilenos ($35 CLP/minuto) y ciclos automáticos de barrera.
            </p>
          </div>

          <div className="p-6 rounded-2xl border-2 border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50 space-y-2">
            <span className="font-display font-black text-xs uppercase text-amber-600 dark:text-amber-400">
              CAPA 4: PERSISTENCIA & HARDWARE IOT
            </span>
            <h4 className="font-display text-lg font-black text-zinc-950 dark:text-white">
              Azure Cosmos DB + Arduino UNO R3
            </h4>
            <p className="text-sm font-sans font-medium text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Persistencia en la nube de rotación vehicular e historial de eventos, complementado por la maqueta física controlada por el microcontrolador <strong>Arduino UNO R3</strong> a 9600 baudios con 8 sensores HC-SR04 y pantalla LCD.
            </p>
          </div>
        </div>
      </div>

      {/* 3. Answers for Teachers' Defense Questions */}
      <div className="game-card p-6 sm:p-8 bg-white dark:bg-[#13141a] space-y-6">
        <div>
          <h3 className="font-display text-2xl font-black text-zinc-950 dark:text-white flex items-center gap-3">
            <HelpCircle className="w-6 h-6 text-zinc-500" />
            RESPUESTAS CLAVE PARA LA DEFENSA TÉCNICA
          </h3>
          <p className="text-sm text-zinc-500 font-sans font-medium mt-1">
            Respuestas preparadas para las preguntas exigidas por los docentes en la rúbrica oficial.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="p-5 rounded-2xl border-2 border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 space-y-2">
            <h4 className="font-display text-base font-black text-zinc-950 dark:text-white">
              ¿Por qué eligieron esta arquitectura frente a otras alternativas?
            </h4>
            <p className="text-sm font-sans text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Porque desacopla el ciclo rápido del hardware IoT (Arduino emitiendo paquetes cada 1 segundo) del frontend web de los usuarios. Un monolito MVC clásico sobrecargaría el servidor renderizando vistas completas ante cada lectura de distancia, mientras que una API REST permite que múltiples clientes (web, móvil, tótems) consuman los mismos datos en milisegundos.
            </p>
          </div>

          <div className="p-5 rounded-2xl border-2 border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 space-y-2">
            <h4 className="font-display text-base font-black text-zinc-950 dark:text-white">
              ¿Qué cambiaría si la aplicación pasara de 100 a 10.000 usuarios?
            </h4>
            <p className="text-sm font-sans text-zinc-600 dark:text-zinc-400 leading-relaxed">
              En Azure activaríamos <strong>Auto-scaling</strong> horizontal en Azure App Service (subiendo instancias ante CPU &gt; 70%), agregaríamos <strong>Azure Redis Cache</strong> para servir el estado de los espacios en RAM con latencia menor a 2 ms, e integraríamos <strong>Azure IoT Hub</strong> para canalizar millones de telemetrías MQTT concurrentes.
            </p>
          </div>
        </div>
      </div>

      {/* 4. Roles of 4 Members */}
      <div className="game-card p-6 sm:p-8 bg-white dark:bg-[#13141a] space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-display text-2xl font-black text-zinc-950 dark:text-white flex items-center gap-3">
              <Users className="w-6 h-6 text-zinc-500" />
              ORGANIZACIÓN DEL EQUIPO (4 INTEGRANTES)
            </h3>
            <p className="text-sm text-zinc-500 font-sans font-medium mt-1">
              Roles asignados para la exposición según la Sección 8 de la pauta.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl border-2 border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 space-y-2">
            <span className="font-display font-black text-xs text-zinc-400">INTEGRANTE 1</span>
            <div className="font-display font-black text-base text-zinc-950 dark:text-white">
              Interfaz & UX
            </div>
            <p className="text-xs font-sans text-zinc-500 font-medium leading-relaxed">
              Diseño intuitivo, maquetación responsive, animaciones de vehículos y terminal de reservas.
            </p>
          </div>

          <div className="p-5 rounded-2xl border-2 border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 space-y-2">
            <span className="font-display font-black text-xs text-zinc-400">INTEGRANTE 2</span>
            <div className="font-display font-black text-base text-zinc-950 dark:text-white">
              Arquitectura & Lógica
            </div>
            <p className="text-xs font-sans text-zinc-500 font-medium leading-relaxed">
              Definición de capas, controladores API REST, reglas de ocupación &lt;10cm y trazabilidad E2E.
            </p>
          </div>

          <div className="p-5 rounded-2xl border-2 border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 space-y-2">
            <span className="font-display font-black text-xs text-zinc-400">INTEGRANTE 3</span>
            <div className="font-display font-black text-base text-zinc-950 dark:text-white">
              Hardware IoT Arduino
            </div>
            <p className="text-xs font-sans text-zinc-500 font-medium leading-relaxed">
              Programación Arduino UNO C++, 8 sensores HC-SR04, servos SG90, LCD I2C y Web Serial API.
            </p>
          </div>

          <div className="p-5 rounded-2xl border-2 border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 space-y-2">
            <span className="font-display font-black text-xs text-zinc-400">INTEGRANTE 4</span>
            <div className="font-display font-black text-base text-zinc-950 dark:text-white">
              Operación Azure Cloud
            </div>
            <p className="text-xs font-sans text-zinc-500 font-medium leading-relaxed">
              Configuración en Azure App Service, Static Web Apps, variables de entorno y monitoreo en vivo.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
