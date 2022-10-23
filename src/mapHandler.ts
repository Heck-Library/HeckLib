// deno-lint-ignore-file no-explicit-any

// TODO make the script able to read and write .dat files

export const pointDefinitions = ["NULL"];
export let notes: any[];
export let walls: any[];
export let events: any[];
export let definitions: any[];
export let activeInput: string;
export let activeOutput: string;

export function map(input: string, output: string, NJS: number, offset: number) {
    const diff = JSON.parse(Deno.readTextFileSync(`./${input}`));
    activeInput = input;
    activeOutput = output;

    notes = diff._notes;
    walls = diff._obstacles;

    if (!diff._customData) {
        diff._customData = {};
    }
    diff._notes.forEach((x: { _customData: { _noteJumpStartBeatOffset: number; _noteJumpMovementSpeed: number; }; }) => {
        if (!x._customData) {
            x._customData = {
                _noteJumpStartBeatOffset: offset,
                _noteJumpMovementSpeed: NJS
            }
        }
    });
    diff._obstacles.forEach((x: { _customData: { _noteJumpStartBeatOffset: number; _noteJumpMovementSpeed: number; }; }) => {
        if (!x._customData) {
            x._customData = {
                _noteJumpStartBeatOffset: offset,
                _noteJumpMovementSpeed: NJS
            }
        }
    });

    const customData = diff._customData;
    
    customData._customEvents = [];
    customData._pointDefinitions = [];
    customData._environments = [];

    //(output, JSON.stringify(diff, null, 4));

    events = diff._customData._customEvents;
    definitions = diff._customData._pointDefinitions;

    return diff;
}

export function finalize(difficulty: any) {
    const precision = 4; // decimals to round to  --- use this for better wall precision or to try and decrease JSON file size

    const jsonP = Math.pow(10, precision);
    const sortP = Math.pow(10, 2);
    function deeperDaddy(obj: any) {
        if (obj) 
            for (const key in obj) {
                if (obj[key] == null) {
                    delete obj[key];
                } else if (typeof obj[key] === "object" || Array.isArray(obj[key])) {
                    deeperDaddy(obj[key]);
                } else if (typeof obj[key] == "number") {
                    obj[key] = (Math.round((obj[key] + Number.EPSILON) * jsonP) / jsonP);
                }
            }
        
    }
    deeperDaddy(difficulty)

    difficulty._notes.sort((a: { _time: number; _lineIndex: number; _lineLayer: number; }, b: { _time: number; _lineIndex: number; _lineLayer: number; }) => (Math.round((a._time + Number.EPSILON) * sortP) / sortP) - (Math.round((b._time + Number.EPSILON) * sortP) / sortP) || (Math.round((a._lineIndex + Number.EPSILON) * sortP) / sortP) - (Math.round((b._lineIndex + Number.EPSILON) * sortP) / sortP) || (Math.round((a._lineLayer + Number.EPSILON) * sortP) / sortP) - (Math.round((b._lineLayer + Number.EPSILON) * sortP) / sortP));
    difficulty._obstacles.sort((a: any, b: any) => a._time - b._time);
    difficulty._events.sort((a: any, b: any) => a._time - b._time);

    //const vanilla = JSON.parse(fs.readFileSync(activeInput));
    const modded = difficulty

    let animNotes = 0;
    let animWalls = 0;

    modded._notes.forEach(async (n: any) => {
        const anim = await n._customData._animation;
        if (typeof anim !== 'undefined'){
            animNotes++;
        } else {
            delete(n._customData._animation)
        }
    });
    modded._obstacles.forEach(async (n: any) => {
        const anim = await n._customData._animation
        if (typeof anim !== 'undefined'){
            animWalls++;
        } else {
            delete(n._customData._animation)
        }
    });


    let AT = 0;
    let PA = 0;
    let TP = 0;
    let PT = 0;

    modded._customData._customEvents.forEach(async (e: any) => {
        switch (await e._type) {
            case "AnimateTrack":
                AT++;
                break;
            case "AssignPathAnimation":
                PA++;
                break;
            case "AssignTrackParent":
                TP++;
                break;
            case "AssignPlayerToTrack":
                PT++;
                break;
        }
    })

    const mapInfo = {
        v: {
            //n: vanilla._notes.length,
            //w: vanilla._obstacles.length
        },
        m: {
            n: modded._notes.length,
            aN: animNotes,
            w: modded._obstacles.length,
            aW: animWalls,
        }
    };

    //console.log("=== VANILLA MAP INFO ===\n\nNotes: " + mapInfo.v.n + "\nWalls: " + mapInfo.v.w + "\n\n")
    console.log("=== MODDED MAP INFO ===\n\nNormal Notes: " + mapInfo.m.n + "\nAnimated Notes: " + mapInfo.m.aN + "\n\nWalls: " + mapInfo.m.w + "\nAnimated Walls: " + mapInfo.m.aW + "\n\n")
    console.log("=== CUSTOM EVENTS INFO ===\n\nAnimateTracks: " + AT + "\nPathAnimations: " + PA + "\nTrackParents: " + TP + "\nPlayerTracks: " + PT);

    Deno.writeTextFileSync(activeOutput, JSON.stringify(difficulty, null, 4));
}