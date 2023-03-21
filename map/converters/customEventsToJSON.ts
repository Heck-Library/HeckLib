import { CUSTOMEVENT } from "../../consts/mod";
import { V3, events } from "../initialize";

export function customEventsToJSON(): Record<string, any>[] {
    const eventArr: any[] = [];
    if (events)
        events.forEach((e: CUSTOMEVENT) => {
            const eventJSON: Record<string, any> = {
                b: e.time,
                t: e.type,
                d: e.data
            };
            let stringified = JSON.stringify(eventJSON);
            if (!V3) {
                stringified = stringified
                    .replace('"position":', '"offsetPosition":')
                    .replace('"b":', '"time":')
                    .replace('"t":', '"type":')
                    .replace('"d":', '"data":')
                    .replace(/"([^_][\w\d]+)":/g, '"_$1":');
            }
            eventArr.push(JSON.parse(stringified));
        });
    return eventArr;
}
