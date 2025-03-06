import { PanelHeader } from "../components/panel-header"
import { CarDashboard } from "../components/CarDasboard";
import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { CarsProps } from "../context/CarContex";
import { useAuth } from "../context/AuthContext";
import { db } from "../services/firebase";

export const Dasboard = () => {
  const [cars, setCars] = useState<CarsProps[]>([]);
  const { user } = useAuth()

  useEffect(() => {
    const loadCars = async () => {
      if (!user?.uid) return;

      const carsRef = collection(db, "cars");
      const queryRef = query(carsRef, where("uid", "==", user.uid));

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

  },[user])

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