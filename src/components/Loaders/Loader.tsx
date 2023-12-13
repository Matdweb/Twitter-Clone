import { LuLoader2 } from "react-icons/lu";

function Loader({ className }: { className?: string }) {
    return (
        <div className={`${className} flex justify-center items-center animate-spin`}>
            <LuLoader2 style={{ fontSize: "2rem" }} />
        </div>
    )
}

export default Loader