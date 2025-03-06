import { onAuthStateChanged } from "firebase/auth";
import { createContext, ReactNode, useEffect, useState } from "react";
import { auth } from "../services/firebase";

type AuthContextData = {
    signed: boolean;
    loadingAuth: boolean;
}

type UserProps = {
    uid: string;
    name: string | null;
    email: string | null;
}

export const AuthContext = createContext({} as AuthContextData);

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
        
    },[])

    return (
        <AuthContext.Provider value={{ signed: !!user, loadingAuth}}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;