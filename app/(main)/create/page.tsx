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
                <h2 className="font-bold text-4xl">Create a Post!</h2>
                <fieldset className="flex flex-col mt-4">
                    <label htmlFor="title" className="font-bold">What's the title of your post?</label>
                    <input id="title" className="border-1 p-4 my-2 rounded-xl" {...register("title")} placeholder="Title..." />
                </fieldset>
                <fieldset className="flex flex-col">
                    <label htmlFor="content" className="font-bold">Add content here (not required)</label>
                    <textarea id="content" className="border-1 p-4 my-2 rounded-xl w-full" {...register("content")} ></textarea>
                </fieldset>
                <fieldset className="flex flex-col relative">
                    <label htmlFor="image" className="font-bold">Want to have an Image (not required)?</label>
                    <div className="button-secondary w-[140px] border-1 p-2 mt-2">Choose a file</div>
                    <input type="file" id="image" className="absolute text-lg file:opacity-0 pl-14 text-1xl top-[42px]" {...register("image")} />
                </fieldset>
                <fieldset className="flex flex-col mt-4">
                    <button className="button-secondary">Create post!</button>
                </fieldset>
                {error && <ErrorMessage error={error.message} />}
            </form>
        </div>
    )
}

export default CreatePage