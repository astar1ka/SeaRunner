import List from "./List";

export default class Updater{
    private updateList = new List;

    public add(func: Function, delta: number | null = null, addTime: number = 0){
        let time = Number(Date.now()) + addTime;
        this.updateList.add(this.updateList.newList(func,time,delta));
    }

    update(){
        let update = this.updateList.get();
        const time = Number(Date.now());
        while (update && update.time<=time){
            update = this.updateList.pop();
        }
    }

}