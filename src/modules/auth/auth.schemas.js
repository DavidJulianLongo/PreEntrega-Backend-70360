import { z } from 'zod';

//Esquema para el registro de usuario
export const registerSchema = {
    body: z.object(
        {
            first_name: z.string().min(2, "The field cannot be empty and must contain at least 2 characters").regex(/^([A-ZÁÉÍÓÚÑ][a-záéíóúñ]*)(\s([A-ZÁÉÍÓÚÑ][a-záéíóúñ]*))*$/, 'The field must contain only letters, and names must begin with capital letters'),
            last_name: z.string().min(2, "The field cannot be empty and must contain at least 2 characters").regex(/^([A-ZÁÉÍÓÚÑ][a-záéíóúñ]*)(\s([A-ZÁÉÍÓÚÑ][a-záéíóúñ]*))*$/, 'The field must contain only letters, and last names must begin with a capital letter'),
            email: z.string().email("Must be a valid email"),
            phone: z.string().regex(/^\+\d{7,15}$/, "Must be a valid international phone number (example: +54xxxxxxxxxx), and without spaces or hyphens"),
            address: z.object({
                street: z.string().min(2, "Street cannot be empty").regex(/^([A-Za-zÁÉÍÓÚáéíóúÑñ\s]+)$/, 'Street name must contain only letters'),
                number: z.number().min(1, "Number cannot be empty").int().positive(),
                apartment: z.string().min(1, "Apartment cannot be empty").optional(),
                city: z.string().min(2, "City name cannot be empty").regex(/^([A-Za-zÁÉÍÓÚáéíóúÑñ\s]+)$/, 'City name must contain only letters'),
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
            password: z.string()
        }
    ),
}