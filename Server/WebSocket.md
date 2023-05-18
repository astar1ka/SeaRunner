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

      1. Обработчик события `LOG_IN` для аутентификации пользователя

        ```javascript
        socket.on(LOG_IN, (login: string, password: string, callback: Function) => this.login(socket.id, login, password, callback));
        ```

      2. Обработчик события `REGISTRATION` для регистрации пользователя

        ```javascript
        socket.on(REGISTRATION, (login: string, password: string, name: string, cbRegistration: Function) => this.registration(socket, login, password, name, cbRegistration));
        ```

      3. Обработчик события `LOG_OUT` для выхода пользователя из системы

        ```javascript
        socket.on(LOG_OUT, (token: string, callback: Function) => Auth(socket, this.mediator, token, (user: User) => this.logout(user, callback)));
        ```

      4. Обработчик события `disconnect` для отключения пользователя

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

        1. `socket.on(this.MESSAGES.ADD_CAPTAIN, ...):` Устанавливает обработчик события `ADD_CAPTAIN`, который вызывает функцию `Auth` с переданными параметрами, включая сокет, посредника `mediator`, токен и обратный вызов `addCaptain`. Эта функция служит для добавления капитана.

        ```javascript
            socket.on(this.MESSAGES.ADD_CAPTAIN, async (token: string, allianceId: number, callback: Function) => Auth(socket,this.mediator,token,(user:User) =>this.addCaptain(user,allianceId,callback)));
        ```

        2. `socket.on(this.MESSAGES.GET_CAPTAIN, ...):` Устанавливает обработчик события `GET_CAPTAIN`, который вызывает функцию `Auth` с переданными параметрами, включая сокет, посредника `mediator`, токен и обратный вызов `getCaptain`. Эта функция служит для получения капитана.
        
        ```javascript 
            socket.on(this.MESSAGES.GET_CAPTAIN, async (token: string, callback: Function) => Auth(socket,this.mediator,token,(user:User) =>this.getCaptain(user,callback)));
        ```