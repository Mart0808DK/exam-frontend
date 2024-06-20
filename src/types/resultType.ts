import type {DisciplineType} from "./disciplineType.ts";
import type {ClubType} from "./clubType.ts";

type ResultParticipantType = {
    id: number;
    name: string;
    gender: string;
    age: number;
    club: ClubType;
}

type ResultType = {
    id: number;
    result_type: string;
    resultValue: number;
    discipline: DisciplineType;
    participant: ResultParticipantType;
}

export type {ResultType, ResultParticipantType};