import { Circle } from "lucide-react"
import { ImageProps } from "../pages/home";
import { Link } from "react-router-dom";
import { useState } from "react";

interface CarProps{
  name: string;
  id: string;
  year: string | number;
  km: string | number;
  city: string;
  price: string | number;
  images: ImageProps[];
}

export const CarHome = ({ name, id, year, km, city, price, images }: CarProps) => {
  const [loadImg, setLoadImg] = useState<string[]>([]);

  const handleImageLoad = (id: string) => {
    setLoadImg((prevImg) => [...prevImg, id]);
  }

  return (
    <Link to={`/car/:${id}`}>
      <section className="bg-white rounded-lg flex flex-col hover:scale-110 duration-300">
        <div className="w-full h-80 rounded-lg bg-slate-200" style={{ display: loadImg.includes(id) ? "none" : "block"}}></div>
        <img className="rounded-lg h-80 object-cover" style={{ display: loadImg.includes(id) ? "block" : "none"}} src={images[0].url} alt={name} onLoad={() => handleImageLoad(id)}/>

        <div className="p-3">
        <p className="font-bold text-xl">{name}</p>

          <div className="flex items-center gap-1 mb-4">
          <p>{year}</p>
              <Circle size={5} fill="currentColor"/>
          <p>{km}</p>
          </div>

        <h2 className="text-xl font-semibold">
          R$ {price}
        </h2>
      </div>
      <p className="p-2 border-t">{city}</p>
      </section>
    </Link>
  )
}