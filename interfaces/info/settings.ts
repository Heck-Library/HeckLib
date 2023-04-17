import IChromaSettings from "./chroma";
import IGraphics from "./graphics";
import IModifiers from "./modifiers";
import IPlayerOptions from "./playerOptions";

export default interface ISettings {
    playerOptions?: IPlayerOptions;
    modifiers?: IModifiers;
    environments?: { overrideEnvironments?: boolean };
    colors?: { overrideDefaultColors?: boolean };
    graphics?: IGraphics;
    chroma?: IChromaSettings;
    countersPlus?: { mainEnabled?: boolean; };
}