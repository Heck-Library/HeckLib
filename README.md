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
> To install the library initialiser, run `npm i -g hecklib` in the Visual Studio Code terminal (Top bar > Terminal > New Terminal). You can also do this in cmd or any other terminal. After this, you should be able to initialise the map files.

## Map Setup
> To setup the map, open the map folder in Visual Studio Code and just run the `hecklib` command in the terminal. This should show you the subcommands for it.
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

### Recommended Way
> To automatically run the script upon every save, you can install nodemon. To install nodemon, run `npm i -g nodemon` in your terminal. After this, you should be able to run `nodemon script.ts`. It should now automatically run every time the file is saved.

### Alternative Way
> You can also just run the script manually every time by typing `ts-node script.ts` in the terminal.
> 
> The second alternative way is pressing `F5` every time you want to run the script. (Note: This can break sometimes)

***

I am open to all feedback on Discord: `Jevk#0004`
