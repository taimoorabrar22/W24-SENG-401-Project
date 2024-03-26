import * as dotenv from "dotenv";
dotenv.config();
import express, { Application, Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import passport from "passport";
import {connect} from "mongoose";
import fileUpload from "express-fileupload"
import { authenticate } from "./config/passport";

//@ts-ignore
import xssClean from "xss-clean";
import { authRouter, recipeRouter } from "./routes";

const app: Application = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
//set http headers
app.use(helmet());

app.use(fileUpload({
  limits: {fileSize: 50*1024*1024},
  abortOnLimit: true,
}))

app.use(passport.initialize());

//Passport conifg 
authenticate(passport);

app.use('/auth', authRouter)
app.use('/recipe', recipeRouter)

app.get('/ping', (req: Request, res: Response)=>{
  res.send("pong")
});

app.all("*", async (req: Request, res: Response) => {
  res.status(404).json({
    error: "The route you requested is not found",
  });
});

//initialize DB call
const runDB = async () => {
  connect(process.env.MONGODB_URI as string)
    .then(() => console.log("DB connected successfully"))
    .catch(() => console.log("DB not connected"));
};

runDB();

const PORT = (process.env.PORT as unknown as number) || 5000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});