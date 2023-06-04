
/////////////////////////////////////
///////////////forAll////////////////
/////////////////////////////////////

export enum Errors {
    UNAUTH = '403',
}


/////////////////////////////////////
///////////////DB////////////////////
/////////////////////////////////////

export type TAttributes = {
    [key: string]: any 
}

export type TAttribute = {
    name: string,
    canNull: boolean
}

export enum Tables {
    users = 'users',
    messages = 'messages',
    captains = 'captains',
    settlements = 'settlements',
    alliances = 'alliances',
    rooms = 'rooms',
    markets = 'markets',
    ships = 'ships',
    inventory = 'inventory'
}

export type TUser = {
    id: number;
    login: string;
    password: string;
    name: string;
    token: string;
}

export enum TypesRoom {
    Public = 'public',
    Private = 'private',
    Alliance = 'alliance'
}

export type TRooms = {
    id: number,
    type: TypesRoom
}

export type TMessage = {
    roomId: number,
    userIdFrom: number,
    message: string
}

export type TMessages = TMessage[];

///////////////////////////
export interface ILogin {
    login: string;
    password: string;
};

export interface IUserData extends ILogin{
    name: string;
}

export interface IUser extends IUserData{
    id: number;
    token: string;
}

export type TUsers = IUser[];

export type TAuthData = {
    token: string;
    callback: Function | null;
}

///////////////////////////
////////GAME///////////////
///////////////////////////


///////////////////////////
////////CAPTAIN////////////
///////////////////////////

export interface ICaptainData{
    userId: number;
    allianceId: number;
    activeShipId: number | null;
    posX: number;
    posY: number;
    direction: number;
}

export interface ICaptain extends ICaptainData{
    id: number;
}

export type TCaptains = ICaptain [];

///////////////////////////
////////SHIP///////////////
///////////////////////////

export type TBaseShip = {
    id: number;
    name: string;
    speed: number;
    max_hp: number;
    attack_cooldown: number;
    inventory_size: number;
}

export type TShip = {
    id: number;
    captain_id: number;
    type_id: number;
    speed: number;
    max_hp: number;
    attack_cooldown: number;
    inventory_size: number;
    name: string;
    current_hp: number;
}

export type TShips = TShip[];

export type TEffectCell = {
    id: number;
    shipId: number;
    effectId: number;
}

export type TInventoryCell = {
    id: number;
    shipId: number;
    cellNumber: number;
    itemId: number;
}

export type TItem = {
    id: number;
    typeId: number;
    name: number;
    grade: number;
}



///////////////////////////
////////Messages///////////
///////////////////////////

export interface IMessageData  {
    userIdFrom: number;
    userIdTo: number | null;
    message: string;
}

export interface IMessage extends IMessageData {
    id: number;
}

export type TRoom = {
    guid: string;
    type: string;
}

export type TSettlement = {
    id: number;
    name: string;
    type: string;
    x: number;
    y: number;
}

