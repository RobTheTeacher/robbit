'use server'

import z from "zod"
import { commentSchema } from "./schemas"
import { createClient } from "@/utils/supabase/server-client"
import { revalidatePath } from "next/cache"

export const AddComment = async ({postId, commentdata} :{ postId: number, commentdata: z.infer<typeof commentSchema>}) => {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser();
    const parsedData = commentSchema.parse(commentdata)
    if (!user) {
        throw new Error("Not Authorised to make comments")
    }

    const { data, error } = await supabase
        .from("comments")
        .insert({ post_id: postId, user_id: user.id, ...parsedData })
        .single()
        .throwOnError()

    revalidatePath('/')
}