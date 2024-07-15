import { GeminiAI} from "@/Utils/GeminiAI"
import { Button } from "@/components/ui/button"
import {
Dialog,
DialogContent,
DialogFooter,
DialogHeader,
DialogTitle,
DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { dataDatype, questiontype } from "@/types"
import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { ClipLoader } from "react-spinners"
import { toast } from "sonner"
import { saveInterviewDetails } from "@/Service/ServiceAPI";


const CreateInterview: React.FC = () => {
    const navigate=useNavigate()
    // const userEmail=user?.primaryEmailAddress?.emailAddress
    const [open, setOpen] = useState(false)
  const [interviewData, setInterviewData] = useState<dataDatype>({
    interviewName: "",
    questionDetails:  [{} as questiontype],
    skills: "",
    yearsofex: "",
    completed: false,
    _id: undefined, // You might want to generate a unique ID here
  feedBack: null
  })
    const [loading,setLoading]=useState(false)
    let formatedResponse = [];

    function handleChange(e:  React.ChangeEvent<HTMLInputElement>|React.ChangeEvent<HTMLTextAreaElement>) {
        const value = e.target.value
      const name = e.target.name;
      setInterviewData((prev) => {
        if (prev) {
          return {
            ...prev,
              [name]:value
          }
            
        }
        return prev;
        })
    }
    async function handleSubmit() {
        if (interviewData?.interviewName === "" || interviewData?.skills === "", interviewData?.yearsofex === "") {
            toast.error("all fields are required")
            return
      }
      // console.log(interviewData)
      setLoading(true)
      const prompt = `suppose you are an interviewer and I am a candidate applying for ${interviewData?.interviewName} role my skills are  ${interviewData?.skills} and has ${interviewData?.yearsofex} years of experience Ask five question in total and make each question of ten marks genrate in json format`
    const response = await GeminiAI(prompt);
      formatedResponse = JSON.parse(response.replace("json", "").replace("```", '').replace("```", ''))
      console.log(formatedResponse)
      const dataToSend = {
        userId: localStorage.getItem("id"),
        ...interviewData, questionDetails: formatedResponse 
      }
      if (formatedResponse ) {
        // const { interviewName, skills, yearsofex } = await saveInterviewDetails(dataToSend)
        const data = await saveInterviewDetails(dataToSend)
        console.log(data)
        // setData(
        //    {interviewName,
        //   skills,
        //   yearsofex}
        // )
        setLoading(false)
        navigate('/interview-page/'+data._id, { state: { formatedResponse: formatedResponse,interviewData } });
        
      }
    }

    useEffect(() => {
      setLoading(false)  
    },[])

  return (
    <>
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
      <Button   onClick={() => setOpen(true)}>Create New Interview</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create your Mock Interview</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="interviewName" className="text-right">
              Interview Name
            </Label>
            <Input   id="interviewName" name="interviewName" placeholder="Ex: Front End Developer " className="col-span-3" onChange={handleChange} />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="skills" className="text-right">
             skills
            </Label>
            <textarea  id="skills" name="skills" placeholder="ex: React.js Tailwindcss" className="col-span-3 border-2 rounded-md px-2 pt-2" onChange={handleChange} />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="yearsofex" className="text-right">
              Years Of Expereince
            </Label>
            <Input   id="yearsofex" name="yearsofex" placeholder="Ex: 1 year " className="col-span-3" onChange={handleChange} />
          </div>
        </div>
        <DialogFooter>
          {!loading ?<Button type="submit" className="w-full"  onClick={handleSubmit} >Create Interview</Button>:<Button type="submit" className="w-full "><ClipLoader className="mr-4" size={20} color="white"/> Genrating Questions</Button>}
        </DialogFooter>
      </DialogContent>
    </Dialog>
    </>
  )
}

export default CreateInterview;
