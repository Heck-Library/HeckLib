import { LIGHT, lightCustomData, lightData } from "./types.ts"

export class LightEvent {
    static readonly Direction = {
        CCW: 0,
        CW: 1
    }
    static readonly Type = {
        BackLasers: 0,
        RingLights: 1,
        LRotatingLasers: 2,
        RRotatingLasers: 3,
        CenterLights: 4,
        BoostColor: 5,
        ExtraLeft: 6,
        ExtraRight: 7,
        RingSpin: 8,
        RingZoom: 9,
        BillieLLaser: 10,
        BillieRLaser: 11,
        LLaserSpeed: 12,
        RLaserSpeed: 13,
        Include360: 14,
        Exclude360: 15,
        InterscopeLowerCar: 16,
        GagaMLTowerHeight: 16,
        InterscopeRaiseCar: 17,
        GagaMRTowerHeight: 17,
        GagaOLTowerHeight: 18,
        GagaORTowerHeight: 18
    }
    static readonly Value = {
        Off: 0,
        BOn: 1,
        BFlash: 2,
        BFade: 3,
        BTransition: 4,
        ROn: 5,
        RFlash: 6,
        RFade: 7,
        RTransition: 8,
        WOn: 9,
        WFlash: 10,
        WFade: 11,
        WTransition: 12
    }
    public json: LIGHT;

    constructor(obj: lightData, customData: lightCustomData) {
        this.json = {
            time: obj.time,
            type: obj.type,
            value: obj.value,
            float: obj.float,
            data: customData
        }
        return this;
    }

    set time(time: number) { this.time = time; }
    get time(): number { return this.time; }

    set type(type: 0|1|2|3|4|5|6|7|8|9) { this.type = type; }
    get type(): 0|1|2|3|4|5|6|7|8|9 { return this.type; }

    set value(value: number) { this.value = value; }
    get value(): number { return this.value; }

    set float(float: number) { this.float = float; }
    get float(): number { return this.float; }

    set data(data: lightCustomData) { this.data = data; }
    get data(): lightCustomData { return this.data; }
}
