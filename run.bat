@echo off
mode con: cols=57 lines=39
:loop
deno run --allow-read --allow-write script.ts
pause
cls
goto loop