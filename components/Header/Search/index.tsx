'use client'
import { searchPosts } from "@/utils/supabase/queries"
import { useQuery } from "@tanstack/react-query"
import Link from "next/link"
import { SetStateAction, useState } from "react"

const Search = () => {
    const [input, setInput] = useState<string>('')

    const handleChange = (e: { target: { value: SetStateAction<string> } }) => {
        setInput(e.target.value)
    }
    const { data, error } = useQuery({
        queryKey: ['searchPosts', input],
        queryFn: async () => {
            const { data, error } = await searchPosts(input)
            if (error) throw new Error
            return data;
        },
        enabled: () => input && input.length > 3 ? true : false
    })

    return (
        <>
            <div className="relative">
                <input onChange={handleChange} className="border-black border-1 rounded p-2" placeholder="Search posts ..." id="search" value={input} />
                {data &&
                    <div onClick={() => setInput("")} className="bg-white w-full absolute top-[48px] p-2 flex flex-col border rounded top-6 z-10"> {data.map(item => <Link key={item.slug} href={`/${item.slug}`}>{item.title}</Link>)}</div>
                }

            </div>
        </>
    )
}

export default Search