import { ResultType } from "react-hook-speech-to-text";

export interface questiontype{
    question: string;
    marks: number;
    topic: string;
    type: string;
}
export interface dataDatype{
    completed:boolean|undefined,
    interviewName: string,
    skills: string,
    yearsofex: string,
    _id: string|undefined,
    questionDetails:[questiontype] | [],
    feedBack: {
        generalFeedback: string,
        mainFeedback: [{ question: string }],
        marks: string,
    }|null
}

export interface CreateInterviewProps{
    setData: (data: dataDatype) => void;
}

export interface userContextType{
    firstName: string,
    lastName: string,
    email: string,
    isLoggedIn: boolean,
    _id:string
}


export interface postInterviewType{
    email: string,
        interviewDetails: dataDatype
}

export interface interviewAnswer{
    question: string,
    answer:string|ResultType
}

export interface userDataType{
    email:string,
    firstName:string,
    lastName:string,
    password: string,
    role:string|"candidate"
}
export interface saveFeedbackType{
    interviewid: string,
    mainFeedback:  [{ question: string }],
      marks: number,
      generalFeedback:string|null
}
export interface transcript {
    transcript: string;
    // Add other properties as needed
  }