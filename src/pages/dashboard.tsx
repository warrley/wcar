import { PanelHeader } from "../components/panel-header"
import { CarDashboard } from "../components/CarDasboard";
import { useEffect, useState } from "react";
import { collection, deleteDoc, doc, getDocs, query, where } from "firebase/firestore";
import { CarsProps } from "../context/CarContex";
import { useAuth } from "../context/AuthContext";
import { db, storage } from "../services/firebase";
import { deleteObject, ref } from "firebase/storage";

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
  
  const handleDelete = async (car: CarsProps) => {
    const docRef = doc(db, "cars", car.id);
    await deleteDoc(docRef);

    car.images.map(async (img) => {
      const imagePath = `image/${img.uid}/${img.name}`;
      const imageRef = ref(storage, imagePath);

      try {
        await deleteObject(imageRef);
      } catch {
        console.log("erro ao excluir");
      }
    })

    setUserCars(prev => prev.filter(c => c.id !== car.id));
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