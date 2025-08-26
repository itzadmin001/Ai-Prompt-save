const mongoose = require("mongoose")


const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        maxLength: 50,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minLength: 8,
    },
    prompts: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Prompt",
    },
    folder: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Folder",
    },
    status: {
        type: Boolean,
        default: true
    }

}, {
    timestamps: true
})

const UserModel = mongoose.model("User", UserSchema)
module.exports = UserModel;