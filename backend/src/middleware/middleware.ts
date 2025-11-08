import { Request, Response, NextFunction } from "express"
import jwt from 'jsonwebtoken'
import getClient from "../database/mongo"
import { ObjectId } from "mongodb";

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const db = await getClient();
    const token = req.cookies.token.split(" ")[1] as string;
    if (token) {
        const userId = jwt.verify(token, process.env.JWT_SECRET!).toString()
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