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

app.post("/api/cart", async (req , res) => {
    const token = req.cookies.token?.split(" ")[1];
    const id = jwt.decode(token)?.toString()
    const {product , quantity} = req.body
    const db = await getClient()
    const productId = (await db.products.insertOne(product)).insertedId
    const doc = {productId,quantity}
    const r = await db.cartItems.updateOne({userId:ObjectId.createFromHexString(id!)},{"$push":[doc]})
    res.json({
        success:true,
    })
})

app.get("/api/cart", authMiddleware, async (req, res) => {
    const token = req.cookies.token?.split(" ")[1];
    const id = jwt.decode(token)?.toString()
    const db = await getClient()
    const result = await db.cartItems.findOne({userId:ObjectId.createFromHexString(id!)})
    const items:Product[] = [];
    result?.products.forEach(async (i,x) => {
        const product = await db.products.findOne({_id:x})
        items.push(product!)
    })
    if(items.length === 0) {
        res.json({
            message:"cart is empty"
        })
    }
    res.json({
        "items":items
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
    const { cartItems,quantity }: { [key: string]: Product[] | number } = req.body;
    const db = await getClient()
    const token = req.cookies.token.split(" ")[1]
    const user_id = jwt.decode(token[0])?.toString()
    if (typeof cartItems === "number" || typeof quantity === "object"){
        return res.json({
            err:"Invalid data"
        })
    }
    const productIds = cartItems.map(c => c._id!)
    let totalPrice = 0
    cartItems.map(c => c.price).forEach((v) => {
        totalPrice += v
    })
    const products = new Map()
    productIds.forEach((x)=>{
        products.set(x,quantity)
    }) 
    const result = await db.transactions.insertOne({ _id: null, buyer: ObjectId.createFromHexString(user_id!), products: , totalPrice })
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