import { Circle } from "lucide-react"

export const CarHome = () => {
    return (
        <section className="bg-white rounded-lg flex flex-col hover:scale-110 duration-300">
          <img className="rounded-lg" src="https://revistafullpower.com.br/wp-content/uploads/2019/03/au01.jpg" alt="" />

          <div className="p-3">
            <p className="font-bold text-xl">Audi R8</p>

            <div className="flex items-center gap-1 mb-4">
              <p>2016/2017 </p>
                <Circle size={5} fill="currentColor"/>
              <p>2699km</p>
            </div>

            <h2 className="text-xl font-semibold">R$239.000</h2>
          </div>
            <p className="p-2 border-t">São Paulo - SP</p>
        </section>
    )
}