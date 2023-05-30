import { Request, Response } from "express";
import Mediator from "../../../services/Mediator";
import Answer from "../../answer/Answer";

export default function useSendMessage(answer: Answer, mediator: Mediator) {
    return (req: Request, res: Response): void => {
        const {token, userIdTo, message} = req.params;
        const from = mediator.get('GET_USER_BY_TOKEN', token);
        if (from) {
            mediator.get('ADD_MESSAGE', {
                userIdFrom: from.id,
                userIdTo: (userIdTo != 'null') ? userIdTo : null,
                message: message
            })
            res.send(true);
        }
        else res.send(false);
    }
}