import mongoose from "mongoose";
import request from "supertest";
import app from "..";
import bcrypt from "bcrypt";
import userModal from "../models/user.model";

beforeAll(async () => {
    await mongoose.connect("mongodb://localhost:27017/testDB");
});

afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
});

beforeEach(async () => {
    await userModal.deleteMany({});
});

describe("POST /api/auth/register", () => {

    it("should register a user successfully", async () => {
        const res = await request(app).post('/api/auth/register').send({
            username: "testuser",
            fullName: "Test User",
            email: "test@example.com",
            password: "testpassword"
        });

        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty("message", "User Created");
        expect(res.body.user).not.toHaveProperty("password");
        expect(res.headers["set-cookie"]).toBeDefined();
    });

    it("should return error if required fields are missing", async () => {
        const res = await request(app).post("/api/auth/register").send({
            fullName: "",
            username: "test",
            email: "test12@example.com"
        });

        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty("errors");
    });

    it("should not allow duplicate email", async () => {
        await userModal.create({
            fullName: "Existing User",
            username: "existinguser",
            email: "duplicate@example.com",
            password: await bcrypt.hash("password", 10)
        });

        const res = await request(app).post("/api/auth/register").send({
            username: "newusername",
            fullName: "New User",
            email: "duplicate@example.com",
            password: "newpassword"
        });

        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty("message", "Email or Username Already taken");
    });

    it("should not allow duplicate username", async () => {
        await userModal.create({
            fullName: "Existing User",
            username: "duplicateuser",
            email: "unique@example.com",
            password: await bcrypt.hash("password", 10)
        });

        const res = await request(app).post("/api/auth/register").send({
            username: "duplicateuser",
            fullName: "Another User",
            email: "another@example.com",
            password: "password"
        });

        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty("message", "Email or Username Already taken");
    });

    it("should validate email format", async () => {
        const res = await request(app).post("/api/auth/register").send({
            username: "invalidemail",
            fullName: "Invalid Email User",
            email: "not-an-email",
            password: "password"
        });

        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty("errors");
    })

    it("should return 500 if an unexpected error occurs", async () => {
        jest.spyOn(userModal, "create").mockImplementationOnce(() => {
            throw new Error("DB Error");
        });

        const res = await request(app).post("/api/auth/register").send({
            username: "errorcase",
            fullName: "Error Case",
            email: "error@example.com",
            password: "password"
        });

        expect(res.statusCode).toBe(500);
        expect(res.body).toHaveProperty("message", "Internal Server Error");
    });
});
