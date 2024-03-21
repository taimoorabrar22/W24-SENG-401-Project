import { FormEvent, useContext, useLayoutEffect, useState } from "react"
import recipe1 from "../../assets/recipe3.jpg"
import logo from "../../assets/logo-green.png"

import { Button, Form, Input } from "../../components"
import { AUTH_TYPE, IPAYLOAD } from "../../@types"
import { validateEmail } from "../../utils"
import { AuthenticationContext } from "../../context"
import cogoToast from "cogo-toast"
import { useNavigate } from "react-router-dom"


export const Landing = () => {
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
    const { loading, onLogin } = useContext(AuthenticationContext) as AUTH_TYPE;
    const [state, setState] = useState<IPAYLOAD>({ email: '', password: "" })
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!validateEmail(state?.email)) {
            return cogoToast.error("Invalid email");
        }
        if (!state?.password || state.password?.length < 7) {
            return cogoToast.error("Please provide password");
        }
        await onLogin(state);
    };
    const handleState = (e: FormEvent<HTMLInputElement>) => {
        const { name, value } = e.currentTarget;
        setState({ ...state, [name]: value });
     };
    return (
        <div className="container bg-customGreen text-white h-[100%] flex flex-col-reverse md:flex-row w-[100%] max-w-full">
            <div className="w-full h-full">
                <Form
                    className="flex items-center justify-center w-full h-full p-10"
                    onSubmit={handleSubmit}
                >
                    <div className="flex flex-col gap-2  w-full md:w-[50%]">
                    <img
                    src={logo}
                    alt="A dish with recipes"
                    className="w-full h-full object-center object-cover"
                />
                        <h2 className="text-customPink text-xl text-center italic mb-1">
                            The exotic recipe platform
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
                                title={loading ? "Loading" : "Login"}
                                className={`bg-customBeige text-white hover:bg-customPink py-1 px-6 w-full `}
                                type="submit"
                                disabled={loading}
                            />
                        </div>
                    </div>
                </Form>
            </div>
            <div className="w-full h-full staurate-200">
                <img
                    src={recipe1}
                    alt="A dish with recipes"
                    className="w-full h-full object-center object-cover"
                />
            </div>
        </div>
    )
} 