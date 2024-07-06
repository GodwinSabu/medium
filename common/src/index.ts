import z from "zod"

export const signupInput =z.object({
    username:z.string().email(),
    password:z.number().min(6),
    name:z.string().optional()
})

export const sighinInput = z.object({
    username:z.string().email(),
    password:z.number().min(6),
})

export const createBlogInput = z.object({
    title:z.string(),
    content:z.string(),
})
export const updateBlogPost = z.object({
    title:z.string(),
    content:z.string(),
    id:z.number()
})

export type SignupInput = z.infer<typeof signupInput>
export type CreateBlogInput=z.infer<typeof createBlogInput>
export type SighinInput = z.infer< typeof sighinInput>
export type UpdateBlogPost = z.infer<typeof updateBlogPost>