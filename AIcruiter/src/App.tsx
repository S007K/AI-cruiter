
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Pages/Home/Home'
import Header from './components/AppComponents/Header'
import Dashboard from './Pages/Dashboard/Dashboard'
import InterviewPage from './Pages/Interview/InterviewPage'
import { Toaster } from './components/ui/sonner'
// import Feedback from './Pages/Feedback/Feedback'
import { Signin } from './Pages/auth/Signin'
import Signup from './Pages/auth/Signup'
import UserContextProvider from './Context/UserContextProvider'


function App() {

  // const { setUser}=useContext(UserContext)

  return (
    <UserContextProvider>
      <BrowserRouter>
        <Header />
        <Toaster  position= 'top-center' />

        <Routes>
          <Route path={"/"} element={<Home />} />
          <Route path={"/auth/sign-in"} element={<Signin />} />
          <Route path={"/auth/sign-up"} element={<Signup />} />
          <Route path={"/dashboard"} element={<Dashboard />} />
          <Route path={"/interview-page/:interviewid"} element={<InterviewPage />} />
          {/* <Route path={"/feedback-page/:interviewid"} element={<Feedback />} /> */}
        </Routes>
      </BrowserRouter>
        
    </UserContextProvider>
  )
}

export default App
