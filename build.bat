@echo off
setlocal EnableDelayedExpansion
:: Step 0: check for -dev flag
set "DEV_MODE=0"
if /I "%~1"=="-dev" (
    set "DEV_MODE=1"
    echo Running in development mode. .env will be included and server will start after build.
)

:: Step 1: Build Frontend
pushd FE
echo Running FE build...
call npm run build
if errorlevel 1 (
    echo FE build failed. Aborting.
    popd
    exit /b 1
)
popd

:: Step 2: Set build directory and check for -dev flag
set "BUILD_DIR=build"


echo Creating build directory: %BUILD_DIR%
rmdir /s /q "%BUILD_DIR%" >nul 2>&1
mkdir "%BUILD_DIR%"

:: Step 3: Copy FE build
echo Copying FE build output...
xcopy /E /I /Y "FE\dist" "%BUILD_DIR%\dist"
rmdir /s /q .\FE\dist 
echo Cleaned up FE dist directory.

:: Step 4: Copy BE contents (excluding .env and node_modules)
echo Copying BE files and folders...

:: Copy BE root files (excluding .env unless -dev)
for %%F in (BE\*) do (
    if "!DEV_MODE!"=="1" (
        copy "%%F" "%BUILD_DIR%\%%~nxF" >nul
    ) else (
        if not "%%~nxF"==".env" (
            if not exist "%%F\nul" (
                copy "%%F" "%BUILD_DIR%\%%~nxF" >nul
            )
        )
    )
)

:: Copy BE folders (excluding node_modules)
for /D %%D in (BE\*) do (
    if /I not "%%~nxD"=="node_modules" (
        xcopy "%%D" "%BUILD_DIR%\%%~nxD" /E /I /Y >nul
    )
)

:: If -dev, ensure .env is copied (in case it was missed above)
if "!DEV_MODE!"=="1" (
    if exist "BE\.env" (
        copy "BE\.env" "%BUILD_DIR%\.env" >nul
    )
)

echo Build complete: %BUILD_DIR%
cd "%BUILD_DIR%"
echo installing dependencies...
call npm install

:: If -dev, run node server.js
if "!DEV_MODE!"=="1" (
    echo Running node server.js in dev mode...
    node server.js
)

endlocal
pause
)

:: If -dev, ensure .env is copied (in case it was missed above)
if "!DEV_MODE!"=="1" (
    if exist "BE\.env" (
        copy "BE\.env" "%BUILD_DIR%\.env" >nul
    )
)

echo Build complete: %BUILD_DIR%
cd "%BUILD_DIR%"
echo installing dependencies...
call npm install

:: If -dev, run node server.js
if "!DEV_MODE!"=="1" (
    echo Running node server.js in dev mode...
    node server.js
)

endlocal
pause
