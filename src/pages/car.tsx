import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { CarsProps } from "../context/CarContex";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../services/firebase";
import { MessageCircle } from "lucide-react";
import { Swiper, SwiperSlide } from 'swiper/react'

type CarData = CarsProps & {
  model: string;
  created: string;
  owner: string;
  description: string;
  whatsapp: string| number;
}

export const CarDetail = () => {
  const { id } = useParams();
  const [car, setCar] = useState<CarData>();
  const [slider, setSlider] = useState<number>(2);
  const navigate = useNavigate();

  useEffect(() => {
    const loadCar = async () => {
      if (!id) return;

      const docRef = doc(db, "cars", id);
      getDoc(docRef)
        .then((snapshot) => {

          if (!snapshot.data()) {  
            navigate("/");
          }
          
          setCar({
            ...snapshot.data() as CarData,
            id: snapshot.id
          })
        })
        .catch((err) => {
        console.log(err)
        })
    }

    loadCar();
  }, [id])

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 720) {
        setSlider(1);
      } else {
        setSlider(2)
      }
    }

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  },[])

  return (
    <div>
      <div>
        <Swiper
          slidesPerView={slider}
          pagination={{ clickable: true }}
          navigation
        >
          {car?.images.map(img => (
            <SwiperSlide key={img.name}>
              <img
                src={img.url}
                className="w-full h-96 object-cover"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="w-full bg-white rounded-lg p-6 my-4">
        <div className="flex flex-col sm:flex-row mb-4 items-center justify-between">
          <h1 className="font-bold text-3xl text-black">{car?.name}</h1>
          <h1 className="font-bold text-3xl text-black">R$ {car?.price}</h1>
        </div>

        <p className="text-">{car?.model}</p>
        
        <div className="flex w-full gap-6 mt-4">
          <div className="flex flex-col gap-4">
            <div>
              <p>City</p> <strong>{car?.city}</strong>
            </div>
            <div>
              <p>Year</p> <strong>{car?.year}</strong>
            </div>
          </div>

          <div>
            <p>KM</p> <strong>{car?.km}</strong>
          </div>
        </div>
          <strong>Description:</strong>
        <p className="mb-4">{car?.description}</p>
        
        <strong>Phone / Whatsapp</strong>
        <p>{car?.whatsapp}</p>

        <a className="bg-green-500 w-full text-center flex items-cetne justify-center gap-2 py-2 rounded-lg text-xl font-medium cursor-pointer text-white" target="_blank" href={`https://api.whatsapp.com/send?phone=55${car?.whatsapp}&text=Hi, i want more informations about this ${car?.name}`}>Talk to the seller <MessageCircle/></a>
      </div>
    </div>
  )
}