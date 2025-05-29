import dotenv from "dotenv";
import cors from "cors";
import express, { Request, Response } from "express";
import getAccounts from "./routes/accountsRoutes";
import login from "./routes/jwtAuth"

dotenv.config();

const app = express();
const PORT = process.env.PORT || 9000;

app.use(express.json());
app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.use("/", getAccounts);

app.use("/auth", login);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
