import { Router } from "express";
import getClient from "./database/mongo";
import jwt from "jsonwebtoken";

const authRouter = Router();

authRouter.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const client = await getClient()
    client.users.findOne({ "email": email }).then((r) => {
        const token = jwt.sign(r?._id!.toHexString()!, process.env.JWT_SECRET || "Aloha")
        res.cookie("token", token, { httpOnly: true, secure: true });
        res.status(200).json({
            success: true
        })
    })
        .catch(e => {
            console.log(e)
            res.json({
                err: "user not found please try again"
            })
        })
})


authRouter.post("/signup", async (req, res) => {
    const { name, email, password } = req.body;
    const client = await getClient()
    await client.users.insertOne({ _id: null, name, email, password, cart_id: null })
        .then(async (val) => {
            await client.cartItems.insertOne({ _id: null, userId: val.insertedId, products: [] })
                .then((async value => {
                    await client.users.updateOne({email:email},{"$set":{cart_id:value.insertedId}})
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