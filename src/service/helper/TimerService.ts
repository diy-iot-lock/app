export default class TimerService {
    public static Wait(timeout: number): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            setTimeout(() => {
                resolve();
            }, timeout);
        });
    }
}
