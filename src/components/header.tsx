import { LogIn, User } from "lucide-react";
import { Link } from "react-router-dom";

export const Header = () => {
    const signed = false;
    const loadingAuth = true;

    return (
        <div className="w-full drop-shadow-xl rounded-b-3xl mb-4 bg-white flex items-center justify-center">
            <header className="flex items-center w-full max-w-7xl justify-between px-4 py-2">
                <Link to="/">
                    <h1 className="text-zinc-900 font-bold text-7xl">W<span className="bg-gradient-to-r from-sky-400 to-blue-500 bg-clip-text text-transparent -ml-3">Car</span></h1>
                </Link>

                {!loadingAuth && signed && 
                    <Link to="/dashboard">
                        <div className="border-2 rounded-full p-2 border-gray-600">
                            <User size={24} color="black"/>
                        </div>
                    </Link>
                }

                {loadingAuth && !signed && 
                    <Link to="/login">
                        <div className="border-2 rounded-full p-2 border-gray-600">
                            <LogIn size={24} color="black"/>
                        </div>
                    </Link>
                }
           </header>
        </div>
    )
}