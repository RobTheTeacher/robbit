import { DeletePost } from "@/actions/delete-post";
import { createClient } from "@/utils/supabase/server-client";
import DeleteButton from "./DeleteButton";
import Link from "next/link";
import { getPostComments, getSinglePost } from "@/utils/supabase/queries";
import AddCommentForm from "./AddCommentForm";

const PostPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
    const { slug } = await params;
    const supabase = await createClient()
    const { data, error } = await getSinglePost(slug)

    const { data: { user } } = await supabase.auth.getUser();

    const { data: comments, error: commentError } = await getPostComments(data!.id)
console.log("Comments", comments, data!.id)
    return (
        <>
            {data &&
                <>
                    <div className="w-2xl p-4 m-auto border-gray-700 border-1 mt-4 rounded-2xl">
                        <h2 className="font-bold text-xl mb-4">{data.title}</h2>
                        {data.image && <img src={data.image} height="auto" width="100%" />}
                        {data.content && <div>{data.content}</div>}
                        <p className="mt-4">Author {data.users?.username}</p>
                    </div>
                    <div>
                        {user?.id === data.user_id &&
                            <div>
                                <DeleteButton postId={data.id} />
                                <Link href={`/${slug}/edit`} className="button-secondary">Edit Post</Link>
                            </div>
                        }
                    </div>
                </>
            }

            <div>{comments && comments.map(comment => <p key = {comment.id}>{comment.content}</p>)}
            </div>

            <div>
                <AddCommentForm postId={data!.id} />
            </div>
        </>
    )
}

export default PostPage