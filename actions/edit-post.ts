'use server'
import z from "zod";
import { postSchema } from "./schemas";
import { createClient } from "@/utils/supabase/server-client";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { slugify } from "@/utils/slugify";

import { uploadImage } from "@/utils/supabase/upload-image"

//const editPostSchema = postSchema.omit({ image: true })
    //.extend({ image: z.instanceof(FileList).optional()})

export const EditPost = async ({ userdata, postId }: { userdata: z.infer<typeof postSchema>, postId: number }) => {
    const parsedData = postSchema.parse(userdata)

       const imageFile = userdata.image?.get("image")
    console.log("Image file,", imageFile, "Type: ", typeof imageFile)

   let publicImageUrl;
    if ((typeof imageFile !== 'string') && imageFile !== undefined) {
        if (!(imageFile instanceof File) && imageFile !== null) {
            throw new Error("Malformed Image file")
        }

        publicImageUrl = await uploadImage(imageFile!);
    } else {
        publicImageUrl = imageFile;
    }


    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) throw new Error("Unauthorised")

    const { data: post } = await supabase.from('posts').select('user_id').eq('id', postId).single()

    if (!post) throw new Error("Post does not exist")

    if (user.id !== post.user_id) throw new Error("You are not allowed to edit this post")

    const updatedSlug = slugify(parsedData.title)
    const { data: updatedPost } = await supabase.from('posts')
        .update({ ...parsedData, image: publicImageUrl, 'slug': updatedSlug}).eq('id', postId)
        .select('slug').single().throwOnError()


    if (updatedPost) {
        revalidatePath("/")
        redirect(`/${updatedPost.slug}`)
    }

}