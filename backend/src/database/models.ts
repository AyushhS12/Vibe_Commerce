import { ObjectId } from "mongodb"

export type User = {
    _id: ObjectId | null,
    name: string,
    email: string,
    password: string,
    cart_id: ObjectId | null
}

export type Product = {
    _id: ObjectId | null,
    id: number;
    title: string;
    price: number,
    description: string;
    category: string;
    image: string;
}

export type Cart = {
    _id: ObjectId | null,
    userId: ObjectId | null,
    products: Map<ObjectId,number>
}

export type Transaction = {
    _id: ObjectId | null,
    buyer: ObjectId,
    products: Map<ObjectId,number>,
    totalPrice: number
}