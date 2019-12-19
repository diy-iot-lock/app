import {ILogService} from "../../interface/ILogService";

export default class EmptyLogService implements ILogService {
    public error(message: string): any {
    }

    public info(message: string): any {
    }
}
