import {z} from 'zod'

export const logInSchema = z.object({
    email:z.email(),
    password:z.string().min(6, "Passwords must have at least 6 characters")
})

export const signUpSchema=z.object({
    email: z.email(),
    username: z.string().min(6, "Usernames must have a minimum of 6 characters"),
    password:z.string().min(6, "Passwords must have at least 6 characters")
})

export const postSchema = z.object({
    title: z.string().min(3, "Title must have 3 characters"),
    content: z.string().optional(),
    image: z.instanceof(FormData)
})

export const commentSchema = z.object({
    content: z.string().min(6, "Comment must be a minimum of 6 characters")
})
