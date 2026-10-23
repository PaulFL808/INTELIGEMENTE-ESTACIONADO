import pptxgen from 'pptxgenjs';
import path from 'path';

const pptx = new pptxgen();

pptx.layout = 'LAYOUT_16x9';
pptx.author = 'Equipo AURA Smart Parking';
pptx.company = 'IPST - Área Informática';
pptx.title = 'AURA Smart Parking - Defensa de Arquitectura y Azure';

// Theme Colors
const C_DARK_BG   = '0F172A'; // Deep Slate
const C_CARD_BG   = '1E293B'; // Card Background
const C_WHITE     = 'FFFFFF';
const C_GRAY      = '94A3B8';
const C_AZURE     = '0EA5E9'; // Azure Blue Accent
const C_EMERALD   = '10B981'; // Green Accent
const C_AMBER     = 'F59E0B'; // Amber Accent

// Helper to add header to slide
function addSlideHeader(slide, titleText, sectionText) {
  slide.background = { color: C_DARK_BG };

  // Top accent line
  slide.addShape(pptx.ShapeType.rect, {
    x: 0, y: 0, w: '100%', h: 0.08,
    fill: { color: C_AZURE }, line: { color: C_AZURE }
  });

  // Section badge
  slide.addText(sectionText.toUpperCase(), {
    x: 0.8, y: 0.4, w: 10, h: 0.3,
    fontSize: 11, fontFace: 'Segoe UI', bold: true, color: C_AZURE
  });

  // Main Slide Title
  slide.addText(titleText, {
    x: 0.8, y: 0.7, w: 11.5, h: 0.6,
    fontSize: 22, fontFace: 'Segoe UI', bold: true, color: C_WHITE
  });
}

// -----------------------------------------------------------------------------
// SLIDE 1: PORTADA
// -----------------------------------------------------------------------------
const slide1 = pptx.addSlide();
slide1.background = { color: C_DARK_BG };

slide1.addShape(pptx.ShapeType.rect, {
  x: 0, y: 0, w: '100%', h: 0.12,
  fill: { color: C_AZURE }, line: { color: C_AZURE }
});

slide1.addText('INSTITUTO PROFESIONAL SANTO TOMÁS · ÁREA INFORMÁTICA', {
  x: 0.8, y: 0.8, w: 11.5, h: 0.4,
  fontSize: 12, fontFace: 'Segoe UI', bold: true, color: C_AZURE, charSpacing: 1.5
});

slide1.addText('AURA · SMART PARKING IoT', {
  x: 0.8, y: 1.2, w: 11.5, h: 1.2,
  fontSize: 38, fontFace: 'Segoe UI', bold: true, color: C_WHITE
});

slide1.addText('Diseño, Despliegue y Defensa de una Solución Web en Microsoft Azure\nArticulación: Arquitectura de Sistemas + Programación en la Nube', {
  x: 0.8, y: 2.3, w: 11.5, h: 0.8,
  fontSize: 17, fontFace: 'Segoe UI', color: C_GRAY
});

// Card Información de Presentación
slide1.addShape(pptx.ShapeType.roundRect, {
  x: 0.8, y: 3.4, w: 11.7, h: 2.9, r: 0.15,
  fill: { color: C_CARD_BG }, line: { color: C_AZURE, width: 1.5 }
});

slide1.addText([
  { text: 'INFORMACIÓN DE LA DEFENSA EN AUDITORIO\n', options: { bold: true, color: C_AZURE, fontSize: 13 } },
  { text: '• Fecha y Hora: ', options: { bold: true, color: C_WHITE, fontSize: 12 } },
  { text: 'Miércoles 28 de octubre · 09:00 hrs\n', options: { color: C_GRAY, fontSize: 12 } },
  { text: '• Ubicación: ', options: { bold: true, color: C_WHITE, fontSize: 12 } },
  { text: 'Auditorio 1, Edificio 91, Tercer Piso (Tenida Semi-Formal)\n', options: { color: C_GRAY, fontSize: 12 } },
  { text: '• Repositorio Oficial: ', options: { bold: true, color: C_WHITE, fontSize: 12 } },
  { text: 'https://github.com/PaulFL808/INTELIGEMENTE-ESTACIONADO\n', options: { color: C_EMERALD, fontSize: 12 } },
  { text: '• Equipo: ', options: { bold: true, color: C_WHITE, fontSize: 12 } },
  { text: '4 Integrantes (UI/UX, Lógica/CRUD, Hardware Arduino UNO, Cloud Azure)', options: { color: C_GRAY, fontSize: 12 } }
], { x: 1.1, y: 3.6, w: 11.1, h: 2.5, fontFace: 'Segoe UI' });

slide1.addNotes('MINUTO 0:00 - Saludo inicial a la comisión evaluadora. Presentación del equipo de trabajo y declaración del proyecto AURA Smart Parking, desarrollado para la actividad integradora.');

// -----------------------------------------------------------------------------
// SLIDE 2: PROBLEMA & OBJETIVO
// -----------------------------------------------------------------------------
const slide2 = pptx.addSlide();
addSlideHeader(slide2, '1. PROBLEMA & OBJETIVO DEL SISTEMA', 'Minuto 0:00 - 2:00 · Introducción');

// Columna Problema
slide2.addShape(pptx.ShapeType.roundRect, {
  x: 0.8, y: 1.6, w: 5.6, h: 5.0, r: 0.15,
  fill: { color: C_CARD_BG }, line: { color: 'EF4444', width: 1.5 }
});

slide2.addText([
  { text: 'EL PROBLEMA REAL\n\n', options: { bold: true, color: 'EF4444', fontSize: 16 } },
  { text: '• Congestión y Tráfico Vial:\n', options: { bold: true, color: C_WHITE, fontSize: 13 } },
  { text: 'Hasta un 30% del flujo vehicular en centros urbanos proviene de conductores buscando estacionamiento.\n\n', options: { color: C_GRAY, fontSize: 12 } },
  { text: '• Pérdida de Tiempo y Emisiones:\n', options: { bold: true, color: C_WHITE, fontSize: 13 } },
  { text: 'Gasto innecesario de combustible y aumento de huella de carbono por falta de información previa.\n\n', options: { color: C_GRAY, fontSize: 12 } },
  { text: '• Gestión Manual Ineficiente:\n', options: { bold: true, color: C_WHITE, fontSize: 13 } },
  { text: 'Barreras manuales lentas y ausencia de telemetría de ocupación en tiempo real.', options: { color: C_GRAY, fontSize: 12 } }
], { x: 1.1, y: 1.9, w: 5.0, h: 4.4, fontFace: 'Segoe UI' });

// Columna Solución
slide2.addShape(pptx.ShapeType.roundRect, {
  x: 6.8, y: 1.6, w: 5.7, h: 5.0, r: 0.15,
  fill: { color: C_CARD_BG }, line: { color: C_EMERALD, width: 1.5 }
});

slide2.addText([
  { text: 'NUESTRA SOLUCIÓN: AURA\n\n', options: { bold: true, color: C_EMERALD, fontSize: 16 } },
  { text: '• Automatización con IoT (Arduino UNO):\n', options: { bold: true, color: C_WHITE, fontSize: 13 } },
  { text: 'Maqueta de 6 espacios con 8 sensores ultrasónicos HC-SR04, servomotores SG90 y display LCD.\n\n', options: { color: C_GRAY, fontSize: 12 } },
  { text: '• Plataforma Cloud en Azure:\n', options: { bold: true, color: C_WHITE, fontSize: 13 } },
  { text: 'Disponibilidad web pública en tiempo real accesible desde smartphones y ordenadores.\n\n', options: { color: C_GRAY, fontSize: 12 } },
  { text: '• Agendamiento y Cobro por Minuto:\n', options: { bold: true, color: C_WHITE, fontSize: 13 } },
  { text: 'Terminal de reservas con patente chilena, pase digital QR y tarifa dinámica ($35 CLP/min).', options: { color: C_GRAY, fontSize: 12 } }
], { x: 7.1, y: 1.9, w: 5.1, h: 4.4, fontFace: 'Segoe UI' });

slide2.addNotes('MINUTO 0:00 A 2:00 - Exponer con claridad la problemática urbana. Explicar cómo AURA soluciona la incertidumbre conectando la maqueta física a la nube de Azure.');

// -----------------------------------------------------------------------------
// SLIDE 3: ARQUITECTURA EN 4 CAPAS
// -----------------------------------------------------------------------------
const slide3 = pptx.addSlide();
addSlideHeader(slide3, '2. ARQUITECTURA DE SOFTWARE EN 4 CAPAS', 'Minuto 2:00 - 5:00 · Diseño y Componentes');

const layers = [
  { n: 'CAPA 1: PRESENTACIÓN (UI / UX)', tech: 'React 18 + Tailwind CSS + Web Serial API', desc: 'SPA interactiva con tipografías Unbounded y Space Grotesk. Enlace serial directo por USB con Arduino.', color: C_AZURE },
  { n: 'CAPA 2: CONTROLADORES & API REST', tech: 'Node.js Express / IIS en Windows Server 2022', desc: 'Endpoints desacoplados (/state, /reserve, /release, /telemetry), sanitización y control de errores HTTP.', color: C_EMERALD },
  { n: 'CAPA 3: LÓGICA DE NEGOCIO', tech: 'Motor de Reglas de Dominio', desc: 'Regla física (< 10 cm = Ocupado), validación de patentes chilenas y cálculo de tarificación ($35 CLP/min).', color: C_AMBER },
  { n: 'CAPA 4: PERSISTENCIA & HARDWARE IOT', tech: 'Azure Cosmos DB + Arduino UNO R3', desc: 'Persistencia de auditoría transaccional, 8 sensores ultrasónicos HC-SR04, servomotores SG90 y display LCD I2C.', color: 'A855F7' }
];

layers.forEach((ly, idx) => {
  const y = 1.6 + (idx * 1.25);
  slide3.addShape(pptx.ShapeType.roundRect, {
    x: 0.8, y: y, w: 11.7, h: 1.1, r: 0.1,
    fill: { color: C_CARD_BG }, line: { color: ly.color, width: 1.5 }
  });

  slide3.addText([
    { text: `${ly.n}  `, options: { bold: true, color: ly.color, fontSize: 13 } },
    { text: `[${ly.tech}]\n`, options: { bold: true, color: C_WHITE, fontSize: 11 } },
    { text: ly.desc, options: { color: C_GRAY, fontSize: 11 } }
  ], { x: 1.1, y: y + 0.12, w: 11.1, h: 0.85, fontFace: 'Segoe UI' });
});

slide3.addNotes('MINUTO 2:00 A 5:00 - Explicar cada una de las 4 capas. Enfatizar la alta cohesión y bajo acoplamiento: el frontend no depende del hardware directamente, sino que interactúa con la API REST.');

// -----------------------------------------------------------------------------
// SLIDE 4: JUSTIFICACIÓN DE LA ARQUITECTURA
// -----------------------------------------------------------------------------
const slide4 = pptx.addSlide();
addSlideHeader(slide4, '3. JUSTIFICACIÓN FRENTE A OTRAS ALTERNATIVAS', 'Minuto 2:00 - 5:00 · Defensa Técnica');

const justs = [
  {
    q: '¿Por qué API Desacoplada y NO Monolito MVC tradicional?',
    a: 'En un monolito clásico, cada lectura de sensor obligaría a recargar o re-renderizar la vista en el servidor. Con una API REST desacoplada, la telemetría viaja en paquetes JSON ligeros sin sobrecargar la CPU, permitiendo que múltiples clientes consuman los mismos datos simultáneamente.'
  },
  {
    q: '¿Por qué NO Serverless puro para todo el sistema?',
    a: 'Las Azure Functions son ideales para cargas esporádicas, pero la telemetría continua de sensores y la conexión persistente por Web Serial API requieren un entorno de ejecución continuo y estable como Azure App Service o Windows Server con IIS.'
  },
  {
    q: '¿Cómo responde la arquitectura ante caídas de Internet?',
    a: 'El Arduino UNO R3 posee lógica autónoma local: si la nube pierde conectividad, los sensores siguen abriendo las barreras y actualizando la pantalla LCD física. Al volver la red, los datos se sincronizan sin pérdidas.'
  }
];

justs.forEach((j, idx) => {
  const y = 1.6 + (idx * 1.65);
  slide4.addShape(pptx.ShapeType.roundRect, {
    x: 0.8, y: y, w: 11.7, h: 1.45, r: 0.12,
    fill: { color: C_CARD_BG }, line: { color: C_AZURE, width: 1.2 }
  });

  slide4.addText([
    { text: `${j.q}\n\n`, options: { bold: true, color: C_AMBER, fontSize: 13 } },
    { text: j.a, options: { color: C_WHITE, fontSize: 11.5 } }
  ], { x: 1.1, y: y + 0.15, w: 11.1, h: 1.15, fontFace: 'Segoe UI' });
});

slide4.addNotes('MINUTO 2:00 A 5:00 - Defender la arquitectura respondiendo directamente a las preguntas de la pauta. Esta lámina responde al Criterio 3 (15 puntos de la rúbrica).');

// -----------------------------------------------------------------------------
// SLIDE 5: HARDWARE IOT & MAQUETA
// -----------------------------------------------------------------------------
const slide5 = pptx.addSlide();
addSlideHeader(slide5, '4. INTEGRACIÓN IOT: MAQUETA FÍSICA (70 × 72 CM)', 'Minuto 5:00 · Componentes y Circuito');

slide5.addShape(pptx.ShapeType.roundRect, {
  x: 0.8, y: 1.6, w: 11.7, h: 5.0, r: 0.15,
  fill: { color: C_CARD_BG }, line: { color: C_EMERALD, width: 1.5 }
});

slide5.addText([
  { text: 'ESPECIFICACIONES DEL CIRCUITO (ARDUINO UNO R3):\n\n', options: { bold: true, color: C_EMERALD, fontSize: 15 } },
  { text: '• Microcontrolador: ', options: { bold: true, color: C_WHITE, fontSize: 12.5 } },
  { text: 'Arduino UNO R3 (ATmega328P a 16 MHz) operando a 5V.\n\n', options: { color: C_GRAY, fontSize: 12.5 } },
  { text: '• 8 Sensores Ultrasónicos HC-SR04: ', options: { bold: true, color: C_WHITE, fontSize: 12.5 } },
  { text: '6 sensores para los cajones de estacionamiento + 1 en entrada + 1 en salida.\n\n', options: { color: C_GRAY, fontSize: 12.5 } },
  { text: '• Disparo Global Compartido: ', options: { bold: true, color: C_AMBER, fontSize: 12.5 } },
  { text: 'Pin Digital 2 compartido como Trigger común para todos los sensores de cupos, resolviendo la limitación de pines del Arduino UNO.\n\n', options: { color: C_GRAY, fontSize: 12.5 } },
  { text: '• 2 Servomotores SG90: ', options: { bold: true, color: C_WHITE, fontSize: 12.5 } },
  { text: 'Barrera de entrada (Pin 9) y barrera de salida (Pin 10) rotando de 0° (cerrada) a 90° (abierta).\n\n', options: { color: C_GRAY, fontSize: 12.5 } },
  { text: '• Pantalla LCD 16x2 I2C: ', options: { bold: true, color: C_WHITE, fontSize: 12.5 } },
  { text: 'Dirección 0x27 en pines analógicos A4 (SDA) y A5 (SCL) para conteo autónomo.\n\n', options: { color: C_GRAY, fontSize: 12.5 } },
  { text: '• Web Serial API: ', options: { bold: true, color: C_AZURE, fontSize: 12.5 } },
  { text: 'Conexión USB directa desde el navegador (Google Chrome/Edge) sin drivers externos.', options: { color: C_GRAY, fontSize: 12.5 } }
], { x: 1.1, y: 1.9, w: 11.1, h: 4.4, fontFace: 'Segoe UI' });

slide5.addNotes('MINUTO 5:00 - Mostrar el código firmware de Arduino y explicar cómo se resolvió la limitación de pines mediante Trigger compartido en el Pin 2.');

// -----------------------------------------------------------------------------
// SLIDE 6: DEMOSTRACIÓN EN VIVO & CRUD
// -----------------------------------------------------------------------------
const slide6 = pptx.addSlide();
addSlideHeader(slide6, '5. DEMOSTRACIÓN EN VIVO & OPERACIONES CRUD', 'Minuto 5:00 - 8:00 · Caso de Uso E2E');

const cruds = [
  { op: 'CREATE', title: 'Reserva de Cupo', desc: 'POST /api/parking/reserve -> Conductor ingresa patente chilena (ej. ABCD-12), sistema bloquea cupo y emite Pase Digital con QR.', color: C_AZURE },
  { op: 'READ', title: 'Monitoreo en Vivo', desc: 'GET /api/parking/state -> Lectura cada 2.5s de distancias en cm de los 8 sensores y auditoría de eventos en logs.', color: C_EMERALD },
  { op: 'UPDATE', title: 'Detección y Barrera', desc: 'POST /api/parking/telemetry -> Distancia < 10 cm cambia espacio a OCUPADO en rojo. /barrier rota servo a 90°.', color: C_AMBER },
  { op: 'DELETE', title: 'Checkout y Cobro', desc: 'POST /api/parking/release -> Salida vehicular, cobro exacto calculado ($35 CLP/min) y liberación a LIBRE.', color: 'EF4444' }
];

cruds.forEach((cr, idx) => {
  const y = 1.6 + (idx * 1.25);
  slide6.addShape(pptx.ShapeType.roundRect, {
    x: 0.8, y: y, w: 11.7, h: 1.1, r: 0.1,
    fill: { color: C_CARD_BG }, line: { color: cr.color, width: 1.5 }
  });

  slide6.addText([
    { text: `[${cr.op}] ${cr.title}\n`, options: { bold: true, color: cr.color, fontSize: 13 } },
    { text: cr.desc, options: { color: C_WHITE, fontSize: 11 } }
  ], { x: 1.1, y: y + 0.12, w: 11.1, h: 0.85, fontFace: 'Segoe UI' });
});

slide6.addNotes('MINUTOS 5:00 A 8:00 - Demostración en vivo en el proyector: 1) Reservar cupo, 2) Consultar mapa interactivo, 3) Detección de auto a menos de 10 cm, 4) Levantamiento de barrera, 5) Checkout y cobro.');

// -----------------------------------------------------------------------------
// SLIDE 7: INFRAESTRUCTURA EN AZURE
// -----------------------------------------------------------------------------
const slide7 = pptx.addSlide();
addSlideHeader(slide7, '6. INFRAESTRUCTURA & SERVICIOS EN MICROSOFT AZURE', 'Minuto 8:00 - 10:00 · Despliegue Cloud');

slide7.addShape(pptx.ShapeType.roundRect, {
  x: 0.8, y: 1.6, w: 11.7, h: 5.0, r: 0.15,
  fill: { color: C_CARD_BG }, line: { color: C_AZURE, width: 1.5 }
});

slide7.addText([
  { text: 'CONFIGURACIÓN DE INFRAESTRUCTURA ACREDITADA:\n\n', options: { bold: true, color: C_AZURE, fontSize: 15 } },
  { text: '• Máquina Virtual en Azure: ', options: { bold: true, color: C_WHITE, fontSize: 12.5 } },
  { text: 'Instancia Standard_B2s (2 vCPUs, 4 GiB RAM, SSD 128 GiB) corriendo Windows Server 2022 Datacenter.\n\n', options: { color: C_GRAY, fontSize: 12.5 } },
  { text: '• Servidor Web IIS: ', options: { bold: true, color: C_WHITE, fontSize: 12.5 } },
  { text: 'Internet Information Services con URL Rewrite y Application Request Routing (ARR) para proxy inverso hacia Node.js.\n\n', options: { color: C_GRAY, fontSize: 12.5 } },
  { text: '• Grupo de Seguridad de Red (NSG): ', options: { bold: true, color: C_WHITE, fontSize: 12.5 } },
  { text: 'Filtrado de entrada estricto: Puerto 80 (HTTP público), 443 (HTTPS seguro), 3001 (API REST) y 3389 (RDP administrativo).\n\n', options: { color: C_GRAY, fontSize: 12.5 } },
  { text: '• Azure DNS (FQDN): ', options: { bold: true, color: C_WHITE, fontSize: 12.5 } },
  { text: 'Resolución de nombre público aurasmartparking.eastus.cloudapp.azure.com hacia la IP 20.124.68.142.\n\n', options: { color: C_GRAY, fontSize: 12.5 } },
  { text: '• Latencia y Rendimiento: ', options: { bold: true, color: C_EMERALD, fontSize: 12.5 } },
  { text: '180 ms de carga inicial desde equipos externos sin VPN ni conexión previa al entorno Azure.', options: { color: C_GRAY, fontSize: 12.5 } }
], { x: 1.1, y: 1.9, w: 11.1, h: 4.4, fontFace: 'Segoe UI' });

slide7.addNotes('MINUTOS 8:00 A 10:00 - Mostrar los recursos aprovisionados en el portal de Azure. Explicar el grupo de seguridad de red y la resolución FQDN de Azure DNS.');

// -----------------------------------------------------------------------------
// SLIDE 8: ESCALABILIDAD 100 A 10.000 USUARIOS
// -----------------------------------------------------------------------------
const slide8 = pptx.addSlide();
addSlideHeader(slide8, '7. ESCALABILIDAD EN LA NUBE (100 A 10.000 USUARIOS)', 'Minuto 10:00 - 13:00 · Defensa Técnica');

slide8.addShape(pptx.ShapeType.roundRect, {
  x: 0.8, y: 1.6, w: 11.7, h: 5.0, r: 0.15,
  fill: { color: C_CARD_BG }, line: { color: C_AMBER, width: 1.5 }
});

slide8.addText([
  { text: '¿QUÉ CAMBIARÍA ANTE UN CRECIMIENTO DE 100 A 10.000 USUARIOS?\n\n', options: { bold: true, color: C_AMBER, fontSize: 14 } },
  { text: '1. Auto-scaling Horizontal en Azure App Service / VM Scale Sets:\n', options: { bold: true, color: C_WHITE, fontSize: 12.5 } },
  { text: 'Aumento automático de instancias al superar el 70% de consumo de CPU, balanceando carga dinámicamente.\n\n', options: { color: C_GRAY, fontSize: 12 } },
  { text: '2. Caché Distribuida con Azure Cache for Redis:\n', options: { bold: true, color: C_WHITE, fontSize: 12.5 } },
  { text: 'Almacenamiento del estado de los espacios en memoria RAM, reduciendo consultas a base de datos con latencia < 2 ms.\n\n', options: { color: C_GRAY, fontSize: 12 } },
  { text: '3. Ingesta Masiva de Telemetría con Azure IoT Hub:\n', options: { bold: true, color: C_WHITE, fontSize: 12.5 } },
  { text: 'Para flotas de cientos de recintos, el tráfico se canaliza mediante particiones MQTT, procesando millones de eventos por segundo.\n\n', options: { color: C_GRAY, fontSize: 12 } },
  { text: '4. Distribución Global con Azure CDN / Front Door:\n', options: { bold: true, color: C_WHITE, fontSize: 12.5 } },
  { text: 'Descarga del tráfico estático en los puntos de presencia (PoP) de Azure para absorber visitas masivas con costo mínimo.', options: { color: C_GRAY, fontSize: 12 } }
], { x: 1.1, y: 1.9, w: 11.1, h: 4.4, fontFace: 'Segoe UI' });

slide8.addNotes('MINUTOS 10:00 A 13:00 - Responder a la pregunta de escalabilidad de la pauta. Detallar cómo Azure permite pasar de un MVP a producción masiva mediante Redis, IoT Hub y CDN.');

// -----------------------------------------------------------------------------
// SLIDE 9: ORGANIZACIÓN DEL EQUIPO
// -----------------------------------------------------------------------------
const slide9 = pptx.addSlide();
addSlideHeader(slide9, '8. ORGANIZACIÓN DEL EQUIPO (4 INTEGRANTES)', 'Minuto 10:00 - 13:00 · Roles según Pauta');

const team = [
  { r: 'INTEGRANTE 1', title: 'Interfaz & UX (UI)', desc: 'SPA en React 18, tipografías Unbounded y Space Grotesk, mapa interactivo, validaciones y diseño responsive.' },
  { r: 'INTEGRANTE 2', title: 'Arquitectura & Lógica', desc: 'Definición del modelo en 4 capas, controladores API REST, motor de reglas de ocupación y operaciones CRUD.' },
  { r: 'INTEGRANTE 3', title: 'Integración IoT (Hardware)', desc: 'Programación en C++ de Arduino UNO R3, sensores HC-SR04, servomotores SG90, LCD I2C y Web Serial API.' },
  { r: 'INTEGRANTE 4', title: 'Cloud & Operaciones', desc: 'Aprovisionamiento de VM en Azure, Windows Server 2022, instalación de IIS, reglas NSG y resolución DNS.' }
];

team.forEach((tm, idx) => {
  const x = 0.8 + (idx * 2.95);
  slide9.addShape(pptx.ShapeType.roundRect, {
    x: x, y: 1.6, w: 2.8, h: 5.0, r: 0.12,
    fill: { color: C_CARD_BG }, line: { color: C_AZURE, width: 1.2 }
  });

  slide9.addText([
    { text: `${tm.r}\n\n`, options: { bold: true, color: C_AZURE, fontSize: 12 } },
    { text: `${tm.title}\n\n`, options: { bold: true, color: C_WHITE, fontSize: 13 } },
    { text: tm.desc, options: { color: C_GRAY, fontSize: 11.5 } }
  ], { x: x + 0.15, y: 1.8, w: 2.5, h: 4.4, fontFace: 'Segoe UI' });
});

slide9.addNotes('MINUTOS 10:00 A 13:00 - Cada integrante expone su rol y demuestra conocimiento transversal de la solución completa para obtener los 5 puntos de participación individual.');

// -----------------------------------------------------------------------------
// SLIDE 10: CONCLUSIONES & CIERRE
// -----------------------------------------------------------------------------
const slide10 = pptx.addSlide();
addSlideHeader(slide10, '9. CONCLUSIONES & CIERRE DE LA DEFENSA', 'Minuto 13:00 - 15:00 · Conclusiones');

slide10.addShape(pptx.ShapeType.roundRect, {
  x: 0.8, y: 1.6, w: 11.7, h: 5.0, r: 0.15,
  fill: { color: C_CARD_BG }, line: { color: C_EMERALD, width: 1.5 }
});

slide10.addText([
  { text: 'PRINCIPALES LOGROS Y APRENDIZAJES:\n\n', options: { bold: true, color: C_EMERALD, fontSize: 15 } },
  { text: '• Convergencia Exitosa Cloud-IoT:\n', options: { bold: true, color: C_WHITE, fontSize: 13 } },
  { text: 'Se articuló un microcontrolador de bajo costo (Arduino UNO R3) con servicios cloud profesionales en Microsoft Azure.\n\n', options: { color: C_GRAY, fontSize: 12 } },
  { text: '• Desacoplamiento y Alta Mantenibilidad:\n', options: { bold: true, color: C_WHITE, fontSize: 13 } },
  { text: 'La arquitectura por capas garantizó que el hardware pueda operar autónomamente ante contingencias de red.\n\n', options: { color: C_GRAY, fontSize: 12 } },
  { text: '• 100% Cumplimiento de la Rúbrica Oficial:\n', options: { bold: true, color: C_WHITE, fontSize: 13 } },
  { text: 'Todos los requisitos de software, hardware, CRUD, seguridad y despliegue fueron verificados y auditados.\n\n', options: { color: C_GRAY, fontSize: 12 } },
  { text: '• Enlaces del Proyecto:\n', options: { bold: true, color: C_AZURE, fontSize: 13 } },
  { text: 'GitHub: https://github.com/PaulFL808/INTELIGEMENTE-ESTACIONADO\nSitio Azure: http://aurasmartparking.eastus.cloudapp.azure.com\n\n', options: { color: C_WHITE, fontSize: 11.5 } },
  { text: '¡Muchas Gracias! Quedamos atentos a las preguntas de la Comisión Evaluadora.', options: { bold: true, color: C_EMERALD, fontSize: 14 } }
], { x: 1.1, y: 1.9, w: 11.1, h: 4.4, fontFace: 'Segoe UI' });

slide10.addNotes('MINUTOS 13:00 A 15:00 - Cierre formal de la exposición, agradecimiento a la comisión y apertura para la ronda de preguntas técnicas.');

// Export to PPTX
const outputPath = path.resolve('Presentacion_AURA_SmartParking_Azure.pptx');
pptx.writeFile({ fileName: outputPath })
  .then(fileName => {
    console.log(`[OK] Presentación generada exitosamente en: ${fileName}`);
  })
  .catch(err => {
    console.error('[ERROR] Error al generar presentación:', err);
  });
