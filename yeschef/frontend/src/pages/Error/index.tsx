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
    <div className="w-[100vw] h-[100vh] flex items-center justify-center flex-col bg-customBeige">
      <h1 className="text-lg font-extrabold text-white">Oops!</h1>
      <p className="text-white">Sorry, an unexpected error has occurred.</p>
      <Button
        title="Click to reload"
        handleClick={handleNavigate}
        className={`bg-customPink text-white hover:bg-customPink2
          py-1 px-2 w-[50%]
          `}
      />
    </div>
  );
};