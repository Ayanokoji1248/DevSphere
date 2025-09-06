import { z } from "zod";

export const userProfile = z.object({
    fullName: z.string().min(5, "Full name must be at least 5 characters long"),
    username: z.string().min(5, "Username must be at least 5 characters long").max(20, "Username cannot exceed 20 characters"),
    headline: z.preprocess((val) =>
        val == "" ? undefined : val,
        z.string("Headline is required")
    ),
    bio: z.string().min(10, "Atleast 10 character").max(50, "Atmost 50 character"),
    portfolioLink: z.preprocess((val) =>
        val == "" ? undefined : val,
        z.string().url("Invalid Url").optional()
    ),
    location: z.preprocess((val) =>
        val == "" ? undefined : val,
        z.string().optional()
    ),
    skills: z.array(z.string())
})