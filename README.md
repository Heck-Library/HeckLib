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

### Git
> Git is used to install the library from github automatically using the CLI for hecklib. The installation for Windows can be found <a href="https://git-scm.com/download/win">here</a>. Install that and you should be good to install the library itself. 

### Library
> To install the library initialiser, run `npm i -g hecklib` in the Visual Studio Code **GIT BASH** terminal (Top bar > Terminal > New Terminal).
> 
> Once installed, check that it works by running `hecklib` in the Git Bash terminal. If it doesn't work, try adding `npx` before the command.
> 
> To install all the dependencies for HeckLib, run `hecklib f`. This installs everything HeckLib needs to run, it should only be needed once per device.

## Map Setup
> To setup the map, open the map folder in Visual Studio Code and just run the `hecklib i` command in the terminal.
> The subcommands are `init` and `update`. `init` is used to initialise a HeckLib project to the current directory. `update` is used to update the files for an already existing HeckLib project without overwriting the `script.ts` file.
> 
> Run `hecklib i` in your terminal to install HeckLib for your map.

### Updating HeckLib
> Run `hecklib u` in your terminal to update all HeckLib files to the most recent version.

## Scripting

### Editing
> To edit the script, open your map folder in Visual Studio Code and start editing the `example.ts`. This file already contains the initialisation of the map.
>
> If you need any help with it, ask me on Discord: `Jevk#0004`

## Running The Script
> To run the script, run `hecklib script.ts`. This will make HeckLib run every time you save your script.

***

I am open to all feedback on Discord: `Jevk#0004`
