import dotenv from "dotenv";
import cors from "cors";
import express, { Request, Response } from "express";
import getAccounts from "./routes/accountsRoutes";
import authRoutes from "./routes/jwtAuth"
import sendEmail from "./routes/notificationRoutes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 9000;

app.use(express.json());
app.use(cors());

app.use("/api/accounts", getAccounts);

app.use("/api/auth", authRoutes);

app.use("/api/notification", sendEmail);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
