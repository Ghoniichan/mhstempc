import { useState, useEffect } from "react";
import CustomTable from "../components/Dashboard/CustomTable";
import axios from "../api/axiosInstance";

interface AppointmentItem {
  name: string;
  concern: string;
  requestedDate: string;
  requestedTime: string;
  status: "Accepted" | "Declined" | "Pending";
}

const Appointment = () => {
  const [appointments, setAppointments] = useState<AppointmentItem[]>([
    {
      name: "John Doe",
      concern: "Loan Inquiry",
      requestedDate: "2025-06-20",
      requestedTime: "10:00 AM",
      status: "Pending",
    },
    {
      name: "Jane Smith",
      concern: "Loan Application",
      requestedDate: "2025-06-21",
      requestedTime: "2:00 PM",
      status: "Pending",
    },
  ]);

  const handleDecision = (index: number, decision: "Accepted" | "Declined") => {
    setAppointments(prev =>
      prev.map((apt, i) =>
        i === index ? { ...apt, status: decision } : apt
      )
    );
    alert(
      `You have ${
        decision === "Accepted" ? "accepted" : "declined"
      } the appointment of ${appointments[index].name}.`
    );
  };

  useEffect(() => {
    async function loadAppointments() {
      try {
        const token = localStorage.getItem("token");
        const accountId = token
          ? JSON.parse(atob(token.split(".")[1])).user.id
          : null;
        if (!accountId) throw new Error("No account ID in token");

        const res = await axios.get(
          `/api/notifications/get-my-appointments/${accountId}`
        );
        const { appointments: raw } = res.data as {
          appointments: {
            sender: string;
            message: string;
            appointment_date: string;
            appointment_time: string;
            status: string;
          }[];
        };

        const formatTime = (hhmmss: string) => {
          const [h, m] = hhmmss.split(":").map(Number);
          const suffix = h >= 12 ? "PM" : "AM";
          const hour12 = ((h + 11) % 12) + 1;
          return `${hour12}:${String(m).padStart(2, "0")} ${suffix}`;
        };

        const mapped: AppointmentItem[] = raw.map(a => ({
          name: a.sender,              // swap in a lookup if you have real names
          concern: a.message,
          requestedDate: a.appointment_date.split("T")[0],
          requestedTime: formatTime(a.appointment_time),
          status: a.status as "Accepted" | "Declined" | "Pending",
        }));

        setAppointments(mapped);
      } catch (err) {
        console.error("Failed to load appointments:", err);
      }
    }

    loadAppointments();
  }, []);

  return (
    <div
      className="appointment-cont"
      style={{ minHeight: "100vh", position: "relative", paddingLeft: 200 }}
    >
      <div className="contOne flex-grow-1 d-flex flex-column p-4">
        <div className="d-flex align-items-center mb-3" style={{ gap: 12, paddingTop: 20 }}>
          <h3 className="mb-0">Appointment</h3>
        </div>
        <div className="conttwo d-flex align-items-center mb-4" style={{ gap: 16 }}>
          <div style={{ width: "100%", overflowX: "auto" }}>
            <CustomTable
              columnHeadings={[
                "Name",
                "Concern",
                "Requested Date",
                "Requested Time",
                "Status",
                "Actions",
              ]}
              rows={appointments.map((row, idx) => [
                row.name,
                row.concern,
                row.requestedDate,
                row.requestedTime,
                row.status,
                <div key={idx} style={{ display: "flex", gap: 8 }}>
                  <button
                    className="btn btn-success btn-sm"
                    onClick={() => handleDecision(idx, "Accepted")}
                    disabled={row.status !== "Pending"}
                  >
                    Accept
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDecision(idx, "Declined")}
                    disabled={row.status !== "Pending"}
                  >
                    Decline
                  </button>
                </div>,
              ])}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Appointment;
