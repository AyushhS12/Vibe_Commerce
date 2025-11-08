import { Collection, MongoClient, ServerApiVersion } from "mongodb";
import { Cart, Product, Transaction, User } from "./models";
// Replace the placeholder with your Atlas connection string
const uri = process.env.MONGO_URI || "";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const c = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
}
);

interface DbClient {
    users: Collection<User>,
    products: Collection<Product>,
    cartItems: Collection<Cart>,
    transactions: Collection<Transaction>
};

let client: DbClient;

async function run() {
    try {
        // Connect the client to the server (optional starting in v4.7)
        await c.connect();
        // Send a ping to confirm a successful connection
        await c.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
        const db = c.db("vibe-commerce");
        client = {
            users: db.collection<User>("users"),
            products: db.collection("products"),
            cartItems: db.collection("cart_items"),
            transactions: db.collection("transactions")
        }
        await client.users.createIndex({ email: 1 }, { unique: true })
        await client.products.createIndex({ id: 1 }, { unique: true })
    } catch (e) {
        console.error(e)
    }
}
run().catch(console.dir)
export default async function getClient() {
    return client
}
