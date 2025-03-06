import { PanelHeader } from "../components/panel-header"
import { useCar } from "../context/CarContex"
import { CarDashboard } from "../components/CarDasboard";

export const Dasboard = () => {
  const { cars } = useCar();

  return (
    <div>
      <PanelHeader />
      
      <main className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {cars.map(car => (
          <CarDashboard
            key={car.name}
            car={car}
          />
        ))}
      </main>

    </div>
  )
}