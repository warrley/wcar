import { collection, getDocs, query, where } from "firebase/firestore";
import { CarHome } from "../components/CarHome"
import { CarsProps, useCar } from "../context/CarContex"
import { useEffect, useState } from "react"
import { db } from "../services/firebase";

export const Home = () => {
  const { cars, setCars, loadCars} = useCar();
  const [input, setInput] = useState("");

  useEffect(() => {

  }, [])
  
  const handleSearch = async () => {
    if (input === '') {
      loadCars();
      return;
    }
    setCars([]);

    const q = query(collection(db, "cars"),
      where("name", ">=", input.toUpperCase()),
      where("name", "<=", input.toUpperCase() + "\uf8ff")
    );

    const querySnaphsot = await getDocs(q);

    let carList = [] as CarsProps[];

    querySnaphsot.forEach(doc => {
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
    });

    setCars(carList);
    setInput('');
  }

  return (
    <div>
      <form className="bg-white drop-shadow-lg p-4 rounded-lg w-full max-w-3xl mx-auto flex items-center justify-center gap-2" onSubmit={(e) => { e.preventDefault(); handleSearch; }}>
        <input
          className="drop-shadow-lg text-lg w-full py-5 border-2 border-sky-500 rounded-lg h-9 px-3 outline-none"
          placeholder="Enter a car..."
          value={input}
          onChange={e => setInput(e.target.value)}
        />
        <button
          className="drop-shadow-lg w-full bg-sky-500 h-9 border-2 border-sky-600 hover:bg-sky-600 duration-300 py-5 flex items-center justify-center rounded-lg text-white text-lg font-medium"
          onClick={handleSearch}
          type="submit"
        >
          Search
        </button>
      </form>

      <h1 className="font-bold text-center mt-6 text-2xl mb-4">
        New and used cars throughout Brazil
      </h1>

      <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cars.map(car => (
          <CarHome
            key={car.name}
            car={car}
          />
        ))}
      </main>
    </div>
  )
}