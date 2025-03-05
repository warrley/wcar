export const Button = ({ label }: {label: string}) => {
    return (
        <button  className="drop-shadow-lg bg-sky-500 h-9 px-8 rounded-lg text-white text-lg font-medium">
            {label}
        </button>
    )
}