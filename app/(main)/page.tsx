import { getHomePosts } from '@/utils/supabase/queries'
import { createClient } from '@/utils/supabase/server-client'
import Link from 'next/link';

export const revalidate = 600;

export default async function Home() {
  const supabase = await createClient()
  const { data, error } = await getHomePosts(supabase)
  let latestPost, latestPosts;

  if (data) {
    latestPost = data.shift()
    latestPosts = data.splice(0, 3)
  }

  return (
    <div className="flex flex-wrap m-4 gap-4">

      {
        latestPost &&
        <>
          <h3 className="w-full font-bold text-2xl">Latest Posts</h3>
          <Link href={`/${latestPost.slug}`} className="md:w-[calc(50%-8px)] border-black border-1 rounded-xl">
            {latestPost.image && <img src={latestPost.image} height="auto" width="100%" className="rounded-2xl" />}
            <p className="font-bold text-xl p-4">{latestPost.title}</p>
            <p className="block p-4">Posted by: {latestPost.users?.username}</p>
          </Link>
        </>
      }
      {latestPosts &&

        <div className="md:w-[calc(50%-8px)] grow-1 shrink-1 flex flex-col gap-2">
          {latestPosts && latestPosts.map(({ id, title, slug, users, image }) =>
            <Link className="flex border-black border-1 rounded-xl p-4 grow-1" href={`/${slug}`} key={id}>
              <div className="w-[25%]">
                {image && <div className="bg-cover bg-center w-full h-full" style={{ backgroundImage: `url(${image})` }} />}
              </div>
              <div className="ml-4 flex flex-col justify-between">
                <span className="font-bold text-xl">{title}</span>
                <span className="block">Posted by: {users?.username}</span>
              </div>
            </Link>)}
        </div>
      }

      {data && <div className="md:w-full grow-1 shrink-1 flex flex flex-wrap gap-2">
        <h3 className="w-full font-bold text-2xl">All Posts</h3>
        {data && data.map(({ id, title, slug, users, image }) =>
          <Link className="flex md:w-[calc(50%-8px)] border-black border-1 rounded-xl p-4 grow-1" href={`/${slug}`} key={id}>
            <div className="w-[25%]">
              {image && <div className="bg-cover bg-center w-full h-full" style={{ backgroundImage: `url(${image})` }} />}
            </div>
            <div className="ml-4 flex flex-col justify-between">
              <span className="font-bold text-xl">{title}</span>
              <span className="block">Posted by: {users?.username}</span>
            </div>
          </Link>)}
      </div>
      }
    </div>
  );
}
