import { z } from 'zod';

export const petMockSchema = {
    params: z.object(
        {
            amount: z.coerce.number({ invalid_type_error: "must be a number" })
                .int("Must be an integer")
                .positive("Must be a positive number")
        }
    ),
}

//Esquema para el registro de pet
export const registerSchema = {
    body: z.object(
        {
            name: z.string().min(2, "The field cannot be empty and must contain at least 2 characters").regex(/^([A-ZÁÉÍÓÚÑ][a-záéíóúñ]*)(\s([A-ZÁÉÍÓÚÑ][a-záéíóúñ]*))*$/, 'The field must contain only letters, and names must begin with capital letters'),
            type: z.string().min(2, "The field cannot be empty and must contain at least 2 characters").regex(/^([a-záéíóúñ]*)(\s([A-ZÁÉÍÓÚÑ][a-záéíóúñ]*))*$/, 'The field must contain only letters'),
           //expresion regular para validar el formato de la fecha YYYY-MM-DD y que sea una fecha valida
            birthDate: z.string()
                .refine((val) => /^\d{4}-\d{2}-\d{2}$/.test(val), {
                    message: "Birth date must be in the format YYYY-MM-DD",
                })
                .refine((val) => !isNaN(Date.parse(val)), {
                    message: "Birth date must be a valid date",
                })
                .transform((val) => new Date(val)),
            sex: z.string().trim().regex(/^(male|female)$/i, "The field must be 'male' or 'female'"),
            sterilized: z.boolean(({ required_error: "The sterilized field is required", invalid_type_error: "Sterilized must be a boolean value (true or false)" }))
        }
    ),
}

