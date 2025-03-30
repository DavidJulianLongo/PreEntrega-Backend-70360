import { z } from "zod";

export const objectIdParamsSchema = {
    params: z.object({
        id: z.string().regex(/^[a-f0-9]{24}$/i, { message: "Invalid ObjectId" }),
    })
};
