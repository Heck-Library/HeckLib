import { BloomFogEnvironment } from "./components/BloomFogEnvironment";
import { ILightWithID } from "./components/ILightWithId";
import { TubeBloomPrePassLight } from "./components/TubeBloomPrePassLight";


export interface IComponents {
    ILightWithId: ILightWithID;
    BloomFogEnvironment: BloomFogEnvironment;
    TubeBloomPrePassLight: TubeBloomPrePassLight;
}
