import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { IRECIPEUSER } from "../@types";
import { Button } from "./button";

export const RecipeCard = ({
  _id,
  title,
  ingredients,
  image,
  description,
  user,
}: IRECIPEUSER) => {
  const navigate = useNavigate();
  const handleViewMore = (id: string) => {
    navigate("/dashboard/recipe/" + id);
  };
  return (
    <Card
      id={_id}
      title={title}
      image={image?.url}
      ingredients={ingredients}
      description={description}
      email={user}
      avatar="https://i.pinimg.com/originals/00/f6/8b/00f68bbb421e25454c0447bae88b537b.jpg"
    >
      <div className="flex justify-end">
        <Button
          title="View  More"
        handleClick={() => handleViewMore(_id)}
          
          className={`border-2 py-1 bg-[#EDD3C5] text-[#1b4235] px-2 border-black rounded-xl text-[15px] text-center hover:bg-[#2F4858] hover:text-white transition max-w-80 justify ease-in-out duration-300 hover:scale-105 hover:shadow-lg
          `}
        />
      </div>

    </Card>
  );
};

export const Card = ({
  avatar,
  image,
  title,
  description,
  email,
  ingredients,
  note,
  children,
  isFull = false,
}: {
  id: string;
  avatar: string;
  image: string;
  description: string;
  title: string;
  email: string;
  ingredients: string;
  note?: string;
  children?: ReactNode;
  isFull?: boolean;
}) => {
  return (
    <div
      className={`w-full ${
        isFull ? "md:w-[50%]" : "md:w-[14rem] "
      } bg-[#EDD3C5]  
      transition ease-in-out delay-150
      hover:
      hover:scale-105
      duration-300
      mb-4
      rounded-lg
      `}
    >
      <img
        src={image}
        alt={"A picture of " + title}
        className={`w-full ${
          isFull ? "md:w-full" : "md:w-[14rem] "
        } h-full md:[10rem] ${
          isFull ? "md:h-[20rem]" : "md:h-[14rem]"
        } object-cover
        rounded-lg`}
      />
      <div
        className={`p-2 bg-[#EDD3C5]  w-full ${
          isFull ? "md:w-full" : "md:w-[14rem] "
        } h-15rem] overflow-clip my-3`}
      >
        <div className="flex gap-4 items-start w-full">
          <img
            className="h-12 w-12 object-cover rounded-full"
            src={avatar}
            alt={"A picture of user"}
          />
          <div className="text-left">
            <p className="text-[#1b4235] font-light">{email}</p>
          </div>
        </div>
        <h2
          className={`text-[#1b4235] font-bold my-2 text-xl  ${
            !isFull && "truncate overflow-hidden ..."
          } `}
        >
          {title}
        </h2>
        <p className="text-[#1b4235] font-light text-sm">
          ingredients:{" "}
          <span
            className={`text-[#1b4235]  ${
              !isFull && "truncate overflow-hidden ..."
            }`}
          >
            {ingredients}
          </span>
        </p>

        <p
          className={`text-[#1b4235] font-light text-sm my-2 ${
            !isFull && "truncate overflow-hidden ..."
          }`}
        >
          {description}
        </p>

        {note && (
          <p className="text-[#1b4235] font-light text-sm py-1 md:py-4">
            note: <span className="text-[#1b4235]">{note}</span>
          </p>
        )}
        {children}
      </div>
    </div>
  );
};