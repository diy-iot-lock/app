import {DetectFaceModel} from "../Face/DetectFaceModel";
import {CandidateModel} from "./CandidateModel";

export class IdentifyExtendedModel extends DetectFaceModel {
    constructor(model: DetectFaceModel = new DetectFaceModel()) {
        super();

        this.faceId = model.faceId;
        this.recognitionModel = model.recognitionModel;
        this.faceRectangle = model.faceRectangle;
        this.faceLandmarks = model.faceLandmarks;
        this.faceAttributes = model.faceAttributes;
    }

    public candidates!: CandidateModel[];
}