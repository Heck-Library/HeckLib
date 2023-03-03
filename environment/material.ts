// deno-lint-ignore-file no-explicit-any
import Shader from "../consts/shader";
import { shaderType } from "../consts/types/environment";
import { Track } from "../consts/types/objects";
import { vec3 } from "../consts/types/vec";
import { materialNames, materials, V3 } from "../src/mapHandler";

export default class Material {
  stuff: Record<string, any>;
  name: string;
  m: {
    _color: vec3;
    _shader: shaderType;
    _track?: Track;
    _shaderKeywords?: string[];
  };
  constructor(name: string) {
    this.name = name;
    this.m = {
      _color: [0, 0, 0],
      _shader: Shader.Standard,
      _shaderKeywords: [],
    };
    const m = this.m;
    this.stuff = JSON.parse(
      `{"${name}": {"_color": ${JSON.stringify(
        m._color
      )},"_shader": ${JSON.stringify(m._shader)}}}`
    );
  }
  /**
   * The color of the material.
   */
  color(x: vec3) {
    this.stuff[Object.keys(this.stuff)[0]]._color = x;
    return this;
  }
  /**
   * Which shader the material should use.
   */
  shader(x: shaderType) {
    this.stuff[Object.keys(this.stuff)[0]]._shader = x;
    return this;
  }
  /**
   * Which track the material should be assigned to.
   */
  track(x: Track) {
    this.stuff[Object.keys(this.stuff)[0]]._track = x;
    return this;
  }
  /**
   * The keywords for the material.
   */
  keywords(x: string[]) {
    this.stuff[Object.keys(this.stuff)[0]]._shaderKeywords = x;
    return this;
  }
  /**
   * Push the material to the map data.
   */
  push() {
    let out = this.stuff;
    if (V3) {
      const stringified = JSON.stringify(this.stuff).replace(/_/g, "");
      out = JSON.parse(stringified);
    }
    if (materialNames.includes(this.name)) {
      return;
    }
    materialNames.push(this.name);
    Object.assign(materials, out);
  }
}
