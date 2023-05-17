
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
    towns = 'towns',
    alliances = 'alliances',
    rooms = 'rooms',
    traders = 'traders',
    ships = 'ship'
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
export type TCaptainData = {
    activeShipId?: number | null;
    posX?: number;
    posY?: number;
    direction?: number;
}

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

export interface IShipData {
    captainId: number;
    currentHp: number;
    speed: number;
    attackSpeed: number;
    countCannon: number | null;
    grade: number;
    sizeInventory: number;
}

export interface IShip extends IShipData {
    id: number;
}

export type TShips = IShip[];

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

