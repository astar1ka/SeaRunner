type Key = number | string;

type TCache<T> = {
    [key: Key]: T
}

export default class Cache<T>{
    private cache: TCache<T> = {};
    constructor() {
    }

    public set(key: Key, value: T): void {
        this.cache[key] = value;
    }

    public get(key: Key): T | null{
        return this.cache[key];
    }

    public getAll(): T[] {
        return Object.values(this.cache);
    }

    public remove(key: Key): void {
        delete this.cache[key];
    }

    public delete(): void {
        this.cache = {};
    }

    public forAll(func: Function) {
        Object.values(this.cache).forEach((value: T) => func(value));
    }
}