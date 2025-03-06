import { LogIn, User } from "lucide-react";
import { Link } from "react-router-dom";
import { Logo } from "./logo";
import { useAuth } from "../context/AuthContext";

export const Header = () => {
    const { loadingAuth, signed } = useAuth();

    return (
        <div className="w-full drop-shadow-xl rounded-b-3xl mb-4 bg-white flex items-center justify-center">
            <header className="flex items-center w-full max-w-7xl justify-between px-4 py-2">
                <Link to="/">
                    <Logo/>
                </Link>

                {!loadingAuth && signed && 
                    <Link to="/dashboard">
                        <div className="border-2 rounded-full p-2 border-gray-600">
                            <User size={24} color="black"/>
                        </div>
                    </Link>
                }

                {!loadingAuth && !signed && 
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