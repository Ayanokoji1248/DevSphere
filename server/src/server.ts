import app from ".";
import { dbConnect } from "./config/dbConnection";
import { Server } from "socket.io"
import { createServer } from "http"

async function main() {

    await dbConnect();

    const httpServer = createServer(app);

    const io = new Server(httpServer, {
        cors: {
            origin: "http://localhost:5173",
            credentials: true
        }
    })

    const onlineUsers = new Map<string, string>()

    io.on("connection", (socket) => {
        console.log("A user is connected", socket.id);

        socket.on("join", (userId: string) => {
            onlineUsers.set(userId, socket.id);
            console.log(`User ${userId} connected with socket ${socket.id}`)
        })

        socket.on("private_message", ({ senderId, receiverId, message }) => {
            const receiverSocketId = onlineUsers.get(receiverId);

            if (receiverSocketId) {
                io.to(receiverSocketId).emit("private_message", {
                    senderId,
                    message,
                });
            }
        })

        socket.on("disconnect", () => {
            console.log("User disconnected: ", socket.id);

            for (let [userId, sockId] of onlineUsers.entries()) {
                if (sockId == socket.id) {
                    onlineUsers.delete(userId);
                    break;
                }
            }
        })

    })

    httpServer.listen(3000, () => {
        console.log("Server running on port 3000")
    })
}

main()