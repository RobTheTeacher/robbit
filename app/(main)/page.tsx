import { getHomePosts } from '@/utils/supabase/queries'
import { createClient } from '@/utils/supabase/server-client'
import Link from 'next/link';

export const revalidate = 600;

export default async function Home() {
  const supabase = await createClient()
  const { data, error } = await getHomePosts(supabase)

  return (
    <div className="">
      {data && <div className="">
            {data && data.map(({id, title, slug, users}) => <Link className="block border-black border-1 rounded-xl p-4 mt-2" href={`/${slug}`} key={id}>
            <span className="font-bold text-xl">{title}</span>
            <span className="block">Posted by: {users?.username}</span>
            </Link>)}
        </div>}
    </div>
  );
}
