
import { Link, useNavigate } from 'react-router-dom'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Button } from "@/components/ui/button"
import {  Menu} from 'lucide-react'
import {  UserButton, useUser } from '@clerk/clerk-react'


export default function Header() {
    const { isSignedIn} = useUser()
  const navigate = useNavigate()

  return (
    <>
        <header className="sticky top-0 flex h-16 items-center justify-between  w-full border-b bg-background px-4 md:px-36 ">
        <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6 justify-between w-full">
                  <Link to={"/"}> <img src="./assets/Logo.png" className='w-[9rem]' alt="logo" /></Link>
                 {isSignedIn?<Link to="/dashboard" className='mr-4' ><Button variant={"outline"}>Dashboard</Button></Link>:""} 
        </nav>
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <nav className="grid  gap-6 text-lg font-medium">
            {isSignedIn?<Link to="/dashboard">Dashboard</Link>:""}
            </nav>
          </SheetContent>
        </Sheet>
        <div className="flex  items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
                  {isSignedIn ?<UserButton/>: <Button onClick={()=>{navigate("/auth/sign-in")}}>Sign-in</Button>}
        </div>
      </header>
    </>
  )
}
