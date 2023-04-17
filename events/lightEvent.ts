import ILightCustomData from "../interfaces/customData/lightCustomData";
import ILightEvent from "../interfaces/environment/lightEvent";
import lightType from "../types/lightType";
import lightValue from "../types/lightValue";

enum TYPE {
    LEFT_LASER_LIGHT = 2,
    LEFT_LASER_EXTRA = 6,
    LEFT_LASER_SPEED = 12,
    RIGHT_LASER_LIGHT = 3,
    RIGHT_LASER_EXTRA = 7,
    RIGHT_LASER_SPEED = 13,

    BACK_LASER = 0,

    CENTER_LIGHTS = 4,

    BOOST_COLOR = 5,

    RING_LIGHTS = 1,
    RING_SPIN = 8,
    RING_ZOOM = 9,

    BILLIE_LEFT_LASERS = 10,
    BILLIE_RIGHT_LASERS = 11,
    
    INCLUDE_360 = 14,
    EXCLUDE_360 = 15,

    INTERSCOPE_LOWER_CAR = 16,
    INTERSCOPE_RAISE_CAR = 17,

    GAGA_MIDDLE_LEFT_TOWER_HEIGHT = 16,
    GAGA_MIDDLE_RIGHT_TOWER_HEIGHT = 17,

    GAGA_OUTER_LEFT_TOWER_HEIGHT = 18,
    GAGA_OUTER_RIGHT_TOWER_HEIGHT = 19,
}

enum VALUE {
    OFF = 0,

    BLUE_ON = 1,
    BLUE_FLASH = 2,
    BLUE_FADE = 3,
    BLUE_TRANSITION = 4,

    RED_ON = 5,
    RED_FLASH = 6,
    RED_FADE = 7,
    RED_TRANSITION = 8,

    WHITE_ON = 9,
    WHITE_FLASH = 10,
    WHITE_FADE = 11,
    WHITE_TRANSITION = 12,
}

enum DIRECTION {
    CCW = 0,
    CW = 1
}

export default class Light implements ILightEvent {

    public static readonly DIRECTION = DIRECTION;

    public static readonly TYPE = TYPE;

    public static readonly VALUE = VALUE;

    time: number;
    type: lightType;
    value: lightValue;
    float?: number | undefined;
    data?: ILightCustomData | undefined;

    constructor();
    constructor(light: number);
    constructor(light: ILightEvent);
    constructor(light: ILightEvent, data: ILightCustomData);
    constructor(light?: ILightEvent | number, data?: ILightCustomData) {
        this.time = 0;
        this.type = 0;
        this.value = 0;
        this.float = 0;
        this.data = {};
        if (light) {
            if (typeof light === "number") {
                this.time = light;
                return this;
            }
            if (light.time) this.time = light.time;
            if (light.type) this.type = light.type;
            if (light.value) this.value = light.value;
            if (light.float) this.float = light.float;
            if (light.data) this.data = light.data;
        }
        if (data) this.data = data;
        return this;
    }
}