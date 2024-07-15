import { Button } from "@/components/ui/button";
import UserContext from "@/Context/UserContext";

import { useContext } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const {user}=useContext(UserContext)
  const candidateFeatures = [{
    head: "Personalized Interview Feedback",
    value: `eceive instant, detailed feedback on performance to identify strengths and areas for improvement.`},
    {head:"Practice Interviews",
      value: `Access mock interviews to practice and prepare for real AI-based interviews.`
  },
    {
      head:"Skill Assessment Reports",
      value: `Get comprehensive reports on skills and competencies evaluated during the interview.
Interview Scheduling: Easily schedule follow-up interviews with recruiters based on availability.`},
{
head:"Career Development Resources",
value: `Access a library of resources, including resume tips and career advice.
Profile Matching: Receive job recommendations that match your skills and preferences.`},
{
head:"Progress Tracking",
value: `Track your application status and progress through the hiring pipeline.`
  }]

  const recruiterFeature=[{
    head: "Automated Candidate Ranking",
    value: "Automatically rank candidates based on their AI interview performance."
  },
  {
    head: "Customizable Interview Questions",
    value: "Tailor interview questions to specific job roles and requirements."
  },
  {
    head: "Analytics Dashboard",
    value: "Gain insights into candidate performance and recruitment metrics with an analytics dashboard."
  },
  {
    head: "Bulk Interview Scheduling",
    value: "Schedule interviews with multiple candidates simultaneously to streamline the process."
  },
  {
    head: "Candidate Pool Management",
    value: "Easily manage and filter the candidate pool to find the best fits for open positions."
  }
]
  console.log(user)
  const navigate=useNavigate()
  function handleClick() {
    if (!user.isLoggedIn) {
      navigate("/auth/sign-in")
    }
    else {
      navigate("dashboard")
      
    }
  }
  return (
    <div className="md:px-36 ">
      <div className="flex my-10 items-center gap-8">
        <div className="w-1/2">
          <h1 className="text-6xl mb-8 font-bold">AI-cruiter</h1>
          <p className="text-lg"> AI-based interview taker is here to revolutionize hiring—not by taking jobs, but by helping you land them. Recruiters can post job openings, and candidates can undergo AI-driven interviews designed to highlight their strengths and skills.</p>
          <div className="mt-4">
          {user.isLoggedIn?<Button onClick={handleClick} variant={"outline"}>Dashboard</Button>:<Button onClick={handleClick}>Signin</Button>}

          </div>
        </div>
        <div className="w-1/2">
            <img src="./assets/Hero3d.png" className="w-full" alt="" />
        </div>
      </div>

        <h1 className="text-center text-6xl font-bold mt-[10rem]">Features</h1>
      <div className="flex my-20 items-center gap-8 ">
        <div className="w-1/2">
            <img src="./assets/candidate.png" alt="" />
        </div>
        <div className="w-1/2">
          <ul>
            <h1 className="text-3xl font-semibold">For Candidates:</h1>
            {candidateFeatures.map((value, key) => {
              return (
                <li className="my-4 w-[30rem]" key={key}><span className="font-semibold ">{value.head}:</span> {value.value}.</li>
                
              )
            })}
            </ul>
        </div>
      </div>

      <div className="flex my-20 items-center flex-row-reverse gap-8 ">
        <div className="w-1/2">
            <img src="./assets/recruiter.png" alt="" />
        </div>
        <div className="w-1/2">
          <ul>
            <h1 className="text-3xl font-semibold">For For Recruiters:</h1>
            {recruiterFeature.map((value, key) => {
              return (
                <li className="my-4 w-[30rem]" key={key}><span className="font-semibold ">{value.head}:</span> {value.value}.</li>
                
              )
            })}
            </ul>
        </div>
      </div>
    </div>
  )
}
