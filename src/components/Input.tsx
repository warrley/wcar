type InputProps = {
    placeholder?: string;
    type?: string;
}

export const Input = ({ placeholder, type }: InputProps) => {
    return (
        <input type={type ? type : "text"}  className="drop-shadow-lg text-lg w-full border-2 border-sky-500 rounded-lg h-9 px-3 outline-none" placeholder={placeholder} />
    )
}