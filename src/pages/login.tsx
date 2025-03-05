import { Link } from "react-router-dom"
import { Logo } from "../components/logo"
import { Input } from "../components/Input"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "../components/Button"

const schema = z.object({
  email: z.string().email("Enter a valid email").nonempty("The email field is required"),
  password: z.string().nonempty("The password field is required")
})

type FormData = z.infer<typeof schema>

export const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange"
  });

  const onSubmit = (data: FormData) => {
    console.log(data)
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