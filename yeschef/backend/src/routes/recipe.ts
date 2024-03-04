import { Router } from "express";
import { validate } from "../middlewares";
import { createRecipeSchema, getRecipeSchema, getUserRecipesSchema, searchRecipeSchema } from "../schema-validations/index";

const router = Router();

router.post("/join");

router.get("/find", validate(searchRecipeSchema));
router.get("/");
router.post("/create", validate(createRecipeSchema));
router.get("/user/:userId", validate(getUserRecipesSchema));
router.get("/:id", validate(getRecipeSchema));



export {router};

