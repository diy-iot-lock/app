export enum PersonGroupTrainingStatus {
    NotStarted = "notstarted",
    Running = "running",
    Succeeded = "succeeded",
    Failed = "failed",
}

export class PersonGroupTrainingStatusModel {
    public status!: PersonGroupTrainingStatus;
    public createdDateTime!: string;
    public lastActionDateTime!: string;
    public message!: string;
}
