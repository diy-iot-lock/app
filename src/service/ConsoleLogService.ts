import {ILogService} from "../interface/ILogService";

export default class ConsoleLogService implements ILogService {
    public error(message: string): any {
        console.log(message);
    }

    public info(message: string): any {
        console.log(message);
    }
}
