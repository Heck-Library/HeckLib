@echo off
mode con: cols=57 lines=39
Set "Process=ScuffedWalls.exe"
:loop
deno run --allow-read --allow-write script.ts
if not exist temp/nosw (
    start ScuffedWalls.exe
    mode con: cols=15 lines=1
    timeout /t 1 /nobreak
    tasklist | find /i "%Process%">nul && Taskkill /f /im "%Process%"
    cls
    mode con: cols=57 lines=39
    deno run --allow-read --allow-write script.ts
)
pause
cls
goto loop