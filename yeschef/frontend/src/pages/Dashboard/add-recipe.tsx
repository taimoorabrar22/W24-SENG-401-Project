import cogoToast from "cogo-toast";
import React, { DragEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, Input, TextArea } from "../../components";
import { useRecipe } from "../../hooks";
import { validateImageType } from "../../utils";
import { ImageUploader } from "../common";

export const AddRecipe = () => {
  const navigate = useNavigate();
  const { loading, addRecipe } = useRecipe();
  const [state, setState] = useState({
    title: "",
    note: "",
    description: "",
    ingredients: "",
  });
  const [image, setImage] = useState<File | null>(null);

  //prepare element to be accept dropping contents
  const handleOnDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };
  const handleOnDrop = (event: DragEvent<HTMLDivElement>) => {
    //prevent the browser from opening the image
    event.preventDefault();
    event.stopPropagation();
    //let's grab the image file
    let imageFile = event.dataTransfer.files[0];

    if (!validateImageType(imageFile)) {
      return cogoToast.error("File type is wrong" + imageFile.type);
    }

    setImage(imageFile);
  };

  const handleFile = (event: FormEvent<HTMLInputElement>) => {
    if (!event.currentTarget.files) return;
    const imageFile = event.currentTarget.files[0];
    if (!validateImageType(imageFile)) {
      return cogoToast.warn("File type is wrong" + imageFile.type);
    }

    setImage(imageFile);
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!image) {
      return cogoToast.error("Please add an image");
    }

    if (!state?.title || !state?.description || !state?.ingredients) {
      return cogoToast.error("Please fill the missing field");
    }
    const payload = {
      image,
      ...state,
    };
    await addRecipe(payload);
    setState({ title: "", note: "", description: "", ingredients: "" });
    setImage(null);
    navigate("/dashboard/myrecipes");
  };
  const onChange = (
    e: FormEvent<HTMLInputElement> | FormEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.currentTarget;

    setState({ ...state, [name]: value });
  };

  return (
    <div className="text-[#1b4235] bg-[#EDD3C5] mb-[20px] md:mt-[10px] h-[auto] pl-[40px] md:h-[100%] pr-[40px] rounded-xl">
      <h2 className="text-[#1b4235] md:text-[55px] text-[30px] pt-10 font-semibold leading-[normal] text-center  ">Add a recipe</h2>

      <Form
        onSubmit={onSubmit}
        className={`mt-3 flex flex-col gap-[10px] md:gap-[30px] md:flex-row`}
      >
        <div className="w-full">
          <Input
            disabled={loading}
            name="title"
            placeholder="Name of the recipe"
            type="text"
            handleChange={onChange}
            className={`w-[100%] h-20 overflow-hidden bg-[#F3F3F3] text-[#1b4235] transition-all duration-[0.5s] text-[16px] md:text-[25px] mt-5 md:mt-10 pl-[0.8em] rounded-[10px] border-[5px] border-solid  hover:border-[#2F4858] hover:bg-[white] hover:border-[5px] hover:border-solid;`}
          />

          <TextArea
            disabled={loading}
            name="ingredients"
            placeholder="Ingredients"
            onChange={onChange}
            rows={4}
            className={`w-[100%] overflow-hidden bg-[#F3F3F3] text-[#1b4235] transition-all duration-[0.5s] text-[16px] md:text-[25px] mt-5 pl-[0.8em] md:mt-10 rounded-[10px] border-[5px] border-solid  hover:border-[#2F4858] hover:bg-[white] hover:border-[5px] hover:border-solid`}
          />

          <TextArea
            disabled={loading}
            name="description"
            placeholder="Recipe description and how to make it"
            onChange={onChange}
            rows={6}
            className={`w-[100%] overflow-hidden bg-[#F3F3F3] text-[#1b4235] transition-all duration-[0.5s] text-[16px] md:text-[25px] mt-5 md:mt-10 pl-[0.8em] rounded-[10px] border-[5px] border-solid  hover:border-[#2F4858] hover:bg-[white] hover:border-[5px] hover:border-solid`}
          />
        </div>
        <div className="w-full flex flex-col justify-center gap-2">
          <ImageUploader
            handleDragOver={handleOnDragOver}
            handleOnDrop={handleOnDrop}
            handleFile={handleFile}
            name={image?.name as string}
            className={`w-[100%] overflow-hidden bg-[#F3F3F3] text-[#1b4235] transition-all duration-[0.5s] text-[16px] md:text-[25px] mt-5 md:mt-10 pl-[0.8em] rounded-[10px] border-[5px] border-solid  hover:border-[#2F4858] hover:bg-[white] hover:border-[5px] hover:border-solid`}
          />
          <TextArea
            disabled={loading}
            name="note"
            placeholder="Notes"
            onChange={onChange}
            rows={4}
            className={`w-[100%] overflow-hidden bg-[#F3F3F3] text-[#1b4235] transition-all duration-[0.5s] text-[16px] md:text-[25px] mt-5 md:mt-10 pl-[0.8em] rounded-[10px] border-[5px] border-solid  hover:border-[#2F4858] hover:bg-[white] hover:border-[5px] hover:border-solid`}
          />
          <Button
            disabled={loading}
            title={loading ? "Publishing..." : "Publish Recipe"}
            className={`border-2 py-4 bg-[#F3F3F3] text-[#1b4235] px-6 mt-[20px] border-black rounded-xl text-[16px] text-center hover:bg-[#2F4858] hover:text-white transition justify ease-in-out duration-300 max-w-105 hover:scale-105 hover:shadow-lg`}
            type="submit"
          />
        </div>
      </Form>
    </div>
  );
};// }w-[70%] h-20 overflow-hidden bg-[#F3F3F3] text-[#1b4235] transition-all duration-[0.5s] text-[25px] mt-10 pl-[0.8em] rounded-[10px] border-[3px] border-solid  hover:border-[#1b4235] hover:bg-[white] hover:border-[3px] hover:border-solid;

//w-[100%] h-20 overflow-hidden bg-[#F3F3F3] text-[#1b4235] transition-all duration-[0.5s] text-[25px] mt-10 pl-[0.8em] rounded-[10px] border-[5px] border-solid  hover:border-[#2F4858] hover:bg-[white] hover:border-[5px] hover:border-solid;