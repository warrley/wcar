import { Button } from "../components/Button"
import { Input } from "../components/Input"
import { CarHome } from "../components/CarHome"

export const Home = () => {
  return (
    <div>
      <section className="bg-white drop-shadow-lg p-4 rounded-lg w-full max-w-3xl mx-auto flex items-center justify-center gap-2">
        <div className="flex-[2]">
          <Input placeholder="Enter a car"/>
        </div>
        <div className="flex-1">
          <Button label="Search"/>
        </div>
      </section>

      <h1 className="font-bold text-center mt-6 text-2xl mb-4">
        New and used cars throughout Brazil
      </h1>

      <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <CarHome/>
        <CarHome/>
        <CarHome/>
      </main>
    </div>
  )
}