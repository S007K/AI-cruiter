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
import { saveUser } from "@/Service/ServiceAPI"
import { userDataType } from "@/types"
import { useContext, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "sonner"

const Signup = () => {
  const {setUser}  =useContext(UserContext)
  const [data, setData] = useState<userDataType>({
    firstName:"",
    lastName:"",
    email:"",
    password: "",
    role:"candidate"
  })

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

  const handleSubmit = async() => {
    if (data.firstName === "" || data.lastName === "" || data.firstName === "" || data.password === "") {
      toast.error("all field are required")
    }
    else {
      console.log(data)
      const response =await saveUser(data)
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
}
  return (
    <>
        <div className=" h-content w-full flex justify-center items-center">
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-xl">Sign Up</CardTitle>
        <CardDescription>
          Enter your information to create an account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="first-name">First name</Label>
              <Input onChange={handleChange} name="firstName" id="first-name" placeholder="Max" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="last-name">Last name</Label>
              <Input onChange={handleChange} id="last-name" name="lastName" placeholder="Robinson" required />
            </div>
          </div>
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
            <Label htmlFor="password">Password</Label>
            <Input onChange={handleChange} id="password" name="password" type="password" />
          </div>
          <Button type="submit" className="w-full" onClick={handleSubmit}>
            Create an account
          </Button>
         
        </div>
        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link to="/auth/sign-in" className="underline">
            Sign in
          </Link>
        </div>
      </CardContent>
    </Card>
    </div>

    </>
  )
}

export default Signup
