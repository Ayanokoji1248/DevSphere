import { z } from "zod"

export const postSchemaValidation = z.object({
    content: z.string().trim().min(5, "Atleast 5 character long"),
    code: z.string().optional(),
    image: z.preprocess((val) => val === "" ? undefined : val, z.string().url().optional()),
    link: z.preprocess((val) =>
        val == "" ? undefined : val,
        z.string().url("Invalid Url").optional(),
    ),
    tags: z.array(z.string()).optional()
})