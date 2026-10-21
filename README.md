# AURA · Estacionamiento Inteligente (Smart Parking IoT & Azure Cloud)

Sistema integral de estacionamiento inteligente con visualización en tiempo real, terminal de reservas con pases digitales QR, telemetría de hardware y arquitectura desplegable en **Microsoft Azure**.

Desarrollado para la actividad integradora de **Arquitectura de Sistemas + Programación en la Nube** (**IPST**).

---

## 🚗 Características Principales

1. **Monitoreo en Tiempo Real (Estacionamiento 3D):**
   - Representación visual tipo top-down de 6 espacios (E-01 a E-06).
   - Animación de autos entrando y saliendo en vivo.
   - Control interactivo de barreras mecánicas de acceso (Servomotores SG90 a 0° y 90°).
   - Réplica digital del display LCD 16x2 I2C con estado y conteo de cupos libres.
   - Indicador de distancia en centímetros con umbral físico ($< 10\text{ cm} \rightarrow \text{Ocupado}$).

2. **Terminal de Reservas & Pases Digitales:**
   - Asignación de cupo con validación de patente en formato chileno estándar.
   - Cálculo dinámico de tarifa por minuto ($35 CLP / min).
   - Generación de comprobante digital y código QR para validación en la barrera.

3. **Dashboard de Métricas & Auditoría (Logs):**
   - KPIs en vivo: Tasa de ocupación, rotación vehicular diaria, tiempo promedio de estadía y recaudación proyectada.
   - Gráfico de distribución de horas punta.
   - Registro cronológico de auditoría (logs) con trazabilidad de eventos.

4. **Puente IoT con Arduino UNO R3 & Web Serial API:**
   - Conexión directa USB desde el navegador mediante **Web Serial API** (sin necesidad de software intermedio).
   - Simulador interactivo con potenciómetros virtuales para calibrar los 8 sensores ultrasónicos HC-SR04.
   - Firmware en C++ listo para cargar desde el Arduino IDE (`arduino/smart_parking_uno.ino`).

5. **Defensa de Arquitectura Azure (15 Minutos en Auditorio):**
   - Diagrama interactivo de 4 capas: Presentación, Controladores API, Lógica de Negocio y Datos/IoT.
   - Trazabilidad en vivo de una solicitud (simulación interactiva de 5 etapas).
   - Banco de respuestas técnicas para la comisión evaluadora (escalabilidad a 10.000 usuarios, justificación frente a monolitos, servicios Azure).

---

## 🛠️ Tecnologías Utilizadas

- **Frontend:** React 18, Tailwind CSS, Lucide Icons, Canvas Confetti, Web Serial API.
- **Tipografías:** *Unbounded* (Display / Títulos anchos y cuadrados), *Space Grotesk* (UI moderna) y *JetBrains Mono* (Telemetría).
- **Backend / API:** Node.js, Express, CORS.
- **Nube:** Microsoft Azure (Azure App Service, Azure Static Web Apps, Azure Cosmos DB).
- **Hardware / Firmware:** Arduino UNO R3 (ATmega328P), C++, Sensores HC-SR04, Servos SG90, LCD 16x2 I2C.

---

## 🔌 Conexiones de Hardware (Arduino UNO R3)

| Componente | Pin en Arduino UNO | Función |
|---|---|---|
| **Disparo Global (Trig)** | Pin Digital 2 | Pulso compartido para los 6 sensores de cupos |
| **Echo Slots 1 al 6** | Pines Digitales 3, 4, 5, 6, 7 y 8 | Lectura de distancia por ultrasonido |
| **Servo Barrera Entrada** | Pin Digital 9 (PWM) | Apertura (90°) y cierre (0°) de acceso |
| **Servo Barrera Salida** | Pin Digital 10 (PWM) | Apertura (90°) y cierre (0°) de salida |
| **Trig Acceso Entrada/Salida** | Pin Analógico A0 | Disparo de sensores de barrera |
| **Echo Entrada / Salida** | Pines A1 y A2 | Detección vehicular en barreras |
| **Display LCD 16x2 I2C** | Pines A4 (SDA) y A5 (SCL) | Visualización física de cupos |
| **Comunicación Serial** | Puerto USB (9600 Baud) | Envío y recepción de paquetes JSON |

---

## 🚀 Instalación y Ejecución Local

### Prerrequisitos
- [Node.js](https://nodejs.org/) (versión 18 o superior).

### Pasos
1. Clonar el repositorio:
   ```bash
   git clone https://github.com/PaulFL808/INTELIGEMENTE-ESTACIONADO.git
   cd INTELIGEMENTE-ESTACIONADO
   ```

2. Instalar dependencias:
   ```bash
   npm install
   ```

3. Compilar el frontend:
   ```bash
   npm run build
   ```

4. Iniciar el servidor:
   ```bash
   npm start
   ```

5. Abrir en el navegador:
   ```
   http://localhost:3001
   ```

*(En Windows también puedes ejecutar directamente haciendo doble clic en `start_app.bat`).*

---

## 📡 Endpoints de la API REST

- `GET /api/parking/state`: Retorna el estado completo de los 6 espacios, barreras y resumen métrico.
- `POST /api/parking/reserve`: Genera una reserva validando patente y disponibilidad.
- `POST /api/parking/release`: Libera un espacio y emite el cobro según el tiempo de estadía.
- `POST /api/parking/telemetry`: Endpoint de ingesta de telemetría de sensores HC-SR04 (`{ slotId, distanceCm }`).
- `POST /api/parking/barrier`: Control manual y automático de servomotores de barrera (`{ gate, action }`).
- `GET /api/parking/logs`: Historial cronológico de eventos para auditoría.
- `POST /api/parking/reset`: Reinicio de datos a valores por defecto para pruebas.

---

## 📄 Documentación Técnica para la Rúbrica de Azure

En el archivo [`DOCUMENTACION_ARQUITECTURA_AZURE.md`](DOCUMENTACION_ARQUITECTURA_AZURE.md) se encuentra el desglose formal exigido en la pauta de evaluación de 100 puntos, incluyendo requerimientos funcionales/no funcionales, análisis de escalabilidad, justificación de servicios cloud y guion minuto a minuto para la defensa de 15 minutos en el auditorio.
