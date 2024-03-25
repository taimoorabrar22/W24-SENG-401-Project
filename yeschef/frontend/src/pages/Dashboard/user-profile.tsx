import {useContext } from "react"
import { Button  } from "../../components"
import { AUTH_TYPE } from "../../@types"
import { AuthenticationContext } from "../../context"
import { useNavigate } from "react-router-dom"


export const UserProfile = () => {
    const navigate = useNavigate();
    const handleEmail = () => {
      navigate("/dashboard/updateEmail");
    };
    const handlePassword = () => {
        navigate("/dashboard/updatePassword");
      };
    const { loading, user } = useContext(AuthenticationContext) as AUTH_TYPE;
    return (
        <div className="container bg-[#1b4235] text-white h-[100%] flex flex-col-reverse justify-center md:flex-row w-[100%] max-w-full">
                 <div className="flex flex-col gap-2  w-full md:h-[70%] md:w-[80%] items-center bg-[#EDD3C5] pt-[20px] pb-[20px] rounded-lg">
                    <h2 className="text-[#1b4235] text-[35px] md:text-[55px] font-semibold left-[0] tracking-[0] leading-[normal] text-center [text-shadow:0px_4px_4px_#00000040] mt-[20px]">
                            User profile
                    </h2>
                    
                    <h2 className="w-[100%] text-white md:text-[55px] text-[35px] font-semibold left-[0] tracking-[0] leading-[normal] text-center [text-shadow:0px_4px_4px_#00000040] mt-[20px]">
                            {user}
                    </h2>

                    <Button
                                title={loading ? "Loading" : "Change Email"}
                                className={`border-2 py-4 px-6 bg-[#EDD3C5] border-black rounded-xl text-[#1b4235] text-[30px] hover:bg-[#2F4858] mt-[30px] hover:text-white transition ease-in-out duration-300 hover:scale-105 hover:shadow-lg`}
                                handleClick={() => handleEmail()}
                                disabled={loading}
                    />

                    <Button
                                title={loading ? "Loading" : "Change Password"}
                                className={`border-2 py-4 px-6 bg-[#EDD3C5] border-black rounded-xl text-[#1b4235] text-[30px] hover:bg-[#2F4858] mt-[30px] hover:text-white transition ease-in-out duration-300 hover:scale-105 hover:shadow-lg`}
                                handleClick={() => handlePassword()}
                                disabled={loading}
                    />

            </div>
                
            






















        









            {/* <div className="w-full h-full flex items-center justify-center">
              
                    <div className="flex flex-col gap-2  w-full md:h-[70%] md:w-[80%] items-center bg-[#EDD3C5] pt-[20px] pb-[20px] rounded-lg">
                    <h2 className="text-[#1b4235] text-[55px] font-semibold left-[0] tracking-[0] leading-[normal] text-center [text-shadow:0px_4px_4px_#00000040] mt-[20px]">
                            User profile
                        </h2>
                    <div className="md:flex w-[90%] h-20   text-[#1b4235] transition-all duration-[0.5s] text-[25px] mt-10 pl-[0.8em] ">
                    <h2 className="w-[70%] text-white text-[55px] font-semibold left-[0] tracking-[0] leading-[normal] text-center [text-shadow:0px_4px_4px_#00000040] mt-[20px]">
                            {user}
                        </h2>
                        <div className=" m-auto flex flex-col gap-2 w-[20%]">
                            <Button
                                title={loading ? "Loading" : "Change Email"}
                                className={`border-2 py-4 px-6 bg-[#EDD3C5] border-black rounded-xl text-[#1b4235] text-[30px] hover:bg-[#2F4858] mt-[30px] hover:text-white transition ease-in-out duration-300 hover:scale-105 hover:shadow-lg`}
                                handleClick={() => handleEmail()}
                                disabled={loading}
                            />
                        </div>
                        </div>    
             
                        <div className="md:flex w-[90%] h-20 text-[#1b4235] transition-all duration-[0.5s] text-[25px] mt-10 pl-[0.8em] ">
                            <div className="w-[20%] m-auto flex flex-col gap-2">
                            <Button
                                title={loading ? "Loading" : "Change Password"}
                                className={`border-2 py-4 px-6 bg-[#EDD3C5] border-black rounded-xl text-[#1b4235] text-[30px] hover:bg-[#2F4858] mt-[30px] hover:text-white transition ease-in-out duration-300 hover:scale-105 hover:shadow-lg`}
                                handleClick={() => handlePassword()}
                                disabled={loading}
                            />
                            </div>
                        </div>   
                    </div>
            </div> */}
        </div>
    )
} 