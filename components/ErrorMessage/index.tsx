const ErrorMessage = ({ error }: { error: string }) => {
    return <>
        {error !== "NEXT_REDIRECT" && <div className="text-red-500">{error}</div>}
    </>
}

export default ErrorMessage