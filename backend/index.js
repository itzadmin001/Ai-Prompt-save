const express = require("express")
const Dbconnect = require("./Db/Db")
const UserRouter = require("./Routers/UserRouter")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const { VerifyUser } = require("./Middlewares/AuthUser")
const PromptRouter = require("./Routers/PromptRouter")
require('dotenv').config()
const app = express()
Dbconnect()





app.use(cors({
    origin: process.env.FRONTEND_BASE_URL || "http://localhost:5173",
    credentials: true
}));
app.use(express.json())
app.use(cookieParser())


app.use("/user", UserRouter)
app.use("/prompt", PromptRouter)
app.use("/dashboard", VerifyUser, UserRouter)





module.exports = app