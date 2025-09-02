"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = __importDefault(require("."));
const dbConnection_1 = require("./config/dbConnection");
const socket_io_1 = require("socket.io");
const http_1 = require("http");
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, dbConnection_1.dbConnect)();
        const httpServer = (0, http_1.createServer)(_1.default);
        const io = new socket_io_1.Server(httpServer, {
            cors: {
                origin: "http://localhost:5173",
                credentials: true
            }
        });
        const users = new Map; // userId->socket.id
        io.on("connection", (socket) => {
            console.log("A user is connected with socket id: ", socket.id);
            socket.on("join", (userId) => {
                users.set(userId, socket.id);
                console.log(`User ${userId} connected with socket ${socket.id}`);
            });
            socket.on("message", ({ from, to, message }) => {
                const receiverSocket = users.get(to);
                if (receiverSocket) {
                    io.to(receiverSocket).emit("message", {
                        from, message
                    });
                    console.log(`Message from ${from} to ${to} : ${message}`);
                }
            });
            socket.on("disconnect", () => {
                console.log("Client disconnected: ", socket.id);
                for (let [userId, socketId] of users) {
                    if (socketId === socket.id) {
                        users.delete(userId);
                        console.log(`User ${userId} disconnected`);
                    }
                }
            });
        });
        httpServer.listen(3000, () => {
            console.log("Server running on port 3000");
        });
    });
}
main();
