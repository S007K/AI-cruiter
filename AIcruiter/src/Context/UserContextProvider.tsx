import { ReactNode, useEffect, useState } from 'react';
import UserContext from './UserContext';
import Cookies from 'universal-cookie';
import { authUser } from '@/Service/ServiceAPI';

interface UserContextProviderProps {
  children: ReactNode;
}

const UserContextProvider: React.FC<UserContextProviderProps> = ({ children }) => {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    isLoggedIn: false,
    _id: ""
  });

  const cookies = new Cookies();

  useEffect(() => {
    async function authenticateUser() {
      try {
        const authToken = cookies.get('token');
        if (authToken) {
          const response = await authUser(authToken);
          if (response?.status === 401) {
            setUser(prev => ({ ...prev, isLoggedIn: false }));
            cookies.remove("token");
          } else if (response?.status === 200) {
            setUser({ ...response.data.data, isLoggedIn: true });
          }
        }
      } catch (error) {
        console.error("Authentication error:", error);
      }
    }

    if (user.firstName === "") {
      authenticateUser();
    } else {
      console.log("user", user);
    }
  }, [user, cookies]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;

