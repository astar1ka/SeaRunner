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
import Mediator from './application/services/Mediator';

import SocketService from './application/services/Socket';
import UserManager from './application/modules/UserManager/UserManager';
import ChatManager from './application/modules/ChatManager/ChatManager';
import GameManager from './application/modules/GameManager/GameManager';

import Router from './application/routers/Router';


const { PORT, MEDIATOR, DB_CONNECT, MESSAGES } = new CONFIG;

const mediator = new Mediator(MEDIATOR.EVENTS, MEDIATOR.TRIGGERS);
const db = new DB({ ...DB_CONNECT, initCb });
const socket = new SocketService(io, mediator);
new UserManager({ mediator, db, socket, MESSAGES });
//new ChatManager({ mediator, db, socket, MESSAGES });
new GameManager({ mediator, db, socket, MESSAGES });

app.use(express.static('public'));
app.use(Router(mediator));

function initCb() {
    mediator.call(MEDIATOR.EVENTS.INIT_DATABASE);
}

const deinitModules = () => {
    db.destructor();
    setTimeout(() => process.exit(), 500);
}
const testMiddleware = [
    (arg: any, next: Function) => {
        console.log('first');
        arg.push('123');
        next(arg);
    },
    (arg: any, next: Function) => {
        console.log('second',next(arg));
    },
]

server.listen(PORT, () => console.log('It works with socket!!!'));

process.on('SIGINT', deinitModules);