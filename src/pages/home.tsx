import { Button } from "../components/Button"
import { Input } from "../components/Input"
import { CarHome } from "../components/CarHome"

export const Home = () => {
  return (
    <div>
      <section className="bg-white drop-shadow-lg p-4 rounded-lg w-full max-w-3xl mx-auto flex items-center justify-center gap-2">
        <Input placeholder="Enter a car"/>
        <Button label="Search"/>
      </section>

      <h1 className="font-bold text-center mt-6 text-2xl mb-4">
        New cars and used in all th Brazil
      </h1>

      <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <CarHome/>
        <CarHome/>
        <CarHome/>
      </main>
    </div>
  )
}