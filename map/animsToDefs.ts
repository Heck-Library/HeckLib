import { arcs } from "../objects/arc";
import { chains } from "../objects/chain";
import { notes } from "../objects/note";
import { walls } from "../objects/wall";
import PointDefinition from "./pointDefinition";
import { events, pointDefinitions } from "./variables";

export default function animationsToDefinitions() {
    let pointDefIndex = 0;
    const existingDefinitions: string[] = [];

    notes.filter(note => Object.keys(note.animation).length > 0).forEach(note => {
        const keys = Object.keys(note.animation);
        keys.forEach(key => {
            const animation = note.animation[key];
            const defName = `_autoDef${pointDefIndex}`;

            if (typeof animation !== "string") {
                if (!existingDefinitions.includes(JSON.stringify(animation))) {
                    new PointDefinition(defName, note.animation[key]).push();
                    existingDefinitions.push(JSON.stringify(animation));
                    pointDefIndex++;
                }
                existingDefinitions.forEach((def, i) => {
                    if (def === JSON.stringify(animation)) {
                        note.animation[key] = `_autoDef${i}`;
                    }
                });
            }
        });
    });
} 