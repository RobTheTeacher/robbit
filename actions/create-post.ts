'use server'
import z from "zod"
import { postSchema } from "./schemas"
import { slugify } from "@/utils/slugify"
import { createClient } from "@/utils/supabase/server-client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { UploadImage } from "./upload-image";

export const CreatePost = async (data: z.infer<typeof postSchema>) => {

    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) { throw new Error("Not Authorized!") }

    const parsedData = postSchema.parse(data)
    const slug = slugify(parsedData.title)

    let imageFile = data.image?.get('image')

    if (typeof imageFile !== 'string') {
        if (!(imageFile instanceof File) && imageFile != null) {
            throw new Error("Malformed image")
        }
    } else {
        if (imageFile === "undefined") {
            imageFile = null;
        }

        const imagePublicUrl = imageFile ? await UploadImage(imageFile) : imageFile

        const { error } = await supabase.from('posts')
            .insert([{ user_id: user?.id, slug: slug, title: parsedData.title, content: parsedData.content, image: imagePublicUrl }])
            .throwOnError()

        if (error) throw (error)

        revalidatePath("/")
        redirect("/")
    }
}