# Sea-Runner-ServerCREATE

Создание таблиц в PgAdmin:

    CREATE table users 
        (id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        login text NOT NULL UNIQUE,
        password text NOT NULL UNIQUE,
        name text NOT NULL UNIQUE,
        token text);
        
    CREATE table towns 
        (id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        name text NOT NULL UNIQUE,
        allianceId text NOT NULL,
        x real NOT NULL,
        y real NOT NULL);
        INSERT INTO towns(name,allianceId,x,y) VALUES 
        ('Роял-харборт', 1, 200, 200),
        ('Эспадорт', 2, 1500, 1500),
        ('Крепость Гро', 3, 1500, 200);

    CREATE table alliances 
        (id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        name text NOT NULL UNIQUE);
        INSERT INTO alliances(name) VALUES 
        ('Компания'),
        ('Армада'),
        ('Альянс');

    CREATE table captains 
        (id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        userId bigint NOT NULL,
        allianceId bigint NOT NULL ,
        shipId bigint,
        x bigint,
        y bigint,
        status text NOT NULL DEFAULT 'town'::text);
    CREATE table ships 
        (id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        captain_id bigint NOT NULL,
        speed bigint NOT NULL,
        attack_cooldown bigint NOT NULL,
        current_hp bigint)