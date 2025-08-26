// socket.js
import { io } from "socket.io-client";

const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";
let socket = null;

export const connectSocket = () => {
    if (!socket) {
        socket = io(VITE_BACKEND_URL, {
            withCredentials: true,
            transports: ["websocket"],
        });

        socket.on("connect", () => {
            console.log("Socket connected:", socket.id);
        });

        socket.on("connect_error", (err) => {
            console.error("Socket connection error:", err.message);
        });
    }
    return socket;
};

export const getSocket = () => socket;
