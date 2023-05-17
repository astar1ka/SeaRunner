type TTimeList = {
    prev: TTimeList;
    next: TTimeList;
    time: number;
    func: Function;
    id: number;
    delta: number | null;
} | null;

export default class List{
    private HEAD: TTimeList = null;
    private id = 0;
    constructor(){
    }

    private getId(){
        this.id++;
        return this.id;
    }

    public newList(func: Function, time: number, delta: number | null = null){
        return {
            prev: null,
            next: null,
            func,
            delta,
            time,
            id: this.getId()
        }
    }

    public add(NEW: TTimeList){
        if (NEW) {
            let top: TTimeList = this.HEAD;
            while(top && top.time<NEW.time){
                top = top.next;
            }
            this.insert(NEW, top)
            return NEW.id;
        }

    }

    private insert(NEW:TTimeList, NEXT: TTimeList){
        if (NEW) {
            if (NEXT) {
                const PREV = NEXT.prev;
                NEXT.prev = NEW;
                NEW.next = NEXT;
                if (PREV) {
                    PREV.next = NEW;
                    NEW.prev = PREV;
                }
                else this.HEAD = NEW;
            } else {
                this.HEAD = NEW;
            }
        }
    }

    public get():TTimeList{
        return this.HEAD;
    }

    public pop():TTimeList{
        if (this.HEAD) {
            if (this.HEAD.delta) {
                this.HEAD.time += this.HEAD.delta;
                this.add(this.HEAD);
            };
            this.HEAD.func();
            this.HEAD = this.HEAD.next;
        }
        return this.HEAD;
    }
}