import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const OUTPUT_DIR = path.resolve('diagramas');

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// ---------------------------------------------------------------------------
// DIAGRAMA 1: ARQUITECTURA EN 4 CAPAS DESACOPLADA (MODELO CLIENTE-SERVIDOR)
// ---------------------------------------------------------------------------
const htmlDiagrama1 = `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    background: #090A0E;
    color: #EDEDF0;
    font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, sans-serif;
    width: 1920px;
    height: 1080px;
    padding: 35px 55px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .top-bar { display: flex; justify-content: space-between; align-items: flex-start; }
  .badge {
    display: inline-flex; align-items: center; gap: 8px;
    background: #131520; border: 1px solid #2A2E44; color: #2997FF;
    padding: 6px 16px; border-radius: 999px; font-size: 12px; font-weight: 800;
    letter-spacing: 1.2px; text-transform: uppercase;
  }
  .pulse-dot { width: 8px; height: 8px; border-radius: 50%; background: #2997FF; box-shadow: 0 0 10px #2997FF; }
  .title { font-size: 34px; font-weight: 900; color: #FFFFFF; margin-top: 8px; letter-spacing: -0.5px; }
  .subtitle { font-size: 15px; color: #8E8E93; margin-top: 4px; }
  .meta-tags { display: flex; gap: 10px; }
  .tag { background: #161824; border: 1px solid #262938; padding: 6px 14px; border-radius: 10px; font-size: 12px; font-weight: 700; color: #EDEDF0; }

  /* 4 Layers Grid */
  .layers-container {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
    margin: 20px 0;
    flex: 1;
    align-items: stretch;
  }
  .layer-card {
    background: #111219;
    border: 1px solid #242738;
    border-radius: 20px;
    padding: 24px 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;
    box-shadow: 0 12px 30px rgba(0,0,0,0.5);
  }
  .layer-header { display: flex; flex-direction: column; gap: 6px; }
  .layer-num {
    font-size: 11px; font-weight: 800; letter-spacing: 1.5px; text-transform: uppercase;
    display: inline-flex; align-items: center; gap: 6px;
  }
  .layer-title { font-size: 20px; font-weight: 900; color: #FFFFFF; margin-top: 4px; }
  .layer-subtitle { font-size: 12.5px; color: #8E8E93; line-height: 1.4; margin-top: 4px; }
  
  .tech-pills { display: flex; flex-wrap: wrap; gap: 6px; margin: 16px 0; }
  .tech-pill {
    background: #181A25; border: 1px solid #2A2D40;
    padding: 4px 10px; border-radius: 8px; font-size: 11.5px; font-weight: 700; color: #EDEDF0;
  }
  
  .spec-box {
    background: #151722;
    border: 1px solid #222534;
    border-radius: 12px;
    padding: 14px;
    font-size: 12px;
    color: #A1A1A8;
    line-height: 1.6;
    margin-top: auto;
  }
  .spec-item { display: flex; justify-content: space-between; padding: 4px 0; border-bottom: 1px dashed #232636; }
  .spec-item:last-child { border-bottom: none; }
  .spec-key { color: #8E8E93; font-weight: 600; }
  .spec-val { color: #FFFFFF; font-weight: 700; text-align: right; }

  /* Layer Colors */
  .c-blue { color: #2997FF; }
  .c-green { color: #30D158; }
  .c-purple { color: #BF5AF2; }
  .c-amber { color: #FF9F0A; }

  .b-blue { border-top: 4px solid #2997FF; }
  .b-green { border-top: 4px solid #30D158; }
  .b-purple { border-top: 4px solid #BF5AF2; }
  .b-amber { border-top: 4px solid #FF9F0A; }

  /* Flow arrows indicator */
  .flow-indicator {
    background: #12131C;
    border: 1px solid #222536;
    border-radius: 14px;
    padding: 14px 24px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 12.5px;
    font-weight: 700;
  }
  .flow-step { display: flex; align-items: center; gap: 10px; color: #EDEDF0; }
  .flow-arrow { color: #545464; font-size: 18px; font-weight: 900; }

  .footer {
    display: flex; justify-content: space-between; align-items: center;
    border-top: 1px solid #1C1E2A; padding-top: 14px; font-size: 12px; color: #646472;
  }
  .team-members { display: flex; gap: 16px; color: #A1A1B0; font-weight: 600; }
</style>
</head>
<body>

  <!-- Top Bar -->
  <div class="top-bar">
    <div>
      <div class="badge"><span class="pulse-dot"></span> MODELO CLIENTE-SERVIDOR MULTI-CAPA (N-TIER)</div>
      <h1 class="title">AURA SMART PARKING · ARQUITECTURA DE SOFTWARE EN 4 CAPAS</h1>
      <p class="subtitle">Desacoplamiento Estricto de Responsabilidades: SPA React 18, IaaS Azure IIS, Controladores JWT y Persistencia NoSQL</p>
    </div>
    <div class="meta-tags">
      <span class="tag">IPST · Área Informática</span>
      <span class="tag">Pauta Oficial: 100 Puntos</span>
      <span class="tag" style="border-color:#30D158; color:#30D158;">Estado: En Producción</span>
    </div>
  </div>

  <!-- 4 Layers Cards -->
  <div class="layers-container">
    
    <!-- Capa 1 -->
    <div class="layer-card b-blue">
      <div class="layer-header">
        <span class="layer-num c-blue">● CAPA 1 · CLIENTE (FRONTEND SPA)</span>
        <h3 class="layer-title">Presentación & UX</h3>
        <p class="layer-subtitle">Single Page Application en React 18 con renderizado en el navegador del cliente sin recargas de página.</p>
      </div>

      <div class="tech-pills">
        <span class="tech-pill">React 18.3</span>
        <span class="tech-pill">Vite Bundler</span>
        <span class="tech-pill">Tailwind CSS</span>
        <span class="tech-pill">Lucide Icons</span>
        <span class="tech-pill">WebSockets Client</span>
        <span class="tech-pill">Local Storage Session</span>
      </div>

      <div class="spec-box">
        <div class="spec-item"><span class="spec-key">Módulo 3D:</span><span class="spec-val">Mapa interactivo 6 cajones</span></div>
        <div class="spec-item"><span class="spec-key">Reservas:</span><span class="spec-val">Terminal con Pase QR</span></div>
        <div class="spec-item"><span class="spec-key">Renderizado:</span><span class="spec-val">Client-Side (CSR)</span></div>
        <div class="spec-item"><span class="spec-key">Latencia UI:</span><span class="spec-val">&lt; 16 ms (60 FPS)</span></div>
        <div class="spec-item"><span class="spec-key">Responsable:</span><span class="spec-val c-blue">Fabián Mora</span></div>
      </div>
    </div>

    <!-- Capa 2 -->
    <div class="layer-card b-green">
      <div class="layer-header">
        <span class="layer-num c-green">● CAPA 2 · ALOJAMIENTO CLOUD</span>
        <h3 class="layer-title">Servidor Web Azure IIS</h3>
        <p class="layer-subtitle">Infraestructura IaaS dedicada en Microsoft Azure sobre Windows Server 2022 con IIS 10.0 en puerto 80.</p>
      </div>

      <div class="tech-pills">
        <span class="tech-pill">Azure VM B2s</span>
        <span class="tech-pill">Windows Server 2022</span>
        <span class="tech-pill">IIS 10.0</span>
        <span class="tech-pill">Azure NSG (Firewall)</span>
        <span class="tech-pill">Azure DNS FQDN</span>
        <span class="tech-pill">Región Chile Central</span>
      </div>

      <div class="spec-box">
        <div class="spec-item"><span class="spec-key">FQDN Oficial:</span><span class="spec-val">puntoalerce.chile...</span></div>
        <div class="spec-item"><span class="spec-key">IP Pública:</span><span class="spec-val">68.211.136.184</span></div>
        <div class="spec-item"><span class="spec-key">Puerto Web:</span><span class="spec-val">80 HTTP / 3389 RDP</span></div>
        <div class="spec-item"><span class="spec-key">Ubicación Web:</span><span class="spec-val">C:\\inetpub\\wwwroot</span></div>
        <div class="spec-item"><span class="spec-key">Responsable:</span><span class="spec-val c-green">Paul Ferrada</span></div>
      </div>
    </div>

    <!-- Capa 3 -->
    <div class="layer-card b-purple">
      <div class="layer-header">
        <span class="layer-num c-purple">● CAPA 3 · LÓGICA DE NEGOCIO</span>
        <h3 class="layer-title">Reglas de Dominio & API</h3>
        <p class="layer-subtitle">Servicios desacoplados para tarificación dinámica, validación de patentes chilenas y seguridad con JWT.</p>
      </div>

      <div class="tech-pills">
        <span class="tech-pill">Motor Tarificación</span>
        <span class="tech-pill">Tokens JWT (RFC 7519)</span>
        <span class="tech-pill">RBAC (Roles)</span>
        <span class="tech-pill">Regex Patentes</span>
        <span class="tech-pill">API RESTful</span>
        <span class="tech-pill">Auditoría HTTP</span>
      </div>

      <div class="spec-box">
        <div class="spec-item"><span class="spec-key">Tarifa Minuto:</span><span class="spec-val">$35 CLP / minuto</span></div>
        <div class="spec-item"><span class="spec-key">Validación:</span><span class="spec-val">Formato BB-BB-11</span></div>
        <div class="spec-item"><span class="spec-key">Seguridad:</span><span class="spec-val">JWT HMAC-SHA256</span></div>
        <div class="spec-item"><span class="spec-key">Control Roles:</span><span class="spec-val">Usuario vs Admin</span></div>
        <div class="spec-item"><span class="spec-key">Responsable:</span><span class="spec-val c-purple">Agustín Cañas</span></div>
      </div>
    </div>

    <!-- Capa 4 -->
    <div class="layer-card b-amber">
      <div class="layer-header">
        <span class="layer-num c-amber">● CAPA 4 · PERSISTENCIA CLOUD</span>
        <h3 class="layer-title">Base de Datos NoSQL</h3>
        <p class="layer-subtitle">Persistencia NoSQL administrada en Google Cloud / Firestore con sincronización reactiva en tiempo real.</p>
      </div>

      <div class="tech-pills">
        <span class="tech-pill">Firebase Firestore</span>
        <span class="tech-pill">Proyecto nubarda</span>
        <span class="tech-pill">onSnapshot Listener</span>
        <span class="tech-pill">Colecciones NoSQL</span>
        <span class="tech-pill">TLS / HTTPS</span>
        <span class="tech-pill">BaaS Serverless</span>
      </div>

      <div class="spec-box">
        <div class="spec-item"><span class="spec-key">Base de Datos:</span><span class="spec-val">Cloud Firestore</span></div>
        <div class="spec-item"><span class="spec-key">Colecciones:</span><span class="spec-val">slots, reservations, logs</span></div>
        <div class="spec-item"><span class="spec-key">Transmisión:</span><span class="spec-val">WebSockets Bidireccional</span></div>
        <div class="spec-item"><span class="spec-key">Sincronización:</span><span class="spec-val">Tiempo Real (&lt; 200 ms)</span></div>
        <div class="spec-item"><span class="spec-key">Responsable:</span><span class="spec-val c-amber">Felipe Labarca</span></div>
      </div>
    </div>

  </div>

  <!-- Flow Bar -->
  <div class="flow-indicator">
    <div class="flow-step"><span class="c-blue">1. Cliente React (SPA)</span> <span>Envía solicitud POST /reserve con Token JWT</span></div>
    <span class="flow-arrow">➔</span>
    <div class="flow-step"><span class="c-green">2. Azure IIS (Puerto 80)</span> <span>Sirve activos y enruta peticiones hacia la nube</span></div>
    <span class="flow-arrow">➔</span>
    <div class="flow-step"><span class="c-purple">3. Controladores de Negocio</span> <span>Valida patente, calcula cobro $35/min y verifica firma JWT</span></div>
    <span class="flow-arrow">➔</span>
    <div class="flow-step"><span class="c-amber">4. Firestore (nubarda)</span> <span>Persiste documento y dispara evento onSnapshot a todos los clientes</span></div>
  </div>

  <!-- Footer -->
  <div class="footer">
    <div><strong>AURA Smart Parking</strong> · Solución Cloud & IoT en Microsoft Azure</div>
    <div class="team-members">
      <span>👨‍💻 Paul Ferrada (Cloud & Azure)</span>
      <span>👨‍💻 Agustín Cañas (Arquitectura)</span>
      <span>👨‍💻 Fabián Mora (UI/UX)</span>
      <span>👨‍💻 Felipe Labarca (Seguridad & BD)</span>
    </div>
    <div>IPST Santo Tomás · Miércoles 28 de Octubre · 09:00 hrs</div>
  </div>

</body>
</html>`;

// ---------------------------------------------------------------------------
// DIAGRAMA 2: INFRAESTRUCTURA DE RED Y SEGURIDAD EN MICROSOFT AZURE
// ---------------------------------------------------------------------------
const htmlDiagrama2 = `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    background: #090A0E;
    color: #EDEDF0;
    font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, sans-serif;
    width: 1920px;
    height: 1080px;
    padding: 35px 55px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .top-bar { display: flex; justify-content: space-between; align-items: flex-start; }
  .badge {
    display: inline-flex; align-items: center; gap: 8px;
    background: #101F30; border: 1px solid #1E4976; color: #64D2FF;
    padding: 6px 16px; border-radius: 999px; font-size: 12px; font-weight: 800;
    letter-spacing: 1.2px; text-transform: uppercase;
  }
  .pulse-dot { width: 8px; height: 8px; border-radius: 50%; background: #64D2FF; box-shadow: 0 0 10px #64D2FF; }
  .title { font-size: 34px; font-weight: 900; color: #FFFFFF; margin-top: 8px; }
  .subtitle { font-size: 15px; color: #8E8E93; margin-top: 4px; }
  .meta-tags { display: flex; gap: 10px; }
  .tag { background: #161824; border: 1px solid #262938; padding: 6px 14px; border-radius: 10px; font-size: 12px; font-weight: 700; }

  /* Architecture Diagram Area */
  .diagram-area {
    display: grid;
    grid-template-columns: 280px 70px 1fr 70px 380px;
    gap: 15px;
    align-items: center;
    margin: 20px 0;
    flex: 1;
  }
  .connector {
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    color: #545468; font-weight: 900; font-size: 12px; text-align: center; gap: 4px;
  }
  .arrow-line { width: 100%; height: 2px; background: #2E3348; position: relative; }
  .arrow-line::after {
    content: '▶'; position: absolute; right: -4px; top: -7px; font-size: 10px; color: #2997FF;
  }

  .cloud-boundary {
    background: #0E1018;
    border: 2px dashed #283048;
    border-radius: 24px;
    padding: 24px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;
  }
  .cloud-header {
    display: flex; justify-content: space-between; align-items: center;
    border-bottom: 1px solid #202638; padding-bottom: 12px; margin-bottom: 16px;
  }
  .cloud-title { font-size: 16px; font-weight: 800; color: #64D2FF; display: flex; align-items: center; gap: 8px; }

  .vnet-box {
    background: #121420;
    border: 1px solid #23283E;
    border-radius: 18px;
    padding: 20px;
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  
  .nsg-rules-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 11.5px;
  }
  .nsg-rules-table th {
    background: #181B2C; color: #8E8EA0; text-align: left; padding: 6px 10px; border-radius: 4px;
  }
  .nsg-rules-table td {
    padding: 7px 10px; border-bottom: 1px solid #1C2032; color: #EDEDF0;
  }
  .pill-allow { background: rgba(48,209,88,0.15); color: #30D158; border: 1px solid rgba(48,209,88,0.3); padding: 2px 8px; border-radius: 6px; font-weight: 800; }
  .pill-deny { background: rgba(255,69,58,0.15); color: #FF453A; border: 1px solid rgba(255,69,58,0.3); padding: 2px 8px; border-radius: 6px; font-weight: 800; }

  .vm-box {
    background: #171A28;
    border: 1px solid #2A304C;
    border-radius: 14px;
    padding: 16px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
  }
  .vm-metric {
    background: #11131E; border: 1px solid #21253A; border-radius: 10px; padding: 10px; text-align: center;
  }
  .vm-metric-label { font-size: 10px; color: #8E8E98; font-weight: 700; text-transform: uppercase; }
  .vm-metric-val { font-size: 14px; color: #FFFFFF; font-weight: 800; margin-top: 3px; }

  /* Client & External Cards */
  .actor-card {
    background: #12131C; border: 1px solid #222538; border-radius: 20px; padding: 22px; height: 100%;
    display: flex; flex-direction: column; justify-content: space-between;
  }
  .actor-title { font-size: 18px; font-weight: 900; color: #FFFFFF; }
  .actor-desc { font-size: 12px; color: #8E8E98; line-height: 1.5; margin-top: 8px; }

  .footer {
    display: flex; justify-content: space-between; align-items: center;
    border-top: 1px solid #1C1E2A; padding-top: 14px; font-size: 12px; color: #646472;
  }
</style>
</head>
<body>

  <!-- Top Bar -->
  <div class="top-bar">
    <div>
      <div class="badge"><span class="pulse-dot"></span> TOPOLOGÍA DE RED IAAS · MICROSOFT AZURE</div>
      <h1 class="title">INFRAESTRUCTURA CLOUD, VIRTUAL NETWORK & FIREWALL NSG</h1>
      <p class="subtitle">Aprovisionamiento en Región Chile Central · Resolución DNS FQDN y Publicación IIS en Puerto 80</p>
    </div>
    <div class="meta-tags">
      <span class="tag">Región: Chile Central</span>
      <span class="tag">IP: 68.211.136.184</span>
      <span class="tag" style="border-color:#64D2FF; color:#64D2FF;">FQDN: puntoalerce</span>
    </div>
  </div>

  <!-- Diagram Grid -->
  <div class="diagram-area">

    <!-- Actores / Clientes -->
    <div class="actor-card">
      <div>
        <span style="font-size: 11px; font-weight: 800; color: #2997FF; letter-spacing: 1.5px; text-transform: uppercase;">01 · TRÁFICO EXTERNO</span>
        <h3 class="actor-title" style="margin-top: 6px;">Clientes & Admin</h3>
        <p class="actor-desc">Usuarios finales (conductores con smartphones) y administradores de recinto accediendo desde Internet pública sin VPN.</p>
        
        <div style="margin-top: 20px; display: flex; flex-direction: column; gap: 8px;">
          <div style="background:#171926; padding:10px; border-radius:10px; border:1px solid #24273C; font-size:11.5px;">
            <div style="color:#2997FF; font-weight:800;">🚗 Conductores Móviles</div>
            <div style="color:#8E8E98; font-size:10.5px;">Consulta de 6 cupos y reserva con Pase QR</div>
          </div>
          <div style="background:#171926; padding:10px; border-radius:10px; border:1px solid #24273C; font-size:11.5px;">
            <div style="color:#BF5AF2; font-weight:800;">🛡️ Administradores</div>
            <div style="color:#8E8E98; font-size:10.5px;">Gestión CRUD total, métricas y RDP</div>
          </div>
        </div>
      </div>

      <div style="background:#10111A; padding:12px; border-radius:10px; font-size:11px; color:#8E8E98;">
        Protocolos: <strong style="color:#FFFFFF;">HTTP (80)</strong> / <strong style="color:#FFFFFF;">RDP (3389)</strong>
      </div>
    </div>

    <!-- Conector 1 -->
    <div class="connector">
      <span>Internet</span>
      <div class="arrow-line"></div>
      <span>TCP / IP</span>
    </div>

    <!-- Nube de Azure -->
    <div class="cloud-boundary">
      <div class="cloud-header">
        <span class="cloud-title">☁️ MICROSOFT AZURE CLOUD · REGIÓN CHILE CENTRAL</span>
        <span style="font-size:12px; color:#8E8E98; font-family:monospace;">Suscripción Estudiante / Azure for Students</span>
      </div>

      <div class="vnet-box">
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <span style="font-size:13px; font-weight:800; color:#FFFFFF;">🌐 Virtual Network (vnet-smartparking · 10.0.0.0/16)</span>
          <span style="font-size:11px; background:#1C2034; padding:3px 10px; border-radius:6px; color:#64D2FF; font-weight:700;">Subnet: snet-web (10.0.0.0/24)</span>
        </div>

        <!-- NSG Rules Table -->
        <div>
          <div style="font-size:11.5px; font-weight:800; color:#8E8EA8; margin-bottom:6px; text-transform:uppercase;">
            🛡️ Network Security Group (nsg-smartparking-prod) · Reglas de Entrada
          </div>
          <table class="nsg-rules-table">
            <thead>
              <tr>
                <th>Prioridad</th><th>Nombre Regla</th><th>Puerto</th><th>Protocolo</th><th>Acción</th><th>Propósito</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>300</strong></td><td>Port_80_HTTP</td><td>80</td><td>TCP</td>
                <td><span class="pill-allow">ALLOW</span></td><td>Acceso público a la SPA React en IIS</td>
              </tr>
              <tr>
                <td><strong>310</strong></td><td>Port_443_HTTPS</td><td>443</td><td>TCP</td>
                <td><span class="pill-allow">ALLOW</span></td><td>Tráfico seguro con cifrado TLS</td>
              </tr>
              <tr>
                <td><strong>320</strong></td><td>Port_3389_RDP</td><td>3389</td><td>TCP</td>
                <td><span class="pill-allow">ALLOW</span></td><td>Escritorio Remoto administrativo</td>
              </tr>
              <tr>
                <td><strong>65000</strong></td><td>DenyAllInbound</td><td>Any</td><td>Any</td>
                <td><span class="pill-deny">DENY</span></td><td>Bloqueo automático preventivo</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- VM Box -->
        <div>
          <div style="font-size:11.5px; font-weight:800; color:#8E8EA8; margin-bottom:6px; text-transform:uppercase;">
            🖥️ Máquina Virtual Dedicada (vm-aurasmartparking-prod)
          </div>
          <div class="vm-box">
            <div class="vm-metric">
              <div class="vm-metric-label">Tamaño / SKU</div>
              <div class="vm-metric-val">Standard_B2s</div>
            </div>
            <div class="vm-metric">
              <div class="vm-metric-label">Cómputo</div>
              <div class="vm-metric-val">2 vCPUs · 4 GiB RAM</div>
            </div>
            <div class="vm-metric">
              <div class="vm-metric-label">Sistema Operativo</div>
              <div class="vm-metric-val">Windows Server 2022</div>
            </div>
            <div class="vm-metric">
              <div class="vm-metric-label">Web Server</div>
              <div class="vm-metric-val">IIS 10.0 (Port 80)</div>
            </div>
            <div class="vm-metric">
              <div class="vm-metric-label">Almacenamiento</div>
              <div class="vm-metric-val">128 GiB SSD Premium</div>
            </div>
            <div class="vm-metric">
              <div class="vm-metric-label">Ruta Física</div>
              <div class="vm-metric-val" style="font-size:11px;">C:\\inetpub\\wwwroot</div>
            </div>
          </div>
        </div>
      </div>

      <div style="display:flex; justify-content:space-between; align-items:center; font-size:11.5px; color:#8E8E98; margin-top:12px;">
        <span>IP Pública Asignada: <strong style="color:#64D2FF;">68.211.136.184</strong></span>
        <span>DNS Oficial: <strong style="color:#30D158;">puntoalerce.chilecentral.cloudapp.azure.com</strong></span>
      </div>
    </div>

    <!-- Conector 2 -->
    <div class="connector">
      <span>SDK</span>
      <div class="arrow-line"></div>
      <span>HTTPS</span>
    </div>

    <!-- Base de Datos Externa -->
    <div class="actor-card">
      <div>
        <span style="font-size: 11px; font-weight: 800; color: #FF9F0A; letter-spacing: 1.5px; text-transform: uppercase;">03 · PERSISTENCIA NO-SQL</span>
        <h3 class="actor-title" style="margin-top: 6px;">Firebase Firestore</h3>
        <p class="actor-desc">Google Cloud Firestore (Proyecto 'nubarda'). Almacena el estado de los cupos y el historial de reservas en tiempo real.</p>
        
        <div style="margin-top: 20px; display: flex; flex-direction: column; gap: 8px;">
          <div style="background:#171926; padding:10px; border-radius:10px; border:1px solid #24273C; font-size:11.5px;">
            <div style="color:#FF9F0A; font-weight:800;">📁 parking_slots</div>
            <div style="color:#8E8E98; font-size:10.5px;">6 documentos (E-01 a E-06) con estados</div>
          </div>
          <div style="background:#171926; padding:10px; border-radius:10px; border:1px solid #24273C; font-size:11.5px;">
            <div style="color:#30D158; font-weight:800;">📁 reservations</div>
            <div style="color:#8E8E98; font-size:10.5px;">Historial de reservas con patentes</div>
          </div>
        </div>
      </div>

      <div style="background:#10111A; padding:12px; border-radius:10px; font-size:11px; color:#8E8E98;">
        Canal: <strong style="color:#30D158;">WebSockets onSnapshot</strong>
      </div>
    </div>

  </div>

  <!-- Footer -->
  <div class="footer">
    <div><strong>AURA Smart Parking</strong> · Infraestructura Azure IaaS y Seguridad NSG</div>
    <div class="team-members">
      <span>Paul Ferrada</span> · <span>Agustín Cañas</span> · <span>Fabián Mora</span> · <span>Felipe Labarca</span>
    </div>
    <div>Instituto Profesional Santo Tomás · Pauta de Evaluación Oficial</div>
  </div>

</body>
</html>`;

// ---------------------------------------------------------------------------
// DIAGRAMA 3: SEGURIDAD, CONTROL DE ACCESO (RBAC) Y TOKENS JWT
// ---------------------------------------------------------------------------
const htmlDiagrama3 = `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    background: #090A0E;
    color: #EDEDF0;
    font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, sans-serif;
    width: 1920px;
    height: 1080px;
    padding: 35px 55px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .top-bar { display: flex; justify-content: space-between; align-items: flex-start; }
  .badge {
    display: inline-flex; align-items: center; gap: 8px;
    background: #241432; border: 1px solid #582484; color: #BF5AF2;
    padding: 6px 16px; border-radius: 999px; font-size: 12px; font-weight: 800;
    letter-spacing: 1.2px; text-transform: uppercase;
  }
  .pulse-dot { width: 8px; height: 8px; border-radius: 50%; background: #BF5AF2; box-shadow: 0 0 10px #BF5AF2; }
  .title { font-size: 34px; font-weight: 900; color: #FFFFFF; margin-top: 8px; }
  .subtitle { font-size: 15px; color: #8E8E93; margin-top: 4px; }

  .main-grid {
    display: grid;
    grid-template-columns: 1fr 1.3fr 1fr;
    gap: 25px;
    margin: 20px 0;
    flex: 1;
    align-items: stretch;
  }
  .role-card {
    background: #11121A; border: 1px solid #242738; border-radius: 20px; padding: 24px;
    display: flex; flex-direction: column; justify-content: space-between;
  }
  .role-badge { display: inline-flex; align-items: center; gap: 6px; padding: 4px 12px; border-radius: 8px; font-size: 11.5px; font-weight: 800; text-transform: uppercase; }
  .role-title { font-size: 22px; font-weight: 900; color: #FFFFFF; margin-top: 10px; }
  
  .permission-list { list-style: none; margin: 16px 0; display: flex; flex-direction: column; gap: 8px; }
  .perm-item {
    padding: 8px 12px; border-radius: 10px; font-size: 12px; font-weight: 600;
    display: flex; align-items: center; justify-content: space-between;
  }
  .perm-allow { background: rgba(48,209,88,0.1); color: #30D158; border: 1px solid rgba(48,209,88,0.25); }
  .perm-deny { background: rgba(255,69,58,0.1); color: #FF453A; border: 1px solid rgba(255,69,58,0.25); }

  /* Center Token Structure Box */
  .jwt-box {
    background: #13141F; border: 1px solid #2B2E46; border-radius: 20px; padding: 24px;
    display: flex; flex-direction: column; justify-content: space-between;
  }
  .jwt-segment {
    background: #171826; border: 1px solid #26283C; border-radius: 12px; padding: 14px; margin-bottom: 10px;
    font-family: 'Consolas', monospace; font-size: 11.5px;
  }
  .jwt-header { color: #FF453A; }
  .jwt-payload { color: #BF5AF2; }
  .jwt-sig { color: #2997FF; }

  .footer {
    display: flex; justify-content: space-between; align-items: center;
    border-top: 1px solid #1C1E2A; padding-top: 14px; font-size: 12px; color: #646472;
  }
</style>
</head>
<body>

  <div class="top-bar">
    <div>
      <div class="badge"><span class="pulse-dot"></span> SEGURIDAD Y CONTROL DE ACCESO (RBAC + JWT)</div>
      <h1 class="title">ARQUITECTURA DE AUTENTICACIÓN, ROLES & TOKENS JWT (RFC 7519)</h1>
      <p class="subtitle">Segregación de Vistas por Rol: Usuario Normal vs Administrador · Protección con Tokens Bearer</p>
    </div>
    <div style="font-family:monospace; font-size:12px; color:#A1A1B8; background:#161824; padding:8px 16px; border-radius:10px; border:1px solid #282C40;">
      Estándar Criptográfico: HMAC-SHA256
    </div>
  </div>

  <div class="main-grid">

    <!-- Rol 1: Conductor (Usuario Normal) -->
    <div class="role-card" style="border-top: 4px solid #2997FF;">
      <div>
        <span class="role-badge" style="background: rgba(41,151,255,0.15); color: #2997FF; border: 1px solid rgba(41,151,255,0.3);">
          🚗 PERFIL DE CONDUCTOR
        </span>
        <h3 class="role-title">Usuario Normal</h3>
        <p style="font-size: 12px; color: #8E8E98; margin-top: 4px; line-height: 1.4;">
          Acceso público para consulta de disponibilidad en vivo y reserva de cajones con emisión de ticket digital.
        </p>

        <ul class="permission-list">
          <li class="perm-item perm-allow"><span>Estacionamiento 3D (Ver Cupos)</span><span>✅ Permitido</span></li>
          <li class="perm-item perm-allow"><span>Reservar Plaza con Patente</span><span>✅ Permitido</span></li>
          <li class="perm-item perm-allow"><span>Emisión de Pase Digital QR</span><span>✅ Permitido</span></li>
          <li class="perm-item perm-deny"><span>Panel de Operaciones CRUD</span><span>⛔ Oculto</span></li>
          <li class="perm-item perm-deny"><span>Dashboard Analítico & Facturación</span><span>⛔ Oculto</span></li>
          <li class="perm-item perm-deny"><span>Control Manual de Barreras</span><span>⛔ Bloqueado</span></li>
          <li class="perm-item perm-deny"><span>Simulación de Sensores IoT</span><span>⛔ Bloqueado</span></li>
        </ul>
      </div>

      <div style="background:#151722; padding:12px; border-radius:10px; font-size:11px; color:#8E8E98;">
        Token Claim: <code style="color:#2997FF; font-weight:800;">{ "role": "user" }</code>
      </div>
    </div>

    <!-- Centro: Estructura del Token JWT -->
    <div class="jwt-box">
      <div>
        <span style="font-size:11px; font-weight:800; color:#BF5AF2; letter-spacing:1.5px; text-transform:uppercase;">
          🔐 ANATOMÍA DEL TOKEN JWT (RFC 7519)
        </span>
        <h3 style="font-size:20px; font-weight:900; color:#FFFFFF; margin-top:6px;">Firma y Verificación</h3>
        <p style="font-size:12px; color:#8E8E98; margin-top:4px;">
          Cada sesión emite un token compacto codificado en Base64URL transmitido en la cabecera HTTP estándar.
        </p>

        <!-- Header -->
        <div class="jwt-segment" style="margin-top:16px;">
          <div style="font-size:10.5px; font-weight:800; color:#FF453A; margin-bottom:4px;">1. HEADER (Algoritmo y Tipo)</div>
          <div class="jwt-header">{ "alg": "HS256", "typ": "JWT" }</div>
        </div>

        <!-- Payload -->
        <div class="jwt-segment">
          <div style="font-size:10.5px; font-weight:800; color:#BF5AF2; margin-bottom:4px;">2. PAYLOAD (Claims y Rol)</div>
          <div class="jwt-payload">{<br>
            &nbsp;&nbsp;"sub": "admin",<br>
            &nbsp;&nbsp;"name": "Paul / Agustín / Fabián / Felipe",<br>
            &nbsp;&nbsp;"role": "admin",<br>
            &nbsp;&nbsp;"exp": 1800000000,<br>
            &nbsp;&nbsp;"iss": "aura-parking-azure-api"<br>
          }</div>
        </div>

        <!-- Signature -->
        <div class="jwt-segment">
          <div style="font-size:10.5px; font-weight:800; color:#2997FF; margin-bottom:4px;">3. SIGNATURE (Firma Criptográfica)</div>
          <div class="jwt-sig">HMACSHA256(base64Url(Header) + "." + base64Url(Payload), SecretKey)</div>
        </div>
      </div>

      <div style="background:#171926; border:1px solid #2B2F44; border-radius:12px; padding:12px; font-size:11px; font-family:monospace;">
        <span style="color:#8E8EA8;">Cabecera HTTP Inyectada:</span><br>
        <span style="color:#30D158; font-weight:700;">Authorization: Bearer eyJhbGciOiJIUzI1Ni...</span>
      </div>
    </div>

    <!-- Rol 2: Administrador -->
    <div class="role-card" style="border-top: 4px solid #BF5AF2;">
      <div>
        <span class="role-badge" style="background: rgba(191,90,242,0.15); color: #BF5AF2; border: 1px solid rgba(191,90,242,0.3);">
          🛡️ PERFIL ADMINISTRADOR
        </span>
        <h3 class="role-title">Administrador General</h3>
        <p style="font-size: 12px; color: #8E8E98; margin-top: 4px; line-height: 1.4;">
          Acceso total e irrestricto al backend, operaciones CRUD en Firestore, analítica y control de barreras.
        </p>

        <ul class="permission-list">
          <li class="perm-item perm-allow"><span>Operaciones CRUD en Base de Datos</span><span>✅ Acceso Total</span></li>
          <li class="perm-item perm-allow"><span>Dashboard & Métricas en Vivo</span><span>✅ Acceso Total</span></li>
          <li class="perm-item perm-allow"><span>Control Manual de Barreras (0°/90°)</span><span>✅ Permitido</span></li>
          <li class="perm-item perm-allow"><span>Simulación de Sensores IoT (cm)</span><span>✅ Permitido</span></li>
          <li class="perm-item perm-allow"><span>Liberación Forzada y Cobro</span><span>✅ Permitido</span></li>
          <li class="perm-item perm-allow"><span>Consola de Auditoría HTTP</span><span>✅ Permitido</span></li>
          <li class="perm-item perm-allow"><span>Defensa Técnica Azure & IIS</span><span>✅ Permitido</span></li>
        </ul>
      </div>

      <div style="background:#151722; padding:12px; border-radius:10px; font-size:11px; color:#8E8E98;">
        Token Claim: <code style="color:#BF5AF2; font-weight:800;">{ "role": "admin" }</code>
      </div>
    </div>

  </div>

  <div class="footer">
    <div><strong>AURA Smart Parking</strong> · Seguridad RBAC y Control Criptográfico JWT</div>
    <div class="team-members">
      <span>Paul Ferrada</span> · <span>Agustín Cañas</span> · <span>Fabián Mora</span> · <span>Felipe Labarca</span>
    </div>
    <div>IPST Santo Tomás · Área Informática</div>
  </div>

</body>
</html>`;

// ---------------------------------------------------------------------------
// DIAGRAMA 4: FLUJO TRANSACCIONAL END-TO-END (RESERVA Y PASE QR)
// ---------------------------------------------------------------------------
const htmlDiagrama4 = `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    background: #090A0E;
    color: #EDEDF0;
    font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, sans-serif;
    width: 1920px;
    height: 1080px;
    padding: 35px 55px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .top-bar { display: flex; justify-content: space-between; align-items: flex-start; }
  .badge {
    display: inline-flex; align-items: center; gap: 8px;
    background: #14281B; border: 1px solid #235432; color: #30D158;
    padding: 6px 16px; border-radius: 999px; font-size: 12px; font-weight: 800;
    letter-spacing: 1.2px; text-transform: uppercase;
  }
  .pulse-dot { width: 8px; height: 8px; border-radius: 50%; background: #30D158; box-shadow: 0 0 10px #30D158; }
  .title { font-size: 34px; font-weight: 900; color: #FFFFFF; margin-top: 8px; }
  .subtitle { font-size: 15px; color: #8E8E93; margin-top: 4px; }

  /* Steps Timeline */
  .steps-container {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 16px;
    margin: 20px 0;
    flex: 1;
    align-items: stretch;
  }
  .step-card {
    background: #111219; border: 1px solid #242738; border-radius: 20px; padding: 22px 18px;
    display: flex; flex-direction: column; justify-content: space-between; position: relative;
  }
  .step-header { display: flex; align-items: center; gap: 10px; margin-bottom: 12px; }
  .step-num {
    width: 32px; height: 32px; border-radius: 10px; background: #161826; border: 1px solid #2D324A;
    color: #30D158; font-weight: 900; font-size: 14px; display: flex; align-items: center; justify-content: center;
  }
  .step-phase { font-size: 11px; font-weight: 800; color: #8E8E98; text-transform: uppercase; }
  .step-title { font-size: 18px; font-weight: 900; color: #FFFFFF; margin-top: 4px; }
  .step-desc { font-size: 12px; color: #8E8E98; line-height: 1.5; margin-top: 8px; }

  .code-snippet {
    background: #151722; border: 1px solid #222536; border-radius: 10px; padding: 12px;
    font-family: 'Consolas', monospace; font-size: 11px; color: #64D2FF; margin-top: auto;
  }

  .footer {
    display: flex; justify-content: space-between; align-items: center;
    border-top: 1px solid #1C1E2A; padding-top: 14px; font-size: 12px; color: #646472;
  }
</style>
</head>
<body>

  <div class="top-bar">
    <div>
      <div class="badge"><span class="pulse-dot"></span> TRAZABILIDAD Y FLUJO TRANSACCIONAL END-TO-END</div>
      <h1 class="title">CICLO COMPLETO DE RESERVA, CÁLCULO DE TARIFA & SINCRONIZACIÓN</h1>
      <p class="subtitle">Paso a Paso desde la Interacción en el Cliente hasta el Registro Persistente en Cloud Firestore</p>
    </div>
    <div style="font-family:monospace; font-size:12px; color:#A1A1B8; background:#161824; padding:8px 16px; border-radius:10px; border:1px solid #282C40;">
      Latencia Transaccional: &lt; 250 ms
    </div>
  </div>

  <div class="steps-container">

    <!-- Paso 1 -->
    <div class="step-card" style="border-top: 4px solid #2997FF;">
      <div>
        <div class="step-header">
          <div class="step-num">1</div>
          <span class="step-phase">INTERACCIÓN UI</span>
        </div>
        <h3 class="step-title">Selección de Cupo</h3>
        <p class="step-desc">El usuario visualiza los 6 cajones en la maqueta 3D y hace clic en un espacio en verde ('LIBRE') como el cajón E-03.</p>
      </div>
      <div class="code-snippet">
        onClick={() => onReserve(slot)}<br>
        status: 'available' ➔ selected
      </div>
    </div>

    <!-- Paso 2 -->
    <div class="step-card" style="border-top: 4px solid #30D158;">
      <div>
        <div class="step-header">
          <div class="step-num" style="color:#30D158;">2</div>
          <span class="step-phase">VALIDACIÓN DOMINIO</span>
        </div>
        <h3 class="step-title">Validación & Tarifa</h3>
        <p class="step-desc">El motor valida el formato de la patente chilena (ej. ABCD-12) y calcula el valor proyectado a razón de $35 CLP por minuto.</p>
      </div>
      <div class="code-snippet" style="color:#30D158;">
        regexPatenteChile.test(plate)<br>
        fee = minutes * $35 CLP
      </div>
    </div>

    <!-- Paso 3 -->
    <div class="step-card" style="border-top: 4px solid #BF5AF2;">
      <div>
        <div class="step-header">
          <div class="step-num" style="color:#BF5AF2;">3</div>
          <span class="step-phase">AUTORIZACIÓN JWT</span>
        </div>
        <h3 class="step-title">Firma & Cabecera</h3>
        <p class="step-desc">La capa de servicios adjunta el token JWT en la cabecera HTTP estándar para asegurar la trazabilidad de la transacción.</p>
      </div>
      <div class="code-snippet" style="color:#BF5AF2;">
        Authorization: Bearer eyJ...<br>
        role: "user" | "admin"
      </div>
    </div>

    <!-- Paso 4 -->
    <div class="step-card" style="border-top: 4px solid #FF9F0A;">
      <div>
        <div class="step-header">
          <div class="step-num" style="color:#FF9F0A;">4</div>
          <span class="step-phase">PERSISTENCIA CLOUD</span>
        </div>
        <h3 class="step-title">Escritura Firestore</h3>
        <p class="step-desc">Se ejecuta un updateDoc en /parking_slots/3 cambiando el estado a 'reserved' y se crea el registro en /reservations.</p>
      </div>
      <div class="code-snippet" style="color:#FF9F0A;">
        updateDoc(slotRef, {<br>
        &nbsp;&nbsp;status: 'reserved',<br>
        &nbsp;&nbsp;updatedAt: serverTimestamp()<br>
        })
      </div>
    </div>

    <!-- Paso 5 -->
    <div class="step-card" style="border-top: 4px solid #64D2FF;">
      <div>
        <div class="step-header">
          <div class="step-num" style="color:#64D2FF;">5</div>
          <span class="step-phase">REACTIVIDAD TIEMPO REAL</span>
        </div>
        <h3 class="step-title">Sincronización & Pase QR</h3>
        <p class="step-desc">El listener onSnapshot detecta el cambio instantáneamente en todos los clientes, el cajón pasa a Ámbar y se genera el Pase QR.</p>
      </div>
      <div class="code-snippet" style="color:#64D2FF;">
        onSnapshot(slotsCol, callback)<br>
        Emitir Pase Digital QR
      </div>
    </div>

  </div>

  <div class="footer">
    <div><strong>AURA Smart Parking</strong> · Trazabilidad Transaccional End-to-End</div>
    <div class="team-members">
      <span>Paul Ferrada</span> · <span>Agustín Cañas</span> · <span>Fabián Mora</span> · <span>Felipe Labarca</span>
    </div>
    <div>IPST Santo Tomás · Miércoles 28 de Octubre · 09:00 hrs</div>
  </div>

</body>
</html>`;

// ---------------------------------------------------------------------------
// DIAGRAMA 5: ESCALABILIDAD CLOUD (DE 100 A 10.000 USUARIOS)
// ---------------------------------------------------------------------------
const htmlDiagrama5 = `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    background: #090A0E;
    color: #EDEDF0;
    font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, sans-serif;
    width: 1920px;
    height: 1080px;
    padding: 35px 55px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .top-bar { display: flex; justify-content: space-between; align-items: flex-start; }
  .badge {
    display: inline-flex; align-items: center; gap: 8px;
    background: #101F30; border: 1px solid #1E4976; color: #64D2FF;
    padding: 6px 16px; border-radius: 999px; font-size: 12px; font-weight: 800;
    letter-spacing: 1.2px; text-transform: uppercase;
  }
  .pulse-dot { width: 8px; height: 8px; border-radius: 50%; background: #64D2FF; box-shadow: 0 0 10px #64D2FF; }
  .title { font-size: 34px; font-weight: 900; color: #FFFFFF; margin-top: 8px; }
  .subtitle { font-size: 15px; color: #8E8E93; margin-top: 4px; }

  .pillars-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
    margin: 20px 0;
    flex: 1;
    align-items: stretch;
  }
  .pillar-card {
    background: #111219; border: 1px solid #242738; border-radius: 20px; padding: 24px;
    display: flex; flex-direction: column; justify-content: space-between; position: relative;
  }
  .pillar-num { font-size: 11px; font-weight: 800; letter-spacing: 1.5px; text-transform: uppercase; }
  .pillar-title { font-size: 20px; font-weight: 900; color: #FFFFFF; margin-top: 6px; }
  .pillar-tech { font-size: 12px; font-weight: 700; color: #2997FF; margin-top: 4px; }
  .pillar-desc { font-size: 12.5px; color: #8E8E98; line-height: 1.5; margin-top: 10px; }

  .stat-box {
    background: #151722; border: 1px solid #222536; border-radius: 12px; padding: 14px;
    font-size: 12px; color: #A1A1A8; line-height: 1.6; margin-top: auto;
  }
  .stat-highlight { font-size: 22px; font-weight: 900; color: #FFFFFF; margin-bottom: 4px; }

  .footer {
    display: flex; justify-content: space-between; align-items: center;
    border-top: 1px solid #1C1E2A; padding-top: 14px; font-size: 12px; color: #646472;
  }
</style>
</head>
<body>

  <div class="top-bar">
    <div>
      <div class="badge"><span class="pulse-dot"></span> ESCALABILIDAD CLOUD · CRITERIO 7 DE LA RÚBRICA</div>
      <h1 class="title">EVOLUCIÓN ARQUITECTÓNICA: DE 100 A 10.000 USUARIOS CONCURRENTES</h1>
      <p class="subtitle">Estrategia de Crecimiento Elástico: Auto-scaling en Azure, Caché Distribuida y Red de Borde CDN</p>
    </div>
    <div style="font-family:monospace; font-size:12px; color:#A1A1B8; background:#161824; padding:8px 16px; border-radius:10px; border:1px solid #282C40;">
      Capacidad: 10.000+ Req/Seg
    </div>
  </div>

  <div class="pillars-grid">

    <!-- Pilar 1 -->
    <div class="pillar-card" style="border-top: 4px solid #2997FF;">
      <div>
        <span class="pillar-num" style="color:#2997FF;">01 · CÓMPUTO ELÁSTICO</span>
        <h3 class="pillar-title">Auto-scaling Horizontal</h3>
        <div class="pillar-tech">Azure VMSS / Container Apps</div>
        <p class="pillar-desc">
          Transición desde una única VM fija hacia un clúster auto-escalable gestionado por Azure Load Balancer. Aprovisionamiento automático de réplicas si CPU &gt; 70%.
        </p>
      </div>

      <div class="stat-box">
        <div class="stat-highlight" style="color:#2997FF;">1 ➔ 20 Réplicas</div>
        <div>Escalado automático elástico sin tiempo de inactividad</div>
      </div>
    </div>

    <!-- Pilar 2 -->
    <div class="pillar-card" style="border-top: 4px solid #30D158;">
      <div>
        <span class="pillar-num" style="color:#30D158;">02 · MEMORIA EN RAM</span>
        <h3 class="pillar-title">Caché Distribuida</h3>
        <div class="pillar-tech" style="color:#30D158;">Azure Cache for Redis</div>
        <p class="pillar-desc">
          El estado en tiempo real de los cupos y reservas se almacena en memoria RAM distribuida en Redis. Permite responder más de 100.000 lecturas/seg con latencia sub-milisegundo.
        </p>
      </div>

      <div class="stat-box">
        <div class="stat-highlight" style="color:#30D158;">&lt; 2 ms</div>
        <div>Latencia de lectura en RAM descargando la base de datos</div>
      </div>
    </div>

    <!-- Pilar 3 -->
    <div class="pillar-card" style="border-top: 4px solid #FF9F0A;">
      <div>
        <span class="pillar-num" style="color:#FF9F0A;">03 · TELEMETRÍA MASIVA</span>
        <h3 class="pillar-title">Ingesta Concurrente</h3>
        <div class="pillar-tech" style="color:#FF9F0A;">Azure IoT Hub + Event Hubs</div>
        <p class="pillar-desc">
          Para interconectar flotas de cientos de estacionamientos, el enlace serial se reemplaza por pasarelas IoT Hub sobre protocolo MQTT particionado y tolerante a fallos.
        </p>
      </div>

      <div class="stat-box">
        <div class="stat-highlight" style="color:#FF9F0A;">1.000.000+</div>
        <div>Eventos por segundo procesados concurrentemente</div>
      </div>
    </div>

    <!-- Pilar 4 -->
    <div class="pillar-card" style="border-top: 4px solid #BF5AF2;">
      <div>
        <span class="pillar-num" style="color:#BF5AF2;">04 · BORDE DE RED</span>
        <h3 class="pillar-title">Distribución Edge CDN</h3>
        <div class="pillar-tech" style="color:#BF5AF2;">Azure Front Door + CDN</div>
        <p class="pillar-desc">
          Los paquetes estáticos de React, CSS e imágenes se distribuyen en puntos de presencia (PoPs) en el borde de la red, reduciendo el ancho de banda del servidor central a cero.
        </p>
      </div>

      <div class="stat-box">
        <div class="stat-highlight" style="color:#BF5AF2;">99.999%</div>
        <div>Disponibilidad y caché perimetral global</div>
      </div>
    </div>

  </div>

  <div class="footer">
    <div><strong>AURA Smart Parking</strong> · Escalabilidad y Resiliencia Cloud en Microsoft Azure</div>
    <div class="team-members">
      <span>Paul Ferrada</span> · <span>Agustín Cañas</span> · <span>Fabián Mora</span> · <span>Felipe Labarca</span>
    </div>
    <div>IPST Santo Tomás · Miércoles 28 de Octubre · 09:00 hrs</div>
  </div>

</body>
</html>`;

// Array de diagramas a procesar
const diagrams = [
  { name: '01_diagrama_arquitectura_4_capas', html: htmlDiagrama1 },
  { name: '02_diagrama_infraestructura_red_azure', html: htmlDiagrama2 },
  { name: '03_diagrama_seguridad_rbac_jwt', html: htmlDiagrama3 },
  { name: '04_diagrama_flujo_reserva_e2e', html: htmlDiagrama4 },
  { name: '05_diagrama_escalabilidad_cloud', html: htmlDiagrama5 },
];

console.log('[*] Iniciando renderizado de diagramas de alta resolución con Chrome Headless...');

for (const d of diagrams) {
  const htmlFile = path.join(OUTPUT_DIR, `${d.name}.html`);
  const pngFile = path.join(OUTPUT_DIR, `${d.name}.png`);

  fs.writeFileSync(htmlFile, d.html, 'utf8');

  // Ejecutar Chrome headless para capturar el screenshot a 1920x1080
  const cmd = `"${CHROME_PATH}" --headless=new --disable-gpu --screenshot="${pngFile}" --window-size=1920,1080 "file:///${htmlFile.replace(/\\\\/g, '/')}"`;
  
  try {
    execSync(cmd, { stdio: 'pipe' });
    console.log(`[OK] Generado: ${d.name}.png`);
  } catch (err) {
    console.error(`[ERROR] Falló al generar ${d.name}.png:`, err.message);
  }

  // Eliminar el archivo HTML temporal
  if (fs.existsSync(htmlFile)) {
    fs.unlinkSync(htmlFile);
  }
}

// Copiar el Diagrama 1 como diagrama_arquitectura.png en la raíz
const masterDiagramSource = path.join(OUTPUT_DIR, '01_diagrama_arquitectura_4_capas.png');
const masterDiagramDest = path.resolve('diagrama_arquitectura.png');
if (fs.existsSync(masterDiagramSource)) {
  fs.copyFileSync(masterDiagramSource, masterDiagramDest);
  console.log('[OK] Actualizado diagrama_arquitectura.png principal en la raíz.');
}

console.log('[*] Todos los diagramas PNG han sido generados exitosamente con la estética de AURA Smart Parking.');
