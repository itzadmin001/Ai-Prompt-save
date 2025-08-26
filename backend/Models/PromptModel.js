const mongoose = require("mongoose")


const PromptSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    title: {
        type: String,
        required: true,
        maxLength: 100,
    },
    prompt: {
        type: String,
        required: true,
        maxLength: 1000,
    },
    color: {
        type: String,
        default: "#ffffff"
    },
    response: {
        type: String,
        required: true,
        maxLength: 1000,
    },
    tags: {
        type: Array,
        default: []
    },
    notes: {
        type: String,
        maxLength: 2000,
    },
    status: {
        type: Boolean,
        default: true
    }

}, {
    timestamps: true
})

const PromptModel = mongoose.model("Prompt", PromptSchema)
module.exports = PromptModel;