import dotenv from "dotenv"
import express from "express"
import connectDB from "./db/index.js"
dotenv.config({ path: './env' })

const app = express()
connectDB()
    .then(() => {
        app.listen(process.env.PORT || 8000, () => { 
            console.log(`server is runing on PORT ${process.env.PORT}`)
        })
    })
    .catch((error) => {
        console.log("mogoDB connection faild!!", error)
    })





















































    
//      (async () => {
//         try {
//             await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
//             app.on("ERROR: ", (error) => {
//                 console.log("ERROR: ", error);
//                 throw error
//             })
//             app.listen(process.env.PORT, ()=>{
//                 console.log(`app is runing on port ${process.env.PORT}`)

//             })



//         }


//         catch (error) {
//             console.error("ERROR: ", error)
//             throw error
//         }
//     }) ()