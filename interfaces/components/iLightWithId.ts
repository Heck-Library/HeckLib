
/**
 * Interface for assigning a light to an ID.
 * @interface
 * @name IILightWithId
 * 
 * @property {number} lightID The ID of the light.
 * @property {number} type The type of the light.
 */
export default interface IILightWithId {
    lightID: number;
    type: number;
}