const mongoose = require("mongoose")


const FolderSchema = new mongoose.Schema({
    folder: {
        type: String,
        default: ""
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    prompt: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Prompt",
    }

}, {
    timestamps: true
})

const FolderModel = mongoose.model("Folder", FolderSchema)
module.exports = FolderModel;