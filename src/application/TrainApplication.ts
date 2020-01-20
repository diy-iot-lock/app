import ConfigService from "../service/config/ConfigService";

import FaceService from "../service/FaceService";

import TimerService from "../service/helper/TimerService";

import {ApplicationBase} from "./ApplicationBase";
import {ILogService} from "../interface/ILogService";

import {PersonGroupTrainingStatus} from "./model/PersonGroup/PersonGroupTrainingStatusModel";
import {PersonModel} from "./model/Person/PersonModel";
import BlobService from "../service/BlobService";
import {RectangleModel} from "./model/Face/Base/RectangleModel";

import {Readable} from "stream";

export default class TrainApplication extends ApplicationBase {
    constructor(log: ILogService) {
        super(log);
    }

    public async addPersonAsync(person: PersonModel): Promise<PersonModel> {
        this.log.info("Adding new person.");
        return await FaceService.createPersonAsync(ConfigService.Face.Group.Id, person);
    }

    public async addPersonFaceAsync(personId: string, photo: Readable | Blob | ArrayBuffer, rectangle: RectangleModel): Promise<void> {
        this.log.info("Uploading photo.");
        const url = await BlobService.uploadBlobAsync(photo);

        this.log.info("Adding person face photo.");
        await FaceService.addPersonFaceAsync(
            ConfigService.Face.Group.Id,
            personId,
            url,
            rectangle,
        );

        this.log.info("Submitting model train request.");
        await FaceService.trainPersonGroupAsync(ConfigService.Face.Group.Id);

        // TODO: refactoring needed
        this.log.info("Checking on training status.");
        let status = await FaceService.checkPersonGroupTrainingStatusAsync(ConfigService.Face.Group.Id);
        while (status.status !== PersonGroupTrainingStatus.Succeeded) {
            await TimerService.Wait(1000);
            this.log.info("Checking on training status.");
            status = await FaceService.checkPersonGroupTrainingStatusAsync(ConfigService.Face.Group.Id);
        }
        this.log.info("Model train succeeded.");
    }
}
