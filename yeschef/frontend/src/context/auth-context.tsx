import { createContext, ReactNode, useState, useEffect } from "react";
import { AUTH_TYPE, ILOGINRESPONSE, IUpdateResponse } from "../@types";
import { useAuth } from "../hooks";

export const AuthenticationContext = createContext<AUTH_TYPE | null>(null);

export const AuthenticationContextProvider = ({children}: {children: ReactNode}) => {

    const { loading, login, register, update } = useAuth();
    const [user, setUser] = useState<string>("");
  
    useEffect(() => {
      const token = sessionStorage.getItem("token");
      const storedUser = sessionStorage.getItem("email");
  
      if (storedUser !== undefined && storedUser !== null && token) {
        setUser(storedUser);
      }
    }, []);

    const onLogin = async (payload: {
        email: string;
        password: string;
      }): Promise<unknown> => {
        const response: ILOGINRESPONSE = await login(payload);
        if (response) {
          sessionStorage.setItem("token", response?.token);
          sessionStorage.setItem("email", response?.email);
          sessionStorage.setItem("id", response?.id);
    
          setUser(response?.email);
          return;
        }
      };

      const onUpdate = async (payload: {
        newEmail: string;
        email: string;
        newPassword: string;
      }): Promise<unknown> => {
        console.log(payload);
        const response: IUpdateResponse = await update(payload);
        if (response) {
          setUser(response?.email);
          sessionStorage.setItem("email", response?.email);
          if(response.newEmail!=''){
            sessionStorage.setItem("email", response?.newEmail);
            setUser(response?.newEmail);
          }
          sessionStorage.setItem("token", response?.token);
          sessionStorage.setItem("id", response?.id);
          return (window.location.href = "/dashboard/userProfile");
        }
      };

      const onRegister = async (payload: {
        email: string;
        password: string;
      }): Promise<unknown> => {
        const response: ILOGINRESPONSE = await register(payload);
        if (response) {
          return (window.location.href = "/");
        }
      };

      const onLogout = (): any => {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("email");
        sessionStorage.removeItem("id");
        return (window.location.href = "/");
      };

      return (
        <AuthenticationContext.Provider
          value={{
            user,
            loading,
            onLogin,
            onRegister,
            onLogout,
            onUpdate,
          }}
        >
          {children}
        </AuthenticationContext.Provider>
      );
};
