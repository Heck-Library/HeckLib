import { BaseModifier } from "./BaseModifier";
import { XYZAccessor } from "../typedef";

type BasePlayer =
    "baseHeadPosition"|
    "baseHeadLocalPosition"|
    "baseHeadRotation"|
    "baseHeadLocalRotation"|
    "baseHeadLocalScale"|
    "baseLeftHandPosition"|
    "baseLeftHandLocalPosition"|
    "baseLeftHandRotation"|
    "baseLeftHandLocalRotation"|
    "baseLeftHandLocalScale"|
    "baseRightHandPosition"|
    "baseRightHandLocalPosition"|
    "baseRightHandRotation"|
    "baseRightHandLocalRotation"|
    "baseRightHandLocalScale";

abstract class Head {
    public static readonly POSITION = "baseHeadPosition";
    public static readonly LOCAL_POSITION = "baseHeadLocalPosition";
    public static readonly ROTATION = "baseHeadRotation";
    public static readonly LOCAL_ROTATION = "baseHeadLocalRotation";
    public static readonly LOCAL_SCALE = "baseHeadLocalScale";
}

abstract class LeftHand {
    public static readonly POSITION = "baseLeftHandPosition";
    public static readonly LOCAL_POSITION = "baseLeftHandLocalPosition";
    public static readonly ROTATION = "baseLeftHandRotation";
    public static readonly LOCAL_ROTATION = "baseLeftHandLocalRotation";
    public static readonly LOCAL_SCALE = "baseLeftHandLocalScale";
}

abstract class RightHand {
    public static readonly POSITION = "baseRightHandPosition";
    public static readonly LOCAL_POSITION = "baseRightHandLocalPosition";
    public static readonly ROTATION = "baseRightHandRotation";
    public static readonly LOCAL_ROTATION = "baseRightHandLocalRotation";
    public static readonly LOCAL_SCALE = "baseRightHandLocalScale";
}

export class PlayerTransformModifier extends BaseModifier {
    public static readonly HEAD = Head;
    public static readonly LEFT_HAND = LeftHand;
    public static readonly RIGHT_HAND = RightHand;

    public set Value(value: BasePlayer) { this.value = value; }
    public get Value(): BasePlayer { return this.value as BasePlayer; }

    public set Accessor(accessor: XYZAccessor) { this.accessor = accessor; }
    public get Accessor(): string | undefined { return this.accessor; }

    constructor(value?: BasePlayer, aos?: number, smoothing?: undefined);
    constructor(value?: BasePlayer, aos?: XYZAccessor, smoothing?: number);
    constructor(value: BasePlayer, aos?: XYZAccessor | number, smoothing?: number) { super(value, typeof aos === "number" ? "" : aos, typeof aos === "number" ? aos : smoothing); }
}
