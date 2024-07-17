import app from "./app.js";
import dotenv from "dotenv";
import { connectDb } from "./config/db.js";
dotenv.config()
async function main (){
    try {
        await connectDb()
        app.listen(process.env.PORT)
        console.log(`Listen on port http:localhost:`,process.env.PORT)

    } catch (error) {
        console.error(error)
    }
}

main()