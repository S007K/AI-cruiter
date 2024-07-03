import { postInterviewType } from "@/types";
import axios from "axios"


const Backendinstance = axios.create({
    baseURL: 'http://localhost:8000/', // Base URL for the instance
    // timeout: 1000, // Timeout for requests
 
  });


export async function saveUser(payload:string) {
  try {
    const response =await Backendinstance.post("/api/user", {  email: payload  })
    return response.data.data
  }
  catch (error) {
    console.log(error)
  }
}





export async function saveInterviewDetails(payload) {
  try {
    console.log(payload)
    const interviewDetails = await Backendinstance.post('/api/interview', payload)
    console.log(interviewDetails.data.data)
    return interviewDetails.data.data
   
  }
  catch (error) {
    console.log(error)
    }
}

export async function getInterviewDetails(payload) {
  try {
    
    const userDetails = await Backendinstance.get(`/api/interview/${payload}`)
    console.log(userDetails.data.data)
    return userDetails.data.data
   
  }
  catch (error) {
    console.log(error)
    }
}


export async function updatesingleInterview(payload) {
  try {
    
    const interviewDetails = await Backendinstance.put(`/api/interview/singleinterview/${payload.interviewid}`,payload)
    console.log(interviewDetails.data.data)
    return interviewDetails.data.data
   
  }
  catch (error) {
    console.log(error)
    }
}


export async function saveFeedback(payload) {
  try {
    console.log(payload)
    const feedbackDetails = await Backendinstance.post('/api/feedback', payload)
    
    return feedbackDetails.data
   
  }
  catch (error) {
    console.log(error)
    }
}

// export async function getFeedback(payload) {
//   try {
//     console.log(payload)
//     const feedbackDetails = await Backendinstance.get('/api/feedback/'+ payload)
    
//     return feedbackDetails.data
   
//   }
//   catch (error) {
//     console.log(error)
//     }
// }