import unknownProperty from "../../../types/unknownProperty";

export default interface IUnknownEvent {
    time: number;
    type: string;
    data: unknownProperty
}