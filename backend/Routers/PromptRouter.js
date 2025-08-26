const express = require('express');
const PromptRouter = express.Router();
const { CreatePrompt } = require("../Controllars/PromptControllar");
const { VerifyUser } = require('../Middlewares/AuthUser');


PromptRouter.post("/", VerifyUser, CreatePrompt)


module.exports = PromptRouter;