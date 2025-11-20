'use server'
import z from "zod";
import { postSchema } from "./schemas";
import { createClient } from "@/utils/supabase/server-client";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { slugify } from "@/utils/slugify";

const editPostSchema = postSchema.omit({ image: true })
    .extend({ image: z.instanceof(FileList).optional() })

export const EditPost = async ({ userdata, postId }: { userdata: z.infer<typeof editPostSchema>, postId: number }) => {
    const parsedData = editPostSchema.parse(userdata)
    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) throw new Error("Unauthorised")

    const { data: post } = await supabase.from('posts').select('user_id').eq('id', postId).single()

    if (!post) throw new Error("Post does not exist")

    if (user.id !== post.user_id) throw new Error("You are not allowed to edit this post")

    const updatedSlug = slugify(parsedData.title)
    const { data: updatedPost } = await supabase.from('posts')
        .update({ ...parsedData, 'slug': updatedSlug}).eq('id', postId)
        .select('slug').single().throwOnError()


    if (updatedPost) {
        revalidatePath("/")
        redirect(`/${updatedPost.slug}`)
    }

}