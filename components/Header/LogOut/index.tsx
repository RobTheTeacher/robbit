'use client'
import { LogOut } from "@/actions/log-out"

const LogOutButton = () => {
    return <button onClick={() =>LogOut()} className="button-secondary">Log out</button>
}

export default LogOutButton