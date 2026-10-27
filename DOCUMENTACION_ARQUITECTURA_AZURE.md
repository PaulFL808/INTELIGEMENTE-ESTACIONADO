# DOCUMENTO DE ARQUITECTURA Y DEFENSA TÉCNICA EN MICROSOFT AZURE
## Proyecto Integrado: Estacionamiento Inteligente (Smart Parking IoT)
**Institución:** IPST (Instituto Profesional Santo Tomás)  
**Asignaturas Articuladas:** Arquitectura de Sistemas + Programación en la Nube  
**Repositorio Oficial GitHub:** https://github.com/PaulFL808/INTELIGEMENTE-ESTACIONADO.git  
**Tiempo de Exposición:** 15 Minutos en Auditorio  
**Puntaje Máximo:** 100 Puntos  

---

## 1. Definición del Problema y Justificación
Buscar estacionamiento en zonas urbanas densas genera pérdidas de tiempo, consumo innecesario de combustible, estrés y congestión vial. 
La solución **AURA Smart Parking** implementa una arquitectura conectada que automatiza la detección de espacios libres mediante una maqueta a escala física (70 × 72 cm), controlada por un microcontrolador **Arduino UNO R3**, y publica en tiempo real la disponibilidad, reservas y telemetría a través de una aplicación web escalable desplegada en **Microsoft Azure**.

---

## 2. Requerimientos del Sistema

### 2.1 Requerimientos Funcionales (RF)
1. **RF1 - Monitoreo en Vivo de Ocupación:** Visualización en tiempo real de los 6 espacios de estacionamiento (E-01 a E-06), indicando si están Disponibles, Reservados u Ocupados.
2. **RF2 - Detección Automatizada mediante Sensores:** Medición de distancia por ultrasonido (HC-SR04). Si la distancia detectada es menor a **10 cm**, el sistema marca automáticamente el espacio como **Ocupado** y enciende el LED rojo. Si es superior a 10 cm, el espacio se libera y el LED cambia a verde.
3. **RF3 - Terminal de Reservas y Agendamiento:** Capacidad de reservar un espacio indicando patente chilena (ej. `ABCD-12`), nombre del conductor y tiempo estimado, generando un comprobante digital con código QR.
4. **RF4 - Control Automatizado de Barreras:** Apertura y cierre de las barreras de entrada y salida mediante servomotores SG90 (0° cerrada, 90° levantada).
5. **RF5 - Display LCD en Maqueta:** Pantalla LCD 16x2 I2C que muestra de forma autónoma el conteo de lugares libres (ej. `LIBRES: 4/6`) y el estado de disponibilidad.
6. **RF6 - Registro y Analíticas:** Panel de auditoría de eventos (logs con timestamp) y métricas de rotación vehicular, tiempo promedio de estadía y recaudación en pesos chilenos ($ CLP).

### 2.2 Requerimientos No Funcionales (RNF)
1. **RNF1 - Usabilidad y Estética:** Interfaz responsive y minimalista inspirada en el lenguaje de diseño de **Apple y Farfetch**, con tipografía sofisticada, jerarquía visual clara y micro-animaciones fluidas.
2. **RNF2 - Baja Latencia:** Actualización de telemetría y estado con tiempos de respuesta menores a 200 ms.
3. **RNF3 - Escalabilidad Cloud:** Capacidad de escalar de 100 a más de 10.000 usuarios concurrentes mediante auto-escalado horizontal en Azure.
4. **RNF4 - Integridad y Resiliencia:** Desacoplamiento entre la captura de hardware y la interfaz de usuario, garantizando funcionamiento incluso ante intermitencias de red mediante persistencia local y fallback.

---

## 3. Selección y Defensa de la Arquitectura

### 3.1 Arquitectura Elegida: Arquitectura por Capas con Servicios API Desacoplados
Se seleccionó una **Arquitectura en 4 Capas con API REST**:
1. **Capa de Presentación (Frontend SPA):** React 18, Tailwind CSS, Web Serial API para enlace directo por USB al Arduino UNO.
2. **Capa de Controladores / Servicios (Backend API):** Node.js y Express alojados en **Azure App Service**, exponiendo endpoints REST normalizados.
3. **Capa de Lógica de Negocio / Dominio:** Validación de formatos de patente, cálculo dinámico de tarifas ($35 CLP/minuto), y máquina de estados de ocupación vehicular.
4. **Capa de Persistencia y Hardware IoT:** Base de datos NoSQL **Azure Cosmos DB** (o Azure SQL), junto al controlador físico **Arduino UNO R3** comunicándose por Serial JSON a 9600 baudios.

### 3.2 ¿Por qué esta arquitectura y no otras alternativas?
- **Frente a un Monolito MVC tradicional:** En un MVC acoplado, el servidor renderiza el HTML en cada petición. Esto es ineficiente para telemetría IoT continua que emite paquetes cada 1 segundo. Al desacoplar el Frontend y la API, los sensores envían telemetría sin recargar páginas ni consumir recursos de renderizado en el servidor.
- **Frente a Serverless puro:** Si bien las Azure Functions son idóneas para eventos esporádicos, una conexión Serial o WebSocket continua hacia la maqueta requiere un entorno de ejecución persistente como Azure App Service. Se propone un enfoque híbrido donde Azure App Service gestiona la API central y Azure Functions procesa análisis de métricas por lotes.

### 3.3 Escalabilidad de 100 a 10.000 usuarios
- **Capa Web:** Azure Static Web Apps distribuye el frontend a nivel global mediante **Azure CDN**, absorbiendo miles de visitas concurrentes con costo mínimo y latencia sub-10ms.
- **Capa API:** Se activa la regla de **Scale-Out automático en Azure App Service Plan**, aumentando de 1 a 10 instancias cuando el uso de CPU supere el 70%.
- **Capa de Ingestión IoT:** Para flotas de cientos de estacionamientos, los datos se derivan a **Azure IoT Hub**, capaz de procesar millones de mensajes por segundo sobre protocolo MQTT.
- **Capa de Datos:** Implementación de **Azure Cache for Redis** para servir el estado de disponibilidad en memoria RAM con tiempos de lectura inferiores a 2 ms, y particionamiento en Cosmos DB por `parking_zone_id`.

---

## 4. Servicios Microsoft Azure Utilizados

| Servicio Azure | Rol en la Solución | Justificación Técnica |
|---|---|---|
| **Azure App Service** | Hospedaje del Backend API (Node.js) | Ofrece escalado automático, balanceo de carga integrado, certificados SSL automáticos y despliegue continuo desde GitHub. |
| **Azure Static Web Apps** | Hospedaje y distribución de la SPA React | Alta velocidad mediante red de distribución de contenido (CDN), soporte nativo para SPA y costo optimizado. |
| **Azure Cosmos DB / SQL** | Persistencia de datos transaccionales | Modelo de datos flexible para registros de telemetría y reservas vehiculares con alta disponibilidad SLA 99.999%. |
| **Azure IoT Hub** (Arquitectura a escala) | Puerta de enlace segura para dispositivos IoT | Ingestión bidireccional segura de telemetría desde Arduino y microcontroladores. |
| **Azure Monitor & App Insights** | Monitoreo y diagnóstico en tiempo real | Rastreo de excepciones, latencias de endpoints y tiempos de respuesta de cada capa. |

---

## 5. Integración de Hardware IoT (Maqueta Física)

### 5.1 Dispositivos Físicos Utilizados
- **Microcontrolador:** Arduino UNO R3 (microchip ATmega328P a 16 MHz).
- **8 Sensores Ultrasónicos HC-SR04:**
  - 6 sensores ubicados en los espacios E-01 a E-06.
  - 1 sensor en la entrada vehicular.
  - 1 sensor en la salida vehicular.
- **2 Servomotores SG90:** Accionamiento de las barreras de entrada (Pin 9) y salida (Pin 10).
- **12 Diodos LED:** Pares de LEDs verde (libre) y rojo (ocupado) por cada espacio.
- **1 Display LCD 16x2 con interfaz I2C:** Muestra conteo en vivo de espacios libres.
- **Canal de Comunicación:** Protocolo Serial bidireccional USB (9600 Baud) con formato de paquetes en JSON estándar compatible con la **Web Serial API** del navegador.

### 5.2 Lógica de Detección
$$\text{Distancia} = \frac{\text{Tiempo Eco} \times 0.0343}{2}$$
- Si $\text{Distancia} < 10.0\text{ cm} \rightarrow \text{Estado: OCUPADO}$ (LED Rojo activado).
- Si $\text{Distancia} \ge 10.0\text{ cm} \rightarrow \text{Estado: LIBRE}$ (LED Verde activado).

---

## 6. Organización del Equipo (4 Integrantes)

1. **Fabián Mora — Interfaz y Experiencia de Usuario (UI/UX):**  
   *Responsabilidad:* Diseño responsive en React 18, Vite y Tailwind CSS, mapa interactivo 3D de 6 plazas, animaciones vehiculares y terminal de reservas con emisión de Pase Digital QR.
2. **Agustín Cañas — Arquitectura de Software y Lógica de Negocio:**  
   *Responsabilidad:* Modelo Cliente-Servidor Multi-Capa (4 capas desacopladas), controladores de dominio, validación estricta de patentes chilenas y motor de tarificación automatizada a $35 CLP/minuto.
3. **Paul Ferrada — Infraestructura Cloud & DevOps (Microsoft Azure):**  
   *Responsabilidad:* Aprovisionamiento de Máquina Virtual Windows Server 2022 en Chile Central, servidor IIS 10.0 en puerto 80, reglas de seguridad NSG y resolución FQDN pública con Azure DNS (`puntoalerce.chilecentral.cloudapp.azure.com`).
4. **Felipe Labarca — Seguridad, Autenticación (JWT) & Persistencia Cloud:**  
   *Responsabilidad:* Sistema de autenticación y roles RBAC (Usuario Normal vs Admin), protección criptográfica con Tokens JWT (RFC 7519), integración de base de datos NoSQL con Firebase Firestore (`nubarda`) y consola de auditoría.

---

## 7. Estructura de la Presentación de 15 Minutos en Auditorio

| Tiempo | Sección | Contenido a Exponer por el Equipo |
|---|---|---|
| **0 – 2 min** | Problema y Objetivo | Congestión urbana, necesidad de estacionamientos inteligentes y objetivo de la solución AURA. |
| **2 – 5 min** | Arquitectura del Sistema | Explicación del diagrama de 4 capas, separación de responsabilidades y por qué se eligió API desacoplada. |
| **5 – 8 min** | Demostración en Vivo | Flujo real: reserva de un cupo en la web, emisión del pase QR, simulación de auto detectado a &lt;10 cm por sensor ultrasónico y apertura de barrera. |
| **8 – 10 min** | Servicios Azure | Muestra de los recursos creados en el Portal de Azure (App Service, Static Web Apps, configuración de red). |
| **10 – 13 min** | Defensa Técnica | Respuestas a preguntas: ¿Cómo escala a 10.000 usuarios?, ¿Qué pasa si falla el Arduino?, seguridad en la nube. |
| **13 – 15 min** | Cierre y Aprendizaje | Conclusiones, lecciones aprendidas en la articulación de software y hardware IoT en la nube. |
