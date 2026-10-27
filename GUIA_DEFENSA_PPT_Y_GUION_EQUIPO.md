# 🎤 GUÍA DE DEFENSA Y GUION DE PRESENTACIÓN PPT (15 MINUTOS)
## AURA · Smart Parking IoT & Microsoft Azure Cloud
**Instituto Profesional Santo Tomás (IPST) — Área Informática**  
**Articulación:** Arquitectura de Sistemas + Programación en la Nube  
**Fecha:** Miércoles 28 de Octubre — 09:00 hrs (Puntual) | **Lugar:** Auditorio 1, Edif. 91, Piso 3  
**Modalidad:** Tenida Semi-Formal | **Puntaje:** 100 Puntos  

---

## ⏱️ TABLA GENERAL DE REPARTO Y TIEMPOS (15 MINUTOS)

| Integrante | Rol Técnico | Diapositivas | Minutos | Temas Clave |
|---|---|:---:|:---:|---|
| **1. Fabián Mora** | Interfaz & Experiencia (UI/UX) | **Diapositivas 1 y 2** | `00:00 - 03:30` (3:30 min) | Saludo oficial, presentación del equipo, desafío urbano (30% tráfico buscando parking) y propuesta de valor AURA. |
| **2. Agustín Cañas** | Arquitectura & Lógica de Negocio | **Diapositivas 3 y 4** | `03:30 - 07:15` (3:45 min) | Modelo Cliente-Servidor Multi-Capa (4 capas), defensa técnica frente a MVC monolítico, patentes chilenas y tarificación ($35 CLP/min). |
| **3. Felipe Labarca** | Seguridad, JWT & Persistencia Cloud | **Diapositivas 5 y 6** | `07:15 - 11:00` (3:45 min) | Hardware IoT Arduino UNO R3, seguridad RBAC (Usuario vs Admin), Tokens JWT RFC 7519 y Demostración en Vivo de las 4 operaciones CRUD. |
| **4. Paul Ferrada** | Infraestructura Cloud & DevOps Azure | **Diapositivas 7, 8, 9 y 10** | `11:00 - 15:00` (4:00 min) | Azure IaaS en Chile Central (VM, Windows Server 2022, IIS 10.0, NSG, DNS), escalabilidad a 10.000 usuarios, síntesis de roles y cierre. |

---

## 🗣️ GUION DETALLADO DIAPOSITIVA POR DIAPOSITIVA

```
========================================================================================
BLOQUE 1: APERTURA Y PROBLEMÁTICA URBANA (FABIÁN MORA)
Tiempo: Minuto 0:00 a 3:30 | Diapositivas: 1 y 2
========================================================================================
```

### 📌 Diapositiva 1: Portada Oficial y Presentación del Equipo
* **Orador:** **Fabián Mora** (UI/UX)
* **Tiempo sugerido:** 1 minuto y medio (0:00 - 1:30)
* **Objetivo:** Captar la atención del jurado, saludar formalmente y presentar a los 4 integrantes con sus roles.

> **🎙️ Lo que debe decir Fabián:**
> *"Buenos días, profesores de la comisión evaluadora y compañeros presentes. Mi nombre es **Fabián Mora** y, junto a mi equipo compuesto por **Agustín Cañas**, **Paul Ferrada** y **Felipe Labarca**, tenemos el agrado de presentarles nuestro proyecto de título y defensa técnica:* ***AURA Smart Parking IoT***.
>
> *Este proyecto nace de la articulación directa entre las asignaturas de **Arquitectura de Sistemas** y **Programación en la Nube**. Nuestra solución combina hardware microcontrolado en terreno con una infraestructura empresarial de alta disponibilidad desplegada en la nube de **Microsoft Azure**, en la región **Chile Central**, accesible públicamente en internet y respaldada en nuestro repositorio oficial de GitHub.*
>
> *A continuación, revisaremos el problema real que nos motivó a construir esta plataforma."*

---

### 📌 Diapositiva 2: 01 · Contexto & Propósito (El Desafío Urbano vs La Solución AURA)
* **Orador:** **Fabián Mora** (UI/UX)
* **Tiempo sugerido:** 2 minutos (1:30 - 3:30)
* **Objetivo:** Demostrar con cifras la problemática de estacionamiento y cómo la UI/UX de AURA resuelve la fricción del usuario.

> **🎙️ Lo que debe decir Fabián:**
> *"Actualmente en las grandes ciudades de Chile y el mundo, hasta un **30% del tráfico vehicular** en horario punta proviene exclusivamente de conductores buscando dónde estacionar. Esto significa que un usuario promedio pierde entre **15 y 25 minutos** por trayecto dando vueltas en ralentí, lo que genera congestión crítica, mayor huella de carbono y frustración innecesaria por la gestión arcaica de garitas con tickets manuales de papel.*
>
> *Frente a este escenario, diseñamos **AURA**: un ecosistema inteligente que conecta el mundo físico con la nube. Como encargado de la interfaz y experiencia de usuario (UI/UX), desarrollé una Single Page Application moderna e intuitiva en **React 18** y **Tailwind CSS**, inspirada en la sobriedad y fluidez visual de Apple y Farfetch. El conductor puede verificar en tiempo real la disponibilidad de los 6 cupos en un plano interactivo, reservar con su patente chilena y recibir un **Pase Digital QR** al instante.*
>
> *Para sostener esta experiencia sin recargas de pantalla y con alta disponibilidad, fue fundamental diseñar una arquitectura de software robusta. Para explicar este pilar técnico, le cedo la palabra a mi compañero **Agustín Cañas**."*

---

```
========================================================================================
BLOQUE 2: ARQUITECTURA DE SOFTWARE Y DEFENSA TÉCNICA (AGUSTÍN CAÑAS)
Tiempo: Minuto 3:30 a 7:15 | Diapositivas: 3 y 4
========================================================================================
```

### 📌 Diapositiva 3: 02 · Arquitectura de Sistemas (Modelo Cliente-Servidor Multi-Capa en 4 Capas)
* **Orador:** **Agustín Cañas** (Arquitectura & Lógica de Negocio)
* **Tiempo sugerido:** 2 minutos (3:30 - 5:30)
* **Objetivo:** Explicar el diagrama arquitectónico de 4 capas desacopladas y cómo fluyen los datos.

> **🎙️ Lo que debe decir Agustín:**
> *"Muchas gracias, Fabián. Buenos días, profesores. Como responsable de la Arquitectura de Software y la Lógica de Negocio, mi objetivo fue garantizar que el sistema fuese modular, altamente cohesivo y de bajo acoplamiento.*
>
> *Estructuramos la solución bajo un **Modelo Cliente-Servidor Multi-Capa (N-Tier Decoupled Architecture)** distribuido en 4 capas estrictamente separadas:*
>
> 1. ***Capa 1 - Presentación & UX (Frontend):** Construida como SPA en React 18, ejecutada en el navegador del cliente. No realiza cómputos pesados; solo renderiza el estado y captura interacciones.*
> 2. ***Capa 2 - Alojamiento & Servidor Web:** Servida por una Máquina Virtual con Windows Server 2022 e Internet Information Services (IIS 10.0) en Microsoft Azure, que actúa como puerta de enlace y despachador optimizado.*
> 3. ***Capa 3 - Lógica de Negocio & Controladores de Dominio:** Donde residen las reglas de negocio puras: validación de patentes chilenas bajo norma del Registro Civil (formato BB·CD·12), máquina de estados vehiculares (Disponible, Reservado, Ocupado) y cálculo automatizado de tarifas a **$35 pesos por minuto**.*
> 4. ***Capa 4 - Persistencia Cloud en Tiempo Real:** Implementada con la base de datos NoSQL Firebase Firestore (proyecto `nubarda`), con sincronización instantánea multi-dispositivo vía WebSockets y enlace hacia el hardware.*
>
> *Este desacoplamiento nos permite modificar cualquier capa sin quebrar el resto del sistema."*

---

### 📌 Diapositiva 4: 03 · Defensa Técnica (Justificación frente a Alternativas y Pauta)
* **Orador:** **Agustín Cañas** (Arquitectura & Lógica de Negocio)
* **Tiempo sugerido:** 1 minuto y 45 segundos (5:30 - 7:15)
* **Objetivo:** Responder por qué no se usó un monolito MVC tradicional y defender el modelo desacoplado ante la pauta de evaluación.

> **🎙️ Lo que debe decir Agustín:**
> *"Durante la toma de decisiones arquitectónicas, evaluamos alternativas tradicionales exigidas en la pauta:*
>
> * **¿Por qué no usamos un patrón MVC monolítico tradicional?** *En un MVC clásico (como PHP o ASP.NET clásico), cada cambio de estado vehicular obligaría al servidor a renderizar de nuevo la vista HTML completa, consumiendo ancho de banda y provocando parpadeos con latencias superiores a 500 ms. Al separar el Cliente (React) del Servidor (IIS + Cloud API), el cliente solo descarga datos JSON livianos de menos de 200 bytes, logrando respuestas en menos de 50 ms.*
> * **¿Por qué WebSockets y no Polling HTTP repetitivo?** *Hacer peticiones HTTP cada segundo satura la red y colapsa la máquina virtual. Con canales de escucha en tiempo real (`onSnapshot`), el servidor solo empuja datos cuando un sensor cambia de estado.*
>
> *En resumen: alta disponibilidad, resiliencia frente a caídas y nulo impacto en el rendimiento del servidor.*
>
> *Para ver cómo interactúa esta arquitectura con los sensores y el circuito físico, los dejo con mi compañero **Felipe Labarca**."*

---

```
========================================================================================
BLOQUE 3: IOT, SEGURIDAD RBAC/JWT Y DEMOSTRACIÓN CRUD EN VIVO (FELIPE LABARCA)
Tiempo: Minuto 7:15 a 11:00 | Diapositivas: 5 y 6
========================================================================================
```

### 📌 Diapositiva 5: 04 · Integración IoT (Hardware, Sensores y Circuito Arduino UNO R3)
* **Orador:** **Felipe Labarca** (Seguridad & Persistencia Cloud)
* **Tiempo sugerido:** 1 minuto y medio (7:15 - 8:45)
* **Objetivo:** Explicar la maqueta física de 70x72 cm, los 8 sensores ultrasónicos y la seguridad criptográfica implementada.

> **🎙️ Lo que debe decir Felipe:**
> *"Muchas gracias, Agustín. Buenos días, profesores. Mi responsabilidad en el proyecto abarca la integración del hardware IoT, la persistencia en la base de datos cloud y la seguridad del sistema.*
>
> *En la maqueta física de 70 por 72 centímetros, contamos con un microcontrolador **Arduino UNO R3** operando con firmware autónomo en C++. El circuito dispone de **8 sensores ultrasónicos HC-SR04**: 6 dedicados a monitorear la distancia de cada plaza individual y 2 en las barreras de acceso. Cuando un vehículo se posiciona a menos de 10 centímetros, el sensor conmuta a estado Ocupado en menos de 50 milisegundos. Además, cuenta con un display LCD 16x2 que muestra los cupos libres de forma autónoma, y servomotores SG90 para las barreras.*
>
> *Asimismo, implementamos **Seguridad RBAC** (Role-Based Access Control) y **Tokens criptográficos JWT (RFC 7519)** con algoritmo HMAC-SHA256. El sistema discrimina estrictamente dos perfiles:*
> * El **Usuario Conductor:** Que solo puede visualizar disponibilidad y generar su pase QR (las opciones de administración quedan 100% ocultas del DOM).*
> * El **Administrador:** Que cuenta con el token Bearer para ejecutar auditorías, ver métricas financieras y operar la base de datos.*
>
> *A continuación, pasaremos a la Diapositiva 6 para evidenciar en vivo las 4 operaciones CRUD requeridas por la rúbrica."*

---

### 📌 Diapositiva 6: 05 · Demostración en Vivo y Verificación de Operaciones CRUD
* **Orador:** **Felipe Labarca** (con apoyo en vivo de Fabián en la pantalla)
* **Tiempo sugerido:** 2 minutos y 15 segundos (8:45 - 11:00)
* **Objetivo:** Demostrar ante el jurado que se cumplen las 4 operaciones CRUD (Create, Read, Update, Delete) en vivo.

> **🎙️ Lo que debe decir Felipe:**
> *(Fabián o Felipe proyectan la web pública en vivo en el navegador)*
> *"Para cumplir con el requerimiento de verificación funcional de la pauta, demostraremos las 4 operaciones del estándar CRUD directamente sobre la nube:*
>
> 1. ***CREATE (Creación de Reserva):** El usuario ingresa la patente `CL-9021`, su nombre y confirma la reserva de la Plaza 3. El sistema valida el formato, genera el documento en Firestore y emite el **Pase Digital QR**.*
> 2. ***READ (Lectura en Tiempo Real):** El mapa 3D y el panel de telemetría reflejan al instante que la Plaza 3 cambió a estado 'Reservado' (en color ámbar), sincronizado en todos los navegadores conectados sin recargar la página.*
> 3. ***UPDATE (Actualización de Estado Vehicular):** Al ingresar el auto físico (o mediante la detección del sensor), el estado muta de 'Reservado' a 'Ocupado' (color rojo), iniciándose el cronómetro de cobro fraccionado a $35 pesos el minuto.*
> 4. ***DELETE (Liberación y Checkout):** Al retirarse el vehículo, se liquida la estadía, se calcula el total facturado, se libera la plaza en Firestore y vuelve a quedar en estado 'Disponible' (color verde).*
>
> *Con esto demostramos la integridad transaccional del sistema y el cumplimiento al 100% del ciclo CRUD.*
>
> *Ahora, mi compañero **Paul Ferrada** les explicará la infraestructura cloud en Microsoft Azure que hace posible todo esto."*

---

```
========================================================================================
BLOQUE 4: INFRAESTRUCTURA AZURE, ESCALABILIDAD Y CIERRE (PAUL FERRADA)
Tiempo: Minuto 11:00 a 15:00 | Diapositivas: 7, 8, 9 y 10
========================================================================================
```

### 📌 Diapositiva 7: 06 · Despliegue Cloud (Infraestructura & Servicios en Microsoft Azure)
* **Orador:** **Paul Ferrada** (Infraestructura Cloud & DevOps)
* **Tiempo sugerido:** 1 minuto y 15 segundos (11:00 - 12:15)
* **Objetivo:** Evidenciar los recursos de Azure, Windows Server 2022, IIS 10.0, NSG y resolución DNS pública.

> **🎙️ Lo que debe decir Paul:**
> *"Muchas gracias, Felipe. Profesores, como encargado de la Infraestructura Cloud y DevOps del proyecto, tuve la misión de implementar un entorno de producción empresarial dentro de **Microsoft Azure**.*
>
> *Aprovisionamos una Máquina Virtual IaaS con sistema operativo **Windows Server 2022 Datacenter: Azure Edition** en la región local **Chile Central**, lo que nos asegura una latencia nacional mínima.*
>
> *Dentro del servidor configuramos **Internet Information Services (IIS 10.0)** en el puerto 80, sirviendo el aplicativo optimizado desde `C:\inetpub\wwwroot`.*
>
> *A nivel de seguridad de red, configuramos un **Network Security Group (NSG)** con dos reglas estrictas:*
> * **Puerto 80 (HTTP):** Para el acceso público de los usuarios desde cualquier lugar del mundo.
> * **Puerto 3389 (RDP):** Restringido exclusivamente para tareas de administración remota del servidor.
>
> *Adicionalmente, asociamos una dirección IP pública estática (`68.211.136.184`) y configuramos el servicio **Azure DNS** con el nombre FQDN oficial:* ***`http://puntoalerce.chilecentral.cloudapp.azure.com`***, *el cual está operativo en vivo en estos momentos."*

---

### 📌 Diapositiva 8: 07 · Escalabilidad Cloud (Evolución Arquitectónica: 100 a 10.000 Usuarios)
* **Orador:** **Paul Ferrada** (Infraestructura Cloud & DevOps)
* **Tiempo sugerido:** 1 minuto y 15 segundos (12:15 - 13:30)
* **Objetivo:** Defender técnicamente cómo la arquitectura soporta el crecimiento elástico según la pauta de evaluación.

> **🎙️ Lo que debe decir Paul:**
> *"Uno de los puntos clave evaluados en la rúbrica es:* ***¿Cómo responde nuestra solución si pasa de 100 a más de 10.000 usuarios concurrentes?***
>
> *Nuestra arquitectura fue diseñada desde el inicio con una hoja de ruta de escalabilidad elástica en 4 fases:*
>
> 1. ***Virtual Machine Scale Sets (VMSS):** Reemplazar la máquina virtual única por un clúster auto-escalable detrás de un **Azure Load Balancer**. Si la CPU supera el 70%, Azure aprovisiona réplicas automáticamente.*
> 2. ***Azure Cache for Redis:** Trasladar la consulta del mapa de cupos a memoria RAM distribuida, permitiendo atender más de 100.000 lecturas por segundo con latencias inferiores a **2 milisegundos**.*
> 3. ***Azure IoT Hub:** Para escalar a nivel nacional con cientos de estacionamientos, la comunicación serial se reemplaza por pasarelas IoT Hub basadas en **MQTT particionado**, procesando millones de eventos por segundo.*
> 4. ***Azure Front Door & Edge CDN:** Distribución geográfica de los activos estáticos en el borde de la red, reduciendo a cero la saturación de los servidores centrales.*
>
> *De este modo, garantizamos que el sistema nunca se caiga en horas de alta demanda."*

---

### 📌 Diapositivas 9 y 10: 08 · Equipo de Trabajo y 09 · Conclusiones & Cierre Oficial
* **Orador:** **Paul Ferrada** (con apoyo visual de todo el equipo)
* **Tiempo sugerido:** 1 minuto y medio (13:30 - 15:00)
* **Objetivo:** Sintetizar la colaboración del equipo de 4 personas, validar el cumplimiento del 100% de la pauta y abrir la ronda de preguntas.

> **🎙️ Lo que debe decir Paul:**
> *"En la Diapositiva 9 podemos apreciar la distribución de responsabilidades de nuestro equipo:*
> * **Fabián Mora** en el diseño e implementación de la Interfaz y Experiencia (React 18 y Pase QR).
> * **Agustín Cañas** en la Arquitectura de Software, Desacoplamiento en 4 capas y Lógica de Negocio.
> * **Felipe Labarca** en la Seguridad RBAC, Tokens JWT, base de datos Firestore e integración IoT.
> * Y quien les habla, **Paul Ferrada**, en la Infraestructura Cloud Azure, IIS y DevOps.
>
> *Para concluir en la Diapositiva 10:*
> * Hemos demostrado que es posible articular **hardware de bajo costo** con una **nube empresarial como Azure** de forma resiliente y económica.
> * La arquitectura desacoplada garantizó que el sistema funcione en tiempo real con latencias mínimas.
> * Cumplimos con el **100% de los criterios de la rúbrica oficial**: despliegue IaaS en Azure, servidor IIS operativo, DNS público, CRUD en vivo, repositorio en GitHub con commits en español y defensa de arquitectura.
>
> *Dejamos en pantalla los accesos oficiales: nuestro repositorio de GitHub y el enlace público de Azure.*
>
> *Agradecemos la atención de los profesores y quedamos a su entera disposición para responder las preguntas de la comisión evaluadora.* ***¡Muchas gracias!***"*

---

## 🛡️ BANCO DE PREGUNTAS TÍPICAS DE LA COMISIÓN Y QUIÉN RESPONDE

| Pregunta Probable del Profesor | Integrante que Responde | Respuesta Técnica Clave |
|---|:---:|---|
| **¿Por qué dicen que es Cliente-Servidor y no MVC?** | **Agustín Cañas** | *"En MVC el servidor renderiza la vista y la devuelve como HTML. En nuestro Modelo Cliente-Servidor Multi-Capa, el Cliente (React) es un programa autónomo que solo consume datos puros (JSON) de los servicios cloud, separando el ciclo de vida del frontend y del backend."* |
| **¿Cómo protegieron el sistema contra accesos no autorizados?** | **Felipe Labarca** | *"Mediante RBAC y Tokens JWT (RFC 7519) con algoritmo HMAC-SHA256. El token viaja en la cabecera `Authorization: Bearer` en cada petición, y la interfaz oculta completamente las operaciones CRUD y el dashboard para usuarios sin perfil de administrador."* |
| **¿Por qué eligieron una Máquina Virtual IaaS y no Azure App Service (PaaS)?** | **Paul Ferrada** | *"Porque la pauta de evaluación de la asignatura solicitaba expresamente la administración del sistema operativo (Windows Server 2022) y el servidor web IIS 10.0 con endurecimiento de red en NSG. Sin embargo, nuestra arquitectura está lista para migrar a PaaS o contenedores cuando se requiera."* |
| **¿Qué pasa si se corta la conexión a internet en el estacionamiento?** | **Felipe Labarca / Agustín Cañas** | *"El microcontrolador Arduino UNO ejecuta su firmware C++ de manera autónoma en el borde (Edge Computing). La pantalla LCD física y las barreras siguen operando localmente, y al reconectarse la red, la cola de eventos se sincroniza con Firestore en la nube."* |
| **¿Por qué eligieron $35 pesos el minuto y cómo se cobra?** | **Agustín Cañas / Fabián Mora** | *"Corresponde a la tarifa estándar de mercado chileno (~$2.100 CLP por hora). El controlador calcula el `timestamp` de salida menos el de ingreso en milisegundos, lo convierte a minutos redondeados hacia arriba y genera la liquidación exacta al momento del checkout."* |

---

## 👔 RECOMENDACIONES FINALES PARA EL DÍA DE LA DEFENSA

1. **Puntualidad:** Llegar a las **08:30 hrs** (30 minutos antes) al Auditorio 1 (Edificio 91, Piso 3) para probar el proyector HDMI, el audio y abrir la página web en Azure.
2. **Tenida:** **Semi-Formal obligatoria** (camisa/blusa, pantalón de vestir o formal oscuro) como estipula la pauta evaluativa.
3. **Pestañas Listas en el Navegador:**
   * Pestaña 1: Diapositivas PPT en pantalla completa.
   * Pestaña 2: URL de Azure: `http://puntoalerce.chilecentral.cloudapp.azure.com`
   * Pestaña 3: Repositorio GitHub: `https://github.com/PaulFL808/INTELIGEMENTE-ESTACIONADO`
   * Pestaña 4: Consola de Firebase Firestore (Proyecto `nubarda`) para mostrar los datos en vivo.
4. **Coordinación del Equipo:** Mientras un integrante expone, los otros 3 deben mantener postura atenta, mirando a la comisión y listos para interactuar con el proyector o el prototipo físico.
