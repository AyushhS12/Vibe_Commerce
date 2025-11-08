import { ObjectId } from "mongodb"

export type User = {
    _id:ObjectId | null,
    name:string,
    email:string,
    password:string,
    cart_id:ObjectId | null
}

export type Product = {
    _id:ObjectId | null,
    id:number;
    name:string,
    price:number,
    quantity:number,
}

export type Cart = {
    _id: ObjectId | null,
    userId:ObjectId | null,
    products:Array<ObjectId>
}

export type Transaction = {
    _id:ObjectId | null,
    buyer:ObjectId,
    products:Array<ObjectId>,
    totalPrice:number
}