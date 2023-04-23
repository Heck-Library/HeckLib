import IPPProperty from "./IPPProperty";


export default interface IPPData {
    asset: string;
    priority?: number;
    source?: string;
    pass?: number;
    duration?: number;
    easing?: string;
    destination?: string[];
    properties?: IPPProperty[];
}
