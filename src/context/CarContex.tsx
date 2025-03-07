import { createContext, ReactNode, useContext } from "react";
import { useEffect, useState } from "react"
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../services/firebase";

type CarContexData = {
  cars: CarsProps[];
  setCars: (car: CarsProps[]) => void;
  loadCars: () => void;
}

export interface CarsProps{
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

export const CarContext = createContext({} as CarContexData);
export const useCar = () => useContext(CarContext);

export const CarProvider = ({ children }: { children: ReactNode }) => {
  const [cars, setCars] = useState<CarsProps[]>([]);
  
  useEffect(() => {
    loadCars();

  }, [])
  
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

  return (
    <CarContext.Provider value={{ cars, setCars, loadCars }}>
      {children}
    </CarContext.Provider>
  );
};