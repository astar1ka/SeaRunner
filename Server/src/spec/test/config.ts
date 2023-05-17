import DB from "../../application/modules/DB/DB";
import User from "../../application/modules/UserManager/User";
import CONFIG from "../../config";

export const getActiveRecord = <T>(createActiveRecord: Function) => {
    return new Promise<T>((resolve) => {
        const { DB_CONNECT } = new CONFIG;
        const db = new DB({
            ...DB_CONNECT,
            initCb: () => resolve(createActiveRecord(db))
        });
    });
}