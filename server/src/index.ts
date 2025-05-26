import dotenv from "dotenv";
import express, { Request, Response } from "express";
import getAccounts from "./routes/accountsRoutes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 9000;

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.use("/", getAccounts);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
