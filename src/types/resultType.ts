import type {DisciplineType} from "./disciplineType.ts";
import type {ParticipantType} from "./participantType.ts";

type ResultType = {
    id: number;
    resultType: string;
    resultValue: number;
    discipline: DisciplineType;
    participant: ParticipantType;
}

export type {ResultType, ResultParticipantType, ResultTypeEnum};