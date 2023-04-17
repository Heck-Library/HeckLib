import IPPProperty from "./IPPProperty";


export default interface IPPData {
    asset: string;
    priority?: number;
    pass?: number;
    target?: string;
    duration?: number;
    easing?: string;
    properties: IPPProperty[];
}
