import { Router } from "express";
import { register, login } from "../controllers/auth";
import { validate } from "../middlewares/validate";
import { joinSchema } from "../schema-validations/index";

const router = Router();

router.post("/join", validate(joinSchema), register);
router.post("/login", validate(joinSchema), login)

export {router};