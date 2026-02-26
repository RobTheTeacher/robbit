import Link from "next/link"
import Search from "./Search"
import AccountLinks from "./AccountLinks"

const Header = () => {
    return (
        <header className="flex border-b-4 border-b-gray-950 pb-4 items-center justify-between relative">
            <Link className="button-primary" href="/">Robbit</Link>
            <Search />
            <AccountLinks />
        </header>
    )
}
export default Header