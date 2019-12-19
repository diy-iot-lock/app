export enum RecognitionModel {
    V1 = "recognition_01",
    V2 = "recognition_02",
}

export enum DetectionModel {
    V1 = "detection_01",
    V2 = "detection_02",
}

export class PersonGroupModel {
    public personGroupId!: string;
    public name!: string;
    public userData!: string;
    public recognitionModel!: RecognitionModel;

    constructor() {
        this.recognitionModel = RecognitionModel.V2;
    }
}
