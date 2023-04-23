import IChromaSettings from "./chroma";
import IGraphics from "./graphics";
import IModifiers from "./modifiers";
import IPlayerOptions from "./playerOptions";

export default interface ISettings {
    _playerOptions?: IPlayerOptions;
    _modifiers?: IModifiers;
    _environments?: { _overrideEnvironments?: boolean };
    _colors?: { _overrideDefaultColors?: boolean };
    _graphics?: IGraphics;
    _chroma?: IChromaSettings;
    _countersPlus?: { _mainEnabled?: boolean; };
}