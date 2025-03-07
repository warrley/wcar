import { Outlet } from "react-router-dom"
import { Header } from "./header"

export const Layout = () => {
  return (
    <div className="select-none">
      <Header />
      <div className="w-full max-w-7xl px-4 mx-auto">
        <Outlet />
      </div>
      <div className="w-full max-w-7xl px-4 mx-auto border-t mt-5">
          <h1 className="text-sky-500/60 text-center"><a href="https://github.com/warrley" target="_blank">by warleyfarias</a></h1>
      </div>
    </div>
  )
}