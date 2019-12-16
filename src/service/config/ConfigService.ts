import SecretService from "./SecretService";

import {DetectionModel, RecognitionModel} from "../../application/model/PersonGroup/PersonGroupModel";

export default class ConfigService {
    public static Face = {
        Key: SecretService.Face.Key,
        Url: SecretService.Face.Url,
        RecognitionModel: RecognitionModel.V2,
        DetectionModel: DetectionModel.V1,
        Person: {
            FacesMax: 248
        },
        Group: {
            Inhabitants: "inhabitants",
            Id: ""
        },
    };

    public static Blob = {
        Name: SecretService.Blob.Name,
        Key: SecretService.Blob.Key,
        Container: "faces",
    };
}
