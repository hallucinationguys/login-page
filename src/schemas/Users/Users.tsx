
import { z } from 'zod'

export const SignUpSchema = z.object({
    email: z.string().nonempty("Email is required").email("Email format is not valid").trim().toLowerCase(),
    password: z.string().min(3).max(20),
})

export type SignUpSchemaType = z.infer<typeof SignUpSchema>