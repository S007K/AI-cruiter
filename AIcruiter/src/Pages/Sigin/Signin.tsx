import { saveUser } from '@/Service/ServiceAPI';
import { SignIn, useUser } from '@clerk/clerk-react'


function Signin() {
  const {isSignedIn,user}=useUser()

  if (isSignedIn && user?.primaryEmailAddress) {
    const userEmail: string = user.primaryEmailAddress.emailAddress;

    async function getData() {
        const { email, _id } = await saveUser(userEmail);
        localStorage.setItem("email", email);
        localStorage.setItem("id", _id);
    }

    getData();
}

  return (
    <>
      <div className=' w-full mt-12  justify-center items-center flex'>
      <SignIn/>

      </div>
    </>
  )
}

export default Signin
