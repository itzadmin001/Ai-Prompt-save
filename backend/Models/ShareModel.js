const mongoose = require("mongoose");

const ShareSchema = new mongoose.Schema({
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
    response: {
        type: String,
        required: true,
        maxLength: 1000,
    },
    tags: {
        type: [String],
        default: [],
    },
    notes: {
        type: String,
        maxLength: 2000,
    },
    status: {
        type: Boolean,
        default: true,
    },
    expireAt: {
        type: Date,
        default: () => new Date(Date.now() + 10 * 60 * 1000),
        index: { expires: 0 }
    }
}, {
    timestamps: true
});

const ShareModel = mongoose.model("Share", ShareSchema);
module.exports = ShareModel;
