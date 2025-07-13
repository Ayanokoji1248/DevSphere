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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.userLogin = exports.userRegister = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const zod_1 = __importDefault(require("zod"));
const registerSchema = zod_1.default.object({
    fullName: zod_1.default.string().min(5, "Atleast 5 character long"),
    email: zod_1.default.string().email("Invalid Email format"),
    username: zod_1.default.string().min(5, "Atleast 5 character long"),
    password: zod_1.default.string().min(5, "Atleast 5 character long"),
});
const loginSchema = registerSchema.pick({
    email: true,
    password: true
});
const userRegister = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, password, fullName } = req.body;
        const validate = registerSchema.safeParse(req.body);
        if (!validate.success) {
            res.status(400).json({
                errors: validate.error.flatten().fieldErrors
            });
            return;
        }
        const userExist = yield user_model_1.default.findOne({
            $or: [
                { email: email },
                { username: username }
            ]
        });
        if (userExist) {
            res.status(400).json({
                message: "Email or Username Already taken"
            });
            return;
        }
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const user = yield user_model_1.default.create({
            fullName,
            username,
            email,
            password: hashedPassword
        });
        const token = jsonwebtoken_1.default.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET);
        res.cookie("token", token, {
            httpOnly: true,
            sameSite: "strict"
        });
        const _a = user.toObject(), { password: _ } = _a, userData = __rest(_a, ["password"]);
        res.status(201).json({
            message: "User Created",
            user: userData
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal Server Error"
        });
        return;
    }
});
exports.userRegister = userRegister;
const userLogin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const validate = loginSchema.safeParse(req.body);
        if (!validate.success) {
            res.status(400).json({
                errors: validate.error.flatten().fieldErrors
            });
            return;
        }
        const user = yield user_model_1.default.findOne({ email });
        if (!user) {
            res.status(400).json({
                message: "Invalid Credentials"
            });
            return;
        }
        const passValid = yield bcrypt_1.default.compare(password, user.password);
        if (!passValid) {
            res.status(400).json({
                message: "Invalid Credentials"
            });
            return;
        }
        const token = jsonwebtoken_1.default.sign({
            id: user._id,
            username: user.username
        }, process.env.JWT_SECRET);
        res.cookie("token", token, {
            httpOnly: true,
            sameSite: "strict"
        });
        const _a = user.toObject(), { password: _ } = _a, userData = __rest(_a, ["password"]);
        res.status(200).json({
            user: userData
        });
        return;
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal Server Error"
        });
        return;
    }
});
exports.userLogin = userLogin;
const logout = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.cookies.token;
        if (!token) {
            res.status(401).json({
                message: "Unauthorized"
            });
            return;
        }
        res.clearCookie("token", {
            httpOnly: true,
            sameSite: "strict"
        });
        res.status(200).json({
            message: "Logged Out successfully"
        });
        return;
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
});
exports.logout = logout;
