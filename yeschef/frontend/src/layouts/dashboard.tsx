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
        <div className="h-[60px] md:h-[80px] flex items-center justify-between px-3 sticky top-0 z-50">
            <div className="flex items-center justify-evenly w-full">
                <h2 className="text-white font-bold text-3xl hover:text-customPink text-center">
                    <NavLink to="/dashboard"> Yes Chef</NavLink>
                </h2>

                <div className="flex  gap-y-1  mt-3">
                {routes.map(({ name, to }) => (
                    <NavLink
                        key={name + to}
                        to={to}
                        className={({ isActive }) =>
                            isActive && pathname === to
                                ? "border-2 py-4 px-6 border-black bg-[#2F4858] rounded-xl text-white ml-[20px] mr-[20px] shadow-lg"
                                : "border-2 py-4 px-6 border-black bg-[#EDD3C5] rounded-xl hover:bg-[#2F4858] hover:text-white transition ease-in-out duration-300 hover:scale-105 ml-[20px] mr-[20px] hover:shadow-lg"
                        }
                    >
                        {name}
                    </NavLink>
                ))}
                <Button
                title="Search"
                
                className="border-2 py-4 px-6 border-black bg-[#EDD3C5] rounded-xl hover:bg-black hover:text-white transition ease-in-out duration-300 hover:scale-105 ml-[20px] mr-[20px] hover:shadow-lg"
                  />
                <Button
                    title="Logout"
                    handleClick={onLogout}
                    className="border-2 py-4 px-6 border-black bg-[#EDD3C5] rounded-xl hover:bg-black hover:text-white transition ease-in-out duration-300 hover:scale-105 ml-[20px] mr-[20px] hover:shadow-lg"
                />
                </div>
                <div className="md:flex items-start  p-3">
                    <img
                        className="h-16 w-16 object-cover rounded-full"
                        src="https://images.unsplash.com/photo-1654922207993-2952fec328ae?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt="A image"
                    />
                    <div>
                    <h2 className="text-white font-bold text-md hover:text-customPink text-center">
                    <NavLink to="/dashboard/userProfile"> {user} </NavLink>
                </h2>
                    </div>
                </div>
            </div>
            <div className="text-white md:hidden">
          {isOpen ? (
            <MdOutlineClose onClick={handleIsOpen} />
          ) : (
            <FiMenu onClick={handleIsOpen} />
          )}
        </div>
        </div>
        <div className="flex flex-col justify-center md:flex-row w-full h-full z-10 relative">
        

  
                <div className="md:w-[100%] p-3 md:px-8 md:py-6 w-full h-full ">
          <Outlet />
        </div>

        </div>
    </div>
}