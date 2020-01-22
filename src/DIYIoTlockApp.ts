import {ILogService} from "./interface/ILogService";
import TrainApplication from "./application/TrainApplication";
import PredictApplication from "./application/PredictApplication";
import SecretService from "./service/config/SecretService";
import EmptyLogService from "./service/log/EmptyLogService";
import ConfigService from "./service/config/ConfigService";

export * from "./interface/ILogService";
export * from "./service/log/ConsoleLogService";

export class DIYIoTlockApp {
    public readonly train: TrainApplication;
    public readonly predict: PredictApplication;

    constructor(log: ILogService = new EmptyLogService()) {
        this.train = new TrainApplication(log);
        this.predict = new PredictApplication(log);
    }

    public async initializeAsync() {
        await this.train.initializeAsync();
        await this.predict.initializeAsync();
    }

    public setBlobConfig(name: string, key: string): void {
        SecretService.Blob.Name = name;
        SecretService.Blob.Key = key;
        ConfigService.initializeBlob();
    }

    public setBlobConfigSAS(name: string, sas: string): void {
        SecretService.Blob.Name = name;
        SecretService.Blob.SAS = sas;
        ConfigService.initializeBlob();
    }

    public setFaceConfig(url: string, key: string): void {
        SecretService.Face.Url = `${url}/face/v1.0`;
        SecretService.Face.Key = key;
        ConfigService.initializeFace();
    }
}
