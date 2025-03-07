import { Link, useNavigate } from "react-router-dom"
import { Logo } from "../components/logo"
import { Input } from "../components/Input"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "../components/Button"
import { signInWithEmailAndPassword, signOut } from "firebase/auth"
import { auth } from "../services/firebase"
import { useEffect } from "react"
import toast from "react-hot-toast"

const schema = z.object({
  email: z.string().email("Enter a valid email").nonempty("The email field is required"),
  password: z.string().nonempty("The password field is required")
})

type FormData = z.infer<typeof schema>

export const Login = () => {
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange"
  });

  useEffect(() => {
    const handleLogout = async () => {
      await signOut(auth);
    }

    handleLogout();
  }, [])

  const onSubmit = (data: FormData) => {
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((user) => {
        console.log("logado");
        console.log(user);
        toast.success("Successfully logged in");
        navigate("/dashboard", {replace: true});
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error logging in");
    })
  }

  return (
    <div className="w-full min-h-screen flex justify-center items-center flex-col gap-4">
      <Link to="/" className="mb-6 max-w-sm w-full text-center">
        <Logo/>
      </Link>

      <form
        className="bg-white max-w-xl w-full rounded-lg p-4 flex flex-col gap-2"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          type="email"
          placeholder="Enter your email"
          name="email"
          errors={errors.email?.message}
          register={register}
        />

        <Input
          type="password"
          placeholder="Enter your password"
          name="password"
          errors={errors.password?.message}
          register={register}
        />

        <Button label="Acess"/>
      </form>

      <Link to="/register">
        <p className="text-xl">Don't have an account yet? <b>Sign up</b></p>
      </Link>
    </div>
  )
}