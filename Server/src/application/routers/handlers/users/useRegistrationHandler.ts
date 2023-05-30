import { Request, Response } from "express";
import Answer from "../../answer/Answer";
import Mediator from "../../../services/Mediator";

export default function useRegistrationHandler(answer: Answer, mediator: Mediator) {
    return (req: Request, res: Response): void => {
        const {login, password, name} = req.params;
        res.send(answer.good(mediator.get('REGISTRATION',{login, password, name})))
    }
}