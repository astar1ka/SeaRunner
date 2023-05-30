import express from 'express';
import notFoundHandler from './handlers/notFound/notFoundHandler';
import useLoginHandler from './handlers/users/useLoginHandler';
import useRegistrationHandler from './handlers/users/useRegistrationHandler';
import useLogoutHandler from './handlers/users/useLogoutHandler'
import useGetMessagesHandler from './handlers/chat/useGetMessagesHandler'
import useSendMessage from './handlers/chat/useSendMessage';
import getAllUsersHandler from './handlers/users/getAllUsersHandler';
import Answer from './answer/Answer';
import Mediator from '../services/Mediator';


const router = express.Router();

export default function Router(mediator: Mediator) {
    const answer = new Answer;
    //Users//
    router.get('/api/login/:login/:password/:time', useLoginHandler(answer, mediator));
    router.get('/api/registration/:login/:password/:name', useRegistrationHandler(answer, mediator));
    router.get('/api/logout/:token', useLogoutHandler(answer, mediator));
    router.get('/api/getAllUsers/:token', getAllUsersHandler(answer, mediator));
    //Chat//
    router.get('/api/getMessages/:chatHash/:token', useGetMessagesHandler(answer, mediator));
    router.get('/api/sendMessage/:message/:userIdTo/:token', useSendMessage(answer, mediator));
    //notFound//
    router.all('/*', notFoundHandler);
    return router;
}