const PromptModel = require("../Models/PromptModel");
const ShareModel = require("../Models/ShareModel");
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

        console.log(Finalresponse)
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


async function SharePrompt(req, res) {
    try {
        const promptId = req.params.id;
        const prompt = await PromptModel.findById(promptId);

        if (!prompt) {
            return res.status(404).json({ status: false, message: "Prompt not found" });
        }

        const shareData = await ShareModel.create({
            title: prompt.title,
            prompt: prompt.prompt,
            response: prompt.response,
            tags: prompt.tags,
            notes: prompt.notes,
        });
        const shareLink = `${process.env.FRONTEND_URL || "http://localhost:5173"}/share/${shareData._id}`;

        return res.status(201).json({
            status: true,
            message: "Prompt shared successfully",
            share: shareData,
            link: shareLink
        });
    } catch (err) {
        return res.status(500).json({ status: false, message: "Server error", error: err.message });
    }
}

async function SendpromptData(req, res) {
    try {
        const { id } = req.params; // URL se ID
        if (!id) return res.status(400).json({ message: "ID is required" });

        // Fetch the shared data
        const data = await ShareModel.findById(id);

        if (!data) {
            // Either invalid ID or expired
            return res.status(404).json({ message: "This link has expired or is invalid." });
        }

        // Optional: check manually for expireAt if you want extra safety
        if (data.expireAt && new Date() > data.expireAt) {
            return res.status(410).json({ message: "This link has expired." });
        }

        // Return the data
        return res.status(200).json({
            id: data._id,
            title: data.title,
            prompt: data.prompt,
            response: data.response,
            tags: data.tags,
            notes: data.notes,
            status: data.status,
            createdAt: data.createdAt,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server Error" });
    }
}

module.exports = { CreatePrompt, DeletePrompt, SharePrompt, SendpromptData }