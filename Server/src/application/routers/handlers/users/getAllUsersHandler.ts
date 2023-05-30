import { Request, Response } from "express";
import Mediator from "../../../services/Mediator";
import UserManager from "../../../modules/UserManager/UserManager";
import Answer from "../../answer/Answer";

export default function logoutHandler(answer: Answer, mediator: Mediator) {
    return (req: Request, res: Response): void => {
        if (mediator.get('GET_USER_BY_TOKEN', req.params.token))
        res.send(answer.good(mediator.get('GET_ALL_USERS')));
    }
}
