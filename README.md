# HeckLib
HeckLib is a TypeScript library intended to be accessible to all Beat Saber modchart creators. It should be easy to set up.

***

# Setup

## First Time Installation

### Node.js
> Node.js is the framework used to run the script in the first place, it can be found <a href="https://nodejs.org/en/">here</a>. There's two downloads, LTS and Current, it shouldn't matter which one you use but I recommend the Current version.

### Visual Studio Code
> You need to have <a href="https://code.visualstudio.com/">VSC</a> installed on your PC, you can install it from <a href="https://code.visualstudio.com/">here.</a>
> 
> Just follow the installation and after it's installed open it up.

### Library
> To install the library initialiser, install the VSC extension called "HeckLib" from the releases page <a href="https://github.com/Heck-Library/HeckLib/releases">here</a>.
> 
> After installing the extension, a panel should appear to the sidebar that says "HeckLib". If it doesn't, restart VSC. If it still doesn't, contact me on Discord: `Jevk#0004`
>
> The side panel should have a button that says "Download HeckLib". Click it and select your map directory. This will download the latest version of HeckLib to your map folder.
> 
> If you want to update HeckLib, just click the "Update HeckLib" button. This will update all the files in your map folder to the latest version of HeckLib. Please note that this will not overwrite your `script.ts` file. If the button says "Download HeckLib", it will overwrite every `.ts` file in your map folder.

## Scripting

### Editing
> To edit the script, open your map folder in Visual Studio Code and start editing the `example.ts`. This file already contains the initialisation of the map.
>
> If you need any help with it, ask me on Discord: `Jevk#0004`

## Running The Script
> To run the script, run `nodemon script.ts` in the terminal. This will run the script and automatically restart it when you save a file. Nodemon can be installed by running `npm i -g nodemon` in the terminal.
> 
> If you want to run the script without restarting it, run `node script.ts` in the terminal.
>
> For running, you may need to install the dependencies. To do this, run `npm i` in the terminal. These dependencies are `@types/node`, `typescript` and `ts-node`.
> 
> If you want to install these dependencies globally, so you don't have to install them for each map, run `npm i -g @types/node typescript ts-node` in the terminal.

***

I am open to all feedback on Discord: `Jevk#0004`
