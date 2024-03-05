import { Router } from "express";
import { validate } from "../middlewares";
import { createRecipeSchema, getRecipeSchema, getUserRecipesSchema, searchRecipeSchema } from "../schema-validations/index";
import { searchRecipe, getUserRecipes, getRecipe, getAllRecipes } from "./../controllers/recipe";

const router = Router();

router.get("/", getAllRecipes);
router.get("/find", validate(searchRecipeSchema), searchRecipe);
router.post("/create", validate(createRecipeSchema));
router.get("/user/:userId", validate(getUserRecipesSchema), getUserRecipesSchema);
router.get("/:id", validate(getRecipeSchema), getRecipe);



export {router};

