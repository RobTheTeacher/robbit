import Link from "next/link";

const AuthLayout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <>
             <header className="flex border-b-4 border-b-gray-950 pb-4 items-center justify-between">
            <Link className="button-primary" href="/">Robbit</Link>
            </header>
            {children}
        </>
    )
}

export default AuthLayout