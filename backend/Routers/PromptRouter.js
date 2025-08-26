const express = require('express');
const PromptRouter = express.Router();
const { CreatePrompt, SharePrompt, SendpromptData } = require("../Controllars/PromptControllar");
const { VerifyUser } = require('../Middlewares/AuthUser');


PromptRouter.post("/", VerifyUser, CreatePrompt)
PromptRouter.get("/:id", SharePrompt)
PromptRouter.get("/sharedata/:id", SendpromptData)


module.exports = PromptRouter;  