import { useState, useEffect } from "react";
import CustomTable from "../components/Dashboard/CustomTable";
import axios from "../api/axiosInstance";

interface AppointmentItem {
  id: string;                         // ← add this
  name: string;
  concern: string;
  requestedDate: string;
  requestedTime: string;
  status: "accepted" | "declined" | "pending";
}

const Appointment = () => {
  const [appointments, setAppointments] = useState<AppointmentItem[]>([]);

  const handleDecision = async (
    index: number,
    decision: "accepted" | "declined"
  ) => {
    const apt = appointments[index];
    console.log(`Updating appointment with id: ${apt.id}, decision: ${decision}`);

    try {
      await axios.patch(`/api/notifications/update/status/${apt.id}`, {
        status: decision,
      });

      // only update UI after the API succeeds
      setAppointments(prev =>
        prev.map((a, i) =>
          i === index ? { ...a, status: decision } : a
        )
      );

      alert(
        `You have ${decision === "accepted" ? "accepted" : "declined"} the appointment of ${apt.name}.`
      );
    } catch (err) {
      console.error("Failed to update appointment:", err);
      alert("Sorry, could not update appointment. Please try again.");
    }
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
            id: string;                    // ← make sure your backend returns an `id`
            name: string;
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
          id: a.id,                       // ← include it here
          name: a.name,
          concern: a.message,
          requestedDate: a.appointment_date.split("T")[0],
          requestedTime: formatTime(a.appointment_time),
          status: a.status as "accepted" | "declined" | "pending",
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
        <div
          className="d-flex align-items-center mb-3"
          style={{ gap: 12, paddingTop: 20 }}
        >
          <h3 className="mb-0">Appointment</h3>
        </div>
        <div
          className="conttwo d-flex align-items-center mb-4"
          style={{ gap: 16 }}
        >
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
                <div key={row.id} style={{ display: "flex", gap: 8 }}>
                  <button
                    className="btn btn-success btn-sm"
                    onClick={() => handleDecision(idx, "accepted")}
                    disabled={row.status.toLowerCase() !== "pending"}
                  >
                    Accept
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDecision(idx, "declined")}
                    disabled={row.status.toLowerCase() !== "pending"}
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
