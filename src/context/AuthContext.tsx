import { onAuthStateChanged } from "firebase/auth";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { auth } from "../services/firebase";

type AuthContextData = {
    signed: boolean;
    loadingAuth: boolean;
    handleInfoUser: ({ name, uid, email }: UserProps) => void;
    user: UserProps | null;
}

type UserProps = {
    uid: string;
    name: string | null;
    email: string | null;
}

export const AuthContext = createContext({} as AuthContextData);
export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<UserProps | null>(null);
    const [loadingAuth, setLoadingAuth] = useState(true);

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser({
                    uid: user.uid,
                    name: user?.displayName,
                    email: user?.email
                });
                setLoadingAuth(false);
            } else {
                setUser(null);
                setLoadingAuth(false);
            }
        })

        return () => {
            unsub();
        }
        
    }, [])
    
    const handleInfoUser = ({ name, email, uid }: UserProps) => {
        setUser({
            name,
            email,
            uid
        })
    }

    return (
        <AuthContext.Provider value={{ signed: !!user, loadingAuth, handleInfoUser, user}}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;