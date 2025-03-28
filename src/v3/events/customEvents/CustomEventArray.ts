import { log } from "../../../util/logs";
import { AnimateComponent, AnimateComponentData } from "./AnimateComponent";
import { AnimateTrack } from "./AnimateTrack";
import { AssignObjectPrefab, IAssignObjectPrefabData } from "./AssignObjectPrefab";
import { AssignPathAnimation } from "./AssignPathAnimation";
import { AssignPlayerToTrack, IAssignPlayerToTrackData } from "./AssignPlayerToTrack";
import { AssignTrackParent, ITrackParentData } from "./AssignTrackParent";
import { BaseCustomEvent } from "./BaseCustomEvent";
import { Blit, IBlitData } from "./Blit";
import { CreateCamera, ICreateCameraData } from "./CreateCamera";
import { CreateScreenTexture, ICreateScreenTextureData } from "./CreateScreenTexture";
import { DestroyObject } from "./DestroyObject";
import { InstantiatePrefab, IInstantiatePrefabData } from "./InstantiatePrefab";
import { IAnimateTrackData } from "./interfaces/IAnimateTrackData";
import { IAssignPathAnimationData } from "./interfaces/IPathAnimationData";
import { ISetMaterialPropertyData, ISetAnimatorPropertyData, ISetGlobalPropertyData } from "./properties/PropertyData";
import { SetAnimatorProperty } from "./SetAnimatorProperty";
import { SetGlobalProperty } from "./SetGlobalProperty";
import { SetMaterialProperty } from "./SetMaterialProperty";
import { SetRenderingSettings, SetRenderingSettingsData } from "./SetRenderingSettings";

export class CustomEventArray extends Array<BaseCustomEvent> {
    /**
     * ## Push
     *
     * Pushes custom event(s) to the map. This method WILL remove all functions and methods from the object and will make it a plain object.
     *
     * @param items Custom Event(s) to push to the map.
     * @returns Length of the array (How many events are in the map).
     */
    push(...items: BaseCustomEvent[]): number {
        log.debug(`Pushing ${log.console.NUM_MSG(items.length)} ${log.console.CLASS_MSG("CustomEvents")}`);
        items.forEach(item => {
            switch (item.Type) {
                case "AnimateComponent":
                    super.push(new AnimateComponent(item.Beat, item.Data as Partial<Omit<AnimateComponentData, "Track">> & { Track: string; }));
                    break;
                case "AnimateTrack":
                    super.push(new AnimateTrack(item.Beat, item.Data as IAnimateTrackData));
                    break;
                case "AssignObjectPrefab":
                    super.push(new AssignObjectPrefab(item.Beat, item.Data as IAssignObjectPrefabData));
                    break;
                case "AssignPathAnimation":
                    super.push(new AssignPathAnimation(item.Beat, item.Data as IAssignPathAnimationData));
                    break;
                case "AssignPlayerToTrack":
                    super.push(new AssignPlayerToTrack(item.Beat, item.Data as IAssignPlayerToTrackData));
                    break;
                case "AssignTrackParent":
                    super.push(new AssignTrackParent(item.Beat, item.Data as ITrackParentData));
                    break;
                case "Blit":
                    super.push(new Blit(item.Beat, item.Data as IBlitData));
                    break;
                case "CreateCamera":
                    super.push(new CreateCamera(item.Beat, item.Data as ICreateCameraData));
                    break;
                case "CreateScreenTexture":
                    super.push(new CreateScreenTexture(item.Beat, item.Data as ICreateScreenTextureData));
                    break;
                case "DestroyObject":
                    super.push(new DestroyObject(item.Beat, item.Data as { ID: string | string[]; }));
                    break;
                case "InstantiatePrefab":
                    super.push(new InstantiatePrefab(item.Beat, item.Data as IInstantiatePrefabData));
                    break;
                case "SetAnimatorProperty":
                    super.push(new SetAnimatorProperty(item.Beat, item.Data as ISetAnimatorPropertyData));
                    break;
                case "SetGlobalProperty":
                    super.push(new SetGlobalProperty(item.Beat, item.Data as ISetGlobalPropertyData));
                    break;
                case "SetMaterialProperty":
                    super.push(new SetMaterialProperty(item.Beat, item.Data as ISetMaterialPropertyData));
                    break;
                case "SetRenderingSettings":
                    super.push(new SetRenderingSettings(item.Beat, item.Data as Partial<SetRenderingSettingsData>));
                    break;
            }
        });
        return this.length;
    }

    public static fromJSON(json: Record<string, any>): BaseCustomEvent[] {
        if (json.customData === undefined) return [];
        if (json.customData.customEvents === undefined) return [];

        const events = new CustomEventArray();

        json.customData.customEvents.forEach((event: any) => {
            
            const dataKeys = Object.keys(event.d);
            const data: Record<string, any> = {};
            
            dataKeys.forEach((key: string) => {
                data[key.split('')[0].toUpperCase() + key.slice(1)] = event.d[key];
            });

            switch (event.t) {
                case "AnimateComponent":
                    events.push(new AnimateComponent(event.b, data as Partial<Omit<AnimateComponentData, "Track">> & { Track: string }));
                    break;
                case "AnimateTrack":
                    events.push(new AnimateTrack(event.b, data as IAnimateTrackData));
                    break;
                case "AssignObjectPrefab":
                    events.push(new AssignObjectPrefab(event.b, data as IAssignObjectPrefabData));
                    break;
                case "AssignPathAnimation":
                    events.push(new AssignPathAnimation(event.b, data as IAssignPathAnimationData));
                    break;
                case "AssignPlayerToTrack":
                    events.push(new AssignPlayerToTrack(event.b, data as IAssignPlayerToTrackData));
                    break;
                case "AssignTrackParent":
                    events.push(new AssignTrackParent(event.b, data as ITrackParentData));
                    break;
                case "Blit":
                    events.push(new Blit(event.b, data as ISetMaterialPropertyData));
                    break;
                case "CreateCamera":
                    events.push(new CreateCamera(event.b, data as ICreateCameraData));
                    break;
                case "CreateScreenTexture":
                    events.push(new CreateScreenTexture(event.b, data as ICreateScreenTextureData));
                    break;
                case "DestroyObject":
                    events.push(new DestroyObject(event.b, data as { ID: string | string[] }));
                    break;
                case "InstantiatePrefab":
                    events.push(new InstantiatePrefab(event.b, data as IInstantiatePrefabData));
                    break;
                case "SetAnimatorProperty":
                    events.push(new SetAnimatorProperty(event.b, data as ISetAnimatorPropertyData));
                    break;
                case "SetMaterialProperty":
                    events.push(new SetMaterialProperty(event.b, data as ISetMaterialPropertyData));
                    break;
                case "SetGlobalProperty":
                    events.push(new SetGlobalProperty(event.b, data as ISetGlobalPropertyData));
                    break;
                case "SetRenderingSettings":
                    events.push(new SetRenderingSettings(event.b, data as Partial<SetRenderingSettingsData>));
                    break;
            }
        });

        return events;
    }
}
