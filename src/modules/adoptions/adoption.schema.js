import {z} from "zod";


export const adoptionSchema = {
  body: z.object({
    ownerId: z.string().regex(/^[a-f0-9]{24}$/i, "Must be an ObjectId"),
    petId: z.string().regex(/^[a-f0-9]{24}$/i, "Must be an ObjectId")
  })
};
