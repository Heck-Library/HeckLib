import Mod from "./plugin.ts";

enum Lawless {
    Easy = "EasyLawless.dat",
    Normal = "NormalLawless.dat",
    Hard = "HardLawless.dat",
    Expert = "ExpertLawless.dat",
    ExpertPlus = "ExpertPlusLawless.dat"
}
enum Standard {
    Easy = "EasyStandard.dat",
    Normal = "NormalStandard.dat",
    Hard = "HardStandard.dat",
    Expert = "ExpertStandard.dat",
    ExpertPlus = "ExpertPlusStandard.dat"
}
enum Lightshow {
    Easy = "EasyLightshow.dat",
    Normal = "NormalLightshow.dat",
    Hard = "HardLightshow.dat",
    Expert = "ExpertLightshow.dat",
    ExpertPlus = "ExpertPlusLightshow.dat"
}

export const Difficulty = {
    Standard,
    Lawless,
    Lightshow
}

export type requirement = Mod.Chroma | Mod.Cinema | Mod.Mapping | Mod.Noodle;
export type diffFile =
    | Lawless.Easy
    | Lawless.Normal
    | Lawless.Hard
    | Lawless.Expert
    | Lawless.ExpertPlus

    | Standard.Easy
    | Standard.Normal
    | Standard.Hard
    | Standard.Expert
    | Standard.ExpertPlus
    
    | Lightshow.Easy
    | Lightshow.Normal
    | Lightshow.Hard
    | Lightshow.Expert
    | Lightshow.ExpertPlus;
