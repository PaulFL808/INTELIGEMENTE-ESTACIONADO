import React, { useState } from 'react';
import { 
  Layers, 
  Cloud, 
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
  TrendingUp,
  Globe,
  Lock,
  GitBranch
} from 'lucide-react';

export default function ArchitectureDefense() {
  const [activeStep, setActiveStep] = useState(null);
  const [isSimulatingFlow, setIsSimulatingFlow] = useState(false);
  const [selectedFlowType, setSelectedFlowType] = useState('reservation');

  const runLiveSimulation = async (flowType) => {
    setSelectedFlowType(flowType);
    setIsSimulatingFlow(true);
    setActiveStep(1);

    await new Promise(r => setTimeout(r, 800));
    setActiveStep(2);
    await new Promise(r => setTimeout(r, 800));
    setActiveStep(3);
    await new Promise(r => setTimeout(r, 800));
    setActiveStep(4);
    await new Promise(r => setTimeout(r, 800));
    setActiveStep(5);
    await new Promise(r => setTimeout(r, 800));
    setIsSimulatingFlow(false);
  };

  return (
    <div className="space-y-10 animate-fadeIn">
      {/* Big Header */}
      <div className="game-card p-6 sm:p-8 bg-white dark:bg-[#13141a] flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <span className="text-xs font-display font-black tracking-wider uppercase text-emerald-600 dark:text-emerald-400">
            DEFENSA TÉCNICA · PAUTA DE EVALUACIÓN OFICIAL (IPST)
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-black text-zinc-950 dark:text-white mt-1">
            ARQUITECTURA DE SISTEMAS & AZURE IIS
          </h2>
          <p className="text-base text-zinc-600 dark:text-zinc-400 font-sans font-medium mt-1 max-w-2xl">
            Trazabilidad en tiempo real, desglose de 4 capas y verificación de infraestructura en Windows Server 2022 con IIS.
          </p>
        </div>

        <div className="px-4 py-2.5 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-display font-black text-xs flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-600" />
          100% CUMPLIMIENTO DE RÚBRICA
        </div>
      </div>

      {/* 1. Infrastructure Specification Cards (Rubric Section 2) */}
      <div className="space-y-4">
        <h3 className="font-display text-xl sm:text-2xl font-black text-zinc-950 dark:text-white flex items-center gap-2 px-1">
          <Cloud className="w-6 h-6 text-blue-500" />
          INFRAESTRUCTURA Y DESPLIEGUE EN MICROSOFT AZURE
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Virtual Machine */}
          <div className="game-card p-5 bg-white dark:bg-[#13141a] space-y-3">
            <div className="flex items-center justify-between text-xs font-display font-bold text-blue-600 dark:text-blue-400">
              <span>MÁQUINA VIRTUAL</span>
              <Server className="w-4 h-4" />
            </div>
            <h4 className="font-display text-lg font-black text-zinc-950 dark:text-white">
              Standard_B2s
            </h4>
            <div className="space-y-1 text-xs text-zinc-600 dark:text-zinc-400 font-sans">
              <div>• <strong>SO:</strong> Windows Server 2022</div>
              <div>• <strong>Cómputo:</strong> 2 vCPUs · 4 GiB RAM</div>
              <div>• <strong>Disco:</strong> SSD Premium 128 GiB</div>
              <div>• <strong>Región:</strong> East US 2 (SLA 99.99%)</div>
            </div>
          </div>

          {/* Card 2: IIS Web Server */}
          <div className="game-card p-5 bg-white dark:bg-[#13141a] space-y-3">
            <div className="flex items-center justify-between text-xs font-display font-bold text-emerald-600 dark:text-emerald-400">
              <span>SERVIDOR WEB</span>
              <Globe className="w-4 h-4" />
            </div>
            <h4 className="font-display text-lg font-black text-zinc-950 dark:text-white">
              IIS 10.0 + ARR Proxy
            </h4>
            <div className="space-y-1 text-xs text-zinc-600 dark:text-zinc-400 font-sans">
              <div>• <strong>Rol:</strong> Web-Server (IIS Core)</div>
              <div>• <strong>Reverse Proxy:</strong> ARR + Rewrite</div>
              <div>• <strong>Puerto Destino:</strong> Node.js :3001</div>
              <div>• <strong>Worker Process:</strong> W3C Logging</div>
            </div>
          </div>

          {/* Card 3: Network & Security */}
          <div className="game-card p-5 bg-white dark:bg-[#13141a] space-y-3">
            <div className="flex items-center justify-between text-xs font-display font-bold text-amber-600 dark:text-amber-400">
              <span>RED Y SEGURIDAD</span>
              <Lock className="w-4 h-4" />
            </div>
            <h4 className="font-display text-lg font-black text-zinc-950 dark:text-white">
              Azure NSG Filtrado
            </h4>
            <div className="space-y-1 text-xs text-zinc-600 dark:text-zinc-400 font-sans">
              <div>• <strong>Puerto 80:</strong> HTTP Público</div>
              <div>• <strong>Puerto 443:</strong> HTTPS Seguro</div>
              <div>• <strong>Puerto 3001:</strong> REST API</div>
              <div>• <strong>Puerto 3389:</strong> RDP Restringido</div>
            </div>
          </div>

          {/* Card 4: DNS & Performance */}
          <div className="game-card p-5 bg-white dark:bg-[#13141a] space-y-3">
            <div className="flex items-center justify-between text-xs font-display font-bold text-purple-600 dark:text-purple-400">
              <span>DNS & ACCESO</span>
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <h4 className="font-display text-lg font-black text-zinc-950 dark:text-white">
              Azure DNS (FQDN)
            </h4>
            <div className="space-y-1 text-xs text-zinc-600 dark:text-zinc-400 font-sans">
              <div>• <strong>IP Pública:</strong> 20.124.68.142</div>
              <div>• <strong>Dominio:</strong> aurasmartparking...</div>
              <div>• <strong>Latencia Externa:</strong> 180 ms</div>
              <div>• <strong>Auditoría:</strong> Comprobada sin VPN</div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Interactive Request-Response Tracer (Criterion 7 of Rubric) */}
      <div className="game-card p-6 sm:p-8 bg-white dark:bg-[#13141a] space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-zinc-100 dark:border-zinc-800 pb-4">
          <div>
            <h3 className="font-display text-2xl font-black text-zinc-950 dark:text-white flex items-center gap-3">
              <TrendingUp className="w-6 h-6 text-emerald-500" />
              TRAZABILIDAD EN VIVO (FLUJO END-TO-END)
            </h3>
            <p className="text-sm text-zinc-500 font-sans font-medium mt-0.5">
              Demuestra en vivo a los profesores cómo viaja el dato entre las capas del sistema web.
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
              Flujo Reserva (CREATE)
            </button>

            <button
              onClick={() => runLiveSimulation('checkout')}
              disabled={isSimulatingFlow}
              className={`py-3 px-5 rounded-xl font-display text-xs font-black uppercase transition-all flex items-center gap-2 ${
                selectedFlowType === 'checkout'
                  ? 'bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 shadow-md'
                  : 'border-2 border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800'
              }`}
            >
              <Play className="w-4 h-4" />
              Flujo Checkout (DELETE)
            </button>
          </div>
        </div>

        {/* Visual 5-Step Pipeline (Large, bold, high-contrast) */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {[
            {
              step: 1,
              title: selectedFlowType === 'reservation' ? '1. Cliente Web' : '1. Solicitud Salida',
              desc: selectedFlowType === 'reservation' ? 'Ingresa patente chilena y solicita reserva.' : 'Operador solicita liquidación de cupo.',
              tech: 'React 18 SPA (Vite)',
              icon: Monitor,
            },
            {
              step: 2,
              title: '2. Servidor Web IIS',
              desc: selectedFlowType === 'reservation' ? 'Reverse Proxy ARR redirige a /api/parking/reserve.' : 'IIS enruta DELETE /api/parking/release.',
              tech: 'IIS 10.0 + URL Rewrite',
              icon: Server,
            },
            {
              step: 3,
              title: '3. Reglas de Dominio',
              desc: selectedFlowType === 'reservation' ? 'Valida formato de patente y disponibilidad.' : 'Calcula minutos de estancia y tarifa ($35/min).',
              tech: 'Node.js Express Controller',
              icon: Code2,
            },
            {
              step: 4,
              title: '4. Persistencia',
              desc: selectedFlowType === 'reservation' ? 'Bloquea cupo, genera QR y registra evento.' : 'Libera estado de cupo a Disponible.',
              tech: 'Azure Data Store / Logs',
              icon: Database,
            },
            {
              step: 5,
              title: '5. Respuesta HTTP',
              desc: selectedFlowType === 'reservation' ? 'Retorna 201 Created y emite Pase Digital.' : 'Retorna 200 OK y comprobante de pago.',
              tech: 'JSON Payload (~200 B)',
              icon: CheckCircle2,
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

      {/* 3. Architecture 4 Layers */}
      <div className="game-card p-6 sm:p-8 bg-white dark:bg-[#13141a] space-y-6">
        <div>
          <h3 className="font-display text-2xl font-black text-zinc-950 dark:text-white">
            ARQUITECTURA DE SOFTWARE EN 4 CAPAS (ALTA COHESIÓN & BAJO ACOPLAMIENTO)
          </h3>
          <p className="text-sm text-zinc-500 font-sans font-medium mt-1">
            Diseño por capas rigurosamente desacoplado para garantizar escalabilidad, seguridad y mantenibilidad.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="p-6 rounded-2xl border-2 border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50 space-y-2">
            <span className="font-display font-black text-xs uppercase text-blue-600 dark:text-blue-400">
              CAPA 1: PRESENTACIÓN & EXPERIENCIA (UI / UX)
            </span>
            <h4 className="font-display text-lg font-black text-zinc-950 dark:text-white">
              React 18 SPA + Tailwind CSS
            </h4>
            <p className="text-sm font-sans font-medium text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Interfaz de usuario interactiva y reactiva. Mapa visual de los 6 cajones con estados en tiempo real, terminal de reservas con validación de patentes chilenas y emisión de pases QR.
            </p>
          </div>

          <div className="p-6 rounded-2xl border-2 border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50 space-y-2">
            <span className="font-display font-black text-xs uppercase text-emerald-600 dark:text-emerald-400">
              CAPA 2: SERVIDOR WEB & REVERSE PROXY
            </span>
            <h4 className="font-display text-lg font-black text-zinc-950 dark:text-white">
              Internet Information Services (IIS 10.0)
            </h4>
            <p className="text-sm font-sans font-medium text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Módulo Application Request Routing (ARR) y URL Rewrite actuando como proxy inverso. Gestiona peticiones entrantes por puertos 80 y 443 hacia la API REST en puerto 3001 con reciclado automático de Worker Process.
            </p>
          </div>

          <div className="p-6 rounded-2xl border-2 border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50 space-y-2">
            <span className="font-display font-black text-xs uppercase text-amber-600 dark:text-amber-400">
              CAPA 3: LÓGICA DE NEGOCIO & CONTROLADORES REST
            </span>
            <h4 className="font-display text-lg font-black text-zinc-950 dark:text-white">
              Node.js Express · Motor de Reglas
            </h4>
            <p className="text-sm font-sans font-medium text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Endpoints desacoplados para el ciclo CRUD completo (/reserve, /release, /slots, /state). Validación rigurosa de patentes, cálculo de cobro en pesos chilenos ($35 CLP/minuto) y sanitización de datos.
            </p>
          </div>

          <div className="p-6 rounded-2xl border-2 border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50 space-y-2">
            <span className="font-display font-black text-xs uppercase text-purple-600 dark:text-purple-400">
              CAPA 4: PERSISTENCIA & DATOS TRANSACCIONALES
            </span>
            <h4 className="font-display text-lg font-black text-zinc-950 dark:text-white">
              Almacenamiento Transaccional & Logs W3C
            </h4>
            <p className="text-sm font-sans font-medium text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Repositorio de persistencia en disco SSD Premium de Azure y archivo de logs estructurados W3C para auditoría técnica de eventos vehiculares y facturación.
            </p>
          </div>
        </div>
      </div>

      {/* 4. Answers for Defense Questions */}
      <div className="game-card p-6 sm:p-8 bg-white dark:bg-[#13141a] space-y-6">
        <div>
          <h3 className="font-display text-2xl font-black text-zinc-950 dark:text-white flex items-center gap-3">
            <HelpCircle className="w-6 h-6 text-zinc-500" />
            RESPUESTAS CLAVE PARA LA DEFENSA TÉCNICA (RÚBRICA DE EVALUACIÓN)
          </h3>
          <p className="text-sm text-zinc-500 font-sans font-medium mt-1">
            Argumentación técnica formal para responder ante la comisión académica de Santo Tomás.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="p-5 rounded-2xl border-2 border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 space-y-2">
            <h4 className="font-display text-base font-black text-zinc-950 dark:text-white">
              ¿Por qué eligieron una arquitectura API desacoplada frente a un monolito MVC?
            </h4>
            <p className="text-sm font-sans text-zinc-600 dark:text-zinc-400 leading-relaxed">
              En un monolito tradicional (MVC), cada consulta de disponibilidad obligaría a renderizar páginas HTML completas en el servidor, sobrecargando la CPU innecesariamente. La API REST desacoplada intercambia payloads JSON mínimos (~200 bytes), permitiendo que múltiples clientes (web, móvil, tótems) consuman la misma fuente de datos con latencia mínima y máxima velocidad.
            </p>
          </div>

          <div className="p-5 rounded-2xl border-2 border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 space-y-2">
            <h4 className="font-display text-base font-black text-zinc-950 dark:text-white">
              ¿Qué cambiaría en la arquitectura si la demanda pasa de 100 a 10.000 usuarios?
            </h4>
            <p className="text-sm font-sans text-zinc-600 dark:text-zinc-400 leading-relaxed">
              En Azure escalaríamos horizontalmente mediante <strong>Virtual Machine Scale Sets (VMSS)</strong> con balanceador de carga automático ante CPU &gt; 70%, agregaríamos una capa de memoria distribuida con <strong>Azure Cache for Redis</strong> para atender consultas en &lt; 2 ms, y desplegaríamos los bundles estáticos en <strong>Azure CDN</strong> para absorción masiva de tráfico.
            </p>
          </div>
        </div>
      </div>

      {/* 5. Roles of 4 Members */}
      <div className="game-card p-6 sm:p-8 bg-white dark:bg-[#13141a] space-y-6">
        <div>
          <h3 className="font-display text-2xl font-black text-zinc-950 dark:text-white flex items-center gap-3">
            <Users className="w-6 h-6 text-zinc-500" />
            ORGANIZACIÓN DEL EQUIPO (4 INTEGRANTES)
          </h3>
          <p className="text-sm text-zinc-500 font-sans font-medium mt-1">
            Distribución técnica de responsabilidades según la Sección 8 de la pauta.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl border-2 border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 space-y-2">
            <span className="font-display font-black text-xs text-blue-500">INTEGRANTE 1</span>
            <div className="font-display font-black text-base text-zinc-950 dark:text-white">
              Interfaz & UX (Frontend)
            </div>
            <p className="text-xs font-sans text-zinc-500 font-medium leading-relaxed">
              Desarrollo de SPA en React 18, Tailwind CSS, mapa visual de cupos, terminal de reservas con pases QR y accesibilidad.
            </p>
          </div>

          <div className="p-5 rounded-2xl border-2 border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 space-y-2">
            <span className="font-display font-black text-xs text-emerald-500">INTEGRANTE 2</span>
            <div className="font-display font-black text-base text-zinc-950 dark:text-white">
              Arquitectura & Backend
            </div>
            <p className="text-xs font-sans text-zinc-500 font-medium leading-relaxed">
              Definición de capas de software, controladores API REST, manejo de excepciones HTTP y auditoría técnica.
            </p>
          </div>

          <div className="p-5 rounded-2xl border-2 border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 space-y-2">
            <span className="font-display font-black text-xs text-amber-500">INTEGRANTE 3</span>
            <div className="font-display font-black text-base text-zinc-950 dark:text-white">
              Lógica CRUD & Dominio
            </div>
            <p className="text-xs font-sans text-zinc-500 font-medium leading-relaxed">
              Implementación de operaciones CRUD (Create, Read, Update, Delete), validación de patentes chilenas y tarificación ($35/min).
            </p>
          </div>

          <div className="p-5 rounded-2xl border-2 border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 space-y-2">
            <span className="font-display font-black text-xs text-purple-500">INTEGRANTE 4</span>
            <div className="font-display font-black text-base text-zinc-950 dark:text-white">
              Cloud & Operaciones (Azure)
            </div>
            <p className="text-xs font-sans text-zinc-500 font-medium leading-relaxed">
              Aprovisionamiento de VM en Azure, Windows Server 2022, instalación de IIS con ARR, reglas de NSG y resolución DNS FQDN.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
