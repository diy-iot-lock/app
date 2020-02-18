export default class UtilService {
    public static IsNode(): boolean {
        return typeof window === 'undefined';
    }
}