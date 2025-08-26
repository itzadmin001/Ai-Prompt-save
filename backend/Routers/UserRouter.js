const express = require("express")
const { CreateUser, loginUser, logoutUser, getUserData, updateFolder, getFolderData, renamePrompt } = require("../Controllars/UserControllar")
const { VerifyUser } = require("../Middlewares/AuthUser")
const { DeletePrompt } = require("../Controllars/PromptControllar")

const UserRouter = express.Router()



UserRouter.post("/", CreateUser)


UserRouter.post("/login", loginUser)
UserRouter.post("/folder", VerifyUser, updateFolder)
UserRouter.get("/logout", logoutUser)
UserRouter.get("/folderdata/:id", VerifyUser, getFolderData)
UserRouter.get("/promptdelete/:id", VerifyUser, DeletePrompt)
UserRouter.get("/renameprompt", VerifyUser, renamePrompt)
UserRouter.get("/", getUserData)

module.exports = UserRouter;