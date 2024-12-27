import { createContext, useContext, useEffect, useState } from "react";
import { checkAuthStatus, loginUser } from "../helpers/api-communicator";

type User = {
  name: string;
  email: string;
};



type UserAuth = {
  isLoggedIn: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<void> | void;
  signup: (
    name: string,
    email: string,
    password: string
  ) => Promise<void> | void;
  logout: () => Promise<void>;
};
const AuthContext = createContext<UserAuth | null>(null);
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    //fetch if the user cookies are valid or present to skip login
    async function checkStatus() {
      const data = await checkAuthStatus();
      if(data){
        setUser({email: data.email, name: data.name});
        setIsLoggedIn(true)
      } 
    }
    checkStatus();
  }, []);

/**
 * Authenticates a user with the provided email and password.
 * If successful, updates the user's authentication state.
 * 
 * @param email - The email of the user attempting to log in.
 * @param password - The password corresponding to the user's email.
 * @returns A Promise that resolves when the login process is complete.
 */

  const login = async (email: string, password: string) => {
    const data = await loginUser(email, password);
    if (data){
      setUser({email: data.email, name: data.name});
      setIsLoggedIn(true)
    }
  };

  const signup = async (name: string, email: string, password: string) => {};
  const logout = async () => {};
  const value = {
    user,
    isLoggedIn,
    login,
    signup,
    logout,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext)