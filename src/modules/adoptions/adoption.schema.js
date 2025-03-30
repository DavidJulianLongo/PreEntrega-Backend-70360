import {z} from "zod";


export const adoptionSchema = {
  body: z.object({
    owner: z.string().regex(/^[a-f0-9]{24}$/i, { message: "Invalid ObjectId" }),
    pet: z.string().regex(/^[a-f0-9]{24}$/i, { message: "Invalid ObjectId" })
  })
};
