import {RecognitionModel} from "../PersonGroup/PersonGroupModel";
import {RectangleModel} from "./Base/RectangleModel";
import {FaceLandmarksModel} from "./FaceLandmarksModel";
import {FaceAttributesModel} from "./FaceAttributesModel";

export class DetectFaceModel {
    public faceId!: string;
    public recognitionModel!: RecognitionModel;
    public faceRectangle!: RectangleModel;
    public faceLandmarks!: FaceLandmarksModel;
    public faceAttributes!: FaceAttributesModel;
}
