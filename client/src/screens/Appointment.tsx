/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import CustomTable from "../components/Dashboard/CustomTable";
import ButtonCustom from "../components/Dashboard/ButtonCustom";
import SearchBar from "../components/Dashboard/SearchBar"; 
import axios from "../api/axiosInstance";

interface AppointmentItem {
  id: string;
  name: string;
  concern: string;
  requestedDate: string;
  requestedTime: string;
  status: "accepted" | "declined" | "pending";
}

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

const Appointment = () => {
  const [appointments, setAppointments] = useState<AppointmentItem[]>([]);
  const [original, setOriginal] = useState<AppointmentItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSortKey, setSelectedSortKey] = useState<keyof AppointmentItem>("name");

  const formatTime = (hhmmss: string) => {
    const [h, m] = hhmmss.split(":").map(Number);
    const suffix = h >= 12 ? "PM" : "AM";
    const hour12 = ((h + 11) % 12) + 1;
    return `${hour12}:${String(m).padStart(2, "0")} ${suffix}`;
  };

  useEffect(() => {
    async function loadAppointments() {
      try {
        const token = localStorage.getItem("token");
        const accountId = token
          ? JSON.parse(atob(token.split(".")[1])).user.id
          : null;
        if (!accountId) throw new Error("No account ID in token");

        const res = await axios.get(`/api/notifications/get-my-appointments/${accountId}`);
        const { appointments: raw } = res.data;

        const mapped: AppointmentItem[] = raw.map((a: any) => ({
          id: a.id,
          name: a.name,
          concern: a.message,
          requestedDate: a.appointment_date.split("T")[0],
          requestedTime: formatTime(a.appointment_time),
          status: a.status.toLowerCase() as "accepted" | "declined" | "pending",
        }));

        setAppointments(mapped);
        setOriginal(mapped);
      } catch (err) {
        console.error("Failed to load appointments:", err);
      }
    }

    loadAppointments();
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const t = query.trim().toLowerCase();
    if (!t) return setAppointments(original);

    setAppointments(
      original.filter(item =>
        [item.name, item.concern, item.requestedDate, item.requestedTime, item.status]
          .some(field => field.toLowerCase().includes(t))
      )
    );
  };

  const handleSort = (key: keyof AppointmentItem) => {
    setSelectedSortKey(key);
    const sorted = [...appointments].sort((a, b) =>
      a[key].localeCompare(b[key])
    );
    setAppointments(sorted);
  };

  const handleDecision = async (
    index: number,
    decision: "accepted" | "declined"
  ) => {
    const apt = appointments[index];

    try {
      await axios.patch(`/api/notifications/update/status/${apt.id}`, {
        status: decision,
      });

      setAppointments(prev =>
        prev.map((a, i) =>
          i === index ? { ...a, status: decision } : a
        )
      );

      alert(`You have ${decision === "accepted" ? "accepted" : "declined"} the appointment of ${apt.name}.`);
    } catch (err) {
      console.error("Failed to update appointment:", err);
      alert("Sorry, could not update appointment. Please try again.");
    }
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
          <h3 className="mb-0">Appointment</h3>
        </div>

        <div className="conttwo d-flex align-items-center mb-4" style={{ gap: 16 }}>
          <SearchBar
            value={searchQuery}
            onSearch={handleSearch} 
          />
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
              <div key={row.id} style={{ display: "flex", gap: 8 }}>
                <button
                  className="btn btn-success btn-sm"
                  onClick={() => handleDecision(idx, "accepted")}
                  disabled={row.status !== "pending"}
                >
                  Accept
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDecision(idx, "declined")}
                  disabled={row.status !== "pending"}
                >
                  Decline
                </button>
              </div>,
            ])}
            onRowClick={() => {}}
          />
          {appointments.length === 0 && (
            <p className="text-center mt-3">No results found for "{searchQuery}".</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Appointment;
