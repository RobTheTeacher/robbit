'use client'
import { commentSchema } from "@/actions/schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { AddComment } from "@/actions/add-comment"
import { toast } from "sonner"

const AddCommentForm = ({ postId, isFirst }: { postId: number, isFirst: boolean }) => {
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
        <form className="mt-6" onSubmit={handleSubmit(values => mutate({ postId, commentdata: { content: values.content } }))}>
            <fieldset className="">
                <label className="font-bold">{isFirst ? "Start the conversation" : "Got something to add?"}</label>
                <textarea placeholder="Share your thoughts..." className="border-gray-700 border-1 my-4 p-2 rounded-2xl block w-full" {...register("content")} />
                <button className="button-tertiary ml-auto flex-100%">Submit Comment</button>
            </fieldset>
        </form>
    )
}

export default AddCommentForm