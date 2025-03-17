import { z } from 'zod';

export const petMockSchema = {
    params: z.object({
        amount: z.coerce.number({ invalid_type_error: "must be a number" })
            .int("Must be an integer")
            .positive("Must be a positive number")

    }),
}