import { FormEvent, useContext, useLayoutEffect, useState } from "react"
import logo from "../../assets/logo-green.png"

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
        <div className="container bg-customGreen text-white h-[100%] flex flex-col-reverse md:flex-row w-[100%] max-w-full max-h-full">
            <div className="w-full h-full">
                <Form
                    className="flex items-center justify-center w-full h-full p-10"
                    onSubmit={handleSubmit}
                >
                    <div className="flex flex-col gap-2 justify-center w-full md:w-[50%]">
                    <img
                    src={logo}
                    alt="Yes chef logo"
                    className="max-w-[50%] object-center object-cover ml-40"
                    />
                        <h2 className="text-customPink text-xl text-center italic mb-1">
                            Create your profile !
                        </h2>
                        <Input
                            name="email"
                            placeholder="Email"
                            handleChange={handleState}
                            type="text"
                            className={`bg-zinc-900 py-1 px-4 w-full shadow-xl  placeholder:text-sm hover:bg-zinc-800 cursor-pointer focus:outline-none`}
                        />

                        <Input
                            name="password"
                            placeholder="Password"
                            handleChange={handleState}
                            type="password"
                            className={`bg-zinc-900 py-1 px-4 w-full placeholder:text-sm hover:bg-zinc-800 cursor-pointer focus:outline-none`}
                        />
                        <div className="w-full md:w-[50%] m-auto flex flex-col gap-2">
                            <Button
                                title={loading ? "Loading" : "Register"}
                                className={`bg-customBeige text-white hover:bg-customPink py-1 px-6 w-full `}
                                type="submit"
                                disabled={loading}
                            />
                                  <h2 className="text-white font-light text-sm hover:text-customPink text-center">
                                <NavLink to="/"> Already registered ? </NavLink>
                            </h2>
                        </div>
                    </div>
                </Form>
            </div>
        </div>
    )
} 