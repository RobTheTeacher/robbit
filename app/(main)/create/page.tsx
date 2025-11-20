'use client'
import { CreatePost } from "@/actions/create-post"
import { postSchema } from "@/actions/schemas"
import ErrorMessage from "@/components/ErrorMessage"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import z from "zod"

const createPostSchema =  postSchema.omit({ image: true })
            .extend({ image: z.unknown().transform(value => { return value as (FileList) }).optional() })


const CreatePage = () => {
    const { register, handleSubmit } = useForm({
        resolver: zodResolver(createPostSchema)
    })

    const { mutate, error } = useMutation({
        mutationFn: CreatePost
    })

    return (
        <div>
            <form onSubmit={handleSubmit(values => {
                const imageForm = new FormData();
                if (values.image) {
                    imageForm.append('image', values.image[0])
                }

                mutate({
                    title: values.title,
                    content: values.content,
                    image: imageForm
                })
            })} className="max-w-2xl mt-6 m-auto border-1 rounded-4xl p-4">
                <h2 className="font-bold text-2xl">Create a Post!</h2>
                <fieldset className="flex flex-col">
                    <label htmlFor="title">Post Title</label>
                    <input id="title" className="border-1 p-4 my-2 rounded-xl" {...register("title")} placeholder="Title..." />
                </fieldset>
                <fieldset className="flex flex-col">
                    <label htmlFor="content">Content(not required)</label>
                    <textarea id="content" className="border-1 p-4 my-2 rounded-xl w-full" {...register("content")} ></textarea>
                </fieldset>
                <fieldset className="flex flex-col">
                    <label htmlFor="image">Image (not required)</label>
                    <input type="file" id="image" className="" {...register("image")} />
                </fieldset>
                <fieldset className="flex flex-col">
                    <button className="button-secondary">Create post!</button>
                </fieldset>
                {error && <ErrorMessage error={error.message} />}
            </form>
        </div>
    )
}

export default CreatePage