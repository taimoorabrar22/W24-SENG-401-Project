import { useState, Suspense, useContext } from "react";
import useSWR from "swr";
import cogoToast from "cogo-toast";

import { RecipeCard } from "../../components";
import { instance } from "../../config";
import { AUTH_TYPE, IRECIPERESPONSE } from "../../@types";
import { AuthenticationContext } from "../../context";
import { NoRecipe } from "../common";
import { useRecipe } from "../../hooks";
import { SearchLoader, UILoader } from "../../components/loaders";

export const MyRecipes = () => {
  const { loading } = useRecipe();
  const { user } = useContext(AuthenticationContext) as AUTH_TYPE;

  //useswr fetcher
  const fetcher = (url: string) => instance.get(url).then((res) => res.data);
  const { data, error } = useSWR(
    `/recipe/user/${sessionStorage.getItem("id")}`,
    fetcher,
    {
      suspense: true,
    }
  );

  if (error) {
    console.log(error);
    cogoToast.error(error?.response?.data?.error);
    return null;
  }

  const [state] = useState<IRECIPERESPONSE[]>(data || {});


  return (
    <Suspense fallback={<UILoader />}>
      <div className="text-white w-full h-full">
        {loading ? (
          <SearchLoader />
        ) : (
          <>
            {!!state?.length ? (
              <div className="flex flex-wrap gap-3 justify-center flex-col md:flex-row w-ful">
                {state.map((recipe: IRECIPERESPONSE, index: number) => (
                  <RecipeCard
                    key={index + recipe._id}
                    {...recipe}
                    user={user}
                  />
                ))}
              </div>
            ) : (
              <>
                <NoRecipe />
              </>
            )}
          </>
        )}
      </div>
    </Suspense>
  );
};