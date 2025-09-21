import mongoose from "mongoose"
import { DB_NAME } from "../constant.js"
import dotenv from "dotenv"
dotenv.config({path:'./env'})

const connectDB = async () => {  

    try {
       const connectionInstants = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`,
        {useNewUrlParser: true,
      useUnifiedTopology: true,})
        console.log(`mongoDB connection is succesful!!HOST ON ${connectionInstants.connection.host}`)
        
    } catch (error) {
        console.log('mongoDB connection error',error)
        process.exit(1)
    }

 } 
export default connectDB