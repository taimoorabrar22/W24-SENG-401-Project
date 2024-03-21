import { useContext, useLayoutEffect, useState } from "react";
import { AuthenticationContext } from "../context";
import { AUTH_TYPE } from "../@types";
import { NavLink, Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { Button } from "../components";
import { MdOutlineClose } from "react-icons/md";
import { FiMenu } from "react-icons/fi";

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
    }, [])
    const { onLogout, loading, user } = useContext(AuthenticationContext) as AUTH_TYPE;
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const handleIsOpen = () => {
        setIsOpen((prev) => !prev);
    }
    
    return <div className="w-full h-full bg-customGreen max-w-full overflow-x-hidden">
        <div className="h-[60px] md:h-[80px] bg-customBeige flex items-center justify-between px-3 sticky top-0 z-50">
            <div className="flex items-center">
                <h2 className="text-white font-bold text-3xl hover:text-customPink text-center">
                    <NavLink to="/dashboard"> Yes Chef</NavLink>
                </h2>
            </div>
            <div className="text-white md:hidden">
          {isOpen ? (
            <MdOutlineClose onClick={handleIsOpen} />
          ) : (
            <FiMenu onClick={handleIsOpen} />
          )}
        </div>
        </div>
        <div className="flex flex-col md:flex-row w-full h-full z-10 relative">
            <div className="hidden md:block bg-customBeige2 h-full w-[20%]  border-2 border-white">
                <div className="md:flex gap-8 items-start w-full p-3">
                    <img
                        className="h-16 w-16 object-cover rounded-full"
                        src="https://images.unsplash.com/photo-1654922207993-2952fec328ae?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt="A image"
                    />
                    <div>
                        <p className="text-customPink italic text-md"> {user} </p>
                    </div>
                </div>
                <div className="flex flex-col gap-y-1  mt-3">
                {routes.map(({ name, to }) => (
                    <NavLink
                        key={name + to}
                        to={to}
                        className={({ isActive }) =>
                            isActive && pathname === to
                                ? "text-white font-thin text-xl border-2 border-white bg-customPink p-4"
                                : "text-white font-thin text-xl border-2 border-white hover:bg-customPink p-4"
                        }
                    >
                        {name}
                    </NavLink>
                ))}
                <Button
                    title="Logout"
                    handleClick={onLogout}
                    className="text-white border-2 border-white font-thin text-xl text-left hover:bg-customPink p-4"
                />
            </div>
            </div>

            {isOpen && (
          <div className="md:hidden bg-customBeige2 w-full h-full top-0 absolute md:relative">
            <div className="flex gap-8 items-start w-full p-3">
              <img
                className="w-10 h-10 rounded-3xl"
                src="https://images.unsplash.com/photo-1654922207993-2952fec328ae?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt=""
              />
              <div>
                <p className="text-customPink text-md">{user} </p>
              </div>
            </div>
            <div className="flex flex-col gap-y-1  mt-3">
              {routes.map(({ name, to }) => (
                <NavLink
                  key={name + to}
                  to={to}
                  onClick={handleIsOpen}
                  className={({ isActive }) =>
                    isActive && pathname === to
                    ? "text-white font-thin text-2xl bg-customPink p-4"
                    : "text-white font-thin text-2xl hover:bg-customPink p-4"
                  }
                >
                  {name}
                </NavLink>
              ))}
              <Button
                title="Logout"
                handleClick={onLogout}
                className="text-white font-thin text-2xl text-left hover:bg-customPink p-4"
              />
            </div>
          </div>
        )}
                <div className="md:w-[80%] p-3 md:px-8 md:py-6 w-full h-full ">
          <Outlet />
        </div>

        </div>
    </div>
}