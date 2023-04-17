import IBomb from "../../interfaces/objects/bomb";
import Bomb from "../../objects/bomb";

export function JSONtoBombs(bombInput: Record<string, any>, NJS: number, offset: number): IBomb[] {
    const bombArr: IBomb[] = [];
    bombInput.forEach((b: any) => {
        const bomb = new Bomb({
            time: b._time,
            x: b._lineIndex,
            y: b._lineLayer
        }, {
            njs: NJS,
            offset: offset
        });
        bombArr.push(bomb);
    });
    return bombArr;
}