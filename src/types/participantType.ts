import type {DisciplineType} from "./disciplineType.ts";

type ParticipantType = {
    id: number;
    name: string;
    gender: string;
    age: number;
    clubName: string;
    discipline: DisciplineType[];
}

type ParticipantPostType = {
    name: string;
    gender: string;
    age: number;
    clubName: string;
    discipline: [{
        name: string;
    }];
}


export type { ParticipantType, ParticipantPostType };