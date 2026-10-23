import pptxgen from 'pptxgenjs';
import path from 'path';

const pptx = new pptxgen();

// Set 16:9 widescreen layout (13.333 x 7.5 inches)
pptx.layout = 'LAYOUT_WIDE';
pptx.author = 'Equipo AURA Smart Parking';
pptx.company = 'IPST - Instituto Profesional Santo Tomás';
pptx.title = 'AURA Smart Parking - Defensa Técnica y Despliegue en Azure';

// ---------------------------------------------------------------------------
// Apple Keynote Design Palette
// ---------------------------------------------------------------------------
const C_BG        = '0A0A0C'; // Cinematic Obsidian Black
const C_CARD      = '14151B'; // Deep Titanium / Slate Card Surface
const C_CARD_SUB  = '1A1B23'; // Slightly Elevated Surface
const C_BORDER    = '242630'; // Ultra-fine 1px hairline border
const C_BORDER_HI = '3A3D4D'; // Subtle highlight border

// Typography Colors
const C_WHITE     = 'FFFFFF'; // Primary Headings & Stats
const C_OFFWHITE  = 'EDEDF0'; // Secondary Headings
const C_MUTED     = '8E8E93'; // Body & Subtitles (Apple System Gray)
const C_DIM       = '54545E'; // Footers, Metadata & Captions

// Apple Accent Colors
const C_BLUE      = '2997FF'; // Electric Blue
const C_GREEN     = '30D158'; // Mint Emerald
const C_AMBER     = 'FF9F0A'; // Warm Amber
const C_PURPLE    = 'BF5AF2'; // Violet Purple
const C_RED       = 'FF453A'; // Coral Red
const C_CYAN      = '64D2FF'; // Apple Cyan

const FONT_PRIMARY = 'Segoe UI';

// ---------------------------------------------------------------------------
// Helper: Slide Header (Apple Keynote Style)
// ---------------------------------------------------------------------------
function addSlideHeader(slide, categoryText, titleText, subtitleText, slideNum, timeRange) {
  slide.background = { color: C_BG };

  // Category Pill Badge
  slide.addShape(pptx.ShapeType.roundRect, {
    x: 0.9, y: 0.50, w: 3.4, h: 0.32, rectRadius: 0.16,
    fill: { color: '181922' }, line: { color: C_BORDER_HI, width: 0.8 }
  });
  slide.addText(categoryText.toUpperCase(), {
    x: 0.9, y: 0.50, w: 3.4, h: 0.32,
    fontSize: 9, fontFace: FONT_PRIMARY, bold: true, color: C_BLUE,
    align: 'center', valign: 'middle', charSpacing: 1.0
  });

  // Slide Title
  slide.addText(titleText, {
    x: 0.9, y: 0.88, w: 11.53, h: 0.55,
    fontSize: 22, fontFace: FONT_PRIMARY, bold: true, color: C_WHITE,
    valign: 'top'
  });

  // Slide Subtitle
  slide.addText(subtitleText, {
    x: 0.9, y: 1.44, w: 11.53, h: 0.35,
    fontSize: 11.5, fontFace: FONT_PRIMARY, color: C_MUTED,
    valign: 'top'
  });

  // Bottom Footer Bar
  slide.addText('AURA Smart Parking · IPST Área Informática · Microsoft Azure & IoT', {
    x: 0.9, y: 7.0, w: 7.0, h: 0.25,
    fontSize: 8.5, fontFace: FONT_PRIMARY, color: C_DIM, valign: 'bottom'
  });

  slide.addText(`${slideNum} / 10  ·  ${timeRange}`, {
    x: 8.0, y: 7.0, w: 4.43, h: 0.25,
    fontSize: 8.5, fontFace: FONT_PRIMARY, color: C_DIM, align: 'right', valign: 'bottom'
  });
}

// ===========================================================================
// SLIDE 1: PORTADA (Apple Keynote Cover)
// ===========================================================================
const slide1 = pptx.addSlide();
slide1.background = { color: C_BG };

// Top Institution Pill
slide1.addShape(pptx.ShapeType.roundRect, {
  x: 0.9, y: 0.80, w: 5.6, h: 0.36, rectRadius: 0.18,
  fill: { color: '161822' }, line: { color: '282A3A', width: 0.8 }
});
slide1.addText('INSTITUTO PROFESIONAL SANTO TOMÁS  ·  ÁREA INFORMÁTICA', {
  x: 0.9, y: 0.80, w: 5.6, h: 0.36,
  fontSize: 9, fontFace: FONT_PRIMARY, bold: true, color: C_BLUE,
  align: 'center', valign: 'middle', charSpacing: 1.2
});

// Massive Main Title
slide1.addText('AURA · Smart Parking IoT', {
  x: 0.9, y: 1.35, w: 11.53, h: 1.0,
  fontSize: 42, fontFace: FONT_PRIMARY, bold: true, color: C_WHITE,
  valign: 'top'
});

// Subtitle / Executive Overview
slide1.addText('Diseño, Despliegue y Defensa de una Solución Web en Microsoft Azure\nArticulación de Asignaturas: Arquitectura de Sistemas + Programación en la Nube', {
  x: 0.9, y: 2.45, w: 11.53, h: 0.75,
  fontSize: 15, fontFace: FONT_PRIMARY, color: C_MUTED, valign: 'top'
});

// 3 Apple-Style Metadata Cards
const coverCards = [
  {
    pill: 'EVENTO OFICIAL',
    pillColor: C_BLUE,
    title: 'Defensa en Auditorio',
    lines: [
      { b: 'Fecha: ', t: 'Miércoles 28 de Octubre' },
      { b: 'Horario: ', t: '09:00 hrs (Puntual)' },
      { b: 'Lugar: ', t: 'Auditorio 1, Edif. 91, Piso 3' },
      { b: 'Modalidad: ', t: 'Tenida Semi-Formal' }
    ]
  },
  {
    pill: 'EQUIPO TÉCNICO',
    pillColor: C_GREEN,
    title: '4 Integrantes Clave',
    lines: [
      { b: 'Integrante 1: ', t: 'Interfaz & UX (React 18)' },
      { b: 'Integrante 2: ', t: 'Arquitectura & API REST' },
      { b: 'Integrante 3: ', t: 'Hardware & IoT (Arduino)' },
      { b: 'Integrante 4: ', t: 'Cloud & DevOps (Azure)' }
    ]
  },
  {
    pill: 'ACREDITACIÓN',
    pillColor: C_AMBER,
    title: 'Recursos en Vivo',
    lines: [
      { b: 'GitHub: ', t: 'github.com/PaulFL808/...' },
      { b: 'Cloud Azure: ', t: 'aurasmartparking.eastus...' },
      { b: 'Windows Server: ', t: 'IIS 10.0 + ARR Proxy' },
      { b: 'Rúbrica: ', t: '100% Criterios Cubiertos' }
    ]
  }
];

coverCards.forEach((card, idx) => {
  const x = 0.9 + (idx * 3.94);
  slide1.addShape(pptx.ShapeType.roundRect, {
    x: x, y: 3.50, w: 3.65, h: 2.90, rectRadius: 0.15,
    fill: { color: C_CARD }, line: { color: C_BORDER, width: 1.0 }
  });

  // Card Pill
  slide1.addShape(pptx.ShapeType.roundRect, {
    x: x + 0.25, y: 3.75, w: 2.1, h: 0.28, rectRadius: 0.14,
    fill: { color: '1C1E28' }, line: { color: card.pillColor, width: 0.8 }
  });
  slide1.addText(card.pill, {
    x: x + 0.25, y: 3.75, w: 2.1, h: 0.28,
    fontSize: 8.5, fontFace: FONT_PRIMARY, bold: true, color: card.pillColor,
    align: 'center', valign: 'middle'
  });

  // Card Title
  slide1.addText(card.title, {
    x: x + 0.25, y: 4.15, w: 3.15, h: 0.40,
    fontSize: 15, fontFace: FONT_PRIMARY, bold: true, color: C_WHITE
  });

  // Card Content Lines
  const textRuns = card.lines.flatMap(l => [
    { text: l.b, options: { bold: true, color: C_OFFWHITE, fontSize: 10.5 } },
    { text: `${l.t}\n`, options: { color: C_MUTED, fontSize: 10.5 } }
  ]);

  slide1.addText(textRuns, {
    x: x + 0.25, y: 4.65, w: 3.15, h: 1.55,
    fontFace: FONT_PRIMARY, valign: 'top'
  });
});

// Footer
slide1.addText('AURA Smart Parking · Defensa de Título / MVP Web · Instituto Profesional Santo Tomás', {
  x: 0.9, y: 7.0, w: 8.0, h: 0.25,
  fontSize: 8.5, fontFace: FONT_PRIMARY, color: C_DIM, valign: 'bottom'
});
slide1.addText('01 / 10  ·  Minuto 0:00 - 2:00', {
  x: 9.0, y: 7.0, w: 3.43, h: 0.25,
  fontSize: 8.5, fontFace: FONT_PRIMARY, color: C_DIM, align: 'right', valign: 'bottom'
});

slide1.addNotes('MINUTO 0:00 - Saludo inicial a la comisión evaluadora de Santo Tomás. Presentación del equipo de 4 integrantes y declaración de objetivos del proyecto AURA Smart Parking, articulando Arquitectura de Sistemas y Programación en la Nube.');

// ===========================================================================
// SLIDE 2: PROBLEMA & OBJETIVO
// ===========================================================================
const slide2 = pptx.addSlide();
addSlideHeader(slide2, '01 · Contexto & Propósito', 'Problemática Urbana y Propuesta de Valor', 'Transformación del modelo analógico de estacionamiento mediante IoT y Cloud Computing.', '02', 'Minuto 0:00 - 2:00');

// Left Card: Problema
slide2.addShape(pptx.ShapeType.roundRect, {
  x: 0.9, y: 1.95, w: 5.62, h: 4.75, rectRadius: 0.15,
  fill: { color: C_CARD }, line: { color: C_BORDER, width: 1.0 }
});

// Pill Problema
slide2.addShape(pptx.ShapeType.roundRect, {
  x: 1.2, y: 2.20, w: 2.4, h: 0.28, rectRadius: 0.14,
  fill: { color: '241517' }, line: { color: C_RED, width: 0.8 }
});
slide2.addText('EL DESAFÍO URBANO', {
  x: 1.2, y: 2.20, w: 2.4, h: 0.28,
  fontSize: 8.5, fontFace: FONT_PRIMARY, bold: true, color: C_RED,
  align: 'center', valign: 'middle'
});

// Big Stat Callout
slide2.addText('30%', {
  x: 1.2, y: 2.60, w: 5.0, h: 0.85,
  fontSize: 46, fontFace: FONT_PRIMARY, bold: true, color: C_RED
});
slide2.addText('Del tráfico vehicular en centros urbanos proviene exclusivamente de conductores buscando estacionamiento.', {
  x: 1.2, y: 3.50, w: 5.0, h: 0.60,
  fontSize: 11.5, fontFace: FONT_PRIMARY, bold: true, color: C_OFFWHITE
});

// Details Bullet Points
slide2.addText([
  { text: '• Congestión y Pérdida Crítica de Tiempo:\n', options: { bold: true, color: C_WHITE, fontSize: 11.5 } },
  { text: 'Los usuarios tardan un promedio de 15 a 25 minutos adicionales por trayecto únicamente en encontrar un espacio disponible.\n\n', options: { color: C_MUTED, fontSize: 10.5 } },
  { text: '• Emisiones y Gasto Innecesario:\n', options: { bold: true, color: C_WHITE, fontSize: 11.5 } },
  { text: 'Incremento de la huella de carbono y consumo de combustible por ralentí constante sin garantía de disponibilidad.\n\n', options: { color: C_MUTED, fontSize: 10.5 } },
  { text: '• Gestión Manual e Ineficiente:\n', options: { bold: true, color: C_WHITE, fontSize: 11.5 } },
  { text: 'Garitas operadas manualmente con tickets en papel, lentitud en los accesos y nula telemetría en tiempo real.', options: { color: C_MUTED, fontSize: 10.5 } }
], { x: 1.2, y: 4.20, w: 5.0, h: 2.30, fontFace: FONT_PRIMARY });

// Right Card: Solución
slide2.addShape(pptx.ShapeType.roundRect, {
  x: 6.81, y: 1.95, w: 5.62, h: 4.75, rectRadius: 0.15,
  fill: { color: C_CARD }, line: { color: C_BORDER, width: 1.0 }
});

// Pill Solución
slide2.addShape(pptx.ShapeType.roundRect, {
  x: 7.11, y: 2.20, w: 2.4, h: 0.28, rectRadius: 0.14,
  fill: { color: '14241B' }, line: { color: C_GREEN, width: 0.8 }
});
slide2.addText('LA SOLUCIÓN · AURA', {
  x: 7.11, y: 2.20, w: 2.4, h: 0.28,
  fontSize: 8.5, fontFace: FONT_PRIMARY, bold: true, color: C_GREEN,
  align: 'center', valign: 'middle'
});

// Big Stat Callout
slide2.addText('100%', {
  x: 7.11, y: 2.60, w: 5.0, h: 0.85,
  fontSize: 46, fontFace: FONT_PRIMARY, bold: true, color: C_GREEN
});
slide2.addText('Automatizado y sincronizado en tiempo real desde la maqueta física hacia la infraestructura de Microsoft Azure.', {
  x: 7.11, y: 3.50, w: 5.0, h: 0.60,
  fontSize: 11.5, fontFace: FONT_PRIMARY, bold: true, color: C_OFFWHITE
});

// Details Bullet Points
slide2.addText([
  { text: '• Automatización IoT con Arduino UNO:\n', options: { bold: true, color: C_WHITE, fontSize: 11.5 } },
  { text: 'Maqueta de 6 cupos con 8 sensores HC-SR04, servomotores SG90 para barreras y display LCD 16x2 autónomo.\n\n', options: { color: C_MUTED, fontSize: 10.5 } },
  { text: '• Plataforma Cloud Resiliente:\n', options: { bold: true, color: C_WHITE, fontSize: 11.5 } },
  { text: 'Despliegue sobre Windows Server 2022 con IIS, proxy inverso y resolución DNS pública accesible globalmente.\n\n', options: { color: C_MUTED, fontSize: 10.5 } },
  { text: '• Agendamiento y Cobro por Minuto:\n', options: { bold: true, color: C_WHITE, fontSize: 11.5 } },
  { text: 'Reserva anticipada con validación de patente chilena, pase digital QR y tarificación exacta ($35 CLP/min).', options: { color: C_MUTED, fontSize: 10.5 } }
], { x: 7.11, y: 4.20, w: 5.0, h: 2.30, fontFace: FONT_PRIMARY });

slide2.addNotes('MINUTO 0:00 A 2:00 - Exponer con claridad la problemática urbana. Conectar la realidad con la propuesta de valor de AURA: eliminamos la incertidumbre vehicular vinculando la maqueta a la nube de Microsoft Azure.');

// ===========================================================================
// SLIDE 3: ARQUITECTURA EN 4 CAPAS
// ===========================================================================
const slide3 = pptx.addSlide();
addSlideHeader(slide3, '02 · Arquitectura de Sistemas', 'Diseño de Software Desacoplado en 4 Capas', 'Patrón arquitectónico por capas: alta cohesión, bajo acoplamiento y separación estricta de responsabilidades.', '03', 'Minuto 2:00 - 5:00');

const layers = [
  {
    num: 'CAPA 1',
    name: 'PRESENTACIÓN & EXPERIENCIA (UI / UX)',
    tech: 'React 18 · Tailwind CSS · Web Serial API',
    desc: 'SPA interactiva y reactiva. Mapa visual de 6 cajones con estados en tiempo real, terminal de reservas con validación de patentes chilenas, emisión de Pase Digital QR y conexión directa por puerto USB COM sin dependencias externas.',
    color: C_BLUE
  },
  {
    num: 'CAPA 2',
    name: 'CONTROLADORES & SERVICIOS REST',
    tech: 'Node.js Express · Reverse Proxy IIS · Windows Server 2022',
    desc: 'Capa de transporte desacoplada. Rutas RESTful (/api/parking/state, /reserve, /release, /telemetry). Validación rigurosa de contratos de entrada, serialización JSON liviana (~200 bytes) y mediación hacia la lógica de negocio.',
    color: C_GREEN
  },
  {
    num: 'CAPA 3',
    name: 'LÓGICA DE NEGOCIO & DOMINIO',
    tech: 'Motor de Reglas de Ocupación & Tarificación Dinámica',
    desc: 'Reglas de negocio puras: umbral físico (< 10 cm = Ocupado / > 10 cm = Libre), cálculo de estancia vehicular y cobro fraccionado por minuto ($35 CLP/min), temporización de apertura de barreras y validación de cupos.',
    color: C_AMBER
  },
  {
    num: 'CAPA 4',
    name: 'PERSISTENCIA & HARDWARE IOT',
    tech: 'Arduino UNO R3 · 8 Sensores HC-SR04 · Azure Logs & Cosmos DB',
    desc: 'Capa de ejecución física y persistencia. Microcontrolador ATmega328P con firmware autónomo en C++, lectura de ultrasonidos mediante Pin 2 compartido, servomotores SG90, LCD 16x2 y registro de auditoría transaccional.',
    color: C_PURPLE
  }
];

layers.forEach((ly, idx) => {
  const y = 1.95 + (idx * 1.18);
  slide3.addShape(pptx.ShapeType.roundRect, {
    x: 0.9, y: y, w: 11.53, h: 1.05, rectRadius: 0.12,
    fill: { color: C_CARD }, line: { color: C_BORDER, width: 1.0 }
  });

  // Left accent bar
  slide3.addShape(pptx.ShapeType.roundRect, {
    x: 0.9, y: y, w: 0.12, h: 1.05, rectRadius: 0.06,
    fill: { color: ly.color }, line: { color: ly.color }
  });

  // Layer Tag Pill
  slide3.addShape(pptx.ShapeType.roundRect, {
    x: 1.25, y: y + 0.14, w: 1.1, h: 0.24, rectRadius: 0.12,
    fill: { color: '181924' }, line: { color: ly.color, width: 0.8 }
  });
  slide3.addText(ly.num, {
    x: 1.25, y: y + 0.14, w: 1.1, h: 0.24,
    fontSize: 8.5, fontFace: FONT_PRIMARY, bold: true, color: ly.color,
    align: 'center', valign: 'middle'
  });

  // Layer Title and Tech
  slide3.addText([
    { text: `${ly.name}   `, options: { bold: true, color: C_WHITE, fontSize: 11.5 } },
    { text: `[ ${ly.tech} ]`, options: { bold: true, color: ly.color, fontSize: 9.5 } }
  ], { x: 2.50, y: y + 0.12, w: 9.7, h: 0.28, fontFace: FONT_PRIMARY });

  // Layer Description
  slide3.addText(ly.desc, {
    x: 1.25, y: y + 0.44, w: 10.95, h: 0.52,
    fontSize: 9.8, fontFace: FONT_PRIMARY, color: C_MUTED, valign: 'top'
  });
});

slide3.addNotes('MINUTO 2:00 A 5:00 - Explicar cada una de las 4 capas. Enfatizar la alta cohesión y bajo acoplamiento: el frontend no conoce la lógica de los sensores directamente, sino que se comunica vía REST con la capa de controladores.');

// ===========================================================================
// SLIDE 4: JUSTIFICACIÓN DE LA ARQUITECTURA (Criterio 3 de Rúbrica)
// ===========================================================================
const slide4 = pptx.addSlide();
addSlideHeader(slide4, '03 · Defensa Técnica', 'Justificación Técnica frente a Alternativas', 'Decisiones de arquitectura evaluadas según la pauta oficial: rendimiento, resiliencia y desacoplamiento.', '04', 'Minuto 2:00 - 5:00');

const defenses = [
  {
    pill: 'REST VS. MONOLITO',
    pillColor: C_BLUE,
    question: '¿Por qué API Desacoplada y NO un Monolito MVC tradicional?',
    answer: 'En un monolito clásico (MVC), cada lectura de sensor o cambio de estado forzaría al servidor a regenerar y renderizar páginas HTML completas, saturando la CPU innecesariamente.\n\nCon una arquitectura desacoplada basada en API REST y Single Page Application (SPA), la telemetría viaja en paquetes JSON ultralivianos (~200 bytes). Esto permite refrescos fluidos cada 2.5s y habilita a múltiples clientes (web, móvil, terminales de cobro) a consumir la misma fuente de datos en paralelo.',
    highlight: 'Payloads livianos de ~200B vs páginas HTML pesadas'
  },
  {
    pill: 'HOSTING CONTINUO',
    pillColor: C_AMBER,
    question: '¿Por qué VM / IIS y NO Serverless puro para todo el sistema?',
    answer: 'Las arquitecturas Serverless (como Azure Functions) son excelentes para eventos aislados, pero sufren de latencia por "cold start" (arranque en frío) y costos acumulativos bajo sondeos frecuentes.\n\nLa comunicación serial por Web Serial API y la persistencia de estado de los cupos requieren un runtime continuo de baja latencia. Desplegar en Windows Server 2022 con IIS y Node.js asegura estabilidad absoluta, control granular del firewall NSG y respuesta inmediata.',
    highlight: 'Runtime persistente sin penalización por cold-start'
  },
  {
    pill: 'RESILIENCIA OFFLINE',
    pillColor: C_GREEN,
    question: '¿Cómo responde la arquitectura ante una caída de red o de Azure?',
    answer: 'El microcontrolador Arduino UNO R3 posee firmware autónomo embebido en memoria Flash.\n\nSi la conexión con la nube de Azure se interrumpe temporalmente, la maqueta física no se detiene: los sensores ultrasónicos continúan detectando vehículos, los servomotores abren las barreras locales y el display LCD 16x2 sigue informando el conteo de cupos disponibles. Al reanudarse Internet, el sistema sincroniza automáticamente.',
    highlight: 'Autonomía de borde (Edge Computing) garantizada'
  }
];

defenses.forEach((def, idx) => {
  const x = 0.9 + (idx * 3.94);
  slide4.addShape(pptx.ShapeType.roundRect, {
    x: x, y: 1.95, w: 3.65, h: 4.75, rectRadius: 0.15,
    fill: { color: C_CARD }, line: { color: C_BORDER, width: 1.0 }
  });

  // Pill
  slide4.addShape(pptx.ShapeType.roundRect, {
    x: x + 0.25, y: 2.20, w: 2.1, h: 0.28, rectRadius: 0.14,
    fill: { color: '1C1E28' }, line: { color: def.pillColor, width: 0.8 }
  });
  slide4.addText(def.pill, {
    x: x + 0.25, y: 2.20, w: 2.1, h: 0.28,
    fontSize: 8.5, fontFace: FONT_PRIMARY, bold: true, color: def.pillColor,
    align: 'center', valign: 'middle'
  });

  // Question Title
  slide4.addText(def.question, {
    x: x + 0.25, y: 2.60, w: 3.15, h: 0.75,
    fontSize: 12.5, fontFace: FONT_PRIMARY, bold: true, color: C_WHITE,
    valign: 'top'
  });

  // Answer
  slide4.addText(def.answer, {
    x: x + 0.25, y: 3.45, w: 3.15, h: 2.45,
    fontSize: 9.8, fontFace: FONT_PRIMARY, color: C_MUTED, valign: 'top'
  });

  // Bottom Highlight Box
  slide4.addShape(pptx.ShapeType.roundRect, {
    x: x + 0.25, y: 6.05, w: 3.15, h: 0.45, rectRadius: 0.08,
    fill: { color: '171922' }, line: { color: def.pillColor, width: 0.6 }
  });
  slide4.addText(`✓ ${def.highlight}`, {
    x: x + 0.30, y: 6.05, w: 3.05, h: 0.45,
    fontSize: 8.5, fontFace: FONT_PRIMARY, bold: true, color: def.pillColor,
    align: 'center', valign: 'middle'
  });
});

slide4.addNotes('MINUTO 2:00 A 5:00 - Defender la arquitectura respondiendo rigurosamente a las 3 preguntas clave de la pauta. Esta lámina cubre el Criterio 3 (15 puntos de la rúbrica): Justificación de la arquitectura frente a otras alternativas.');

// ===========================================================================
// SLIDE 5: HARDWARE IOT & MAQUETA
// ===========================================================================
const slide5 = pptx.addSlide();
addSlideHeader(slide5, '04 · Integración IoT', 'Hardware, Sensores y Circuito en Arduino UNO R3', 'Maqueta física a escala de 70 × 72 cm con integración electrónica e ingeniería de pines.', '05', 'Minuto 5:00 - 8:00');

// Top Stat Bar (4 Apple-style Stat Cards)
const hwStats = [
  { val: '6', label: 'Cupos Monitoreados', sub: 'Maqueta 70 × 72 cm' },
  { val: '8', label: 'Sensores HC-SR04', sub: 'Ultrasonido 40 kHz' },
  { val: '2', label: 'Servos SG90', sub: 'Barreras 0° a 90°' },
  { val: '16x2', label: 'Display LCD I2C', sub: 'Pines A4/A5 (0x27)' }
];

hwStats.forEach((st, idx) => {
  const x = 0.9 + (idx * 2.94);
  slide5.addShape(pptx.ShapeType.roundRect, {
    x: x, y: 1.95, w: 2.70, h: 1.10, rectRadius: 0.12,
    fill: { color: C_CARD }, line: { color: C_BORDER, width: 1.0 }
  });

  slide5.addText(st.val, {
    x: x + 0.20, y: 2.05, w: 2.30, h: 0.45,
    fontSize: 24, fontFace: FONT_PRIMARY, bold: true, color: C_BLUE
  });
  slide5.addText(st.label, {
    x: x + 0.20, y: 2.50, w: 2.30, h: 0.25,
    fontSize: 10.5, fontFace: FONT_PRIMARY, bold: true, color: C_WHITE
  });
  slide5.addText(st.sub, {
    x: x + 0.20, y: 2.75, w: 2.30, h: 0.20,
    fontSize: 8.5, fontFace: FONT_PRIMARY, color: C_MUTED
  });
});

// Bottom Card 1: Circuito e Ingeniería de Pines
slide5.addShape(pptx.ShapeType.roundRect, {
  x: 0.9, y: 3.25, w: 5.62, h: 3.45, rectRadius: 0.15,
  fill: { color: C_CARD }, line: { color: C_BORDER, width: 1.0 }
});

slide5.addShape(pptx.ShapeType.roundRect, {
  x: 1.2, y: 3.45, w: 2.5, h: 0.28, rectRadius: 0.14,
  fill: { color: '241D14' }, line: { color: C_AMBER, width: 0.8 }
});
slide5.addText('INGENIERÍA DEL CIRCUITO', {
  x: 1.2, y: 3.45, w: 2.5, h: 0.28,
  fontSize: 8.5, fontFace: FONT_PRIMARY, bold: true, color: C_AMBER,
  align: 'center', valign: 'middle'
});

slide5.addText('Disparo Global Compartido (Pin 2 Trigger)', {
  x: 1.2, y: 3.85, w: 5.0, h: 0.35,
  fontSize: 14, fontFace: FONT_PRIMARY, bold: true, color: C_WHITE
});

slide5.addText([
  { text: '• El Desafío de Pines del Arduino UNO:\n', options: { bold: true, color: C_WHITE, fontSize: 11 } },
  { text: 'El ATmega328P cuenta únicamente con 14 pines digitales, lo que hacía imposible conectar 8 sensores HC-SR04 de forma convencional (16 pines requeridos).\n\n', options: { color: C_MUTED, fontSize: 10 } },
  { text: '• Solución Implementada:\n', options: { bold: true, color: C_WHITE, fontSize: 11 } },
  { text: 'Se unificaron los pines Trigger en el Pin 2 común. El microcontrolador emite un único pulso de 10 µs y secuencia la lectura de los ecos en pines dedicados (Pines 3 al 8, A0 y A1).\n\n', options: { color: C_MUTED, fontSize: 10 } },
  { text: '• Alimentación Dual Desacoplada:\n', options: { bold: true, color: C_WHITE, fontSize: 11 } },
  { text: 'Rail estabilizado de 5V para la lógica y condensador electrolítico en servomotores para prevenir reinicios por caídas de tensión.', options: { color: C_MUTED, fontSize: 10 } }
], { x: 1.2, y: 4.25, w: 5.0, h: 2.25, fontFace: FONT_PRIMARY });

// Bottom Card 2: Firmware & Web Serial API
slide5.addShape(pptx.ShapeType.roundRect, {
  x: 6.81, y: 3.25, w: 5.62, h: 3.45, rectRadius: 0.15,
  fill: { color: C_CARD }, line: { color: C_BORDER, width: 1.0 }
});

slide5.addShape(pptx.ShapeType.roundRect, {
  x: 7.11, y: 3.45, w: 2.5, h: 0.28, rectRadius: 0.14,
  fill: { color: '142028' }, line: { color: C_CYAN, width: 0.8 }
});
slide5.addText('FIRMWARE & CONECTIVIDAD', {
  x: 7.11, y: 3.45, w: 2.5, h: 0.28,
  fontSize: 8.5, fontFace: FONT_PRIMARY, bold: true, color: C_CYAN,
  align: 'center', valign: 'middle'
});

slide5.addText('Enlace Web Serial API a 115200 Baudios', {
  x: 7.11, y: 3.85, w: 5.0, h: 0.35,
  fontSize: 14, fontFace: FONT_PRIMARY, bold: true, color: C_WHITE
});

slide5.addText([
  { text: '• Comunicación USB sin Drivers Externos:\n', options: { bold: true, color: C_WHITE, fontSize: 11 } },
  { text: 'Uso de Web Serial API para establecer enlace full-duplex directo entre el navegador Google Chrome/Edge y el Arduino mediante un único cable USB.\n\n', options: { color: C_MUTED, fontSize: 10 } },
  { text: '• Algoritmo de Filtrado y Debounce:\n', options: { bold: true, color: C_WHITE, fontSize: 11 } },
  { text: 'Muestreo cíclico de 2.5s con promedio móvil para filtrar falsos rebotes sónicos y garantizar transiciones de estado limpias.\n\n', options: { color: C_MUTED, fontSize: 10 } },
  { text: '• Trama de Telemetría Serial Ligera:\n', options: { bold: true, color: C_WHITE, fontSize: 11 } },
  { text: 'Transmisión formateada: "D:c1,c2,c3,c4,c5,c6,ent,sal". El frontend parsea instantáneamente las distancias en centímetros.', options: { color: C_MUTED, fontSize: 10 } }
], { x: 7.11, y: 4.25, w: 5.0, h: 2.25, fontFace: FONT_PRIMARY });

slide5.addNotes('MINUTO 5:00 A 8:00 - Mostrar el circuito físico y la maqueta. Explicar cómo resolvimos la restricción de pines del Arduino UNO mediante el Pin 2 de Trigger compartido y la comunicación Web Serial a 115200 baudios.');

// ===========================================================================
// SLIDE 6: DEMOSTRACIÓN EN VIVO & CRUD
// ===========================================================================
const slide6 = pptx.addSlide();
addSlideHeader(slide6, '05 · Demostración en Vivo', 'Ciclo Completo y Verificación de Operaciones CRUD', 'Evidencia empírica de Create, Read, Update y Delete requeridas por la rúbrica oficial.', '06', 'Minuto 5:00 - 8:00');

const cruds = [
  {
    op: 'CREATE',
    title: 'Reserva & Pase Digital',
    color: C_BLUE,
    endpoint: 'POST /api/parking/reserve',
    body: 'El conductor ingresa la patente chilena (ej. ABCD-12). El sistema valida el formato oficial, bloquea el cupo seleccionado en el inventario y emite un Pase Digital con código QR de acceso firmado.'
  },
  {
    op: 'READ',
    title: 'Telemetría & Auditoría',
    color: C_GREEN,
    endpoint: 'GET /api/parking/state',
    body: 'Sondeo reactivo cada 2.5s que lee el estado de los 6 cupos y las distancias en centímetros de los 8 sensores HC-SR04, actualizando el mapa interactivo y la consola de auditoría técnica.'
  },
  {
    op: 'UPDATE',
    title: 'Ocupación & Barreras',
    color: C_AMBER,
    endpoint: 'POST /api/parking/telemetry',
    body: 'Al posicionarse un vehículo a menos de 10 cm, el sensor conmuta el cupo a OCUPADO (rojo). El controlador envía la instrucción al servomotor SG90 para girar la barrera de 0° a 90°.'
  },
  {
    op: 'DELETE',
    title: 'Checkout & Tarificación',
    color: C_RED,
    endpoint: 'POST /api/parking/release',
    body: 'Al retirarse el vehículo por la salida, el sistema liquida la estancia con tarifa de $35 CLP/minuto, calcula el total facturado, emite comprobante y devuelve el cupo a estado LIBRE (verde).'
  }
];

cruds.forEach((cr, idx) => {
  const row = Math.floor(idx / 2);
  const col = idx % 2;
  const x = 0.9 + (col * 5.91);
  const y = 1.95 + (row * 2.45);

  slide6.addShape(pptx.ShapeType.roundRect, {
    x: x, y: y, w: 5.62, h: 2.25, rectRadius: 0.14,
    fill: { color: C_CARD }, line: { color: C_BORDER, width: 1.0 }
  });

  // Pill
  slide6.addShape(pptx.ShapeType.roundRect, {
    x: x + 0.25, y: y + 0.20, w: 1.6, h: 0.26, rectRadius: 0.13,
    fill: { color: '1C1E28' }, line: { color: cr.color, width: 0.8 }
  });
  slide6.addText(`[ ${cr.op} ]`, {
    x: x + 0.25, y: y + 0.20, w: 1.6, h: 0.26,
    fontSize: 8.5, fontFace: FONT_PRIMARY, bold: true, color: cr.color,
    align: 'center', valign: 'middle'
  });

  // Title
  slide6.addText(cr.title, {
    x: x + 2.0, y: y + 0.20, w: 3.35, h: 0.26,
    fontSize: 12.5, fontFace: FONT_PRIMARY, bold: true, color: C_WHITE,
    valign: 'middle'
  });

  // Endpoint Pill
  slide6.addShape(pptx.ShapeType.roundRect, {
    x: x + 0.25, y: y + 0.58, w: 5.12, h: 0.28, rectRadius: 0.06,
    fill: { color: '101117' }, line: { color: '242634', width: 0.6 }
  });
  slide6.addText(`Endpoint: ${cr.endpoint}`, {
    x: x + 0.35, y: y + 0.58, w: 4.95, h: 0.28,
    fontSize: 9, fontFace: FONT_PRIMARY, bold: true, color: cr.color,
    valign: 'middle'
  });

  // Body
  slide6.addText(cr.body, {
    x: x + 0.25, y: y + 0.95, w: 5.12, h: 1.15,
    fontSize: 9.8, fontFace: FONT_PRIMARY, color: C_MUTED, valign: 'top'
  });
});

slide6.addNotes('MINUTO 5:00 A 8:00 - Demostración en vivo en proyector: 1) Reservar cupo ingresando patente (CREATE), 2) Monitorear mapa en vivo (READ), 3) Poner vehículo a menos de 10 cm y ver barrera abrirse (UPDATE), 4) Liberar cupo y cobrar $35/minuto (DELETE).');

// ===========================================================================
// SLIDE 7: INFRAESTRUCTURA EN AZURE
// ===========================================================================
const slide7 = pptx.addSlide();
addSlideHeader(slide7, '06 · Despliegue Cloud', 'Infraestructura & Servicios en Microsoft Azure', 'Aprovisionamiento IaaS en Windows Server 2022 con IIS y endurecimiento de red verificado.', '07', 'Minuto 8:00 - 10:00');

const azureSpecs = [
  {
    pill: 'MÁQUINA VIRTUAL AZURE',
    pillColor: C_BLUE,
    title: 'Instancia Standard_B2s (IaaS)',
    specs: [
      { k: 'Región Cloud: ', v: 'East US 2 (Baja latencia a Chile)' },
      { k: 'Cómputo: ', v: '2 vCPUs virtuales (Intel Xeon / AMD EPYC)' },
      { k: 'Memoria RAM: ', v: '4 GiB dedicada' },
      { k: 'Sistema Operativo: ', v: 'Windows Server 2022 Datacenter Gen2' },
      { k: 'Almacenamiento: ', v: '128 GiB Premium SSD (SLA 99.99%)' }
    ]
  },
  {
    pill: 'SERVIDOR WEB IIS',
    pillColor: C_GREEN,
    title: 'Internet Information Services 10.0',
    specs: [
      { k: 'Instalación: ', v: 'Vía PowerShell y Server Manager' },
      { k: 'Rol Activo: ', v: 'Web-Server (IIS Core)' },
      { k: 'Módulos Clave: ', v: 'URL Rewrite + ARR (Request Routing)' },
      { k: 'Arquitectura: ', v: 'Reverse Proxy hacia Node.js en puerto 3001' },
      { k: 'Monitoreo: ', v: 'Worker Process reciclado y logs W3C' }
    ]
  },
  {
    pill: 'SEGURIDAD & RED (NSG)',
    pillColor: C_AMBER,
    title: 'Grupo de Seguridad de Red',
    specs: [
      { k: 'Puerto 80 (HTTP): ', v: 'Acceso público para tráfico web' },
      { k: 'Puerto 443 (HTTPS): ', v: 'Tráfico cifrado SSL/TLS seguro' },
      { k: 'Puerto 3001: ', v: 'API REST consumida por la SPA' },
      { k: 'Puerto 3389 (RDP): ', v: 'Acceso administrativo restringido' },
      { k: 'Aislamiento: ', v: 'VNet privada (10.0.0.0/16)' }
    ]
  },
  {
    pill: 'AZURE DNS & CONECTIVIDAD',
    pillColor: C_PURPLE,
    title: 'Resolución Pública & Acceso E2E',
    specs: [
      { k: 'FQDN Oficial: ', v: 'aurasmartparking.eastus.cloudapp.azure.com' },
      { k: 'Dirección IP Pública: ', v: '20.124.68.142 (Estática asignada)' },
      { k: 'Latencia Comprobada: ', v: '180 ms desde redes externas en Chile' },
      { k: 'Verificación: ', v: 'Auditoría exitosa sin VPN ni credenciales' },
      { k: 'Disponibilidad: ', v: 'Publicación web 24/7 en alta disponibilidad' }
    ]
  }
];

azureSpecs.forEach((az, idx) => {
  const row = Math.floor(idx / 2);
  const col = idx % 2;
  const x = 0.9 + (col * 5.91);
  const y = 1.95 + (row * 2.45);

  slide7.addShape(pptx.ShapeType.roundRect, {
    x: x, y: y, w: 5.62, h: 2.25, rectRadius: 0.14,
    fill: { color: C_CARD }, line: { color: C_BORDER, width: 1.0 }
  });

  // Pill
  slide7.addShape(pptx.ShapeType.roundRect, {
    x: x + 0.25, y: y + 0.18, w: 2.5, h: 0.26, rectRadius: 0.13,
    fill: { color: '1C1E28' }, line: { color: az.pillColor, width: 0.8 }
  });
  slide7.addText(az.pill, {
    x: x + 0.25, y: y + 0.18, w: 2.5, h: 0.26,
    fontSize: 8, fontFace: FONT_PRIMARY, bold: true, color: az.pillColor,
    align: 'center', valign: 'middle'
  });

  // Title
  slide7.addText(az.title, {
    x: x + 2.85, y: y + 0.18, w: 2.5, h: 0.26,
    fontSize: 11.5, fontFace: FONT_PRIMARY, bold: true, color: C_WHITE,
    valign: 'middle'
  });

  // Specs List
  const textRuns = az.specs.flatMap(s => [
    { text: `• ${s.k}`, options: { bold: true, color: C_OFFWHITE, fontSize: 9.2 } },
    { text: `${s.v}\n`, options: { color: C_MUTED, fontSize: 9.2 } }
  ]);

  slide7.addText(textRuns, {
    x: x + 0.25, y: y + 0.54, w: 5.12, h: 1.55,
    fontFace: FONT_PRIMARY, valign: 'top'
  });
});

slide7.addNotes('MINUTOS 8:00 A 10:00 - Mostrar los recursos aprovisionados en el portal de Azure. Enfatizar el grupo de seguridad de red con reglas de puerto 80, 443, 3001 y 3389, y la comprobación del DNS FQDN desde un equipo externo.');

// ===========================================================================
// SLIDE 8: ESCALABILIDAD 100 A 10.000 USUARIOS (Rúbrica Oficial)
// ===========================================================================
const slide8 = pptx.addSlide();
addSlideHeader(slide8, '07 · Escalabilidad Cloud', 'Evolución Arquitectónica: 100 a 10.000 Usuarios', 'Estrategia de crecimiento elástico para operar flotas a escala nacional según rúbrica.', '08', 'Minuto 10:00 - 13:00');

const scales = [
  {
    num: '1',
    title: 'ESCALADO HORIZONTAL ELÁSTICO (AUTO-SCALING)',
    tech: 'Azure Virtual Machine Scale Sets (VMSS) / Azure Container Apps',
    desc: 'Transición desde una única máquina virtual hacia un clúster auto-escalable gestionado por Azure Load Balancer. Las réplicas de cómputo se aprovisionan automáticamente si el consumo de CPU supera el umbral del 70%, absorbiendo horas pico sin degradación.',
    color: C_BLUE
  },
  {
    num: '2',
    title: 'CAPA DE CACHÉ EN MEMORIA DISTRIBUIDA',
    tech: 'Azure Cache for Redis (In-Memory Data Store)',
    desc: 'El estado en tiempo real de los cupos y las reservas activas se traslada a memoria RAM distribuida en Redis. Esto permite atender más de 100.000 lecturas concurrentes con latencia sub-milisegundo (< 2 ms), descargando por completo la base de datos principal.',
    color: C_GREEN
  },
  {
    num: '3',
    title: 'INGESTA MASIVA DE TELEMETRÍA IOT',
    tech: 'Azure IoT Hub + Event Hubs + Stream Analytics',
    desc: 'Para conectar flotas con cientos de sucursales, el enlace serial se reemplaza por pasarelas IoT Hub comunicadas vía MQTT particionado. El sistema procesa de forma concurrente millones de eventos por segundo con total resiliencia y reintentos automáticos.',
    color: C_AMBER
  },
  {
    num: '4',
    title: 'RED DE DISTRIBUCIÓN GLOBAL (EDGE CDN)',
    tech: 'Azure Front Door + Content Delivery Network (PoPs)',
    desc: 'Los activos estáticos de la SPA (React, CSS, JS) se distribuyen en puntos de presencia (PoP) de Azure en el borde de la red. Esto reduce drásticamente el consumo de ancho de banda del servidor central y acelera la carga para usuarios remotos.',
    color: C_PURPLE
  }
];

scales.forEach((sc, idx) => {
  const y = 1.95 + (idx * 1.18);
  slide8.addShape(pptx.ShapeType.roundRect, {
    x: 0.9, y: y, w: 11.53, h: 1.05, rectRadius: 0.12,
    fill: { color: C_CARD }, line: { color: C_BORDER, width: 1.0 }
  });

  // Left accent bar
  slide8.addShape(pptx.ShapeType.roundRect, {
    x: 0.9, y: y, w: 0.12, h: 1.05, rectRadius: 0.06,
    fill: { color: sc.color }, line: { color: sc.color }
  });

  // Number Badge
  slide8.addShape(pptx.ShapeType.roundRect, {
    x: 1.25, y: y + 0.14, w: 0.45, h: 0.24, rectRadius: 0.12,
    fill: { color: '181924' }, line: { color: sc.color, width: 0.8 }
  });
  slide8.addText(sc.num, {
    x: 1.25, y: y + 0.14, w: 0.45, h: 0.24,
    fontSize: 9, fontFace: FONT_PRIMARY, bold: true, color: sc.color,
    align: 'center', valign: 'middle'
  });

  // Title & Tech
  slide8.addText([
    { text: `${sc.title}   `, options: { bold: true, color: C_WHITE, fontSize: 11.5 } },
    { text: `[ ${sc.tech} ]`, options: { bold: true, color: sc.color, fontSize: 9.5 } }
  ], { x: 1.85, y: y + 0.12, w: 10.3, h: 0.28, fontFace: FONT_PRIMARY });

  // Description
  slide8.addText(sc.desc, {
    x: 1.25, y: y + 0.44, w: 10.95, h: 0.52,
    fontSize: 9.8, fontFace: FONT_PRIMARY, color: C_MUTED, valign: 'top'
  });
});

slide8.addNotes('MINUTOS 10:00 A 13:00 - Responder a la pregunta de escalabilidad de la pauta: ¿Qué cambiaría en la arquitectura si la demanda pasa de 100 a 10.000 usuarios? Detallar cómo Azure Redis, IoT Hub, VMSS y CDN absorben este volumen masivo.');

// ===========================================================================
// SLIDE 9: ORGANIZACIÓN DEL EQUIPO
// ===========================================================================
const slide9 = pptx.addSlide();
addSlideHeader(slide9, '08 · Equipo de Trabajo', 'Organización del Equipo & Roles Técnicos', 'Distribución de responsabilidades y dominio integral de la solución (Pauta Santo Tomás).', '09', 'Minuto 10:00 - 13:00');

const team = [
  {
    role: 'INTEGRANTE 1',
    title: 'Interfaz & Experiencia (UI/UX)',
    color: C_BLUE,
    points: [
      'Desarrollo de SPA reactiva en React 18 con Vite.',
      'Sistema de estilos modulares con Tailwind CSS.',
      'Diseño de mapa interactivo SVG de 6 cupos con estados.',
      'Terminal de reservas con validación de patentes chilenas.',
      'Generación de Pase Digital QR y feedback sonoro.'
    ]
  },
  {
    role: 'INTEGRANTE 2',
    title: 'Arquitectura & Backend',
    color: C_GREEN,
    points: [
      'Definición del modelo desacoplado en 4 capas.',
      'Controladores RESTful en Node.js y Express.',
      'Motor de reglas de negocio y tarificación ($35/min).',
      'Orquestación de operaciones CRUD e integridad de datos.',
      'Manejo de excepciones HTTP y auditoría en consola.'
    ]
  },
  {
    role: 'INTEGRANTE 3',
    title: 'Hardware & IoT (Firmware)',
    color: C_AMBER,
    points: [
      'Programación C++ embebida en Arduino UNO R3.',
      'Matriz de 8 sensores ultrasónicos HC-SR04.',
      'Técnica de disparo compartido en Pin 2 Trigger.',
      'Control de 2 servomotores SG90 y display LCD 16x2.',
      'Enlace bidireccional Web Serial API a 115200 baudios.'
    ]
  },
  {
    role: 'INTEGRANTE 4',
    title: 'Cloud & DevOps (Azure)',
    color: C_PURPLE,
    points: [
      'Aprovisionamiento de VM en Microsoft Azure.',
      'Endurecimiento de Windows Server 2022 Datacenter.',
      'Instalación y configuración de IIS con ARR Proxy.',
      'Reglas de firewall en NSG (Puertos 80, 443, 3001, 3389).',
      'Configuración de Azure DNS (FQDN) y validación externa.'
    ]
  }
];

team.forEach((tm, idx) => {
  const x = 0.9 + (idx * 2.94);
  slide9.addShape(pptx.ShapeType.roundRect, {
    x: x, y: 1.95, w: 2.70, h: 4.75, rectRadius: 0.15,
    fill: { color: C_CARD }, line: { color: C_BORDER, width: 1.0 }
  });

  // Pill
  slide9.addShape(pptx.ShapeType.roundRect, {
    x: x + 0.20, y: 2.20, w: 2.30, h: 0.28, rectRadius: 0.14,
    fill: { color: '1C1E28' }, line: { color: tm.color, width: 0.8 }
  });
  slide9.addText(tm.role, {
    x: x + 0.20, y: 2.20, w: 2.30, h: 0.28,
    fontSize: 8.5, fontFace: FONT_PRIMARY, bold: true, color: tm.color,
    align: 'center', valign: 'middle'
  });

  // Title
  slide9.addText(tm.title, {
    x: x + 0.20, y: 2.60, w: 2.30, h: 0.55,
    fontSize: 12, fontFace: FONT_PRIMARY, bold: true, color: C_WHITE,
    valign: 'top'
  });

  // Bullet Points
  const textRuns = tm.points.flatMap(p => [
    { text: `• ${p}\n\n`, options: { color: C_MUTED, fontSize: 9.2 } }
  ]);

  slide9.addText(textRuns, {
    x: x + 0.20, y: 3.25, w: 2.30, h: 3.20,
    fontFace: FONT_PRIMARY, valign: 'top'
  });
});

slide9.addNotes('MINUTOS 10:00 A 13:00 - Cada integrante expone su rol y demuestra conocimiento transversal de la solución completa para obtener los 5 puntos de participación individual de la rúbrica.');

// ===========================================================================
// SLIDE 10: CONCLUSIONES & CIERRE
// ===========================================================================
const slide10 = pptx.addSlide();
addSlideHeader(slide10, '09 · Conclusiones & Cierre', 'Balance del Proyecto & Cumplimiento de Objetivos', 'Cierre de la defensa técnica y apertura para preguntas de la comisión evaluadora.', '10', 'Minuto 13:00 - 15:00');

// Left Card: Logros del Proyecto
slide10.addShape(pptx.ShapeType.roundRect, {
  x: 0.9, y: 1.95, w: 6.80, h: 4.75, rectRadius: 0.15,
  fill: { color: C_CARD }, line: { color: C_BORDER, width: 1.0 }
});

slide10.addShape(pptx.ShapeType.roundRect, {
  x: 1.2, y: 2.20, w: 2.6, h: 0.28, rectRadius: 0.14,
  fill: { color: '14241B' }, line: { color: C_GREEN, width: 0.8 }
});
slide10.addText('LOGROS CLAVE DEL PROYECTO', {
  x: 1.2, y: 2.20, w: 2.6, h: 0.28,
  fontSize: 8.5, fontFace: FONT_PRIMARY, bold: true, color: C_GREEN,
  align: 'center', valign: 'middle'
});

slide10.addText('Conclusiones Técnicas Principales', {
  x: 1.2, y: 2.60, w: 6.2, h: 0.40,
  fontSize: 16, fontFace: FONT_PRIMARY, bold: true, color: C_WHITE
});

slide10.addText([
  { text: '• Convergencia Exitosa Cloud-IoT:\n', options: { bold: true, color: C_WHITE, fontSize: 11.5 } },
  { text: 'Se articuló un microcontrolador de bajo costo (Arduino UNO R3 de $5 USD) con infraestructura cloud enterprise en Microsoft Azure, logrando telemetría y control sin latencia perceptible.\n\n', options: { color: C_MUTED, fontSize: 10.5 } },
  { text: '• Desacoplamiento y Resiliencia Comprobada:\n', options: { bold: true, color: C_WHITE, fontSize: 11.5 } },
  { text: 'La arquitectura en 4 capas garantizó que el hardware opere con autonomía física local frente a contingencias de red, sincronizando transacciones al restablecerse la conectividad.\n\n', options: { color: C_MUTED, fontSize: 10.5 } },
  { text: '• Cumplimiento del 100% de la Rúbrica Oficial:\n', options: { bold: true, color: C_WHITE, fontSize: 11.5 } },
  { text: 'Todos los criterios de evaluación (IaaS Azure, NSG, IIS, DNS público, CRUD en vivo, control de versiones en GitHub y defensa técnica) fueron verificados y documentados rigurosamente.\n\n', options: { color: C_MUTED, fontSize: 10.5 } },
  { text: '• Trabajo Colaborativo en GitHub:\n', options: { bold: true, color: C_WHITE, fontSize: 11.5 } },
  { text: 'Control de versiones con commits en español, articulando el trabajo de los 4 integrantes de forma ordenada.', options: { color: C_MUTED, fontSize: 10.5 } }
], { x: 1.2, y: 3.10, w: 6.2, h: 3.40, fontFace: FONT_PRIMARY });

// Right Card: Enlaces & Cierre
slide10.addShape(pptx.ShapeType.roundRect, {
  x: 7.94, y: 1.95, w: 4.49, h: 4.75, rectRadius: 0.15,
  fill: { color: C_CARD }, line: { color: C_BORDER, width: 1.0 }
});

slide10.addShape(pptx.ShapeType.roundRect, {
  x: 8.24, y: 2.20, w: 2.5, h: 0.28, rectRadius: 0.14,
  fill: { color: '142028' }, line: { color: C_BLUE, width: 0.8 }
});
slide10.addText('ACREDITACIÓN & CONTACTO', {
  x: 8.24, y: 2.20, w: 2.5, h: 0.28,
  fontSize: 8.5, fontFace: FONT_PRIMARY, bold: true, color: C_BLUE,
  align: 'center', valign: 'middle'
});

slide10.addText('Canales y Presentación', {
  x: 8.24, y: 2.60, w: 3.89, h: 0.40,
  fontSize: 16, fontFace: FONT_PRIMARY, bold: true, color: C_WHITE
});

slide10.addText([
  { text: '• Repositorio Oficial en GitHub:\n', options: { bold: true, color: C_WHITE, fontSize: 11 } },
  { text: 'https://github.com/PaulFL808/INTELIGEMENTE-ESTACIONADO\n\n', options: { color: C_BLUE, fontSize: 9.8 } },
  { text: '• Portal Web Desplegado en Azure:\n', options: { bold: true, color: C_WHITE, fontSize: 11 } },
  { text: 'http://aurasmartparking.eastus.cloudapp.azure.com\n\n', options: { color: C_GREEN, fontSize: 9.8 } },
  { text: '• Defensa en Auditorio:\n', options: { bold: true, color: C_WHITE, fontSize: 11 } },
  { text: 'Miércoles 28 de octubre · 09:00 hrs\nAuditorio 1, Edificio 91, Piso 3\nTenida Semi-Formal\n\n', options: { color: C_MUTED, fontSize: 10 } }
], { x: 8.24, y: 3.10, w: 3.89, h: 2.20, fontFace: FONT_PRIMARY });

// Closing Callout Box
slide10.addShape(pptx.ShapeType.roundRect, {
  x: 8.24, y: 5.45, w: 3.89, h: 1.05, rectRadius: 0.12,
  fill: { color: '14241B' }, line: { color: C_GREEN, width: 1.0 }
});
slide10.addText('¡Muchas Gracias!\nQuedamos atentos a las preguntas de la Comisión Evaluadora.', {
  x: 8.34, y: 5.45, w: 3.69, h: 1.05,
  fontSize: 11.5, fontFace: FONT_PRIMARY, bold: true, color: C_GREEN,
  align: 'center', valign: 'middle'
});

slide10.addNotes('MINUTOS 13:00 A 15:00 - Cierre formal de la exposición, agradecimiento a la comisión académica de Santo Tomás e inicio de la ronda de preguntas y respuestas.');

// ===========================================================================
// Export Presentation
// ===========================================================================
const outputPath = path.resolve('Presentacion_AURA_SmartParking_Azure.pptx');
pptx.writeFile({ fileName: outputPath })
  .then(fileName => {
    console.log(`[OK] Presentación con estilo Apple y proporciones 16:9 generada exitosamente en:\n${fileName}`);
  })
  .catch(err => {
    console.error('[ERROR] Error al generar la presentación:', err);
  });
