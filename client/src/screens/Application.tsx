import { useState } from "react";
import SearchBar from "../components/Dashboard/SearchBar";
import CustomTable from "../components/Dashboard/CustomTable";
import ButtonCustom from "../components/Dashboard/ButtonCustom";
import Backbutton from "../components/Dashboard/Backbutton";
import EditStatus from "../components/Dashboard/EditStatus";
import { useNavigate } from "react-router-dom";

const Application = () => {
  const navigate = useNavigate();
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const [applications, setApplications] = useState([
    {
      name: "Micha Bandasan",
      id: "MHST12345",
      loanNo: "LN20240601",
      loanAmount: "₱50,000",
      dateRelease: "2025-06-01",
      approvedBy: "Admin",
      dueDate: "2025-12-01",
      status: "Pending"
    },
  ]);

  const [filteredApps, setFilteredApps] = useState(applications);

  const openEditModal = (index: number) => {
    setEditingIndex(index);
    setShowEditModal(true);
  };

  const handleUpdateStatus = (newStatus: string) => {
    if (editingIndex === null) return;

    const updated = [...filteredApps];
    updated[editingIndex] = {
      ...updated[editingIndex],
      status: newStatus
    };

    const globalIndex = applications.findIndex(
      app => app.loanNo === updated[editingIndex].loanNo
    );

    const updatedGlobal = [...applications];
    updatedGlobal[globalIndex] = updated[editingIndex];

    setFilteredApps(updated);
    setApplications(updatedGlobal);
    setShowEditModal(false);
    setEditingIndex(null);
  };

  const handleSearch = (query: string) => {
  const lowerQuery = query.trim().toLowerCase();

  if (lowerQuery === "") {
    // Show all applications if search is cleared
    setFilteredApps(applications);
    return;
  }

  const result = applications.filter(
    app =>
      app.name.toLowerCase().includes(lowerQuery) ||
      app.loanNo.toLowerCase().includes(lowerQuery)
  );

  setFilteredApps(result);
  };


  const rows = filteredApps.map((app, index) => [
    app.name,
    app.id,
    app.loanNo,
    app.loanAmount,
    app.dateRelease,
    app.approvedBy,
    app.dueDate,
    app.status,
    <button
      key={index}
      className="btn btn-sm btn-outline-primary"
      onClick={() => openEditModal(index)}
    >
      Update
    </button>,
  ]);

  return (
    <div className="d-flex" style={{ minHeight: "100vh", position: "relative" }}>
      <div style={{ width: "200px", flexShrink: 0 }}></div>

      <div className="flex-grow-1 d-flex flex-column p-4">
        <div className="d-flex align-items-center mb-3" style={{ gap: "12px" }}>
          <Backbutton />
          <h3 className="mb-0">Applications</h3>
        </div>

        <div className="d-flex align-items-center mb-4" style={{ gap: "16px" }}>
          <div style={{ flex: 1 }}>
            <SearchBar onSearch={handleSearch} />
          </div>

          <ButtonCustom
            text="Application"
            icon="bi bi-file-earmark-text"
            backgroundColor="#ffffff"
            textColor="#000"
            borderColor="#d9d9d9"
            iconSize="20px"
            fontSize="15px"
            height="45px"
            onClick={() => navigate("/applicationForm")}
          />

          <ButtonCustom
            text="Export Excel"
            icon="bi bi-file-earmark-excel"
            backgroundColor="#0d7239"
            textColor="#fff"
            borderColor="#0d7239"
            iconSize="20px"
            fontSize="15px"
            height="43px"
          />
        </div>

        <CustomTable
          columnHeadings={[
            "Name",
            "MHSTEMPC Policy No.",
            "Loan No.",
            "Loan Amount",
            "Date Release",
            "Approve by",
            "Due Date",
            "Approval Status",
            "Update Status",
          ]}
          rows={rows}
        />

        {showEditModal && editingIndex !== null && (
          <div
            className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
            style={{ background: "rgba(0,0,0,0.3)", zIndex: 1050 }}
          >
            <EditStatus
              currentStatus={filteredApps[editingIndex].status}
              onClose={() => setShowEditModal(false)}
              onUpdate={handleUpdateStatus}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Application;
