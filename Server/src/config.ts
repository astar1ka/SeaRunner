type TNameArray = {
    [key: string]: string
};

export default class CONFIG {
    public PORT: number = 3001;

    DB_CONNECT = {
        HOST: 'localhost',
        PORT: 5432,
        NAME: 'SeaRunner',
        USER: 'postgres',
        PASS: '111'
    }

    public MESSAGES: TNameArray = {
        SEND_MESSAGE: 'SEND_MESSAGE',
        GET_MESSAGES_ALL: 'GET_MESSAGES_ALL',
        GET_MESSAGES_PRIVATE: 'GET_MESSAGES_PRIVATE',
        LOG_IN: 'LOG_IN',
        REGISTRATION: 'REGISTRATION',
        LOG_OUT: 'LOG_OUT',
        GAME_LOADED: 'GAME_LOADED',
        GET_CAPTAIN: 'GET_CAPTAIN',
        ADD_CAPTAIN: 'ADD_CAPTAIN'
    }

    public MEDIATOR: {
        [key: string]: TNameArray
    } = {
            EVENTS: {
                CHANGE_USERS: 'CHANGE_USERS',
                CHANGE_USER: 'CHANGE_USER',
                USER_LOG_IN: 'USER_LOG_IN',
                USER_LOADED: 'USER_LOADED',
                INIT_DATABASE: 'INIT_DATABASE'
            },
            TRIGGERS: {
                GET_USER_BY_TOKEN: 'GET_USER_BY_TOKEN',
                GET_USER: 'GET_USER',
                AUTH_VERIFICATE: 'AUTH_VERIFICATE',
                LOG_IN: 'LOG_IN',
                LOG_OUT: 'LOG_OUT',
                REGISTRATION: 'REGISTRATION',
                GET_ALL_USERS: 'GET_ALL_USERS',
                GET_MESSAGES: 'GET_MESSAGES',
                GET_CHAT_HASH: 'GET_CHAT_HASH',
                ADD_MESSAGE: 'ADD_MESSAGE',
                SEND_ALL: 'SEND_ALL'
            }
        }
}

const MIGRATION = {
    'users':
        `CREATE table users 
            (id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
            login text NOT NULL UNIQUE,
            password text NOT NULL UNIQUE,
            name text NOT NULL UNIQUE,
            token text)`,
    'towns':
        `CREATE table towns 
            (id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
            name text NOT NULL UNIQUE,
            allianceId text NOT NULL,
            x real NOT NULL,
            y real NOT NULL);
            INSERT INTO towns(name,allianceId,x,y) VALUES 
            ('Роял-харборт', 1, 200, 200),
            ('Эспадорт', 2, 1500, 1500),
            ('Крепость Гро', 3, 1500, 200)`,
    'alliances':
        `CREATE table alliances 
            (id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
            name text NOT NULL UNIQUE);
            INSERT INTO alliances(name) VALUES 
            ('Компания'),
            ('Армада'),
            ('Альянс')`,
    'captains':
        `CREATE table captains 
            (id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
            userId bigint NOT NULL,
            allianceId bigint NOT NULL ,
            shipId bigint,
            x bigint,
            y bigint,
            status text NOT NULL DEFAULT 'town'::text)`,
    'ships':
        `CREATE table ships 
            (id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
            captain_id bigint NOT NULL,
            speed bigint NOT NULL,
            attack_cooldown bigint NOT NULL,
            current_hp bigint)`,
}