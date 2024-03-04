import * as dotenv from "dotenv";
dotenv.config();
import express, { Application, Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import {connect} from "mongoose";

//@ts-ignore
import xssClean from "xss-clean";

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
//set http headers
app.use(helmet());

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