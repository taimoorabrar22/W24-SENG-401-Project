import { Router } from "express";
import { register, login, update } from "../controllers/auth";
import { validate } from "../middlewares/validate";
import { joinSchema, updateSchema } from "../schema-validations/index";

const router = Router();

router.post("/join", validate(joinSchema), register);
router.post("/login", validate(joinSchema), login);
router.put("/update",validate(updateSchema),  update)

export {router};