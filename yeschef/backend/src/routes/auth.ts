import { Router } from "express";
import { registerOrLogin } from "../controllers/auth";
import { validate } from "../middlewares/validate";
import { joinSchema } from "../schema-validations/index";

const router = Router();

router.post("/join", validate(joinSchema), registerOrLogin);

export {router};