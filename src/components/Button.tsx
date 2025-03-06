export const Button = ({ label, onClick }: { label: string, onClick?: () => void }) => {
    return (
        <button
            className="drop-shadow-lg bg-sky-500 h-9 border-2 w-full border-sky-600 hover:bg-sky-600 duration-300 py-5 flex items-center justify-center rounded-lg text-white text-lg font-medium px-20"
            onClick={onClick}
        >
            {label}
        </button>
    )
}