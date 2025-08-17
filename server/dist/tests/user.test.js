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
const mongoose_1 = __importDefault(require("mongoose"));
const supertest_1 = __importDefault(require("supertest"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const __1 = __importDefault(require(".."));
const user_model_1 = __importDefault(require("../models/user.model"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.default.connect("mongodb://localhost:27017/testDB");
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.default.connection.dropDatabase();
    yield mongoose_1.default.connection.close();
}));
beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
    yield user_model_1.default.deleteMany({});
}));
describe("GET /api/user/me", () => {
    it("should return the current user when authenticated", () => __awaiter(void 0, void 0, void 0, function* () {
        // 1️⃣ Create a user
        const hashedPassword = yield bcrypt_1.default.hash("testpassword", 10);
        const user = yield user_model_1.default.create({
            username: "krish",
            fullName: "Krish Prajapati",
            email: "krish12@gmail.com",
            password: hashedPassword,
        });
        // 2️⃣ Generate a token manually (same payload + secret as in your app)
        const token = jsonwebtoken_1.default.sign({ id: user._id.toString(), email: user.email }, process.env.JWT_SECRET, { expiresIn: "1h" });
        // 3️⃣ Send request with cookie
        const res = yield (0, supertest_1.default)(__1.default)
            .get("/api/user/me")
            .set("Cookie", [`token=${token}`]); // This is the key step
        // 4️⃣ Assertions
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty("user");
        expect(res.body.user.email).toBe("krish12@gmail.com");
        expect(res.body.user).not.toHaveProperty("password");
    }));
    it("should return 403 if no token is provided", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(__1.default).get("/api/user/me");
        expect(res.statusCode).toBe(403);
        expect(res.body).toHaveProperty("message", "Forbidden");
    }));
});
