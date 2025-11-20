'use client'
import { commentSchema } from "@/actions/schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { AddComment } from "@/actions/add-comment"
import { toast } from "sonner"

const AddCommentForm = ({ postId }: { postId: number }) => {
    const { register, handleSubmit, reset } = useForm({
        resolver: zodResolver(commentSchema)
    })

    const { mutate } = useMutation({
        mutationFn: AddComment,
        onSuccess: () => {
            toast.success("Comment added!");
            reset();
        }
    })

    return (
        <form onSubmit={handleSubmit(values => mutate({ postId, commentdata: { content: values.content } }))}>
            <fieldset>
                <label> Add comment</label>
                <input {...register("content")} />
                <button className="button-tertiary">Submit Comment</button>
            </fieldset>
        </form>
    )
}

export default AddCommentForm