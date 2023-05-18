# Сокетные события и как они работают.


1. Данный код представляет класс UserManager, который является менеджером для управления пользователями. Рассмотрим его работу, включая конструктор:

    1. Здесь создается экземпляр класса `Cache<User>`, который, вероятно, используется для хранения и управления объектами типа `User`. Этот объект `users` будет доступен внутри класса и будет использоваться для отслеживания пользователей
        
        ```javascript
        export default class UserManager extends Manager {
        private users = new Cache<User>;
        }
        ```
    2. Конструктор вызывает конструктор родительского класса `Manager`, передавая ему объект `options`

        ```typescript
            constructor(options: IManager) {
                super(options);
            }
        ```

    3. Создание обработчиков событий сокета

        ```javascript
            const { LOG_IN, LOG_OUT, REGISTRATION } = this.MESSAGES;
            if (!this.io) return;
            this.io.on('connection', (socket: Socket) => {})
        ```

        1. Обработчик события `LOG_IN` для аутентификации пользователя. В данной части кода, `socket.on(LOG_IN, ...)` устанавливает обработчик события `'LOG_IN'` для сокета.
        На вход этого обработчика подаются следующие параметры:
        - `login: string`: Логин пользователя, переданный при вызове события `'LOG_IN'`.
        - `password: string`: Пароль пользователя, переданный при вызове события `'LOG_IN'`.
        - `callback: Function`: Функция обратного вызова, переданная при вызове события `'LOG_IN'`.
        То есть, когда сокет получает событие `'LOG_IN'`, он вызывает этот обработчик, передавая ему логин, пароль и функцию обратного вызова. 

            ```javascript
                socket.on(LOG_IN, (login: string, password: string, callback: Function) => this.login(socket.id, login, password, callback));
            ```

        2. Обработчик события `REGISTRATION` для регистрации пользователя. В данном случае, `socket.on(REGISTRATION, ...)` устанавливает обработчик события `'REGISTRATION'` для сокета.
        На вход этого обработчика подаются следующие параметры:
        - `login: string`: Логин пользователя, переданный при вызове события `'REGISTRATION'`.
        - `password: string`: Пароль пользователя, переданный при вызове события `'REGISTRATION'`.
        - `name: string`: Имя пользователя, переданное при вызове события `'REGISTRATION'`.
        - `cbRegistration: Function`: Функция обратного вызова, переданная при вызове события `'REGISTRATION'`.
        Таким образом, когда сокет получает событие `'REGISTRATION'`, он вызывает этот обработчик, передавая ему логин, пароль, имя и функцию обратного вызова.

            ```javascript
                socket.on(REGISTRATION, (login: string, password: string, name: string, cbRegistration: Function) => this.registration(socket, login, password, name, cbRegistration));
            ```

        3. Обработчик события `LOG_OUT` для выхода пользователя из системы. В данном случае, `socket.on(LOG_OUT, ...)` устанавливает обработчик события `'LOG_OUT'` для сокета.
        На вход этого обработчика подаются следующие параметры:
        - `token: string`: Токен пользователя, переданный при вызове события `'LOG_OUT'`.
        - `callback: Function`: Функция обратного вызова, переданная при вызове события `'LOG_OUT'`.
        Таким образом, когда сокет получает событие `'LOG_OUT'`, он вызывает этот обработчик, передавая ему токен пользователя и функцию обратного вызова. 

            ```javascript
                socket.on(LOG_OUT, (token: string, callback: Function) => Auth(socket, this.mediator, token, (user: User) => this.logout(user, callback)));
            ```

        4. Обработчик события `disconnect` для отключения пользователя. В данном случае, `socket.on('disconnect', ...)` устанавливает обработчик события `'disconnect'` для сокета.
        На вход этого обработчика не передаются явно какие-либо параметры. Вместо этого используется стрелочная функция `() => this.disconnect(socket)`, которая вызывается при событии отключения сокета. Функция `this.disconnect(socket)` вызывается с передачей объекта `socket` в качестве параметра. Таким образом, при отключении сокета происходит вызов метода `disconnect` текущего объекта класса, где объект сокета передается в качестве аргумента.

            ```javascript
                socket.on('disconnect', () => this.disconnect(socket))
            ```
    2. Установка обработчиков событий и вызовов посредника `(mediator)`

        ```javascript
            const { GET_USER, GET_USER_BY_TOKEN } = this.TRIGGERS;
            this.mediator.set(GET_USER, (socketId: string) => this.getUser(socketId));
            this.mediator.set(GET_USER_BY_TOKEN, (token: string) => this.getUser(token));
        ```
1. Класс `GameManager` расширяет класс `Manager`, что означает, что он наследует его свойства и методы.

    1. Конструктор `GameManager` принимает объект `options` с определенными параметрами и вызывает конструктор родительского класса `Manager` с использованием ключевого слова `super(options)`.

        ```javascript
            private captains = new Cache<Captain>;
            constructor(options: IManager) {
            super(options);
            }
        ```
    2. Далее, в конструкторе устанавливаются обработчики событий для сокетов.

        1. `socket.on(this.MESSAGES.ADD_CAPTAIN, ...):` Устанавливает обработчик события `ADD_CAPTAIN`, который вызывает функцию `Auth` с переданными параметрами, включая сокет, посредника `mediator`, токен и обратный вызов `addCaptain`. Эта функция служит для добавления капитана. В данном случае, `socket.on(this.MESSAGES.ADD_CAPTAIN, ...)` устанавливает обработчик события, указанного в `this.MESSAGES.ADD_CAPTAIN`, для сокета. На вход этого обработчика подаются следующие параметры:
        - `token: string`: Токен, переданный при вызове события, соответствующего значению `this.MESSAGES.ADD_CAPTAIN`.
        - `allianceId: number`: Идентификатор союза (некий числовой идентификатор), переданный при вызове события.
        - `callback: Function`: Функция обратного вызова, переданная при вызове события.
        Таким образом, когда сокет получает указанное событие (`this.MESSAGES.ADD_CAPTAIN`), он вызывает этот обработчик, передавая ему токен, идентификатор союза и функцию обратного вызова.

        ```javascript
            socket.on(this.MESSAGES.ADD_CAPTAIN, async (token: string, allianceId: number, callback: Function) => Auth(socket,this.mediator,token,(user:User) =>this.addCaptain(user,allianceId,callback)));
        ```

        2. `socket.on(this.MESSAGES.GET_CAPTAIN, ...):` Устанавливает обработчик события `GET_CAPTAIN`, который вызывает функцию `Auth` с переданными параметрами, включая сокет, посредника `mediator`, токен и обратный вызов `getCaptain`. Эта функция служит для получения капитана. В данном случае, `socket.on(this.MESSAGES.GET_CAPTAIN, ...)` устанавливает обработчик события, указанного в `this.MESSAGES.GET_CAPTAIN`, для сокета. На вход этого обработчика подаются следующие параметры:
        - `token: string`: Токен, переданный при вызове события, соответствующего значению `this.MESSAGES.GET_CAPTAIN`.
        - `callback: Function`: Функция обратного вызова, переданная при вызове события.
        Таким образом, когда сокет получает указанное событие (`this.MESSAGES.GET_CAPTAIN`), он вызывает этот обработчик, передавая ему токен и функцию обратного вызова.
        
        ```javascript 
            socket.on(this.MESSAGES.GET_CAPTAIN, async (token: string, callback: Function) => Auth(socket,this.mediator,token,(user:User) =>this.getCaptain(user,callback)));
        ```