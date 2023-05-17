import Captain from "../../../application/modules/GameManager/Game/Entite/Captain";
import DB from "../../../application/modules/DB/DB";
import { getActiveRecordCaptain, userId } from "./config";

let captain: Captain;
let db: DB;

beforeAll(async () => {
  captain = await getActiveRecordCaptain();
});

describe('Captain.getByUserId', () => {

    describe('getByUserId', () => {
        test('Загружаем капитана по верному user id', async () => {     
            const result = await captain.getByUserId(userId.correct);
            expect(result).toEqual(true);
            const data = captain.getData();
            expect(data.userid-0).toEqual(userId.correct);
        });
    
        test('Загружаем капитана по неверному user id', async () => {     
            const result = await captain.getByUserId(userId.wrong);
            expect(result).toEqual(false);
        });

        test('Загружаем капитана по случайному user id', async () => {     
            const result = await captain.getByUserId(userId.random);
            expect(result).toEqual(false);
        });
    });
});
