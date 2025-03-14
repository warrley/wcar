import { Trash2, Upload } from "lucide-react"
import { PanelHeader } from "../components/panel-header"
import { z } from "zod"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { ChangeEvent, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { v4 as uuidV4 } from 'uuid';
import { db, storage } from "../services/firebase";
import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";
import toast from "react-hot-toast";

const schema = z.object({
  name: z.string().nonempty("The name field is required"),
  model: z.string().nonempty("The model field is required"),
  year: z.string().nonempty("The year of the car is required"),
  km: z.string().nonempty("The KM of the car is required"),
  price: z.string().nonempty("The price field is required"),
  city: z.string().nonempty("The city field is required"),
  whatsapp: z.string().min(1, "The city field is required").refine((value) => /^(\d{10,12})$/.test(value), {
    message: "Invalid phone number."
  }),
  description: z.string().nonempty("The description field is required")
})

type FormData = z.infer<typeof schema>;

type ImageProps = {
  uid: string;
  name: string;
  previewUrl: string;
  url: string;
}

export const New = () => {
  const { user } = useAuth();
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange"
  });
  const [images, setImages] = useState<ImageProps[]>([]);

  const handleFile = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const image = e.target.files[0]

      if (image.type === 'image/jpeg' || image.type === 'image/jpg' || image.type === 'image/png') {
        await handleUpload(image);
      } else {
        alert("Send JPEG or PNG file");
        return;
      }
    }
  }

  const handleUpload = async (image: File) => {
    if (!user?.uid) {
      return;
    }

    const currentUid = user?.uid;
    const uidImage = uuidV4();

    const uploadRef = ref(storage, `images/${currentUid}/${uidImage}`);

    uploadBytes(uploadRef, image)
      .then((snapshot) => {
        getDownloadURL(snapshot.ref).then((donwloadUrl) => {
          const Image = {
            name: uidImage,
            uid: currentUid,
            previewUrl: URL.createObjectURL(image),
            url: donwloadUrl
          };

          setImages(prev => [...prev, Image])
        });
    })
  }

  const handleDeleteImage = async (item: ImageProps) => {
    const imagePath = `images/${item.uid}/${item.name}`;

    const imageRef = ref(storage, imagePath);

    try {
      await deleteObject(imageRef);
      setImages(prev => prev.filter((car) => car.name !== item.name))
    } catch (err) {
      console.log("ERRO AO DELETAR")
      console.log(err);
    }
  }

  const onSubmit = (data: FormData) => {
    if (images.length < 1) {
      toast.error("⚠️ Send an image of this car");
      return;
    };

    const carListImages = images.map(car => ({
      uid: car.uid,
      name: car.name,
      url: car.url
    }));

    addDoc(collection(db, "cars"), {
      name: data.name.toUpperCase(),
      model: data.model,
      whatsapp: data.whatsapp,
      city: data.city,
      year: data.year,
      km: data.km,
      price: data.price,
      description: data.description,
      created: new Date(),
      owner: user?.name,
      uid: user?.uid,
      images: carListImages
    })
      .then(() => {
        reset();
        setImages([]);
        toast.success("Car registered successfully");
      })
      .catch((err) => {
        toast.success("Error registering the car")
        console.log(err);
      })
  };

  return (
    <div>
      <PanelHeader />
      
      <div className="bg-white w-full flex flex-col sm:flex-row rounded-lg items-center p-3 gap-2">
        <button className="border-2 w-48 rounded-lg flex items-center justify-center cursor-pointer border-gray-600 h-32 md:48">
          <div className="absolute cursor-pointer">
            <Upload size={30} color="black"/>
          </div>
          <div className="cursor-pointer ">
            <input className="h-32 w-full opacity-0 bg-red-500 cursor-pointer" onChange={handleFile} type="file" accept="image/*"/>
          </div>
        </button>

        {images.map(img => (
          <div key={img.name} className="w-full h-32 flex items-center justify-center relative">
            <img
              src={img.previewUrl}
              className="rounded-lg h-32 w-full object-cover"
              alt="car photo"
            />
            <div className="absolute bg-zinc-900/40 p-4 rounded-full cursor-pointer text-white hover:scale-110 duration-300" onClick={() => handleDeleteImage(img)}>
              <Trash2 size={28}/>
            </div>
          </div>
        ))}
      </div>

      <div className="w-full bg-white p-3 rounded-lg flex flex-col sm:flex-row items-center gap-2 mt-2">
        <form
          className="w-full"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="mb-3">
            <p className="mb-2 font-medium">Car name</p>
            <Input
              register={register}
              name="name"
              errors={errors.name?.message}
              placeholder="Ex: Onix..."
            />
          </div>

          <div className="mb-3">
            <p className="mb-2 font-medium">Car Model</p>
            <Input
              register={register}
              name="model"
              errors={errors.model?.message}
              placeholder="Ex: 1.0 Flex Manual..."
            />
          </div>

          <div className="flex w-full mb-3 gap-4">
            <div className="flex-1">
              <p className="mb-2 font-medium">Year</p>
              <Input
                register={register}
                name="year"
                errors={errors.year?.message}
                placeholder="Ex: 2016/2017..."
              />
            </div>
            
            <div className="flex-1">
              <p className="mb-2 font-medium">Kilometers Driven</p>
              <Input
                register={register}
                name="km"
                errors={errors.km?.message}
                placeholder="Ex: 23.900..."
              />
            </div>
          </div>

          <div className="flex w-full mb-3 gap-4">
            <div className="flex-1">
              <p className="mb-2 font-medium">Phone / Whatsapp</p>
              <Input
                register={register}
                name="whatsapp"
                errors={errors.whatsapp?.message}
                placeholder="Ex: 89981134259..."
              />
            </div>
            
            <div className="flex-1">
              <p className="mb-2 font-medium">City</p>
              <Input
                register={register}
                name="city"
                errors={errors.city?.message}
                placeholder="Ex: Francisco Santos - PI..."
              />
            </div>
          </div>

          <div className="flex-1">
            <p className="mb-2 font-medium">Price</p>
            <Input
              register={register}
              name="price"
              errors={errors.price?.message}
              placeholder="Ex: R$ 69.000..."
            />
          </div>

          <div className="mb-3">
            <p className="mb-2 font-medium">Description</p>
            <textarea
              className="border-2 w-full rounded-lg h-24 px-2"
              {...register("description")}
              name="description"
              id="description"
              placeholder="Enter the complete description about the car..."
            />
            {errors.description && <p className="mb-1 text-red-500">{errors.description.message}</p>}
          </div>

          <div className="w-full">
            <Button label="Resgister"/>
          </div>
        </form>
      </div>
    </div>
  )
}