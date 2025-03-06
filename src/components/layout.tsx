import { Outlet } from "react-router-dom"
import { Header } from "./header"

export const Layout = () => {
  return (
    <div className="select-none">
      <Header />
      <div className=" w-full max-w-7xl px-4 mx-auto">
        <Outlet />
      </div>
    </div>
  )
}