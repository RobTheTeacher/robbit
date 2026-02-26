import { createClient } from "@/utils/supabase/server-client"
import EditForm from "./EditForm"

const EditPostPage = async ({ params }: { params: { slug: string } }) => {
    const { slug } = await params

    const supabase = await createClient();
    const { data:post, error } = await supabase.from('posts')
        .select("*")
        .eq('slug', slug)
        .single()

    return (
        <>
            {post &&
                <div>
                    <h1>Edit Post Page</h1>
                    <EditForm initialValues={{title: post.title, content:post.content, image:post?.image}} postId={post.id} />
                </div>
            }
        </>
    )
}

export default EditPostPage