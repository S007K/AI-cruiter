
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import UserContext from "@/Context/UserContext"
import { UserLogin } from "@/Service/ServiceAPI"
import {useContext, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "sonner"

export function Signin() {

  const {setUser}=useContext(UserContext)
  const [data, setData] = useState({})
  const navigate=useNavigate()
  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    const name = e.target.name
    
    setData((prev) => {
      return {
        ...prev,
      [name]:value
      }
    })
  }

  const handleSubmit =async () =>{
    
      console.log(data)
      const response =await UserLogin(data)
      console.log(response)
      if (response.result === "fail") {
        toast.error(response.message)

      }
      else {
        toast.success(response.message)
        console.log(response)
        setUser({
          ...response.data,
          isLoggedIn:true
        })
        localStorage.setItem("id",response.data._id)
        navigate("/dashboard")
      }
    
  }


  return (
    <div className=" h-content w-full justify-center items-center flex">

    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input onChange={handleChange}
              id="email"
                type="email"
                name="email"
              placeholder="m@example.com"
              required
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
              <Link to="/" className="ml-auto inline-block text-sm underline">
                Forgot your password?
              </Link>
            </div>
            <Input onChange={handleChange} id="password" name="password" type="password" required />
          </div>
          <Button type="submit" className="w-full" onClick={handleSubmit}>
            Login
          </Button>
          <Button variant="outline" className="w-full">
            Login with Google
          </Button>
        </div>
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link to="/auth/sign-up" className="underline">
            Sign up
          </Link>
        </div>
      </CardContent>
    </Card>
              </div>
  )
}
