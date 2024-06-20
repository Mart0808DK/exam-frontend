import type {ClubType} from "./clubType.ts";
import type {DisciplineType} from "./disciplineType.ts";

type ParticipantType = {
    id: number;
    name: string;
    gender: string;
    age: number;
    club: ClubType;
    discipline: DisciplineType[];
}

type ParticipantPostType = {
    name: string;
    gender: string;
    age: number;
    club: {
        name: string;
    };
    discipline: [{
        name: string;
    }];
}


export type { ParticipantType, ParticipantPostType };