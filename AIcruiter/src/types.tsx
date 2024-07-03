export interface dataDatype{
    interviewName: string,
    skills: string,
    yearsofex:string
}

export interface CreateInterviewProps{
    setData: (data: dataDatype) => void;
}


export interface questiontype{
    question: string;
    marks: number;
    topic: string;
    type: string;
}


export interface postInterviewType{
    email: string,
        interviewDetails: dataDatype
}

export interface interviewAnswer{
    question: string,
    answer:string
}