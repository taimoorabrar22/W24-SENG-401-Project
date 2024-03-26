import { useNavigate } from "react-router-dom";
import { Button } from "../../components";

export const NoRecipe = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/dashboard/addrecipe", { replace: true });
  };
  return (
    <div className="flex items-center justify-center flex-col md:w-[50%] m-auto">
      <h3 className="text-white font-bold text-lg p-4">No Recipes found.</h3>
      <Button
        handleClick={handleNavigate}
        title="Add Recipe"
        className={`bg-customPink text-white hover:bg-customPink2 py-1 px-6 w-full mb-4 `}
        type="button"
      />
    </div>
  );
};