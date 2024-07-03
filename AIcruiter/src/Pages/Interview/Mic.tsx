import { Button } from '@/components/ui/button';
import { interviewAnswer } from '@/types';
import { useEffect, useState } from 'react';
import useSpeechToText from 'react-hook-speech-to-text';
import { toast } from 'sonner';

const Mic = ({ question,questionNumber,arrayAnswer,setData }) => {
  const [arrayanswer, setArrayAnswers] = useState<interviewAnswer[]>([])
  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false
  });
  


  if (!isRecording) {
    
    // console.log("not recording", results[0])
    setData(results)
    // if (results[questionNumber]) {
     
    //   console.log(arrayanswer)
      
    // }
    toast.error("Please turn on your mic")
  }
 
  // useEffect(() => {
  //   if (results[questionNumber]) {
  //     setArrayAnswers((prev) =>
  //       [
  //         ...prev,
  //         {
  //           question: question,
  //           answer: results[questionNumber].transcript
  //         }
  //       ]
  //     )
  //   }
  // }, [results])
  

  // useEffect(() => {
  //   setData(arrayAnswer)
  // },[arrayAnswer])
  if (error) return <p>Web Speech API is not available in this browser 🤷‍</p>;
  
  return (
      <div className='w-full flex items-center justify-center mb-8'>

      {/* <h1>Recording: {isRecording.toString()}</h1> */}
      <Button onClick={isRecording ? stopSpeechToText : startSpeechToText}  className=" m-auto  " >
        {isRecording ? 'Stop Recording' : 'Start Recording'}
      </Button>
     
    </div>
    
  )
}

export default Mic
