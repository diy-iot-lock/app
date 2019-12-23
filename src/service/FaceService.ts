import ConfigService from "./config/ConfigService";

import {HttpMethod, HttpService} from "./helper/HttpService";
import {DetectionModel, PersonGroupModel} from "../application/model/PersonGroup/PersonGroupModel";
import {PersonGroupTrainingStatusModel} from "../application/model/PersonGroup/PersonGroupTrainingStatusModel";
import {PersonModel} from "../application/model/Person/PersonModel";
import {DetectFaceModel} from "../application/model/Face/DetectFaceModel";
import {RectangleModel} from "../application/model/Face/Base/RectangleModel";
import {IdentifyModel} from "../application/model/Identify/IdentifyModel";

export default class FaceService {
    public static async listPersonGroupsAsync(): Promise<PersonGroupModel[]> {
        return await this.getClient().callApiAsync(`/persongroups`);
    }

    public static async createPersonGroupAsync(groupId: string, model: PersonGroupModel): Promise<void> {
        await this.getClient().callApiAsync(`/persongroups/${groupId}`, HttpMethod.PUT, model);
    }

    public static async trainPersonGroupAsync(groupId: string): Promise<void> {
        await this.getClient().callApiAsync(`/persongroups/${groupId}/train`, HttpMethod.POST);
    }

    public static async checkPersonGroupTrainingStatusAsync(groupId: string): Promise<PersonGroupTrainingStatusModel> {
        return await this.getClient().callApiAsync(`/persongroups/${groupId}/training`);
    }

    public static async listPersonsAsync(groupId: string): Promise<PersonModel[]> {
        return await this.getClient().callApiAsync(`/persongroups/${groupId}/persons`);
    }

    public static async createPersonAsync(groupId: string, model: PersonModel): Promise<PersonModel> {
        const res = await this.getClient().callApiAsync(`/persongroups/${groupId}/persons`, HttpMethod.POST, model);

        model.personId = res.personId;
        delete model.persistedFaceIds;

        return model;
    }

    public static async addPersonFaceAsync(groupId: string, personId: string, url: string, faceRectangle: RectangleModel): Promise<void> {
        const coordinates = [
            faceRectangle.left,
            faceRectangle.top,
            faceRectangle.width,
            faceRectangle.height,
        ].join(",");

        const query = [
            `detectionModel=${DetectionModel.V2}`,
            `targetFace=${coordinates}`,
        ].join("&");

        return await this.getClient().callApiAsync(
            `/persongroups/${groupId}/persons/${personId}/persistedFaces?${query}`,
            HttpMethod.POST,
            { url });
    }

    public static async detectFacesAsync(url: string): Promise<DetectFaceModel[]> {
        const attributes = [
            "age",
            "gender",
            "headPose",
            "smile",
            "facialHair",
            "glasses",
            "emotion",
            "hair",
            "makeup",
            "occlusion",
            "accessories",
            "blur",
            "exposure",
            "noise",
        ].join(",");

        const query = [
            `returnFaceId=${true}`,
            `returnFaceLandmarks=${true}`,
            `returnFaceAttributes=${attributes}`,
            `recognitionModel=${ConfigService.Face.RecognitionModel}`,
            `returnRecognitionModel=${true}`,
            `detectionModel=${ConfigService.Face.DetectionModel}`,
        ].join("&");

        return await this.getClient().callApiAsync(
            `/detect?${query}`,
            HttpMethod.POST,
            { url });
    }

    public static async identifyFacesAsync(faceIds: string[], personGroupId: string): Promise<IdentifyModel[]> {
        return await this.getClient().callApiAsync(
            "/identify",
            HttpMethod.POST,
            { faceIds, personGroupId });
    }

    private static _client: HttpService;
    private static getClient() {
        if (!this._client) {
            this._client = new HttpService(ConfigService.Face.Url, {
                    "Ocp-Apim-Subscription-Key": ConfigService.Face.Key,
                });
        }
        return this._client;
    }
}
