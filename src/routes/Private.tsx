import { ReactNode } from "react"
import { useAuth } from "../context/AuthContext"
import { Navigate } from "react-router-dom"

export const Private = ({ children }: { children: ReactNode }): any => {
    const { signed, loadingAuth } = useAuth()

    if (loadingAuth) {
        return <div>loading</div>
    }

    if (!signed) {
        return <Navigate to="/login" />
    }

    return children;
};