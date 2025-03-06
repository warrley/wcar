import { PanelHeader } from "../components/panel-header"
import { CarDashboard } from "../components/CarDasboard";
import { useEffect, useState } from "react";
import { collection, deleteDoc, doc, getDocs, query, where } from "firebase/firestore";
import { CarsProps } from "../context/CarContex";
import { useAuth } from "../context/AuthContext";
import { db } from "../services/firebase";

export const Dasboard = () => {
  const [userCars, setUserCars] = useState<CarsProps[]>([]);
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

          setUserCars(carList);
        })
    };

    loadCars();

  }, [user])
  
  const handleDelete = async (id: string) => {
    const docRef = doc(db, "cars", id);
    await deleteDoc(docRef);
    setUserCars(prev => prev.filter(car => car.id !== id))
  }

  return (
    <div>
      <PanelHeader />
      
      <main className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {userCars.map(car => (
          <CarDashboard
            key={car.name}
            car={car}
            handleDelete={handleDelete}
          />
        ))}
      </main>

    </div>
  )
}