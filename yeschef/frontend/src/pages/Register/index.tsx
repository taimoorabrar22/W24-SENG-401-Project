import { FormEvent, useContext, useLayoutEffect, useState } from "react"
import { Button, Form, Input } from "../../components"
import { AUTH_TYPE, IPAYLOAD } from "../../@types"
import { validateEmail } from "../../utils"
import { AuthenticationContext } from "../../context"
import cogoToast from "cogo-toast"
import { NavLink, useNavigate } from "react-router-dom"


export const Register = () => {
    const navigate = useNavigate();

    //protecting this route
    //can be done in a higher order component
    useLayoutEffect(() => {
      if (
        !!sessionStorage.getItem("token") &&
        !!sessionStorage.getItem("email")
      ) {
        navigate("/dashboard");
      }
    }, []);
    const { loading, onRegister } = useContext(AuthenticationContext) as AUTH_TYPE;
    const [state, setState] = useState<IPAYLOAD>({ email: '', password: "" })
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!validateEmail(state?.email)) {
            return cogoToast.error("Invalid email");
        }
        if (!state?.password || state.password?.length < 7) {
            return cogoToast.error("Please provide password");
        }
        await onRegister(state);
    };
    const handleState = (e: FormEvent<HTMLInputElement>) => {
        const { name, value } = e.currentTarget;
        setState({ ...state, [name]: value });
     };
    return (
        <div className="container bg-[#1b4235] text-white h-[100%] flex flex-col-reverse md:flex-row w-[100%] max-w-full max-h-full">
            <div className="w-full h-full">
            <h2 className="text-red-200 font-rozha font-helvetica text-[74px] font-extrabold text-center font-normal tracking-normal leading-normal mt-10 mb-10">
                            Yes Chef
            </h2>
                <Form
                    className="flex items-center justify-center w-full p-10"
                    onSubmit={handleSubmit}
                >
                    <div className="flex flex-col gap-2  w-full md:w-[50%] items-center bg-[#EDD3C5] pt-[20px] pb-[20px] rounded-lg">
                    <h2 className="text-[#1b4235] text-[55px] font-semibold left-[0] tracking-[0] leading-[normal] text-center [text-shadow:0px_4px_4px_#00000040] mt-[20px]">
                            REGISTER
                        </h2>
                        <Input
                            name="email"
                            placeholder="Email"
                            handleChange={handleState}
                            type="text"
                            className={`w-[70%] h-20 overflow-hidden bg-[#F3F3F3] text-[#1b4235] transition-all duration-[0.5s] text-[25px] mt-10 pl-[0.8em] rounded-[10px] border-[3px] border-solid  hover:border-[#1b4235] hover:bg-[white] hover:border-[3px] hover:border-solid;`}
                        />

                        <Input
                            name="password"
                            placeholder="Password"
                            handleChange={handleState}
                            type="password"
                            className={`w-[70%] h-20 overflow-hidden bg-[#F3F3F3] text-[#1b4235] transition-all duration-[0.5s] text-[25px] mt-10 pl-[0.8em] rounded-[10px] border-[3px] border-solid  hover:border-[#1b4235] hover:bg-[white] hover:border-[3px] hover:border-solid;`}
                        />
                        <div className="w-[50%] m-auto flex flex-col gap-2">
                            <Button
                                title={loading ? "Loading" : "Register"}
                                className={`border-2 py-4 px-6 border-black rounded-xl text-[#1b4235] text-[30px] hover:bg-[#2F4858] mt-[30px] hover:text-white transition ease-in-out duration-300 hover:scale-105 hover:shadow-lg `}
                                type="submit"
                                disabled={loading}
                            />
                                 
                        </div>
                    </div>
                </Form>
                <div className="w-full  flex flex-col items-center">
                <NavLink to="/" className="border-2 py-4 bg-[#EDD3C5] text-[#1b4235] px-6 border-black rounded-xl text-[25px] text-center hover:bg-[#2F4858] hover:text-white transition max-w-80 justify ease-in-out duration-300 hover:scale-105 hover:shadow-lg">Aready Registered?</NavLink>
                </div>
            </div>
        </div>
    )
} 