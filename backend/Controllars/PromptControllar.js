const PromptModel = require("../Models/PromptModel");
const UserModel = require("../Models/UserModel");
const { GenrateResponse } = require("../Service/Ai.service");

async function CreatePrompt(req, res) {
    try {
        const { title, prompt, tags, notes, response, color } = req.body;

        if (!title || tags.length === 0 || !prompt) {
            return res.status(400).json({ message: "Tags and Prompt are required" });
        }
        let Finalresponse = response;

        if (!response || response.trim() === "") {
            Finalresponse = await GenrateResponse(prompt);
        }

        const newPrompt = await PromptModel.create({
            user: req.user.id,
            title,
            prompt,
            color,
            tags,
            notes,
            response: Finalresponse
        });
        const UpdateUser = await UserModel.findByIdAndUpdate(req.user.id, { $push: { prompts: newPrompt._id } }, { new: true }).populate('prompts');
        res.status(201).json({
            msg: "Prompt created successfully",
            user: UpdateUser
        });

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Error creating prompt", error });
    }

}

async function DeletePrompt(req, res) {
    try {
        const promptId = req.params.id;
        if (!promptId) {
            return res.status(400).json({ message: "Prompt ID is required" });
        }
        const prompt = await PromptModel.findById(promptId);
        if (!prompt) {
            return res.status(404).json({ message: "Prompt not found" });
        }
        if (prompt.user.toString() !== req.user.id) {
            return res.status(403).json({ message: "You are not authorized to delete this prompt" });
        }
        await PromptModel.findByIdAndDelete({ _id: promptId });
        const UpdateUser = await UserModel.findByIdAndUpdate({ _id: req.user.id }, { $pull: { prompts: promptId } }, { new: true }).populate('prompts');
        res.status(200).json({
            msg: "Prompt deleted successfully",
            user: UpdateUser
        });

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Error deleting prompt", error });
    }

}

module.exports = { CreatePrompt, DeletePrompt }