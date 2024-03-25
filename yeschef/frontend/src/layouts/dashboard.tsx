import { useContext, useLayoutEffect, useState } from "react";
import { AuthenticationContext } from "../context";
import { AUTH_TYPE } from "../@types";
import { NavLink, Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { Button } from "../components";
import { MdOutlineClose } from "react-icons/md";
import { FiMenu } from "react-icons/fi";
import logo from "../assets/logo-gold.png"

const routes = [
    { name: "Home", to: "/dashboard" },
    { name: "Add Recipe", to: "/dashboard/addrecipe" },
    { name: "My Recipes", to: "/dashboard/myrecipe" },
]

export const DashboardLayout = () => {
    const navigate = useNavigate();
    const pathname = useLocation().pathname;
    useLayoutEffect(() => {
        if (!sessionStorage.getItem('email') && !sessionStorage.getItem('token')) {
            navigate('/');
        }
    }, []);
    const goToProfile = () => {
        navigate("/dashboard/userProfile");
      };
    const { onLogout, loading, user } = useContext(AuthenticationContext) as AUTH_TYPE;
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const handleIsOpen = () => {
        setIsOpen((prev) => !prev);
    }
    
    return <div className="w-full h-full bg-[#1b4235] max-w-full overflow-x-hidden">
        <div className="h-[100px] md:h-[80px] flex items-center justify-between px-3 top-0 z-50">
            <div className="flex items-center justify-evenly w-full">
                <h2 className="text-white font-bold md:text-3xl text-[12px] hover:text-[#D1B1B0] hover:scale-110 transition ease-in-out duration-300 text-center py-1 px-2">
                    <NavLink to="/dashboard">Yes Chef</NavLink>
                </h2>

                <div className="flex  gap-y-1  mt-3">
                {routes.map(({ name, to }) => (
                    <NavLink
                        key={name + to}
                        to={to}
                        className={({ isActive }) =>
                            isActive && pathname === to
                                ? "border-2 py-1 px-2 md:py-4 md:px-6 border-black bg-[#2F4858] text-[12px] md:text-[25px] rounded-xl text-white md:ml-[20px] md:mr-[20px] shadow-lg scale-110 "
                                : "border-2 py-1 px-2 md:py-4 md:px-6 border-black bg-[#EDD3C5] text-[12px] md:text-[25px] rounded-xl hover:bg-[#2F4858] hover:text-white transition ease-in-out duration-300 hover:scale-105 md:ml-[20px] md:mr-[20px] hover:shadow-lg"
                        }
                    >
                        {name}
                    </NavLink>
                ))}
                <Button
                    title="Logout"
                    handleClick={onLogout}
                    className="border-2 py-1 px-2 md:py-4 md:px-6 border-black bg-[#EDD3C5] rounded-xl  text-[12px] md:text-[25px] hover:bg-black hover:text-white transition ease-in-out duration-300 hover:scale-105 md:ml-[20px] md:mr-[20px] hover:shadow-lg"
                />
                </div>
                <div className="md:flex items-start  mt-3 p-3 align-center justify-center text center">
                    <img
                        className="h-0 w-0 md:h-16 md:w-16 object-cover rounded-full"
                        src="https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Ff6ccabba-ea38-411f-a673-04f26b5e919c_980x980.jpeg"
                        alt="A image"
                    />
                    
                    
                    <NavLink to="/dashboard/userProfile" className="border-2 py-1 px-2 md:py-4 md:px-6 border-black bg-[#EDD3C5] rounded-xl hover:bg-[#2F4858] hover:text-white transition ease-in-out duration-300 hover:scale-105 md:ml-[20px] md:mr-[20px] hover:shadow-lg"> Profile </NavLink>
                    
                </div>
            </div>
            <div className="text-white md:hidden">
          
        </div>
        </div>
        <div className="flex flex-col justify-center md:flex-row w-full h-[auto] md:h-[90%] z-10 relative">
        

  
                <div className="md:w-[90%] p-3 md:px-8 md:py-6 w-full h-full ">
          <Outlet />
        </div>

        </div>
    </div>
}