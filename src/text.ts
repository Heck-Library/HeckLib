// deno-lint-ignore-file no-explicit-any
import { parse } from "https://deno.land/x/xml@2.0.4/mod.ts";
import { isPresent } from "./general.ts";
const letters: any = {
    a: [],
    b: [],
    c: [],
    d: [],
    e: [],
    f: [],
    g: [],
    h: [],
    i: [],
    j: [],
    k: [],
    l: [],
    m: [],
    n: [],
    o: [],
    p: [],
    q: [],
    r: [],
    s: [],
    t: [],
    u: [],
    v: [],
    w: [],
    x: [],
    y: [],
    z: [],
    questionmark: [],
    exclamation: [],
    period: []
};

export function parseModel(filePath: string) {
    const xml = parse(Deno.readTextFileSync(filePath))
    const fileName: string = filePath.slice(-3, 3)
    console.log(fileName);
    const json = JSON.parse(JSON.stringify(xml.COLLADA));
    if (json.library_visual_scenes.visual_scene.node !== null) {
        const node = json.library_visual_scenes.visual_scene.node;
        node.filter((x: any) =>
            isPresent(x.instance_geometry) &&
            isPresent(x.instance_geometry.bind_material) &&
            isPresent(x.instance_geometry.bind_material.technique_common) &&
            isPresent(x.instance_geometry.bind_material.technique_common.instance_material)
        ).forEach((y: any) => {   
            const matArray = [...y.instance_geometry.bind_material.technique_common.instance_material['@symbol']];
            matArray.splice(-9, 9)
            matArray.splice(0, 7)
            const matName = matArray.join("");

            Object.keys(letters).forEach(z => {
                if (z == matName) {
                    letters[z].push(y);
                }
            })
        });
    }
    Deno.writeTextFileSync(`./models/parsed/${"font"}.json`, JSON.stringify(letters, null, 4))
}
/*
  Same nodes are grouped into arrays, while numbers and booleans are auto-parsed (can be disabled)
  Nodes with attributes will not be flattened and you'll be able to access them with "@" prefix while
  text nodes are available through "#text" key and comment nodes are available through "#comment" key
  {
    root: {
      "#comment": "This is a comment",
      text: "hello",
      array: ["world", "monde", "世界", "🌏"],
      number: 42,
      boolean: true,
      complex: {
        "@attribute": "value",
        "#text": "content",
      }
    }
  }
*/