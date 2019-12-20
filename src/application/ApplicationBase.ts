import ConfigService from "../service/config/ConfigService";

import BlobService from "../service/BlobService";
import FaceService from "../service/FaceService";

import GeneratorService from "../service/helper/GeneratorService";

import {ILogService} from "../interface/ILogService";

import {PersonGroupModel} from "./model/PersonGroup/PersonGroupModel";

export class ApplicationBase {
    protected readonly log: ILogService;

    constructor(log: ILogService) {
        this.log = log;
    }

    public async initializeAsync(): Promise<void> {
        this.log.info("Application initialization started.");

        await this.initializeBlobAsync();
        await this.initializeFaceAsync();

        this.log.info("Application initialization finished.");
    }

    private async initializeBlobAsync(): Promise<void> {
        this.log.info("Blob initialization started.");
        await BlobService.createContainerIfNotExistsAsync();
        this.log.info("Blob initialization finished.");
    }

    private async initializeFaceAsync(): Promise<void> {
        this.log.info("Getting list of all groups.");
        const groups = await FaceService.listPersonGroupsAsync();

        this.log.info("Looking for default group.");
        let inhabitants = groups.filter(group => {
            return group.name === ConfigService.Face.Group.Inhabitants;
        })[0];

        if (!inhabitants) {
            this.log.info("Default group NOT found.");
            inhabitants = new PersonGroupModel();
            inhabitants.name = ConfigService.Face.Group.Inhabitants;

            // TODO: refactoring needed
            const size = 10;
            inhabitants.personGroupId = GeneratorService.getUniqieNumber(size).toString();
            while (inhabitants.personGroupId.length < size) {
                inhabitants.personGroupId = "0" + inhabitants.personGroupId;
            }

            this.log.info("Creating default group.");
            await FaceService.createPersonGroupAsync(inhabitants.personGroupId, inhabitants);
        } else {
            this.log.info("Default group found.");
        }

        this.log.info("Setting default group id.");
        ConfigService.Face.Group.Id = inhabitants.personGroupId;
    }
}
