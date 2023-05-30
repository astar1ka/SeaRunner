import { Request, Response } from "express";
import ChatManager from "../../../modules/ChatManager/ChatManager";
import Mediator from "../../../services/Mediator";
import UserManager from "../../../modules/UserManager/UserManager";
import Answer from "../../answer/Answer";


export default function useGetMessagesHandler(answer: Answer, mediator: Mediator) {
    return (req: Request, res: Response): void => {
        if (req.params.chatHash != mediator.get('GET_CHAT_HASH')){
            const user = mediator.get('GET_USER_BY_TOKEN', req.params.token);
            if (user){
                res.send(answer.good({
                    messages: mediator.get('GET_MESSAGES',user.id),
                    chatHash: mediator.get('GET_CHAT_HASH')
                }));
            }
        }
        else res.send(null);
    }
}