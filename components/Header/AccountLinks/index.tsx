
import { createClient } from "@/utils/supabase/server-client"
import Link from "next/link"
import LogOutButton from "../LogOut";
import CreateButton from "../CreateButton";

const AccountLinks = async () => {

    const supabase = await createClient()
    const { data: {user} } = await supabase.auth.getUser();

   
    return (
        <>
            {user ? <div className="flex gap-2"><LogOutButton />
                <CreateButton />
            </div>
                : <Link className="button-secondary" href="/auth/login">Log In</Link>
            }
        </>
    )
}

export default AccountLinks