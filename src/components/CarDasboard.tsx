import { Circle, Trash2 } from "lucide-react"
import { CarsProps } from "../context/CarContex"
import { useState } from "react";
import { Link } from "react-router-dom";

export const CarDashboard = ({ car, handleDelete }: { car: CarsProps, handleDelete: (car: CarsProps) => void }) => {
    const [loadImg, setLoadImg] = useState<string[]>([]);
    
    const handleImageLoad = (id: string) => {
        setLoadImg((prevImg) => [...prevImg, id]);
    }

    return (
        <Link to={`/car/${car.id}`}>
            <section className="bg-white rounded-lg flex flex-col hover:scale-110 duration-300 relative">
                <div className="absolute right-3 top-3 hover:scale-125 duration-300 cursor-pointer p-3 text-white bg-gray-800/50 rounded-full" onClick={() => handleDelete(car)}>
                    <Trash2 size={26}/>
                </div>
                <div className="w-full h-80 rounded-lg bg-slate-200" style={{ display: loadImg.includes(car.id) ? "none" : "block"}}></div>
                <img className="rounded-lg h-80 object-cover" style={{ display: loadImg.includes(car.id) ? "block" : "none"}} src={car.images[0].url} alt={car.name} onLoad={() => handleImageLoad(car.id)}/>

                <div className="p-3">
                <p className="font-bold text-xl">{car.name}</p>

                    <div className="flex items-center gap-1 mb-4">
                    <p>{car.year}</p>
                        <Circle size={5} fill="currentColor"/>
                    <p>{car.km} km</p>
                    </div>

                <h2 className="text-xl font-semibold">
                    R$ {car.price}
                </h2>
                </div>
                <p className="p-2 border-t">{car.city}</p>
            </section>
        </Link>
    )
}