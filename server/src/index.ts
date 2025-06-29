import dotenv from "dotenv";
import cors from "cors";
import express from "express";
import authRoutes from "./routes/jwtAuth"
import infoRoutes from "./routes/infoRoutes";
import loanRoutes from "./routes/loanRoutes";
import capitalRoutes from "./routes/capitalRoutes";
import savingsRoutes from "./routes/savingsRoutes";
import auditRoutes from "./routes/auditRoutes";
import paymentsRoutes from "./routes/paymentsRoutes";
import bugReportRoutes from "./routes/bugReportRoutes";
import appointmentRoutes from "./routes/appointmentRoutes";
import smsRoutes from "./routes/smsRoutes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 9000;

app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoutes);

app.use("/api/user", infoRoutes);

app.use("/api/loans", loanRoutes);

app.use("/api/capital", capitalRoutes);

app.use("/api/savings", savingsRoutes);

app.use("/api/audit", auditRoutes);

app.use("/api/payments", paymentsRoutes);

app.use("/api/bugs", bugReportRoutes);

app.use("/api/appointments", appointmentRoutes);

app.use("/api/sms", smsRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
