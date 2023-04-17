import IBloomFogEnvironment from "./fog";
import IILightWithId from "./iLightWithId";
import ITubeBloomPrePassLight from "./tubeBloom";

export default interface IComponents {
    ILightWithId: IILightWithId;
    BloomFogEnvironment: IBloomFogEnvironment;
    TubeBloomPrePassLight: ITubeBloomPrePassLight;
}