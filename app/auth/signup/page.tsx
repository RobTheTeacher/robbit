'use client'
import { signUpSchema } from "@/actions/schemas"
import { SignUp } from "@/actions/sign-up"
import ErrorMessage from "@/components/ErrorMessage"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import Link from "next/link"
import { useForm } from "react-hook-form"

const SignUpPage = () => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(signUpSchema)
    })

    const { mutate, error } = useMutation({
        mutationFn: SignUp,
        
    })

    return (
        <form onSubmit={handleSubmit(values => mutate(values))} className="max-w-2xl mt-6 m-auto border-1 rounded-4xl p-4">
            <h2 className="font-bold text-2xl">Sign Up</h2>
            <fieldset className="flex flex-col">
                <label htmlFor="email">Enter your email</label>
                <input {...register("email")} className="border-1 p-4 my-2 rounded-xl" placeholder="Email..." />
                {errors.email && <ErrorMessage error={errors.email.message!} />}
            </fieldset>
            <fieldset className="flex flex-col">
                <label htmlFor="email">Choose a username</label>
                <input {...register("username")} className="border-1 p-4 my-2 rounded-xl" placeholder="Username..." />
                {errors.username && <ErrorMessage error={errors.username.message!} />}
            </fieldset>
            <fieldset className="flex flex-col">
                <label htmlFor="password">And your password</label>
                <input {...register("password")} className="border-1 p-4 my-2 rounded-xl" type="password" placeholder="Password..." />
                {errors.password && <ErrorMessage error={errors.password.message!} />}
            </fieldset>
            {error  && <ErrorMessage error={error.message}/>}
            <button className="button-secondary">Join us!</button>
            <div className="my-4">
                Have an account? Log in <Link className="font-bold text-red-500" href="/auth/login">here!</Link>
            </div>
        </form>
    )
}

export default SignUpPage