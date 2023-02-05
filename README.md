# HeckLib
HeckLib is a TypeScript library intended to be accessible to all Beat Saber modchart creators. It should be easy to set up.

***

# Setup

## Deno

### Installation
> HeckLib needs Deno to run properly, install it by following <a href="https://deno.land/manual@v1.28.1/getting_started/installation">this manual</a>.
> 
> You can also just run `irm https://deno.land/install.ps1 | iex` in Windows PowerShell.

#

## Visual Studio Code

### Installation
> Once you have Deno installed, you need to have <a href="https://code.visualstudio.com/">VSC</a> installed on your PC, you can install it from <a href="https://code.visualstudio.com/">here.</a>
> 
> Just follow the installation and after it's installed open it up.

### Extensions
> Visual Studio Code needs an extension to support Deno. You can find them by pressing `Ctrl + Shift + X` on your keyboard. This opens the extensions tab. Search `Deno` from the extensions. Install the first extension from the list, this should make Deno compatible with your VSC.

### Map Setup
> Copy or downlaod the `example.ts` file into your map directory (where your `Info.dat` lives etc.)
> If necessary, cache the dependencies using `deno cache .\example.ts` 

## Scripting

### Editing
> To edit the script, open your map folder in Visual Studio Code and start editing the `example.ts`. This file already contains the initialisation of the map.
>
> If you need any help with it, ask me on Discord: `Jevk#0004`

### Running The Script

> Press F5 in VS Code, which will run the script with a debugger attached. It is highly recommended to learn how to use a debugger for a much better developer experience.
> You can also run the script by going into the `Run and Debug` menu in VS Code and manually pressing run.
> If you want to avoid VS Code altogether, you can use `deno run -A --no-check ./example.ts` as well.

***

I am open to all feedback on Discord: `Jevk#0004`
