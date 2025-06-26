import dotenv from "dotenv";
import cors from "cors";
import express from "express";
import authRoutes from "./routes/jwtAuth"
import sendEmail from "./routes/notificationRoutes";
import infoRoutes from "./routes/infoRoutes";
import loanRoutes from "./routes/loanRoutes";
import notifRoutes from "./routes/notifRoutes";
import capitalRoutes from "./routes/capitalRoutes";
import savingsRoutes from "./routes/savingsRoutes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 9000;

app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoutes);

app.use("/api/user", infoRoutes);

app.use("/api/notification", sendEmail);

app.use("/api/loans", loanRoutes);

app.use("/api/notifications", notifRoutes);

app.use("/api/capital", capitalRoutes);

app.use("/api/savings", savingsRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
