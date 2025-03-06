import { Link } from "react-router-dom"
import { signOut } from "firebase/auth"
import { auth } from "../services/firebase"

export const PanelHeader = () => {
    const handleLogout = async () => {
        await signOut(auth)
    }

    return (
        <div className="bg-blue-500 mb-4 w-full flex items-center rounded-lg font-medium gap-4 py-4 px-4 justify-between">
            <div className="flex gap-4 text-white">
                <Link to="/dashboard">Dasboard</Link>
                <Link to="/dashboard/new">Register car</Link>
            </div>

            <button className="text-white" onClick={handleLogout}>Logout</button>
        </div>
    )
}