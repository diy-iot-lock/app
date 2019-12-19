import {ILogService} from "./interface/ILogService";
import TrainApplication from "./application/TrainApplication";
import PredictApplication from "./application/PredictApplication";
import SecretService from "./service/config/SecretService";
import EmptyLogService from "./service/log/EmptyLogService";

export class DIYIoTlockApp {
    public readonly train: TrainApplication;
    public readonly predict: PredictApplication;

    constructor(log: ILogService = new EmptyLogService()) {
        this.train = new TrainApplication(log);
        this.predict = new PredictApplication(log);
    }

    public setBlobConfig(name: string, key: string): void {
        SecretService.Blob.Name = name;
        SecretService.Blob.Key = key;
    }

    public setFaceConfig(url: string, key: string): void {
        SecretService.Face.Url = url;
        SecretService.Face.Key = key;
    }
}
