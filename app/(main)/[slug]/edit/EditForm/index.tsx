'use client'
import { EditPost } from '@/actions/edit-post'
import { postSchema } from '@/actions/schemas'
import ErrorMessage from '@/components/ErrorMessage'
import { Tables } from '@/utils/supabase/database.types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import z from 'zod'

const EditForm = ({ initialValues, postId }: { initialValues: Pick<Tables<'posts'>, "title" | "content" | "image">, postId: number }) => {
    const schemaWithImage =
        postSchema.omit({ image: true })
            .extend({ image: z.unknown().transform(value => { return value as (FileList) }).optional() })
    console.log("Initial Values", initialValues)
    const { register, handleSubmit } = useForm({
        resolver: zodResolver(schemaWithImage),
        defaultValues: {
            title: initialValues.title,
            content: initialValues.content || undefined,
            image: initialValues.image
        }
    })

    const { mutate, error } = useMutation({
        mutationFn: EditPost
    })

    return (
        <form onSubmit={
            handleSubmit(values => {
                let imageForm = undefined;

                if (values.image?.length && typeof values.image !== 'string') {
                    imageForm = new FormData()
                    imageForm.append('image', values.image[0])
                }
                mutate({
                    postId,
                    userdata: {
                        title: values.title,
                        content: values.content,
                        image: imageForm
                    }
                })
            })} className="max-w-2xl mt-6 m-auto border-1 rounded-4xl p-4">
            <fieldset className="flex flex-col">
                <label htmlFor="title" className="font-bold text-2xl">Post Title</label>
                <input className="border-1 p-4 my-2 rounded-xl" {...register("title")} id="title" />
            </fieldset>
            <fieldset className="flex flex-col">
                <label htmlFor="content" className="font-bold text-2xl">Change image</label>
                {initialValues.image && <img src={initialValues.image} height="auto" width="100%" />}
                <div className="relative">
                    <div className="button-secondary w-[140px] border-1 p-2 mt-2">Choose a file</div>
                    <input type="file" id="image" className="absolute text-lg file:opacity-0 pl-14 text-1xl top-[18px]" {...register("image")} />
                </div>
            </fieldset>
            <fieldset className="flex flex-col mt-4">
                <label htmlFor="content" className="font-bold text-2xl">Edit Content</label>
                <textarea className="border-1 p-4 my-2 rounded-xl" {...register("content")} id="content" />
            </fieldset>
            <button className="button-secondary">Update Post!</button>
            {error && error.message !== "NEXT_REDIRECT" && <ErrorMessage error={error.message} />}
        </form>
    )
}

export default EditForm