import { Request, Response } from "express";

export default function notFoundHandler(req:Request, res:Response ) {
    res.send(`Страница не найдена`);
}