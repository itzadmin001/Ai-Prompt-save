const UserModel = require("../Models/UserModel")
const { GenrateHash, GenrateToken } = require("../Utils/Helper")
const bcrypt = require('bcrypt');
const PromptFolderModel = require("../Models/PromptFolder");

async function CreateUser(req, res) {
    try {
        const { email, password, confirmPassword } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" }); 8
        }
        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Password and Confirm password should be same" });
        }
        const FindUser = await UserModel.findOne({ email });
        if (FindUser) {
            return res.status(409).json({ message: "User already exists" });
        }

        const HashPassword = await GenrateHash(password)
        if (HashPassword) {
            const newUser = UserModel.create({
                email,
                password: HashPassword,
            })
                .then((success) => {
                    const token = GenrateToken(success.email, success._id)
                    res.cookie("token", token, {
                        httpOnly: true,
                        secure: true,        // Production me true
                        sameSite: "none"     // cross-domain ke liye
                    });
                    res.status(201).json({
                        msg: "Acccount created successfully",
                        user: success
                    });
                }).catch((err) => {
                    res.status(400).json({
                        msg: "Unable to create user",
                        error: err.message
                    });
                })

        } else {
            res.status(501).json({
                msg: "Internal server error"
            })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Error creating user", error });
    }

}


async function loginUser(req, res) {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }
        const FindUser = await UserModel.findOne({ email }).populate('prompts').populate({
            path: 'folder',
            populate: {
                path: 'prompt',
                model: 'Prompt'
            }
        });
        if (!FindUser) {
            return res.status(404).json({ message: "User not found" });
        }

        const isPasswordMatch = await bcrypt.compare(password, FindUser.password);
        if (!isPasswordMatch) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const token = GenrateToken(FindUser.email, FindUser._id);
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,        // Production me true
            sameSite: "none"     // cross-domain ke liye
        });

        res.status(200).json({
            message: "Login successful",
            user: FindUser
        });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Error logging in user", error });
    }

}


async function logoutUser(req, res) {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: true,        // Production me true
            sameSite: "none"     // cross-domain ke liye
        });
        res.status(200).json({ message: "Logout successful" });
    } catch (error) {
        return res.status(500).json({ message: "Error logging out user", error });
    }
}

async function getUserData(req, res) {
    try {
        const userId = req.user.id;
        const user = await UserModel.findById({ _id: userId }).select('-password').populate('prompts').populate({
            path: 'folder',
            populate: {
                path: 'prompt',
                model: 'Prompt'
            }
        });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ user });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Error fetching user data", error });
    }
}

async function updateFolder(req, res) {
    try {
        const userId = req.user.id;
        const { folderId, promptId } = req.body;

        if (!folderId || !promptId) {
            return res.status(400).json({ message: "Folder ID and Prompt ID are required" });
        }

        const user = await UserModel.findById({ _id: userId });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Directly update folder prompt array using findByIdAndUpdate
        const folder = await PromptFolderModel.findByIdAndUpdate(
            { _id: folderId },
            { $push: { prompt: promptId } }, // 'prompt' field me promptId add karega
            { new: true } // updated document return karega
        );

        if (!folder) {
            return res.status(404).json({ message: "Folder not found" });
        }

        return res.status(200).json({
            message: "Prompt moved to folder successfully",
            folder,
            user
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error updating folder", error: error.message });
    }
}

async function getFolderData(req, res) {
    try {
        const userId = req.user.id;
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: "Folder ID is required" });
        }

        const user = await UserModel.findById({ _id: userId });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const folder = await PromptFolderModel.findById({ _id: id }).populate('prompt');
        if (!folder) {
            return res.status(404).json({ message: "Folder not found" });
        }

        return res.status(200).json({
            message: "Folder data fetched successfully",
            folder,
            user
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error fetching folder data", error: error.message });
    }
}

async function renamePrompt(req, res) {
    try {
        const userId = req.user.id;
        const { promptId, newTitle } = req.body;

        if (!promptId || !newTitle) {
            return res.status(400).json({ message: "Prompt ID and new title are required" });
        }

        const user = await UserModel.findById({ _id: userId });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const prompt = await PromptModel.findByIdAndUpdate(
            { _id: promptId, user: userId }, // Ensure the prompt belongs to the user
            { title: newTitle },
            { new: true } // Return the updated document
        );

        if (!prompt) {
            return res.status(404).json({ message: "Prompt not found or you are not authorized to rename it" });
        }

        return res.status(200).json({
            message: "Prompt renamed successfully",
            prompt,
            user
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error renaming prompt", error: error.message });
    }
}

module.exports = { CreateUser, loginUser, logoutUser, getUserData, getFolderData, renamePrompt, updateFolder }