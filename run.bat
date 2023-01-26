@echo off
mode con: cols=57 lines=39
Set "Process=ScuffedWalls.exe"
:loop
deno run --allow-read --allow-write script.ts
pause
cls
goto loop