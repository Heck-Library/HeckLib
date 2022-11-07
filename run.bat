@echo off
mode con: cols=57 lines=39
Set "Process=ScuffedWalls.exe"
:loop
deno run --allow-read --allow-write script.ts
rem if not exist temp/nosw (
    rem start ScuffedWalls.exe
    rem mode con: cols=15 lines=1
    rem timeout /t 1 /nobreak
    rem tasklist | find /i "%Process%">nul && Taskkill /f /im "%Process%"
    rem cls
    rem mode con: cols=57 lines=39
    rem deno run --allow-read --allow-write script.ts
rem )
pause
cls
goto loop