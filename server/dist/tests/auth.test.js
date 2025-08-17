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
const __1 = __importDefault(require(".."));
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_model_1 = __importDefault(require("../models/user.model"));
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
describe("POST /api/auth/register", () => {
    it("should register a user successfully", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(__1.default).post('/api/auth/register').send({
            username: "testuser",
            fullName: "Test User",
            email: "test@example.com",
            password: "testpassword"
        });
        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty("message", "User Created");
        expect(res.body.user).not.toHaveProperty("password");
        expect(res.headers["set-cookie"]).toBeDefined();
    }));
    it("should return error if required fields are missing", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(__1.default).post("/api/auth/register").send({
            fullName: "",
            username: "test",
            email: "test12@example.com"
        });
        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty("errors");
    }));
    it("should not allow duplicate email", () => __awaiter(void 0, void 0, void 0, function* () {
        yield user_model_1.default.create({
            fullName: "Existing User",
            username: "existinguser",
            email: "duplicate@example.com",
            password: yield bcrypt_1.default.hash("password", 10)
        });
        const res = yield (0, supertest_1.default)(__1.default).post("/api/auth/register").send({
            username: "newusername",
            fullName: "New User",
            email: "duplicate@example.com",
            password: "newpassword"
        });
        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty("message", "Email or Username Already taken");
    }));
    it("should not allow duplicate username", () => __awaiter(void 0, void 0, void 0, function* () {
        yield user_model_1.default.create({
            fullName: "Existing User",
            username: "duplicateuser",
            email: "unique@example.com",
            password: yield bcrypt_1.default.hash("password", 10)
        });
        const res = yield (0, supertest_1.default)(__1.default).post("/api/auth/register").send({
            username: "duplicateuser",
            fullName: "Another User",
            email: "another@example.com",
            password: "password"
        });
        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty("message", "Email or Username Already taken");
    }));
    it("should validate email format", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(__1.default).post("/api/auth/register").send({
            username: "invalidemail",
            fullName: "Invalid Email User",
            email: "not-an-email",
            password: "password"
        });
        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty("errors");
    }));
    it("should return 500 if an unexpected error occurs", () => __awaiter(void 0, void 0, void 0, function* () {
        jest.spyOn(user_model_1.default, "create").mockImplementationOnce(() => {
            throw new Error("DB Error");
        });
        const res = yield (0, supertest_1.default)(__1.default).post("/api/auth/register").send({
            username: "errorcase",
            fullName: "Error Case",
            email: "error@example.com",
            password: "password"
        });
        expect(res.statusCode).toBe(500);
        expect(res.body).toHaveProperty("message", "Internal Server Error");
    }));
});
describe("POST /api/auth/login", () => {
    it("should return validation error", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(__1.default).post('/api/auth/login').send({
            email: "example.com",
            password: "krish@12",
        });
        expect(res.body).toHaveProperty("errors");
        expect(res.statusCode).toBe(400);
    }));
    it("should return user not found", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(__1.default).post("/api/auth/login").send({
            email: "krish12@gmail.com",
            password: "krish12"
        });
        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty("message", "Invalid Credentials");
    }));
    it("should return invalid credentials", () => __awaiter(void 0, void 0, void 0, function* () {
        const hashedPassword = yield bcrypt_1.default.hash("krish12", 10);
        yield user_model_1.default.create({
            username: "krish",
            fullName: "Krish Prajapati",
            email: "krish12@gmail.com",
            password: hashedPassword
        });
        const res = yield (0, supertest_1.default)(__1.default).post("/api/auth/login").send({
            email: "krish12@gmail.com",
            password: "krish125"
        });
        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty("message", "Invalid Credentials");
    }));
    it("should login the user", () => __awaiter(void 0, void 0, void 0, function* () {
        const hashedPassword = yield bcrypt_1.default.hash("krish12", 10);
        yield user_model_1.default.create({
            username: "krish",
            fullName: "Krish Prajapati",
            email: "krish12@gmail.com",
            password: hashedPassword
        });
        const res = yield (0, supertest_1.default)(__1.default).post("/api/auth/login").send({
            email: "krish12@gmail.com",
            password: "krish12"
        });
        expect(res.statusCode).toBe(200);
        expect(res.body).not.toHaveProperty("password");
        expect(res.headers["set-cookie"]).toBeDefined();
    }));
});
