import { Request, Response } from "express";
import Mediator from "../../../services/Mediator";
import Answer from "../../answer/Answer";


export default function useLoginHandler(answer: Answer, mediator: Mediator) {
    return (req: Request, res: Response): void => {
        const {login, password} = req.params;
        res.send(answer.good(mediator.get('LOG_IN', {login, password})));
    }
}