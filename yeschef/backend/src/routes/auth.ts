import { Router } from "express";
import { register, login, update } from "../controllers/auth";
import { validate } from "../middlewares/validate";
import { joinSchema, updateSchemaEmail, updateSchemaPassword  } from "../schema-validations/index";

const router = Router();

router.post("/join", validate(joinSchema), register);
router.post("/login", validate(joinSchema), login);
router.put("/updateEmail",validate(updateSchemaEmail),  update)
router.put("/updatePassword",validate(updateSchemaPassword),  update)

export {router};