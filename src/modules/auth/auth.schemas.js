import { z } from 'zod';

//Esquema para el registro de usuario
export const registerSchema = {
    body: z.object(
        {
            first_name: z.string().min(2, "The field cannot be empty and must contain at least 2 characters"),
            last_name: z.string().min(2, "The field cannot be empty and must contain at least 2 characters"),
            email: z.string().email("Must be a valid email"),
            phone: z.string().regex(/^\+\d{7,15}$/, "Must be a valid international phone number (example: +54xxxxxxxxxx), and without spaces or hyphens"),
            address: z.object({
                street: z.string(),
                city: z.string(),
                zipCode: z.string()
            }),
            password: z.string().regex(/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/, "Password must contain at least one uppercase letter, one number, and one special character(@, #, $, %, etc.), and must be at least 8 characters long"),
            role: z.enum(["admin", "user"]).optional()
        }
    ),
}

//Esquema para el login de usuario
export const loginSchema = {
    body: z.object(
        {
            email: z.string().email("Must be a valid email"),
            password: z.string().min(6, "Must be at least 6 characters")
        }
    ),
}