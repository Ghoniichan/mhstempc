import { useState } from "react";
import CustomTable from "../components/Dashboard/CustomTable";

const Appointment = () => {
  const [appointments, setAppointments] = useState([
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
    const updatedAppointments = [...appointments];
    updatedAppointments[index].status = decision;
    setAppointments(updatedAppointments);

    alert(
      `You have ${decision === "Accepted" ? "accepted" : "declined"} the appointment of ${updatedAppointments[index].name}.`
    );
  };

  return (
    <div
      className="appointment-cont"
      style={{ minHeight: "100vh", position: "relative", paddingLeft: "200px" }}
    >
      <div className="contOne flex-grow-1 d-flex flex-column p-4">
        <div
          className="d-flex align-items-center mb-3"
          style={{ gap: "12px", paddingTop: "20px" }}
        >
          <h3 className="mb-0">Appointment</h3>
        </div>
        <div
          className="conttwo d-flex align-items-center mb-4"
          style={{ gap: "16px" }}
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
              rows={appointments.map((row, index) => [
                row.name,
                row.concern,
                row.requestedDate,
                row.requestedTime,
                row.status,
                <div key={index} style={{ display: "flex", gap: "8px" }}>
                  <button
                    className="btn btn-success btn-sm"
                    onClick={() => handleDecision(index, "Accepted")}
                    disabled={row.status !== "Pending"}
                  >
                    Accept
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDecision(index, "Declined")}
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
