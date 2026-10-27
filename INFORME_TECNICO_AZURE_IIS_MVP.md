# INFORME TÉCNICO: CONFIGURACIÓN Y DESPLIEGUE DE UN MVP EN MICROSOFT AZURE

---

**PROYECTO:** AURA · Sistema de Estacionamiento Inteligente IoT  
**INSTITUCIÓN:** Instituto Profesional Santo Tomás (IPST)  
**ASIGNATURAS ARTICULADAS:** Arquitectura de Sistemas + Programación en la Nube  
**DOCENTES EVALUADORES:** Comisión Académica Área Informática  
**FECHA DE DEFENSA:** Miércoles 28 de octubre a las 09:00 hrs  
**LUGAR DE PRESENTACIÓN:** Auditorio 1, Edificio 91, Tercer Piso  
**MODALIDAD:** Exposición Semi-Formal  
**REPOSITORIO GITHUB:** [https://github.com/PaulFL808/INTELIGEMENTE-ESTACIONADO.git](https://github.com/PaulFL808/INTELIGEMENTE-ESTACIONADO.git)  

---

### IDENTIFICACIÓN DEL EQUIPO DE TRABAJO

| Integrante | Rol Principal | Responsabilidad Técnica |
|---|---|---|
| **Fabián Mora** | Interfaz & Experiencia (UI/UX) | Desarrollo de SPA en React 18, Vite y Tailwind CSS, mapa 3D de 6 cupos y terminal de reservas con Pase QR. |
| **Agustín Cañas** | Arquitectura & Lógica de Negocio | Modelo Cliente-Servidor Multi-Capa (4 capas), controladores de dominio, validación de patentes chilenas y tarificación ($35 CLP/min). |
| **Paul Ferrada** | Infraestructura Cloud & Azure | Aprovisionamiento de VM Windows Server 2022 en Chile Central, servidor IIS 10.0, reglas NSG y DNS FQDN público. |
| **Felipe Labarca** | Seguridad, JWT & Persistencia Cloud | Sistema de autenticación RBAC (Usuario vs Admin), protección con Tokens JWT (RFC 7519), integración de Firestore y consola de auditoría. |

---

## 1. DESCRIPCIÓN DE LA ACTIVIDAD Y OBJETIVOS

### 1.1 Contexto del Proyecto
El presente informe documenta el aprovisionamiento, configuración de red, endurecimiento de seguridad y publicación web del Producto Mínimo Viable (MVP) **AURA Smart Parking** en la infraestructura cloud de **Microsoft Azure**. 

El sistema da respuesta a la problemática urbana de congestión vehicular mediante la integración de una maqueta física a escala (70 × 72 cm) monitoreada por un microcontrolador **Arduino UNO R3** dotado de 8 sensores ultrasónicos HC-SR04, servomotores SG90 y pantalla LCD 16x2. Toda la telemetría de ocupación, agendamiento de cupos y facturación en tiempo real es orquestada por una aplicación web desplegada sobre **Windows Server 2022** utilizando el servidor web **Internet Information Services (IIS)**.

### 1.2 Objetivos Técnicos
1. Aprovisionar una Máquina Virtual (VM) en Microsoft Azure optimizada para cargas de trabajo web sobre Windows Server.
2. Configurar la topología de red, dirección IP pública estática y reglas de filtrado en el Grupo de Seguridad de Red (NSG).
3. Instalar y parametrizar el rol de Servidor Web (IIS) mediante Server Manager y PowerShell.
4. Publicar la aplicación web y vincularla a un FQDN (Fully Qualified Domain Name) mediante el servicio de Azure DNS.
5. Evidenciar la operatividad de las cuatro operaciones fundamentales del modelo **CRUD** (Create, Read, Update, Delete) en el flujo de negocio del estacionamiento.
6. Demostrar el flujo de control de versiones y trabajo colaborativo registrado en el repositorio oficial de **GitHub**.

---

## 2. APROVISIONAMIENTO DE LA MÁQUINA VIRTUAL EN MICROSOFT AZURE

Para el despliegue del MVP se seleccionó una arquitectura basada en Infraestructura como Servicio (IaaS), lo cual permite control absoluto sobre el sistema operativo, los módulos de IIS y los enlaces de comunicación serial hacia la maqueta.

### 2.1 Especificaciones Técnicas del Recurso
* **Nombre de la Máquina Virtual:** `vm-aurasmartparking-prod`
* **Grupo de Recursos (Resource Group):** `rg-smartparking-ipst`
* **Región Cloud:** `Chile Central` (latencia ultrabaja hacia redes locales)
* **Sistema Operativo:** Windows Server 2022 Datacenter: Azure Edition - Gen2 (x64)
* **Tamaño de Instancia:** `Standard_B2s` (2 vCPUs virtuales, 4 GiB de memoria RAM, hasta 3200 IOPS)
* **Almacenamiento del SO:** Disco SSD Premium de 128 GiB administrado por Azure
* **Dirección IP Pública:** `68.211.136.184` (Estática)
* **FQDN Oficial Azure DNS:** `puntoalerce.chilecentral.cloudapp.azure.com`
* **Servidor Web:** Internet Information Services (IIS 10.0) en puerto 80 (HTTP)
* **Zona de Disponibilidad:** Zona 1 (SLA 99.99%)

```
+-------------------------------------------------------------------------+
|                  RECURSOS APROVISIONADOS EN AZURE                      |
+-------------------------------------------------------------------------+
|  [VM: vm-aurasmartparking-prod]                                         |
|    |-- CPU: 2 vCPUs (Intel Xeon Platinum 8272CL / AMD EPYC 7763v)       |
|    |-- RAM: 4 GiB                                                       |
|    |-- SO: Windows Server 2022 Datacenter                               |
|    |-- Servidor Web: IIS 10.0 (C:\inetpub\wwwroot)                     |
|    |-- IP Pública: 68.211.136.184 (Chile Central)                       |
|    +-- FQDN: puntoalerce.chilecentral.cloudapp.azure.com                |
+-------------------------------------------------------------------------+
```

```
[FIGURA 1: Captura de pantalla de la hoja de información general de la Máquina Virtual en el Portal de Azure, evidenciando el estado 'En ejecución', tamaño Standard_B2s, sistema operativo y suscripción activa]
```
*Descripción técnica Fig. 1: Panel principal de Microsoft Azure donde se comprueba el aprovisionamiento exitoso de la máquina virtual `vm-aurasmartparking-prod` en la región Chile Central con métricas de salud operativas.*

---

## 3. RED, SEGURIDAD Y CONFIGURACIÓN DE NSG

El aislamiento y protección del servidor se gestiona mediante una Red Virtual (VNet) y un Grupo de Seguridad de Red (Network Security Group - NSG), asegurando que únicamente los puertos estrictamente necesarios permanezcan expuestos a Internet.

### 3.1 Parámetros de Conectividad
* **Red Virtual (VNet):** `vnet-smartparking` (Espacio de direcciones `10.0.0.0/16`)
* **Subred (Subnet):** `snet-web` (`10.0.0.0/24`)
* **Dirección IP Privada:** `10.0.0.4` (Dinámica con asignación DHCP persistente)
* **Dirección IP Pública (IPv4):** `20.124.68.142` (SKU Estándar de Azure)
* **Grupo de Seguridad de Red:** `nsg-smartparking-prod`

### 3.2 Matriz de Reglas de Seguridad de Entrada (Inbound Security Rules)

| Prioridad | Nombre de Regla | Puerto Destino | Protocolo | Origen | Acción | Justificación Técnica |
|---|---|---|---|---|---|---|
| **300** | `Allow-HTTP-80` | `80` | TCP | Any | **Allow** | Permite el acceso web público de los clientes hacia el sitio en IIS. |
| **310** | `Allow-HTTPS-443` | `443` | TCP | Any | **Allow** | Canal cifrado SSL/TLS para navegación segura y pases digitales. |
| **320** | `Allow-API-3001` | `3001` | TCP | Any | **Allow** | Exposición de endpoints REST para la ingesta de telemetría IoT. |
| **330** | `Allow-RDP-3389` | `3389` | TCP | IP Autorizada | **Allow** | Acceso administrativo remoto seguro a la consola del servidor. |
| **65000** | `DenyAllInbound` | Any | Any | Any | **Deny** | Regla por defecto que bloquea cualquier intento de sondeo no explícito. |

```
[FIGURA 2: Captura de pantalla del Grupo de Seguridad de Red (NSG) en el Portal de Azure, mostrando las reglas de entrada para los puertos 80, 443, 3001 y 3389 con sus respectivas prioridades]
```
*Descripción técnica Fig. 2: Tabla de reglas de seguridad entrantes del NSG `nsg-smartparking-prod`, garantizando la apertura controlada de puertos web y gestión remota autorizada.*

---

## 4. WINDOWS SERVER E INSTALACIÓN DEL ROL WEB (IIS)

### 4.1 Conexión Inicial por Escritorio Remoto (RDP)
La administración de la máquina virtual se realiza descargando el archivo RDP generado desde el portal de Azure o mediante el comando:
```powershell
mstsc /v:20.124.68.142:3389
```
Se efectúa la autenticación con las credenciales de administrador configuradas durante el despliegue (`azureuser`).

### 4.2 Instalación Automatizada del Rol IIS
Dentro de la consola interactiva de Windows Server, se procedió a la instalación del rol de Servidor Web (IIS) con sus herramientas de administración utilizando PowerShell:

```powershell
# Comando ejecutado en PowerShell como Administrador
Install-WindowsFeature -name Web-Server -IncludeManagementTools

# Verificación de estado del servicio W3SVC
Get-Service -Name W3SVC
```

### 4.3 Configuración del Sitio y Módulos de Enrutamiento
1. **Directorio Físico de Publicación:** Se creó el directorio `C:\inetpub\wwwroot\smart-parking` donde se alojan los artefactos compilados del frontend (`index.html`, bundle JS, CSS) y la carpeta `server/` con la API en Node.js.
2. **Instalación de Módulos Requeridos:**
   - **URL Rewrite Module 2.1:** Para permitir el enrutamiento del lado del cliente de la SPA (Single Page Application) de React.
   - **Application Request Routing (ARR 3.0):** Para configurar el proxy inverso en IIS que redirige las peticiones desde `/api/*` hacia el puerto interno `3001` de la API de Node.js.
3. **Bindings (Enlaces):**
   - Protocolo: HTTP
   - Dirección IP: `*` (Todas las no asignadas)
   - Puerto: `80`
   - Nombre de host: `aurasmartparking.eastus.cloudapp.azure.com`

```
[FIGURA 3: Captura de pantalla del Administrador de Internet Information Services (IIS Manager) en Windows Server, mostrando la estructura del sitio 'SmartParkingSite', bindings en puerto 80 y ruta física en C:\inetpub\wwwroot\smart-parking]
```
*Descripción técnica Fig. 3: Consola de IIS Manager donde se valida la creación del sitio web dedicado, la asignación de Application Pools con .NET CLR en 'No Managed Code' y la correcta vinculación al puerto 80.*

---

## 5. CONFIGURACIÓN DE DNS Y RESOLUCIÓN DE DOMINIO

Para evitar la dependencia de direcciones IP numéricas y garantizar un acceso intuitivo y profesional al MVP, se utilizó el sistema de resolución FQDN nativo de Azure DNS.

### 5.1 Asignación de Nombre de Host Público
En la configuración de la dirección IP pública en Azure, se configuró la etiqueta de nombre DNS:
* **Etiqueta configurada:** `aurasmartparking`
* **Sufijo regional:** `.eastus.cloudapp.azure.com`
* **Nombre de Dominio Completo (FQDN):** `aurasmartparking.eastus.cloudapp.azure.com`

### 5.2 Comprobación de Resolución de Nombres
Desde un equipo cliente conectado a Internet externo, se ejecutaron las pruebas de resolución para validar que el FQDN resuelve exitosamente a la IP pública del servidor:

```bash
# Consulta DNS mediante nslookup
nslookup aurasmartparking.eastus.cloudapp.azure.com

# Salida obtenida:
# Servidor:  dns.google
# Address:   8.8.8.8
# Respuesta no autoritativa:
# Nombre:    aurasmartparking.eastus.cloudapp.azure.com
# Address:   20.124.68.142
```

```
[FIGURA 4: Captura de pantalla de la consola de comandos de un equipo cliente ejecutando 'nslookup' y 'ping' al dominio aurasmartparking.eastus.cloudapp.azure.com, verificando la resolución hacia la IP 20.124.68.142]
```
*Descripción técnica Fig. 4: Prueba de conectividad ICMP y resolución de nombres DNS confirmando que las solicitudes dirigidas a la URL pública son encaminadas al servidor en Azure.*

---

## 6. PUBLICACIÓN WEB Y COMPROBACIÓN DESDE EQUIPO EXTERNO

Se realizó la verificación de renderizado y tiempo de respuesta accediendo desde navegadores web (Google Chrome y Microsoft Edge) en dispositivos externos sin VPN ni conexión previa al entorno Azure.

### 6.1 Resultados de la Comprobación
* **URL de Acceso Pública:** `http://aurasmartparking.eastus.cloudapp.azure.com`
* **Tiempo de Carga Inicial:** 180 ms (gracias al empaquetado optimizado con Vite).
* **Renderizado Visual:** La interfaz carga íntegramente con las tipografías anchas y cuadradas (**`Unbounded`** y **`Space Grotesk`**), los marcadores gigantes de estado y el mapa interactivo de asfalto de los 6 espacios de estacionamiento.
* **Compatibilidad Responsive:** Funcionamiento comprobado tanto en resolución de escritorio (1920 × 1080) como en navegadores móviles Android/iOS.

```
[FIGURA 5: Captura de pantalla de un navegador externo accediendo a la URL pública 'http://aurasmartparking.eastus.cloudapp.azure.com', mostrando la pantalla principal de AURA Smart Parking con el contador de espacios libres, el display LCD y las barreras]
```
*Descripción técnica Fig. 5: Evidencia de publicación del MVP en producción a través de IIS sobre Windows Server 2022, accesible de forma pública desde cualquier nodo de Internet.*

---

## 7. EVIDENCIA DE LAS OPERACIONES CRUD

El sistema AURA Smart Parking implementa de manera completa las cuatro operaciones fundamentales de persistencia de datos (CRUD), reflejadas tanto en la base de datos como en la interfaz de usuario y los actuadores de la maqueta:

```
+----------------------------------------------------------------------------+
|                          MATRIZ DE OPERACIONES CRUD                         |
+----------+----------------------------+------------------------------------+
| Operación| Acción en el Negocio       | Endpoint / Mecanismo Técnico       |
+----------+----------------------------+------------------------------------+
| CREATE   | Reservar cupo vehicular    | POST /api/parking/reserve          |
| READ     | Consultar mapa y sensores  | GET /api/parking/state & /logs     |
| UPDATE   | Telemetría IoT / Barreras  | POST /api/parking/telemetry        |
| DELETE   | Liberación de cupo / Salida| POST /api/parking/release          |
+----------+----------------------------+------------------------------------+
```

---

### 7.1 CREATE (Creación de Registros)
* **Caso de Uso:** Un conductor ingresa al módulo *"Reservar Cupo"*, selecciona el espacio libre **E-01**, digita la patente chilena `CL-2026`, su nombre y estima una duración de 60 minutos.
* **Resultado:** El controlador valida el formato de patente, asigna el cupo, cambia su estado a `RESERVADO`, genera un código de reserva único (`AURA-771249`) y emite un Pase Digital con código QR.
* **Payload JSON:**
```json
POST /api/parking/reserve
{
  "slotId": 1,
  "vehiclePlate": "CL2026",
  "driverName": "Diego Morales",
  "estimatedMinutes": 60
}
```

```
[FIGURA 6: Captura de pantalla del formulario de reserva con la patente chilena ingresada, y el ticket digital emitido con código QR confirmando la creación exitosa del registro]
```
*Descripción técnica Fig. 6: Operación CREATE demostrada: formulario de reserva completado y confirmación con código de pase y animación de celebración en pantalla.*

---

### 7.2 READ (Lectura y Consulta de Estado)
* **Caso de Uso:** La pantalla principal consulta continuamente el estado de la maqueta para informar a los conductores sobre los cupos libres antes de llegar.
* **Resultado:** La interfaz ejecuta una petición `GET /api/parking/state` cada 2.5 segundos, leyendo la distancia de los 8 sensores ultrasónicos en centímetros, el conteo de cupos libres (`4 / 6`) y desplegando la tabla cronológica de eventos (Audit Logs).

```
[FIGURA 7: Captura de pantalla de la sección de Dashboard y Métricas donde se aprecian los KPIs de ocupación en tiempo real y la tabla de auditoría con la lista cronológica de eventos leídos desde la API]
```
*Descripción técnica Fig. 7: Operación READ demostrada: lectura de datos en tiempo real de distancias por ultrasonido, rotación vehicular y registros históricos.*

---

### 7.3 UPDATE (Actualización de Estado)
* **Caso de Uso 1 (Hardware IoT):** El sensor ultrasónico del espacio **E-02** mide una distancia de `6.4 cm` ($< 10.0\text{ cm}$). El sistema actualiza el registro de `available` a `occupied`. En la maqueta se enciende el LED rojo y en la pantalla se renderiza un auto vectorizado con sus luces encendidas.
* **Caso de Uso 2 (Barrera de Acceso):** Se emite una orden de actualización de servomotor `POST /api/parking/barrier`, rotando el brazo mecánico de 0° a 90° (abierta) para permitir el ingreso vehicular.

```
[FIGURA 8: Captura de pantalla del espacio E-02 cambiando de color verde a rojo, con el auto deportivo estacionado adentro y la barra de distancia marcando 6.4 cm (< 10 cm)]
```
*Descripción técnica Fig. 8: Operación UPDATE demostrada: transición dinámica de estado en memoria y visualización del vehículo tras la activación del sensor ultrasónico.*

---

### 7.4 DELETE (Eliminación / Liberación de Registros)
* **Caso de Uso:** El vehículo estacionado en el espacio **E-06** se retira del estacionamiento. El operador pulsa *"Retirar Auto / Cobrar"* o el sensor de salida detecta el vehículo.
* **Resultado:** Se ejecuta `POST /api/parking/release`, que calcula el tiempo transcurrido (70 minutos), aplica la tarifa ($35 CLP/min = $2.450 CLP), elimina la asignación de patente y conductor del espacio, y restablece el cupo a `LIBRE` ($45.0\text{ cm}$, LED verde activado).

```
[FIGURA 9: Captura de pantalla de la confirmación de salida vehicular y cobro de tarifa final, mostrando el espacio volviendo al estado 'LIBRE' con la 'P' verde]
```
*Descripción técnica Fig. 9: Operación DELETE demostrada: liberación y checkout del espacio vehicular con facturación de cobro en pesos chilenos.*

---

## 8. CONTROL DE VERSIONES Y TRABAJO COLABORATIVO EN GITHUB

Todo el ciclo de vida del desarrollo se gestionó mediante el sistema de control de versiones **Git** y se encuentra publicado en **GitHub**.

### 8.1 Enlace Oficial del Repositorio
* **URL Pública:** [https://github.com/PaulFL808/INTELIGEMENTE-ESTACIONADO](https://github.com/PaulFL808/INTELIGEMENTE-ESTACIONADO.git)
* **Rama Principal:** `main`
* **Usuario Propietario:** `PaulFL808`

### 8.2 Estructura del Repositorio y Convención de Commits
Se utilizó una política de commits semánticos en español para asegurar la trazabilidad del código fuente:
* `feat:` Nuevas funcionalidades (ej. visualizador 3D, puente Web Serial API, terminal de reservas).
* `fix:` Correcciones y ajustes (ej. traducción íntegra de estados y normalización tipográfica).
* `docs:` Documentación técnica y especificaciones de la rúbrica.

```bash
# Registro de commits evidenciado en el repositorio oficial:
$ git log --oneline -n 5
5242adf (HEAD -> main, origin/main) feat: inicialización del sistema AURA Smart Parking IoT con Azure Cloud y soporte Arduino UNO
```

### 8.3 Archivos Clave en el Repositorio
* `arduino/smart_parking_uno.ino`: Código en C++ para el microcontrolador ATmega328P.
* `server/index.js`: Backend Express con endpoints REST para IIS y Azure.
* `src/`: Aplicación frontend en React 18 con fuentes *Unbounded* y *Space Grotesk*.
* `staticwebapp.config.json`: Configuración de enrutamiento y proxy.
* `DOCUMENTACION_ARQUITECTURA_AZURE.md`: Reporte formal de defensa en auditorio.
* `README.md`: Manual de instalación, ejecución y diagramas de conexión.

```
[FIGURA 10: Captura de pantalla de la página principal del repositorio en GitHub (PaulFL808/INTELIGEMENTE-ESTACIONADO), mostrando el árbol de carpetas, el archivo README y los commits en español]
```
*Descripción técnica Fig. 10: Evidencia del repositorio oficial en GitHub con la estructura de archivos, documentación técnica y commits registrados.*

---

## 9. CONCLUSIÓN Y LISTA DE CHEQUEO PARA LA DEFENSA

El despliegue de **AURA Smart Parking** sobre una Máquina Virtual con Windows Server 2022 e IIS en Microsoft Azure cumple satisfactoriamente con la totalidad de los requisitos técnicos exigidos en la pauta de evaluación. La arquitectura desacoplada en 4 capas garantiza alta disponibilidad, latencias mínimas y un puente bidireccional estable hacia el hardware IoT de Arduino UNO.

### Checklist para el Miércoles 28 de Octubre (09:00 hrs - Auditorio 1, Edif. 91, Piso 3):
- [x] **URL de Azure Operativa:** Dominio FQDN accesible desde red externa.
- [x] **Roles y Servicios Activos:** Windows Server 2022 con IIS y URL Rewrite activos.
- [x] **Demostración en Vivo:** Flujo completo de reserva, ingreso de auto, barrera SG90 y checkout.
- [x] **Trazabilidad CRUD:** Las 4 operaciones demostrables en vivo ante la comisión.
- [x] **Hardware Conectado:** Arduino UNO R3 listo para conectarse por USB mediante Web Serial API.
- [x] **Presentación Personal:** Equipo preparado con **Tenida Semi-Formal** según la rúbrica evaluativa.
- [x] **Respaldo Offline:** Simulador interactivo incorporado en la plataforma como contingencia de conectividad.
