import EntityType from "./EntityType";

export default class Entitie {
    id?: number;
    entityId?: string;
    name?: string;
    entityType?: EntityType

    constructor(id?: number, entityId?: string, name?: string, entityType?: EntityType) {
        this.id = id;
        this.entityId = entityId;
        this.name = name;
        this.entityType = entityType;
    }
}