import React, { FormEvent } from "react";
import { Form } from "./form";
import { Input } from "./input";

export const SearchBox = ({
  title,
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
      <h2 className="font-extrabold text-xl ">{title}</h2>
      <Form onSubmit={onSearch}>
        <Input
          disabled={disabled}
          placeholder="Search for a recipe"
          type="text"
          value={query}
          handleChange={(e: FormEvent<HTMLInputElement>) =>
            setQuery(e.currentTarget.value)
          }
          className={`bg-customBeige2 py-1 px-4 w-full shadow-xl text-white placeholder:text-sm placeholder:text-white
        hover:bg-customPink cursor-pointer focus:outline-none my-3
        `}
        />
      </Form>
    </>
  );
};