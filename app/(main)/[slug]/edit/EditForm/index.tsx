'use client'
import { EditPost } from '@/actions/edit-post'
import { postSchema } from '@/actions/schemas'
import ErrorMessage from '@/components/ErrorMessage'
import { Tables } from '@/utils/supabase/database.types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import z from 'zod'

const editPostSchema = postSchema.omit({ image: true }).extend({ image: z.instanceof(FileList).optional() })

const EditForm = ({ defaultValues, postId }: { defaultValues: Pick<Tables<'posts'>, "title" | "content" | "image">, postId: number }) => {
    const { register, handleSubmit } = useForm({
        resolver: zodResolver(editPostSchema),
        defaultValues: {
            title: defaultValues.title,
            content: defaultValues.content || undefined
        }
    })

    const { mutate, error } = useMutation({
        mutationFn: EditPost
    })
    return (
        <form onSubmit={
            handleSubmit(values => {
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
            <fieldset className="flex flex-col">
                <label htmlFor="title">Post Title</label>
                <input className="border-1 p-4 my-2 rounded-xl" {...register("title")} id="title" />
            </fieldset>
            <fieldset className="flex flex-col">
                <label htmlFor="content" >Change image</label>
                {defaultValues.image && <img src={defaultValues.image} height="auto" width="100%" />}
                <input type="file" {...register("image")} id="image" />
            </fieldset>
            <fieldset className="flex flex-col">
                <label htmlFor="content" >Edit Content</label>
                <textarea className="border-1 p-4 my-2 rounded-xl" {...register("content")} id="content" />
            </fieldset>
            <button className="button-secondary">Update Post!</button>
            {error && <ErrorMessage error={error.message} />}
        </form>
    )
}

export default EditForm