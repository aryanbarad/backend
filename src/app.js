import express from "express"
import cors from "cors"
import cookieparser from "cookie-parser"
import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

app.use(cors({
   origin: process.env.CORS_ORIGIN
}
))

app.use(express.json({ limit: "16kb" }))
app.use(express.urlencoded({ extended: true }))
app.use(cookieparser())

// Serve static files from public directory
app.use(express.static("public"))

//routes import
import userRouter from "./routes/user.routes.js"
import videoRouter from "./routes/video.routes.js"

//routes declaration
app.use("/users", userRouter)
app.use("/api/videos", videoRouter)

// Serve YouTube layout
app.get("/youtube", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/youtube/index.html"))
})

// Default route
app.get("/", (req, res) => {
    res.redirect("/youtube")
})

export { app }