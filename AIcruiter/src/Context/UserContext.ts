import { userContextType } from "@/types"
import React from "react"
type UserContextType = {
    user: userContextType;
    setUser: (data: userContextType) => void;
  };

const UserContext = React.createContext<UserContextType>({
    user: {
        firstName: "",
        lastName: "",
        email: "",
        isLoggedIn: false,
        _id:""
    },
    setUser:()=>{}

})

export default UserContext