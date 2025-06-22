@echo off
setlocal EnableDelayedExpansion

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

:: Step 2: Determine build version
set "BUILD_DIR_PREFIX=build"
set "CUSTOM_VERSION=%~1"

if defined CUSTOM_VERSION (
    set "BUILD_DIR=%BUILD_DIR_PREFIX%%CUSTOM_VERSION%"
) else (
    set "HIGHEST=0"
    for /D %%D in (%BUILD_DIR_PREFIX%*) do (
        set "DIR=%%~nxD"
        for /f "tokens=2 delims=build" %%V in ("!DIR!") do (
            set "VER=%%V"
            set "VER=!VER:.=!"
            set /a VAL=1!VER! - 1000000
            if !VAL! gtr !HIGHEST! set "HIGHEST=!VAL!"
        )
    )
    set /a NEXTVAL=HIGHEST + 1
    set "V1=1"
    set /a V2=0
    set /a V3=NEXTVAL
    set "BUILD_DIR=%BUILD_DIR_PREFIX%%V1%_0_!V3!"
)

echo Creating build directory: %BUILD_DIR%
mkdir "%BUILD_DIR%"

:: Step 3: Copy FE build
echo Copying FE build output...
xcopy /E /I /Y "FE\dist" "%BUILD_DIR%\dist"
rmdir /s /q .\FE\dist 
echo Cleaned up FE dist directory.

:: Step 4: Copy BE contents (excluding .env and node_modules)
echo Copying BE files and folders...

:: Copy BE root files (excluding .env)
for %%F in (BE\*) do (
    if not "%%~nxF"==".env" (
        if not exist "%%F\nul" (
            copy "%%F" "%BUILD_DIR%\%%~nxF" >nul
        )
    )
)

:: Copy BE folders (excluding node_modules)
for /D %%D in (BE\*) do (
    if /I not "%%~nxD"=="node_modules" (
        xcopy "%%D" "%BUILD_DIR%\%%~nxD" /E /I /Y >nul
    )
)

echo Build complete: %BUILD_DIR%
cd "%BUILD_DIR%"
echo installing dependencies...
call npm install
endlocal
pause
