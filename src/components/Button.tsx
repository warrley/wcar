export const Button = ({ label }: {label: string}) => {
    return (
        <button
            className="drop-shadow-lg bg-sky-500 h-9 border-2 border-sky-600 hover:bg-sky-600 duration-300 py-5 flex items-center justify-center px-8 rounded-lg text-white text-lg font-medium w-full">
            {label}
        </button>
    )
}