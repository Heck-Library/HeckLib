
import AnimateComponent from "../../events/animateComponent";
import AnimateTrack from "../../events/animateTrack";
import AssignFogTrack from "../../events/assignFogTrack";
import AssignPathAnimation from "../../events/assignPathAnimation";
import AssignPlayerToTrack from "../../events/assignPlayerTrack";
import AssignTrackParent from "../../events/assignTrackParent";
import ICustomEvent from "../../interfaces/events/eventData/ICustomEvent";
import { V3 } from "../initialize";

export function JSONtoCustomEvents(eventInput: Record<string, any>[]) {
    const eventArr: ICustomEvent[] = [];
    if (!V3) {
        eventInput.forEach((e: Record<string, any>) => {
            const f = JSON.parse(
                JSON.stringify(e)
                    .replace(/"_(\w+)":/g, '"_$1":')
            );
            switch (f.t) {
                case "AnimateTrack":
                    if (!e._data._track)
                        f.data.track = "NULL";
                    if (!e._data._duration)
                        f.data.duration = 1;
                    eventArr.push(new AnimateTrack(f.time, f.data));
                    break;
                case "AssignPathAnimation":
                    if (!e._data._track)
                        f.data.track = "NULL";
                    eventArr.push(new AssignPathAnimation(f.time, f.data));
                    break;
                case "AssignPlayerToTrack":
                    if (!e._data._track)
                        f.data.track = "NULL";
                    eventArr.push(new AssignPlayerToTrack(f.time, f.data.track));
                    break;
                case "AssignTrackParent":
                    eventArr.push(new AssignTrackParent(f.time, f.data));
                    break;
                case "AnimateComponent":
                    if (!e._data._track)
                        f.data.track = "NULL";
                    if (!e._data._duration)
                        f.data.duration = 1;
                    eventArr.push(new AnimateComponent(f.time, f.data));
                    break;
                case "AssignFogTrack":
                    if (!e._data._track)
                        f.data.track = "NULL";
                    eventArr.push(new AssignFogTrack(f.time, f.data.track));
                    break;
            }
        });
    }
    if (V3) {
        eventInput.forEach((e: Record<string, any>) => {
            const f = JSON.parse(
                JSON.stringify(e)
                    .replace('"offsetPosition":', '"position":')
                    .replace('"offsetWorldRotation":', '"rotation":')
            );
            switch (f.t) {
                case "AnimateTrack":
                    if (!e.d.track)
                        f.d.track = "NULL";
                    if (!e.d.duration)
                        f.d.duration = 1;
                    eventArr.push(new AnimateTrack(f.b, f.d));
                    break;
                case "AssignPathAnimation":
                    if (!e.d.track)
                        f.d.track = "NULL";
                    eventArr.push(new AssignPathAnimation(f.b, f.d));
                    break;
                case "AssignPlayerToTrack":
                    if (!e.d.track)
                        f.d.track = "NULL";
                    eventArr.push(new AssignPlayerToTrack(f.b, f.d.track));
                    break;
                case "AssignTrackParent":
                    eventArr.push(new AssignTrackParent(f.b, f.d));
                    break;
                case "AnimateComponent":
                    if (!e.d.track)
                        f.d.track = "NULL";
                    if (!e.d.duration)
                        f.d.duration = 1;
                    eventArr.push(new AnimateComponent(f.b, f.d));
                    break;
            }
        });
    }
    return eventArr;
}
