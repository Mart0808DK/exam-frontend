import type {DisciplineType} from "./disciplineType.ts";
import type {ParticipantType} from "./participantType.ts";

type ResultType = {
    id: number;
    resultType: string;
    resultValue: number;
    discipline: DisciplineType;
    participant: ParticipantType;
}

type ResultPostType = {
    resultType: string;
    resultValue: number;
    discipline: { name: string};
    participant: { name: string};
}

export type {ResultType, ResultPostType };