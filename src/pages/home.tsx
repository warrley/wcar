import { Button } from "../components/Button"
import { Input } from "../components/Input"
import { CarHome } from "../components/CarHome"
import { useEffect, useState } from "react"
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../services/firebase";

interface CarsProps{
  id: string;
  name: string;
  year: string;
  km: string;
  price: string | number;
  city: string;
  uid: string;
  images: ImageProps[];
}

export interface ImageProps {
  uid: string;
  name: string;
  url: string;
}

export const Home = () => {
  const [cars, setCars] = useState<CarsProps[]>([]);

  useEffect(() => {

    const loadCars = async () => {
      const carsRef = collection(db, "cars");
      const queryRef = query(carsRef, orderBy("created", "desc"));

      getDocs(queryRef)
        .then((snapshot) => {
          let carList = [] as CarsProps[];
          snapshot.forEach(doc => {
            carList.push({
              id: doc.id,
              name: doc.data().name,
              year: doc.data().year,
              km: doc.data().km,
              city: doc.data().city,
              price: doc.data().price,
              images: doc.data().images,
              uid: doc.data().uid
            })
          })

          setCars(carList);
        })
    };

    loadCars();

  },[])

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
        {cars.map(car => (
          <CarHome
            key={car.id}
            id={car.id}
            name={car.name}
            year={car.year}
            km={car.km}
            city={car.city}
            price={car.price}
            images={car.images}
          />
        ))}
      </main>
    </div>
  )
}