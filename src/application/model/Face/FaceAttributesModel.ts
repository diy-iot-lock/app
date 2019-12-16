import {FacialHairModel} from "./FacialHairModel";
import {HeadPoseModel} from "./HeadPoseModel";
import {EmotionModel} from "./EmotionModel";
import {HairModel} from "./HairModel";
import {MakeupModel} from "./MakeupModel";
import {OcclusionModel} from "./OcclusionModel";
import {AccessoriesModel} from "./AccessoriesModel";
import {BlurModel} from "./Base/BlurModel";
import {ExposureModel} from "./Base/ExposureModel";
import {NoiseModel} from "./Base/NoiseModel";

export class FaceAttributesModel {
    public age!: number;
    public gender!: string;
    public smile!: number;
    public facialHair!: FacialHairModel;
    public glasses!: string;
    public headPose!: HeadPoseModel;
    public emotion!: EmotionModel;
    public hair!: HairModel;
    public makeup!: MakeupModel;
    public occlusion!: OcclusionModel;
    public accessories!: AccessoriesModel[];
    public blur!: BlurModel;
    public exposure!: ExposureModel;
    public noise!: NoiseModel;
}
