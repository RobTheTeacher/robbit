
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
    return (
        <>
            {
                data &&
                <>
                    <div className="max-w-2xl p-4 m-auto border-gray-700 border-1 mt-4 rounded-2xl">
                        <h2 className="font-bold text-xl mb-4 capitalize">{data.title}</h2>
                        {data.image && <img src={data.image} height="auto" width="100%" className="mb-4" />}
                        {data.content && <div>{data.content}</div>}
                        <p className="mt-4 text-right text-gray-500">by {data.users?.username}</p>

                        {user?.id === data.user_id &&
                            <div className="w-full pt-4 justify-end flex gap-4">
                                <DeleteButton postId={data.id} />
                                <Link href={`/${slug}/edit`} className="button-secondary">Edit Post</Link>
                            </div>
                        }
                    </div>
                </>
            }

            <div className="max-w-2xl m-auto mt-6">
                {
                    comments &&
                    <>
                        <h3 className="font-bold text-xl mb-4 capitalize">Comments</h3>
                        {comments.map(comment =>
                            <div key={comment.id} className="w-full p-4 m-auto border-gray-700 border-1 mt-4 rounded-2xl">
                                <p>{comment.content}</p>
                                <p className="text-right text-gray-700">by {comment.users.username}</p>
                            </div>
                        )}
                    </>
                }
                <AddCommentForm postId={data!.id} isFirst={comments ? false : true} />
            </div>
        </>
    )
}

export default PostPage