import DB from "../../../application/modules/DB/DB"
import CONFIG from "../../../config";
import User from "../../../application/modules/UserManager/User";
import Captain from "../../../application/modules/GameManager/Game/Entite/Captain";
import { resolve } from "path";
import { getActiveRecord } from "../config";

export const getActiveRecordUser = () => getActiveRecord<User>((db:DB) => new User(db));

function randomString(i: number) {
    var rnd = '';
    while (rnd.length < i) 
        rnd += Math.random().toString(36).substring(2);
    return rnd.substring(0, i);
}

export const authUser = {
    login: 'test',
    password: 'test',
    name: 'test',
    socketId: '',
}

export const wrongPassword = '1234';

export const regUser = {
    login: randomString(8),
    password: randomString(8),
    name: randomString(8),
    socketId: '',
};
