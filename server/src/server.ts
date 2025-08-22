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

    const users = new Map<string, string> // userId->socket.id

    io.on("connection", (socket) => {
        console.log("A user is connected with socket id: ", socket.id);

        socket.on("join", (userId: string) => {
            users.set(userId, socket.id);
            console.log(`User ${userId} connected with socket ${socket.id}`);
        })


        socket.on("message", ({ from, to, message }) => {
            const receiverSocket = users.get(to);

            if (receiverSocket) {
                io.to(receiverSocket).emit("message", {
                    from, message
                });
                console.log(`Message from ${from} to ${to} : ${message}`);
            }
        })

        socket.on("disconnect", () => {
            console.log("Client disconnected: ", socket.id);

            for (let [userId, socketId] of users) {
                if (socketId === socket.id) {
                    users.delete(userId);
                    console.log(`User ${userId} disconnected`);
                }
            }

        })

    })

    httpServer.listen(3000, () => {
        console.log("Server running on port 3000")
    })
}

main()