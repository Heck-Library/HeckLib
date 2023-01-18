import { V3 } from "./main.ts";
import { events } from "./mapHandler.ts";
import { animateTrackData, Track, pathAnimData, parentTrackType, playerTrackType, animComponentData } from "./types.ts";
/**
 * Places an AnimateTrack event
 */
export class AnimateTrack {
    private json: {
        time: number
        type: string
        data: animateTrackData
    };
    constructor(time: number, eventData: animateTrackData) {
        this.json = {
            time: time,
            type: "AnimateTrack",
            data: eventData
        };
        return this;
    }

    //#region getters and setters
    set time(time: number) { this.json.time = time}
    get time(): number { return this.json.time; }

    get type(): string { return this.json.type; }

    set data(data: animateTrackData) { this.json.data = data; }
    get data(): animateTrackData { return this.json.data; }

    push() {
        events.push(this)
        return this;
    }
}

export class AssignPathAnimation {
    private json: {
        time: number
        type: string
        data: pathAnimData
    };
    constructor(time: number, eventData: pathAnimData) {
        this.json = {
            time: time,
            type: "AssignPathAnimation",
            data: eventData
        }
    }
    set time(time: number) { this.json.time = time}
    get time(): number { return this.json.time; }

    get type(): string { return this.json.type; }

    set data(data: pathAnimData) { this.json.data = data; }
    get data(): pathAnimData { return this.json.data; }

    push() {
        events.push(this)
        return this;
    }
}

export class AssignTrackParent {
    private json: {
        time: number
        type: string
        data: parentTrackType
    }
    
    constructor(time: number, eventData: parentTrackType) {
        this.json = {
            time: time,
            type: "AssignTrackParent",
            data: eventData
        }
    }
    
    set time(time: number) { this.json.time = time; }
    get time(): number { return this.json.time; }

    get type(): string { return this.json.type; }

    set data(data: parentTrackType) { this.json.data = data; }
    get data(): parentTrackType { return this.json.data; }
    
    /**
     * Push the track parent to the map data.
     */
    push () {
        events.push(this);
        return this;
    }
}


export class AssignPlayerToTrack {
    private json: {
        time: number
        type: "AssignPlayerToTrack"
        data: playerTrackType
    }

    constructor(time: number, track: Track) {
        this.json = {
            time: time,
            type: "AssignPlayerToTrack",
            data: {
                track: track
            }
        }
    }

    set time(time: number) { this.json.time = time; }
    get time(): number { return this.json.time; }

    get type(): string { return this.json.type; }

    set data(data: playerTrackType) { this.json.data = data; }
    get data(): playerTrackType { return this.json.data; }

    push() {
        events.push(this)
        return this;
    }
}

export class AnimateComponent {
    private json: {
        time: number,
        type: "AnimateComponent",
        data: animComponentData
    }
    constructor(time: number, eventData: animComponentData) {
        if (!V3) throw new Error('AnimateComponent is a V3 feature');
        this.json = {
            time: time,
            type: "AnimateComponent",
            data: eventData
        }
    }
    set time(time: number) { this.json.time = time; }
    get time(): number { return this.json.time; }

    get type(): string { return this.type; }

    set data(data: animComponentData) { this.json.data = data; }
    get data(): animComponentData { return this.json.data;}
}