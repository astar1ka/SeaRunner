import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
    }
});

import CONFIG from './config';
import DB from './application/modules/DB/DB';
import Mediator from './application/modules/Mediator';
import UserManager from './application/modules/UserManager/UserManager';
import ChatManager from './application/modules/ChatManager/ChatManager';
import Router from './application/routers/Router';
import GameManager from './application/modules/GameManager/GameManager';

const { PORT, MEDIATOR, DB_CONNECT, MESSAGES } = new CONFIG;

const mediator = new Mediator(MEDIATOR.EVENTS, MEDIATOR.TRIGGERS);
const db = new DB({ ...DB_CONNECT, initCb });
new UserManager({ mediator, db, io, MESSAGES });
new ChatManager({ mediator, db, io, MESSAGES });
new GameManager({ mediator, db, io, MESSAGES });

app.use(express.static('public'));
app.use(Router(mediator));

function initCb() {
    mediator.call(MEDIATOR.EVENTS.INIT_DATABASE);
}

const deinitModules = () => {
    db.destructor();
    setTimeout(() => process.exit(), 500);
}

server.listen(PORT, () => console.log('It works with socket!!!'));

process.on('SIGINT', deinitModules);