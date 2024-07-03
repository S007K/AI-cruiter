import { Button } from "@/components/ui/button";
import Webcam from "react-webcam";

import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import Mic from "./Mic";
import { Terminal } from "lucide-react";
import { interviewAnswer } from "@/types";
import { GeminiAI } from "@/Utils/GeminiAI";
import {  saveFeedback, updatesingleInterview } from "@/Service/ServiceAPI";
import { toast } from "sonner";


function seprategeminiResponse(data) {
 
  if (data) {
    const preprocessedData = data.split("```")
    const lines = preprocessedData[2].split("\n\n");
    // Find the line containing "Average Marks:"
    const averageMarksLine = lines.find(line => line.startsWith('**Average Marks:'));
    // Extract the average marks
    const averageMarks = averageMarksLine ? averageMarksLine.split(":**")[1].trim() : null;

    // Find the line containing "Overall Feedback:"
    const feedbackLine = lines.find(line => line.startsWith("**Overall Feedback:"));

    // Extract the overall feedback (excluding the first line)
    const overallFeedback = feedbackLine ? lines.slice(lines.indexOf(feedbackLine) + 1).join("\n").trim() : null;
    let processedData = {
      mainFeedback: JSON.parse(preprocessedData[1].replace("json", "").replace("```", '').replace("```", '')),
      marks: Number(averageMarks),
      generalFeedback: overallFeedback
    }
    return processedData
  }
}

const InterviewPage = () => {
  let { interviewid } = useParams()
  const navigate=useNavigate()
  const location = useLocation();
  const [startInterview,setStartInterview]=useState(false)
  const [arrayanswer, setArrayAnswers] = useState([])
  const [geminiResponse,setGemeniResponse]=useState('')
  const { formatedResponse, interviewData } = location.state || {};
  const [questionNumber,setQusetionNumber]=useState(0)
 
  let feedbackAnswers:interviewAnswer[]=[]
 async function endInterview() {
    console.log(arrayanswer)
    for (let i = 0; i < formatedResponse.length; i++) {
      
      feedbackAnswers.push({
        question: formatedResponse[i].question,
        answer:arrayanswer[i].transcript
      })
    }
    
    const prompt=`
I have given an interview the question answer are array of object where in objec there is question and its answer please act as an interviewer and give marks for each answer outof 10 aslo give average marks and please give feed back in string for every answer in json include  format along with question and asnwer. Plesease note that there should only be json this is the array of objects
 ${JSON.stringify(feedbackAnswers)}`
    
   const result = await GeminiAI(prompt)
   setGemeniResponse(result)
   console.log(geminiResponse)
   feedbackAnswers = []
   console.log(geminiResponse)
   const response = seprategeminiResponse(result)
   if (response) {
     
     const dataToSend = {
      interviewid: interviewid,
       ...response
     }
     console.log(geminiResponse)
     const feedbackResponse = await saveFeedback(dataToSend)
     //  const feedbackid= feedbackResponse._id
    //  console.log(feedbackResponse)
     const updateinterview =await updatesingleInterview({ interviewid,feedbackResponse:feedbackResponse.data })
     console.log(updateinterview)
     toast.success(updateinterview.message)
    //  navigate("/feedback-page/"+interviewid)
  }
  //  backend request
  }
  

  if (!startInterview) {
    return (
      <>
        <div className=" w-full h-content flex justify-center pt-12">
      <Alert className="w-[40rem] h-fit">
  <Terminal className="h-4 w-4" />
  <AlertTitle className=" font-extrabold text-lg">Heads up!</AlertTitle>
  <AlertDescription  className=" leading-4 text-xl my-4">
    In this AI-based virtual interview, please ensure your webcam and microphone are on. You are not allowed to turn off your webcam. While you can mute your microphone during the interview, remember to unmute it to record your answers  </AlertDescription>
          <Button onClick={() => setStartInterview(true)} className="mt-4 mx-auto">Start Interview</Button>
</Alert>
          </div>
      </>
    )
  }
 
  return (
    <>
      <div className="w-full flex h-content">
        <div className="w-1/2 flex justify-center items-center ">
          <div className="py-8 px-4 border-2 w-[60%] h-[80%] flex flex-col justify-between rounded-md">
            <Button >Question { questionNumber+1} </Button>
            <div className="mt-8 text-lg text-gray-700">{formatedResponse[questionNumber].question}</div>
            <div className="w-full flex justify-between">
            <Button className="mt-4 mr-4" variant={questionNumber > 0 ? "default" : "outline"} onClick={() => setQusetionNumber((prev) => {return (questionNumber>0? (prev - 1):0 )})}>Prev</Button>
            <Button className="mt-4 mr-4" variant={questionNumber <formatedResponse.length-1 ? "default" : "outline"} onClick={() => setQusetionNumber((prev) => {return (questionNumber<formatedResponse.length-1? (prev + 1):4 )})} > Next</Button>
            </div>
            {!(questionNumber <formatedResponse.length-1)  ?<Button className="w-full " onClick={endInterview}>End Interview</Button>:""}
          </div>
        </div>
        <div className=" w-1/2 flex justify-center items-center">
          
          <div className=" flex flex-col justify-around bg-slate-800 w-[80%] h-[85%] rounded-md">
            <div className="p-4 m-auto w-[80%]"><Webcam mirrored={true} size={100} className="w-full " /> </div> 
            <Mic question={formatedResponse[questionNumber].question} questionNumber={ questionNumber} arrayAnswer={arrayanswer} setData={setArrayAnswers} />
            
          </div>
        </div>
          </div>
    </>
  )
}

export default InterviewPage
