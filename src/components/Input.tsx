import { RegisterOptions, UseFormRegister } from "react-hook-form";

type InputProps = {
    placeholder?: string;
    type?: string;
    name?: string;
    register?: UseFormRegister<any>;
    errors?: string;
    rules?: RegisterOptions;
};

export const Input = ({ placeholder, type = "text", name, register, errors, rules }: InputProps) => {
    return (
        <div>
            <input
                className="drop-shadow-lg text-lg w-full py-5 border-2 border-sky-500 rounded-lg h-9 px-3 outline-none"
                placeholder={placeholder}
                type={type}
                {...(register && name ? register(name, rules) : {})}
                id={name}
            />
            {errors && <p className="text-red-500">{errors}</p>}
        </div>
    );
};
