/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import CustomTable from "../components/Dashboard/CustomTable";
import SearchBar from "../components/Dashboard/SearchBar";
import ButtonCustom from "../components/Dashboard/ButtonCustom";
import axios from "../api/axiosInstance";

interface AppointmentItem {
  name: string;
  concern: string;
  requestedDate: string;
  requestedTime: string;
  status: "Accepted" | "Declined" | "Pending";
}

const Appointment: React.FC = () => {
  const [appointments, setAppointments] = useState<AppointmentItem[]>([]);
  const [original, setOriginal] = useState<AppointmentItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSortKey, setSelectedSortKey] = useState<keyof AppointmentItem>("name");

  const columnHeadings = [
    "Name",
    "Concern",
    "Requested Date",
    "Requested Time",
    "Status",
  ] as const;
  type HeaderLabel = typeof columnHeadings[number];

  const headerToKey: Record<HeaderLabel, keyof AppointmentItem> = {
    "Name": "name",
    "Concern": "concern",
    "Requested Date": "requestedDate",
    "Requested Time": "requestedTime",
    "Status": "status",
  };

  const formatTime = (hhmmss: string) => {
    const [h, m] = hhmmss.split(":").map(Number);
    const suffix = h >= 12 ? "PM" : "AM";
    const hour12 = ((h + 11) % 12) + 1;
    return `${hour12}:${String(m).padStart(2, "0")} ${suffix}`;
  };

  // Load appointments on mount
  useEffect(() => {
    async function loadAppointments() {
      try {
        // derive accountId from token (if used)
        const token = localStorage.getItem("token");
        const accountId = token
          ? JSON.parse(atob(token.split(".")[1])).user.id
          : null;
        if (!accountId) throw new Error("No account ID in token");

        const res = await axios.get(`/api/notifications/get-my-appointments/${accountId}`);
        const raw = (res.data as any).appointments as any[];

        const mapped: AppointmentItem[] = raw.map(a => ({
          name: a.sender,
          concern: a.message,
          requestedDate: a.appointment_date.split("T")[0],
          requestedTime: formatTime(a.appointment_time),
          status: a.status as AppointmentItem["status"],
        }));

        setAppointments(mapped);
        setOriginal(mapped);
      } catch (err) {
        console.error("Failed to load appointments:", err);
      }
    }

    loadAppointments();
  }, []);
  const handleSearch = (q: string) => {
    setSearchQuery(q);
    const t = q.trim().toLowerCase();
    if (!t) {
      setAppointments(original);
      return;
    }
    setAppointments(
      original.filter(item =>
        [item.name, item.concern, item.requestedDate, item.requestedTime, item.status]
          .some(field => field.toLowerCase().includes(t))
      )
    );
  };

  const handleSort = (key: keyof AppointmentItem) => {
    if (!appointments.length) return;
    setSelectedSortKey(key);
    const sorted = [...appointments].sort((a, b) =>
      a[key].localeCompare(b[key])
    );
    setAppointments(sorted);
  };

  const handleDecision = (index: number, decision: AppointmentItem["status"]) => {
    const targetName = appointments[index].name;
    setAppointments(prev =>
      prev.map((apt, i) =>
        i === index ? { ...apt, status: decision } : apt
      )
    );
    alert(`You have ${decision === "Accepted" ? "accepted" : "declined"} the appointment of ${targetName}.`);
  };
  const sortDropdownItems = columnHeadings.map(label => {
    const key = headerToKey[label];
    return {
      label: key === selectedSortKey ? `✓ ${label}` : label,
      onClick: () => handleSort(key),
    };
  });

  const currentSortLabel = columnHeadings.find(
    lbl => headerToKey[lbl] === selectedSortKey
  )!;

  return (
    <div className="appointment-cont" style={{ minHeight: "100vh", paddingLeft: 200 }}>
      <div className="contOne flex-grow-1 d-flex flex-column p-4">
        <div className="d-flex align-items-center mb-3" style={{ gap: 12, paddingTop: 20 }}>
          <h3 className="mb-0">Appointments</h3>
        </div>

        <div className="d-flex flex-wrap align-items-center mb-3" style={{ gap: 12 }}>
          <div style={{ flex: 1, minWidth: 200 }}>
            <SearchBar value={searchQuery} onSearch={handleSearch} />
          </div>

          <ButtonCustom
            text={`Sort by: ${currentSortLabel}`}
            icon="bi bi-arrow-down-up"
            isDropdown
            dropdownItems={sortDropdownItems}
          />
        </div>

        <div style={{ width: "100%", overflowX: "auto" }}>
          <CustomTable
            columnHeadings={[...columnHeadings, "Actions"]}
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
            onRowClick={() => {}}
          />
        </div>
      </div>
    </div>
  );
};

export default Appointment;
