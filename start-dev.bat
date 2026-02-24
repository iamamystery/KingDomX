@echo off
chcp 65001 >nul
setlocal EnableDelayedExpansion

echo ==========================================
echo    KingdomX - Development Server Startup
echo ==========================================
echo.

:: Store the project root directory
set "PROJECT_ROOT=%~dp0"
set "BACKEND_DIR=%PROJECT_ROOT%backend"
set "FRONTEND_DIR=%PROJECT_ROOT%frontend"

:: Check if node_modules exists, install if missing
echo [1/4] Checking dependencies...

if not exist "%BACKEND_DIR%\node_modules" (
    echo    - Installing backend dependencies...
    cd /d "%BACKEND_DIR%"
    call npm install
    if %errorlevel% neq 0 (
        echo.
        echo ==========================================
        echo [ERROR] Backend npm install failed!
        echo ==========================================
        pause
        exit /b 1
    )
) else (
    echo    - Backend dependencies: OK
)

if not exist "%FRONTEND_DIR%\node_modules" (
    echo    - Installing frontend dependencies...
    cd /d "%FRONTEND_DIR%"
    call npm install --legacy-peer-deps
    if %errorlevel% neq 0 (
        echo.
        echo ==========================================
        echo [ERROR] Frontend npm install failed!
        echo ==========================================
        pause
        exit /b 1
    )
) else (
    echo    - Frontend dependencies: OK
)

:: Generate Prisma client
echo.
echo [2/4] Generating Prisma client...
cd /d "%BACKEND_DIR%"
call npx prisma generate 2>nul
if %errorlevel% neq 0 (
    echo    - Prisma client generation failed, continuing anyway...
) else (
    echo    - Prisma client: OK
)

:: Check ports
echo.
echo [3/4] Checking available ports...
call :check_port 3000
if %errorlevel% neq 0 (
    echo.
    echo [ERROR] Port 3000 is already in use!
    echo Please stop any running frontend first.
    pause
    exit /b 1
)
echo    - Port 3000: Available

call :check_port 4000
if %errorlevel% neq 0 (
    echo.
    echo [ERROR] Port 4000 is already in use!
    echo Please stop any running backend first.
    pause
    exit /b 1
)
echo    - Port 4000: Available

:: Start both services
echo.
echo [4/4] Starting services...
echo    - Backend will run on: http://localhost:4000
echo    - Frontend will run on: http://localhost:3000
echo.
echo ==========================================
echo    Press Ctrl+C twice to stop all services
echo ==========================================
echo.

:: Change to project root
cd /d "%PROJECT_ROOT%"

:: Check if concurrently is available
where concurrently >nul 2>&1
if %errorlevel% neq 0 (
    echo    - Installing concurrently globally...
    call npm install -g concurrently
    if %errorlevel% neq 0 (
        echo [ERROR] Failed to install concurrently!
        pause
        exit /b 1
    )
)

:: Run both servers
echo    - Starting servers...
cd /d "%PROJECT_ROOT%"
call npx concurrently -k --prefix "[{name}]" --names "BACKEND,FRONTEND" "npm run dev --prefix backend" "npm run dev --prefix frontend"

:: If we get here, the user pressed Ctrl+C
echo.
echo.
echo ==========================================
echo [INFO] All services stopped.
echo ==========================================
pause
goto :eof

:: ==========================================
:: SUBROUTINE: Check if port is in use
:: ==========================================
:check_port
set "port=%~1"
netstat -an | findstr ":%port% " | findstr "LISTENING" >nul
if %errorlevel% == 0 (
    exit /b 1
)
exit /b 0
