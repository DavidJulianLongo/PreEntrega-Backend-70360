import { z } from 'zod';

export const userMockSchema = {
    params: z.object({
        amount: z.coerce.number({ invalid_type_error: "must be a number" })
            .int("Must be an integer")
            .positive("Must be a positive number")

    }),
}