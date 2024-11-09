import {z} from "zod";

export const SignupSchema = z.object({
    fullname: z.string().min(10),
    username: z.string().min(15),
    password: z.string().min(6),

})

export const SigninSchema = z.object({
    username: z.string(),
    password:z.string()
});

