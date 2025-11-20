'use client'
import { getHomePosts, HomePostsType } from "@/utils/supabase/queries"
import Link from "next/link"
import { useQuery } from '@tanstack/react-query'
import { createClient } from "@/utils/supabase/browser-client"

const HomePosts = ({ posts }: { posts: HomePostsType }) => {
    const supabase = createClient()
    const { data, error } = useQuery({
        queryKey: ['initialposts'],
        queryFn: async () => {
            const { data, error } = await getHomePosts(supabase)
            if (error) throw new Error
            return data
        },
        initialData: posts,
        refetchOnMount: false,
        staleTime: 10000
    })

    return (
        <div className="">
            {data && data.map(({id, title, slug, users}) => <Link className="block border-black border-1 rounded-xl p-4 mt-2" href={`/${slug}`} key={id}>
            <span className="font-bold text-xl">{title}</span>
            <span className="block">Posted by: {users?.username}</span>
            </Link>)}
        </div>
    )
}

export default HomePosts