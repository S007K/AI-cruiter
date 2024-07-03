// import { Skeleton } from "@/components/ui/skeleton"
import { SignedIn, useUser } from "@clerk/clerk-react"
import { Navigate } from "react-router-dom"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import CreateInterview from "@/components/AppComponents/CreateInterview"
import { useEffect, useState } from "react"
import { dataDatype } from "@/types"
import { getInterviewDetails, saveUser } from "@/Service/ServiceAPI"


export default function Dashboard() {
    const { isSignedIn, user } = useUser()
    const [previousInterview,setPreviousInterview]=useState<dataDatype[]>([])
    const [data, setData] = useState<dataDatype>(
        {  
            interviewName: "",
            skills: "",
            yearsofex:""
        }
    )
    
    useEffect(() => {
        (async function(){
            
           const response= await getInterviewDetails(localStorage.getItem("id"))
                setPreviousInterview(response)
        })(); 
       
    }, [data]);

    
      

    if (!isSignedIn) {
        return <Navigate to={"/auth/sign-in"}/>
    }
  
   
  return (
      <>    
          
          <div className="w-full mt-8   justify-center flex">
              <CreateInterview setData={ setData} />
              
          </div>
          <div className="flex w-full gap-8 mt-8 justify-center flex-wrap ">
              
              {
                previousInterview?  previousInterview.map((value,key) => {
                      return(
                            <Card key={key} className="w-[18rem] md:w-[20rem] p-0 mb-8">
                        <CardHeader>
                                  <CardTitle>{ value.interviewName}</CardTitle>
                                  <CardDescription>Experience { value.yearsofex}</CardDescription>
                        </CardHeader>
                        <CardContent>
                                  <p>Skills: {value.skills }</p>
                        </CardContent>
                        <CardFooter>
                            <Button className="w-full">Retake</Button>
                        </CardFooter>
                        </Card>
                          
                      )
                  }):<div className=" w-fit mx-auto">No data Found</div>
}
          </div>
    </>
  )
}
