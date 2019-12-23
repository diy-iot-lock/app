import SecretService from "./SecretService";
import BlobService from "../BlobService";
import {DetectionModel, RecognitionModel} from "../../application/model/PersonGroup/PersonGroupModel";

export default class ConfigService {
    public static Face = {
        Key: SecretService.Face.Key,
        Url: SecretService.Face.Url,
        RecognitionModel: RecognitionModel.V2,
        DetectionModel: DetectionModel.V1,
        Person: {
            FacesMax: 248,
        },
        Group: {
            Inhabitants: "inhabitants",
            Id: "",
        },
    };

    public static Blob = {
        Name: SecretService.Blob.Name,
        Key: SecretService.Blob.Key,
        SAS: SecretService.Blob.SAS,
        Container: "faces",
    };

    public static initializeFace() {
        this.Face.Url = SecretService.Face.Url;
        this.Face.Key = SecretService.Face.Key;
    }

    public static initializeBlob() {
        this.Blob.Name = SecretService.Blob.Name;
        this.Blob.Key = SecretService.Blob.Key;
        this.Blob.SAS = SecretService.Blob.SAS;
        BlobService.reset();
    }
}
