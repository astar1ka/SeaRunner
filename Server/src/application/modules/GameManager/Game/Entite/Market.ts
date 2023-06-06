import ActiveRecord from "../../../ActiveRecord";
import DB from "../../../DB/DB";
import { Tables } from "../../../Types";

export default class Market extends ActiveRecord{
    private priceList = {};
    constructor(db: DB, settlementId: number){
        super(db, Tables.markets);
        this.fields = ['id','settlement_id'];
        this.attributes['settlement_id'] = settlementId;
    }

    public async init(){
        let market = await this.db.getMarketBySettlementId(this.get('settlement_id'));
        if (market) {
            this.rewrite(market);
            market = null;
            return true;
        }
        return false;
    }

    public getPriceList(){
        //this.priceList = this.db.getPriceList()
    }

    public sell(){

    }

    public async buyItem(itemId: string): Promise<boolean> {
        const captain = await this.db.getCaptain(this.get('captain_id'));
        const item = await this.db.getItem(itemId);
        const userId = await this.db.getCaptain(this.get('userID'));
      
        if (captain && item) {
          // Проверка на наличие достаточного количества денег у капитана
          if (captain.money >= item.price) {
            // Списание денег из инвентаря капитана
            captain.money -= item.price;
      
            // Добавление предмета в базу данных с указанием владельца и номера ячейки
            await this.db.addItemTo(captain.id, captain.inventory.length, item.guid);
      
            // Обновление записи капитана в базе данных
            await this.db.updateCaptain(userId, captain);
      
            return true;
          }
        }
        return false;
    }
      
      

    public view(){

    }
}