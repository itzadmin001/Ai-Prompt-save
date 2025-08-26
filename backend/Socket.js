const app = require("./index")
const { createServer } = require("http");
const { Server } = require("socket.io");
const jwt = require("jsonwebtoken");
const UserModel = require("./Models/UserModel");
const { getUserData } = require("./Controllars/UserControllar");
const FolderModel = require("./Models/PromptFolder");
require('dotenv').config()

const httpServer = createServer(app);

const io = new Server(httpServer, {
    cors: {
        origin: process.env.FRONTEND_BASE_URL || "http://localhost:5173",
        credentials: true,
        transports: ["websocket", "polling"],
    }
});



io.use((socket, next) => {
    try {
        const CookieHeaders = socket.handshake.headers.cookie || socket.handshake.headers?.authorization?.split(" ")[1]
        let token;
        if (CookieHeaders) {
            const cookies = CookieHeaders.split(';').reduce((acc, cookie) => {
                const [key, value] = cookie.trim().split('=');
                acc[key] = value;
                return acc;
            }, {});
            token = cookies.token;
        }
        if (!token) {
            return next(new Error("Authentication field: Login First"));
        }
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return next(new Error("Authentication error: Invalid token"));
            }
            socket.user = decoded;
            next();
        });
    } catch (error) {
        console.log(error)
        next(new Error("Authentication error"));
    }
});

io.on("connection", (socket) => {
    console.log("a user connected", socket.id);
    socket.on("newLibrary", async ({ newLibrary }) => {
        try {
            const userId = socket.user.id;
            const user = await FolderModel.create({ folder: newLibrary, user: userId });
            const UpdateUser = await UserModel.findByIdAndUpdate({ _id: userId }, { $push: { folder: user._id } }, { new: true }).populate('folder');
            if (!UpdateUser) {
                return socket.emit("error", { message: "User not found" });
            }
            socket.emit("libraryUpdated", {
                status: 201,
                message: "Library updated successfully",
            }
            );
        } catch (err) {
            console.error("Error updating prompt:", err);
            socket.emit("error", { message: "Failed to update prompt" });
        }
    })


    socket.on("deleteLiabrary", async ({ id }) => {
        try {
            const userId = socket.user.id;
            const user = await UserModel.findById({ _id: userId });

            if (!user) {
                return socket.emit("error", { message: "User not found" });
            }
            const findFolder = await FolderModel.findById(id);
            if (!findFolder) {
                return socket.emit("error", { message: "Folder not found" });
            }

            await FolderModel.findByIdAndDelete(id);
            const deleteUserfolder = await UserModel.findByIdAndUpdate({ _id: userId }, { $pull: { folder: id } }, { new: true }).populate('folder');
            await user.save();
            socket.emit("libraryUpdated", {
                status: 201,
                message: "Library updated successfully",
            }
            );
        } catch (error) {
            console.error(error);
            socket.emit("error", { message: "Something went wrong" });
        }
    })



    socket.on("disconnect", () => {
        console.log("user disconnected", socket.id);
    });
});






httpServer.listen(3000, () => {
    console.log("server started")
})