@echo off
title AURA - Smart Parking Azure IoT
echo ========================================================
echo   INICIANDO AURA - SMART PARKING IoT & AZURE CLOUD
echo ========================================================
echo.
cd /d "%~dp0"
echo 1. Verificando dependencias...
if not exist node_modules (
    echo Instalando paquetes npm...
    call npm install
)
echo.
echo 2. Iniciando servidor Express & Dashboard (Puerto 3001)...
start "" http://localhost:3001
node server/index.js
pause
