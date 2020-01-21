import {ApplicationBase} from "./ApplicationBase";
import {ILogService} from "../interface/ILogService";
import {DetectFaceModel} from "./model/Face/DetectFaceModel";
import BlobService from "../service/BlobService";
import FaceService from "../service/FaceService";
import {IdentifyModel} from "./model/Identify/IdentifyModel";
import ConfigService from "../service/config/ConfigService";

import {Readable} from "stream";

export default class PredictApplication extends ApplicationBase {
    constructor(log: ILogService) {
        super(log);
    }

    public async detectFacesAsync(photo: Readable | Blob | ArrayBuffer): Promise<DetectFaceModel[]> {
        this.log.info("Uploading photo.");
        const url = await BlobService.uploadBlobAsync(photo);

        this.log.info("Detecting faces.");
        return await FaceService.detectFacesAsync(url);
    }

    public async identifyFacesAsync(photo: Readable | Blob | ArrayBuffer): Promise<IdentifyModel[]> {
        this.log.info("Uploading photo.");
        const url = await BlobService.uploadBlobAsync(photo);

        this.log.info("Detecting faces.");
        const faces = await FaceService.detectFacesAsync(url);

        if (faces.length == 0) {
            this.log.info("No faces were found.");
            return [];
        }

        this.log.info(`${faces.length} faces were found.`);
        const faceIds = faces.map(face => {
            return face.faceId;
        });

        this.log.info("Identifying faces.");
        return await FaceService.identifyFacesAsync(faceIds, ConfigService.Face.Group.Id);
    }
}
