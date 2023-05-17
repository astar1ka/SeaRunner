import DB from "../../../application/modules/DB/DB";
import Captain from "../../../application/modules/GameManager/Game/Entite/Captain";
import { getActiveRecord } from "../config";

export const getActiveRecordCaptain = () => getActiveRecord<Captain>((db:DB)=>new Captain(db));

export const userId = {
    wrong: 0,
    correct: 2,
    random: Math.round(Math.random()*1000)
};