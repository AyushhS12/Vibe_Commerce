import { Request, Response, NextFunction } from "express"
import jwt from 'jsonwebtoken'
import getClient from "../database/mongo"
import { ObjectId } from "mongodb";

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const db = await getClient();
    const token = req.headers["set-cookie"];
    if (token) {
        const userId = jwt.decode(token[0])?.toString()
        if (userId) {
            const user = await db.users.findOne({ _id: ObjectId.createFromHexString(userId) })
            if (user === null) {
                return res.json({
                    err: "Please Login"
                })
            } else {
                next()
            }
        }
    }
    return res.json({
        err: "Please Login again"
    })
}

export default authMiddleware