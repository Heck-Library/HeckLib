import IPPProperty from "./IPPProperty";


export default interface IMatPropertyData {
    asset?: string;
    duration?: number;
    easing?: string;
    properties?: IPPProperty[];
}
