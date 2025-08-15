import mongoose from "mongoose";
import request from "supertest";
import bcrypt from "bcrypt";
import app from "..";
import userModal from "../models/user.model";
import jwt from "jsonwebtoken"

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


describe("GET /api/user/me", () => {
    it("should return the current user when authenticated", async () => {
        // 1️⃣ Create a user
        const hashedPassword = await bcrypt.hash("testpassword", 10);
        const user = await userModal.create({
            username: "krish",
            fullName: "Krish Prajapati",
            email: "krish12@gmail.com",
            password: hashedPassword,
        });

        // 2️⃣ Generate a token manually (same payload + secret as in your app)
        const token = jwt.sign(
            { id: user._id.toString(), email: user.email },
            process.env.JWT_SECRET as string,
            { expiresIn: "1h" }
        );

        // 3️⃣ Send request with cookie
        const res = await request(app)
            .get("/api/user/me")
            .set("Cookie", [`token=${token}`]); // This is the key step

        // 4️⃣ Assertions
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty("user");
        expect(res.body.user.email).toBe("krish12@gmail.com");
        expect(res.body.user).not.toHaveProperty("password");
    });

    it("should return 403 if no token is provided", async () => {
        const res = await request(app).get("/api/user/me");

        expect(res.statusCode).toBe(403);
        expect(res.body).toHaveProperty("message", "Forbidden");
    });
});