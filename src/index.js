import dotenv from "dotenv"
import connectDB from "./db/index.js"
dotenv.config({ path: './env' })


connectDB()



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