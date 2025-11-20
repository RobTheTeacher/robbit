'use client'
import { LogIn } from "@/actions/log-in"
import { logInSchema } from "@/actions/schemas"
import ErrorMessage from "@/components/ErrorMessage"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import Link from "next/link"
import { useForm } from "react-hook-form"

const LogInPage = () => {
    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: zodResolver(logInSchema)
    })

    const {mutate, error, isPending} = useMutation({
        mutationFn: LogIn
    })

    return (
        <form onSubmit={handleSubmit(values => mutate(values))} className="max-w-2xl mt-6 m-auto border-1 rounded-4xl p-4">
            <h2 className="font-bold text-2xl">Log In</h2>
            <fieldset className="flex flex-col">
                <label htmlFor="username">Enter your email</label>
                <input {...register("email")} className="border-1 p-4 my-2 rounded-xl" placeholder="Email..." />
                {errors.email && <ErrorMessage error={errors.email.message!} />}
            </fieldset>
            <fieldset className="flex flex-col">
                <label htmlFor="password">And your password</label>
                <input {...register("password")} className="border-1 p-4 my-2 rounded-xl" type="password" name="password" placeholder="Password..." />
                 {errors.password && <ErrorMessage error={errors.password.message!} />}
            </fieldset>
            <button className="button-secondary">{isPending ? "Logging in" : "Log In"}</button>
                 <div className="my-4">Don't have an account?
                <p>Sign up <Link className="font-bold text-red-500" href="/auth/signup">here!</Link></p>
            </div>
            {error && <ErrorMessage error={error.message} />}
        </form>
    )
}

export default LogInPage
