import type {DisciplineType} from "./disciplineType.ts";

type ParticipantType = {
    id: number;
    name: string;
    gender: string;
    age: number;
    clubName: string;
    discipline: DisciplineType[];
}

type DisciplinePostType = {
    id: number;
    name: string;
    resultType: string;
}

type ParticipantPostType = {
    name: string;
    gender: string;
    age: number;
    clubName: string;
    discipline: DisciplinePostType[];
}


export type { ParticipantType, ParticipantPostType };