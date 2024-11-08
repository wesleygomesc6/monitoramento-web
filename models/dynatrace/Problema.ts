import { BusinessImpact } from "./BusinessImpact";
import Entitie from "./Entitie";
import ImpactLevelType from "./ImpactLevelType";

export default class Problema {
    id!: number;
    problemId!: string;
    displayId!: string;
    title!: string;
    startTime!: Date;
    endTime!: Date;
    duracao!: string;
    severityLevel!: string;
    impactLevel!: string;
    impactLevels!: Array<ImpactLevelType>;
    status!: string;
    validated!: boolean;
    businessImpact!: BusinessImpact;
    rootCauseEntity!: Entitie;
    affectedEntities!: Array<Entitie>;
    impactedEntities!: Array<Entitie>;
    evidences!: Array<Entitie>;
    solver!: string

}