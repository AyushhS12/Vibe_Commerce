import { Router } from "express";
import getClient from "./database/mongo";
import jwt from "jsonwebtoken";

const authRouter = Router();

authRouter.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const client = await getClient()
    await client.users.findOne({ email , password}).then((r) => {
        const token = jwt.sign(r?._id!.toHexString()!, process.env.JWT_SECRET || "Aloha")
        const secure = (process.env.ENVIRONMENT as string)==="development"?false:true
        const re = res.cookie("token", token, { httpOnly: !secure, secure, sameSite:"lax"});
        re.status(200).json({
            success: true,
            token
        })
    })
        .catch(e => {
            console.log(e)
            res.status(404).json({
                err: "User not found please try again"
            })
        })
})


authRouter.post("/signup", async (req, res) => {
    const { name, email, password } = req.body;
    const client = await getClient()
    await client.users.insertOne({ _id: null, name, email, password, cart_id: null })
        .then(async (val) => {
            await client.cartItems.insertOne({ _id: null, userId: val.insertedId, products: new Map() })
                .then((async value => {
                    await client.users.updateOne({ email: email }, { "$set": { cart_id: value.insertedId } })
                    res.status(200).json({
                        success: true,
                        message: "user created successfully"
                    })
                }))
        })
        .catch((e) => {
            res.status(500).json({
                err: e
            })
        })
})

export default authRouter