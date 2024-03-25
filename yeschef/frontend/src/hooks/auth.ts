import { AxiosResponse } from "axios";
import { useState } from "react";
import { ILOGINRESPONSE, IUpdateResponse } from "../@types";
import { instance } from "../config";
export const useAuth = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const login = async (payload: {
    email: string;
    password: string;
  }): Promise<AxiosResponse<ILOGINRESPONSE> | any> => {
    try {
      setLoading(true);
      const response = await instance.post("/auth/login", payload);
      if (response) {
        return response?.data;
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const update = async (payload: {
    email: string;
    newEmail: string;
    newPassword: string;
  }): Promise<AxiosResponse<IUpdateResponse> | any> => {
    try {
      var route ="/auth/updatePassword"
      setLoading(true);
      if(payload.newPassword == ''){
        route = "/auth/updateEmail"
      } 
      const response = await instance.put(route, payload);
      if (response) {
        return response?.data;
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  

  const register = async (payload: {
    email: string;
    password: string;
  }): Promise<AxiosResponse<ILOGINRESPONSE> | any> => {
    try {
      setLoading(true);
      const response = await instance.post("/auth/join", payload);
      if (response) {
        return response?.data;
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    login,
    register,
    update,
  };
};