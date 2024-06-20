import type {DisciplineType} from "./disciplineType.ts";
import type {ParticipantType} from "./participantType.ts";

type ResultType = {
    id: number;
    resultType: string;
    resultValue: string;
    date: Date;
    discipline: DisciplineType;
    participant: ParticipantType;
}

type ResultPostType = {
    resultType: string;
    resultValue: string;
    date: Date;
    discipline: { name: string};
    participant: { name: string};
}

export type {ResultType, ResultPostType };