
import { createClient } from "@/utils/supabase/browser-client";
import { type QueryData } from "@supabase/supabase-js"

export const getHomePosts = async (supabase: ReturnType<typeof createClient>) => {
   return await supabase.from('posts')
        .select('title, id, slug, users("username"), image')
        .order('created_at', { ascending: false })
}

export const getSinglePost = async (slug: string) => {
    const supabase = createClient()

    return await supabase.from('posts')
        .select('id, title, content, slug, users("username"), user_id, image')
        .eq('slug', slug)
        .single()
}

export const getPostComments = async (postId: number) => {
     const supabase = createClient()

    return await supabase.from('comments')
        .select('id, users("username"), content')
        .eq('post_id', postId)
        .order('created_at', { ascending: false })
}

export const searchPosts = async(searchTerm: string) => {
    const supabase = createClient()
    return await 
        supabase.from('posts')
                .select('title, slug')
                .textSearch('title', searchTerm)

}

export type HomePostsType = QueryData<ReturnType<typeof getHomePosts>>