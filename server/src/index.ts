import dotenv from "dotenv";
import cors from "cors";
import express from "express";
import getAccounts from "./routes/accountsRoutes";
import authRoutes from "./routes/jwtAuth"
import sendEmail from "./routes/notificationRoutes";
import infoRoutes from "./routes/infoRoutes";
import loanRoutes from "./routes/loanRoutes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 9000;

app.use(express.json());
app.use(cors());

app.use("/api/accounts", getAccounts);

app.use("/api/auth", authRoutes);

app.use("/api/user", infoRoutes);

app.use("/api/notification", sendEmail);

app.use("/api/loans", loanRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
