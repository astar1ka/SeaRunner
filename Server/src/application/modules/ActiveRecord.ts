import { TAttributes, Tables} from "./Types";

import DB from "./DB/DB";

export default class ActiveRecord{
    protected primaryKey = 'id'; 
    protected fields: string [] = [];
    protected hidden: string [] = []; 
    protected attributes: TAttributes = {};
    constructor(readonly db: DB, readonly table: Tables){
    }

    public getData(): TAttributes{
        const attributes: TAttributes = {};
        this.fields.forEach((field: string) => {
            const value = this.get(field);
            if (!this.hidden.find((value) => value === field)) attributes[field] = value;
        })
        return attributes;
    }

    protected rewrite(attributes: TAttributes){
        this.fields.forEach((field: string) => {
            const value = this.get(field);
            this.attributes[field] = attributes[field];
        })
    }

    protected get(key: string){
        return this.attributes[key];
    }

    protected async refresh(): Promise<boolean>{
        if (this.attributes[this.primaryKey]) {
            const data = await this.db.find(this.table, this.attributes[this.primaryKey]);
            if (data) 
            {
                this.rewrite(data);
                return true;
            };
        }
        return false;
    }

    protected async create(data: object): Promise<boolean>{
        const record = await this.db.addRecord(this.table, {...data});
        if (record) {
            this.rewrite(record);
            return true;
        }
        return false;
    }

    protected save(){
        this.db.updateRecord(this.table, this.attributes[this.primaryKey], this.getData());
    }
    
    public getId():number{
        return this.get('id');
    }
}