export default class GeneratorService {
    public static getUniqieNumber(size: number = 9): number {
        const rnd = Math.random();
        const pow = rnd * Math.pow(10, size);
        return Math.round(pow);
    }
}
