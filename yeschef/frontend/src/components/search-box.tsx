import React, { FormEvent } from "react";
import { Form } from "./form";
import { Input } from "./input";

export const SearchBox = ({
  onSearch,
  setQuery,
  query,
  disabled,
}: {
  title: string;
  onSearch: (e: FormEvent<HTMLFormElement>) => void;
  setQuery: (e: React.SetStateAction<string>) => void;
  query: string;
  disabled?: boolean;
}) => {
  return (
    <>
    <div className="flex md:w-[70%] w-[100%] mx-auto self-center pt-[10px] justify-evenly pb-[10px] mb-[20px] bg-[#EDD3C5] rounded-lg" >
      <Form onSubmit={onSearch} className="w-[100%] px-[20px]">
        <Input
          disabled={disabled}
          placeholder="Search for a recipe"
          type="text"
          value={query}
          handleChange={(e: FormEvent<HTMLInputElement>) =>
            setQuery(e.currentTarget.value)
          }
          className={`w-full h-[50px] overflow-hidden bg-[#F3F3F3] text-[#1b4235] font-mono transition-all duration-[0.5s] text-[25px] pl-[0.8em] rounded-[10px] border-[3px] border-solid  hover:border-[#1b4235] hover:bg-[white] hover:border-[3px] hover:border-solid;
        `}
        />
      </Form>
     </div>
    </>
  );
};