import { z } from "zod";
export const userRegisteration = z.object({
    fullName: z.string().min(5, "Full name must be at least 5 characters long"),
    username: z.string().min(5, "Username must be at least 5 characters long").max(20, "Username cannot exceed 20 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(5, "Password must be at least 5 characters long")
});
export const userLogin = userRegisteration.pick({
    email: true,
    password: true
});