import { useRouteError, useNavigate } from "react-router-dom";
import { Button } from "../../components";

export const ErrorPage = () => {
  const navigate = useNavigate();
  const error: any = useRouteError();
  console.error(error);
  const handleNavigate = () => {
    navigate("/");
  };
  return (
    <div className="w-[100vw] h-[auto] md:h-[100%] flex items-center justify-center flex-col bg-[#1b4235]">
      <img src="https://i.ibb.co/jwtgzqf/image-removebg-preview-3.png" alt="image-removebg-preview-3" />
      <div className="text-center">
      <h1 className="text-lg font-extrabold text-white text-[73px] m-[30px]">Oops!</h1>
      <h1 className="text-white text-[73px]">Sorry, an unexpected error has occurred.</h1>
      </div>
      <Button
        title="Click to reload"
        handleClick={handleNavigate}
        className={`border-2 py-4 px-6 border-black bg-[#EDD3C5] rounded-xl hover:bg-[#2F4858] hover:text-white transition ease-in-out duration-300 hover:scale-105 ml-[20px] mr-[20px] hover:shadow-lg
          `}
      />
    </div>
  );
};