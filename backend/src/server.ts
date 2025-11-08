import dotenv from 'dotenv'
dotenv.config()
import express from "express";
import jwt from 'jsonwebtoken';
import getClient from "./database/mongo";
import authRouter from "./authRouter";
import authMiddleware from './middleware/middleware';
import { ObjectId } from 'mongodb';
import { Cart, Product } from './database/models';
import cookieParser from 'cookie-parser';
import cors from 'cors'

const app = express()
const PORT = process.env.PORT || 3000;

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    allowedHeaders: "*",
    methods: ["GET", "POST", "DELETE"],
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true
}))
app.use("/api/auth", authRouter)

app.get("/api/products", async (req, res) => {
    const db = await getClient();
    const products = await db.products.find({}).limit(20).toArray()
    res.status(200).json({
        products
    })
})

app.get("/api/cart", authMiddleware, (req, res) => {
    const { productId, quantity } = req.body;
    res.json({
        productId,
        quantity
    })
})

app.delete('/api/cart/:id', authMiddleware, async (req, res) => {
    const { id } = req.params
    const db = await getClient()
    const token = req.cookies.token
    const user_id = jwt.decode(token[0])?.toString()
    if (user_id) {
        const r = await db.cartItems.updateOne({ userId: ObjectId.createFromHexString(user_id) }, { "$pull": { products: [id] } })
        res.status(200).json({
            success:true,
            "message": "product removed"
        })
    }
    res.status(500).json({
        "err": "Internal Server Error"
    })

})
app.post('/api/checkout', async (req, res) => {
    const { cartItems }: { [key: string]: Product[] } = req.body;
    const db = await getClient()
    const token = req.cookies.token.split(" ")[1]
    const user_id = jwt.decode(token[0])?.toString()
    const productIds = cartItems.map(c => c._id!)
    let totalPrice = 0
    cartItems.map(c => c.price).forEach((v) => {
        totalPrice += v
    })
    const result = await db.transactions.insertOne({ _id: null, buyer: ObjectId.createFromHexString(user_id!), products: productIds, totalPrice })
    for (const item of cartItems) {
        await db.cartItems.deleteOne({ _id: item._id })
    }
    res.status(200).json({
        success: true,
        transaction_id: result.insertedId
    })
})

app.listen(PORT, () => {
    console.log("app listening on port - " + PORT)
})