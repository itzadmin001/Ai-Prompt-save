
function LoadingPage() {
    return (
        <div style={{
            background: "var(--bg-color)",
            color: "var(--text-color)",

        }} className="w-full flex items-center justify-center  h-full fixed top-0 z-100  text-black ">
            <h1 className=" text-2xl  font-bold">Loading...</h1>
        </div>
    )
}

export default LoadingPage
