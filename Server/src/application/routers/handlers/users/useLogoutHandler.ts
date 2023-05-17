import { Request, Response } from "express";
import Mediator from "../../../modules/Mediator";
import Answer from "../../answer/Answer";

export default function useLogoutHandler(answer:Answer, mediator: Mediator){
    return (req: Request, res: Response): void => {
        const token = req.params.token;
        mediator.get('lOG_OUT', token)
        res.send();
    }
}
