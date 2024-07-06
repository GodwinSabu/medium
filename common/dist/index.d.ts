import z from "zod";
export declare const signupInput: z.ZodObject<{
    username: z.ZodString;
    password: z.ZodNumber;
    name: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    username: string;
    password: number;
    name?: string | undefined;
}, {
    username: string;
    password: number;
    name?: string | undefined;
}>;
export declare const sighinInput: z.ZodObject<{
    username: z.ZodString;
    password: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    username: string;
    password: number;
}, {
    username: string;
    password: number;
}>;
export declare const createBlogInput: z.ZodObject<{
    title: z.ZodString;
    content: z.ZodString;
}, "strip", z.ZodTypeAny, {
    title: string;
    content: string;
}, {
    title: string;
    content: string;
}>;
export declare const updateBlogPost: z.ZodObject<{
    title: z.ZodString;
    content: z.ZodString;
    id: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    title: string;
    content: string;
    id: number;
}, {
    title: string;
    content: string;
    id: number;
}>;
export type SignupInput = z.infer<typeof signupInput>;
export type CreateBlogInput = z.infer<typeof createBlogInput>;
export type SighinInput = z.infer<typeof sighinInput>;
export type UpdateBlogPost = z.infer<typeof updateBlogPost>;
