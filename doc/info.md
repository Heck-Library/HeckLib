# Info file
This page documents the `info.dat` and usage.

## Settings
> You can use the settings class to enable the settings setter menu in-game.
>
> To call the Settings class, type the following.
> ```ts
> new Settings(OUTPUT)
> ```
> Properties can be added by doing the following
> ```ts
> new Settings(OUTPUT)
>       .countersPlus(false)
>       .advancedHUD(true)
>       .noHUD(false);
> ```
> This would set the map settings to disable Counters+, enabling Advanced HUD and forcing the HUD on.
>
> Of course, these aren't the only supported properties.
>>### Supported Properties
>>#### Player Options
>> - `.leftHanded(boolean)` Turns on left handed mode.
>> - `.playerHeight(number)` Sets the player height to a certain value.
>> - `.autoPlayerHeight(boolean)` Turns on automatic player height.
>> - `.sfxVolume(number)` Sets the SFX bolume level.
>> - `.reduceDebris(boolean)` Turns on debris reduction.
>> - `.noHUD(boolean)` Turns off the HUD.
>> - `.advancedHUD(boolean)` Turns on advanced HUD
>> - `.noFailFX(boolean)` Turns on the nofail effect
>> - `.autoRestart(boolean)` Turns on automatic restart upon failing.
>> - `.trailIntensity(number)` Sets the intensity of the saber trail.
>> - `.noteJumpDurationType("Dynamic"|"Static")` Sets the type of the jump duration.
>> - `.noteJumpFixedDuration(number)` Sets the fixed note jump duration.
>> - `.noteJumpOffset(number)` Sets the offset.
>> - `.hideSpawnEffect(boolean)` Turns off the note spawn flash effect.
>> - `.adaptiveSFX(number)` I actually don't know what this does...
>> - `.effects("AllEffects"|"StrobeFilter"|"NoEffects")` Sets the enabled effects.
>> - `.effectsExpertPlus("AllEffects"|"StrobeFilter"|"NoEffects")` Sets the enabled effects for the Expert+ difficulties.
>
>>#### Modifiers
>> - `.energyType("Bar"|"Battery")` Sets the energy type.
>> - `.noFail(boolean)` Turns on nofail.
>> - `.instaFail(boolean)` Turns on instafail.
>> - `.saberClashFail(boolean)` Turns on failing on saber clash. (Hidden in-game)
>> - `.enabledWalls("All"|"FullHeight"|"NoObstacles")` Toggles which walls are enabled.
>> - `.fastNotes(boolean)` Turns on fast notes (this is not faster song)
>> - `.strictAngles(boolean)` Turns on strict angles.
>> - `.disappearingArrows(boolean)` Turns on disappearing arrows.
>> - `.ghostNotes(boolean)` Turns on ghost notes.
>> - `.noBombs(boolean)` Turns on the no bombs modifier.
>> - `.songSpeed("Normal"|"Faster"|"Slower"|"SuperFast")` Sets the speed modifier.
>> - `.noArrows(boolean)` Turns on the no arrows modifier.
>> - `.proMode(boolean)` Turns on pro mode.
>> - `.zenMode(boolean)` Turns on zen mode.
>> - `.smallCubes(boolean)` Turns on small cubes.
>
>>#### Graphics
>> - `.mirror(0-3)` Sets the mirror quality.
>> - `.bloom(boolean)` Turns on bloom.
>> - `.smoke(boolean)` Turns on smoke.
>> - `.burnMarks(boolean)` Turns on burn marks.
>> - `.screenDistortions(boolean)` Turns on screen distortion effects.
>> - `.shockwaveParticles(0-2)` Sets the shockwave particle intensity.
>
>>#### Chroma
>> - `.disableChroma(boolean)` Turns off chroma.
>> - `.disableEnvironment(boolean)` Turns off environment enhancements.
>> - `.disableNoteColors(boolean)` Turns off chroma note coloring.
>> - `.zenModeWalls(boolean)` Turns on walls in zen mode.
>
>>#### Other
>> - `.overrideEnvironment(boolean)` Turns on player's selected environment instead of the map's environment.
>> - `.overrideColors(boolean)` Uses player colors instead of map note colors.
>> - `.countersPlus(boolean)` Turns on counters+.
#
## Suggestions
> Suggestions can be set by using the Suggestion class.
> ```ts
> new Suggestion()
> ```
> Similar to other classes, properties are added with methods.
> ### Supported properties
>> - `.chroma()` sets Chroma as a suggested mod.
>> - `.cinema()` sets Cinema as a suggested mod.
## Requirements
> Requirements can be set by using the Requirement class.
> ```ts
> new Requirement()
> ```
> Similar to other classes, properties are added with methods.
> ### Supported properties
>> - `.noodle()` sets Noodle Extensions as a required mod.
>> - `.chroma()` sets Chroma as a required mod.
>> - `.cinema()` sets Cinema as a required mod.
