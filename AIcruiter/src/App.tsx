
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Pages/Home/Home'
import Signin from './Pages/Sigin/Signin'
import Header from './components/AppComponents/Header'
import Dashboard from './Pages/Dashboard/Dashboard'
import InterviewPage from './Pages/Interview/InterviewPage'
import { Toaster } from './components/ui/sonner'
// import Feedback from './Pages/Feedback/Feedback'
import Footer from './components/AppComponents/Footer'

function App() {
 
  return (
    <>
      <BrowserRouter>
        <Header />
        <Toaster  position= 'top-center' />

        <Routes>
          <Route path={"/"} element={<Home />} />
          <Route path={"/auth/sign-in"} element={<Signin />} />
          <Route path={"/dashboard"} element={<Dashboard />} />
          <Route path={"/interview-page/:interviewid"} element={<InterviewPage />} />
          {/* <Route path={"/feedback-page/:interviewid"} element={<Feedback />} /> */}
        </Routes>
      </BrowserRouter>
        
    </>
  )
}

export default App
