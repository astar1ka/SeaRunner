# Sea-Runner-ServerCREATE

Создание таблиц в PgAdmin:

    CREATE table users 
        (id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        login text NOT NULL UNIQUE,
        password text NOT NULL UNIQUE,
        name text NOT NULL UNIQUE,
        token text);
        
    CREATE table settlements 
        (id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        name text NOT NULL UNIQUE,
        allianceId text,
        type text NOT NULL,
        x real NOT NULL,
        y real NOT NULL);
    INSERT INTO settlements(name,allianceId, type, x,y) VALUES 
        ('Роял-харборт', 1, 'town', 200, 200),
        ('Эспадорт', 2, 'town', 1500, 1500),
        ('Крепость Гро', 3, 'town', 1500, 200),
        ('Бухта утопленника', null, 'port', 700, 700),
        ('Чайный остров', null, 'port', 900, 300),
        ('Бухта темной воды', null, 'port', 100, 700);

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

    CREATE TABLE items_types
        (id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        name text NOT NULL,
        description text NOT NULL,
        name_value_1 text,
        name_value_2 text,
        name_value_3 text,
        name_value_4 text, 
        default_price bigint DEFAULT 0);
    INSERT INTO items_types(name,description, name_value_1, name_value_2,name_value_3,name_value_4, default_price) VALUES
        ('Дублоны', 'Приятно греют руку', 'count', null, null, null, 0),
        ('Древесина', 'Один из основных ресурсов', 'rang', null, null, null, 54),
        ('Железо', 'Один из основных ресурсов', 'rang', null, null, null, 167),
        ('Ткань', 'Один из основных ресурсов', 'rang', null, null, null , 87),
        ('Чай', 'Зеленное золото', 'rang', null, null, null, 250),
        ('Кофе', 'Источает приятный запах', 'rang', null, null, null, 400),
        ('Хлопок', 'Мягкий и дорогой', 'rang', null, null, null, 140),
        ('Китовый жир', 'Огнеопасно!', 'rang', null, null, null, 50),
        ('Пушки', 'Составная часть корабля', 'rang', null, null, null, 1000),
        ('Корпус', 'Составная часть корабля', 'rang', null, null, null, 1000),
        ('Паруса', 'Составная часть корабля', 'rang', null, null, null, 1000);

    