import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";
import SearchBar from "../components/Dashboard/SearchBar";
import CustomTable from "../components/Dashboard/CustomTable";
import ButtonCustom from "../components/Dashboard/ButtonCustom";
import Backbutton from "../components/Dashboard/Backbutton";
import EditStatus from "../components/Dashboard/EditStatus";
import axios from '../api/axiosInstance';

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
      status: "Pending",
    },
  ]);

  const [filteredApps, setFilteredApps] = useState(applications);

  useEffect(() => {
    document.title = "MHSTEMPC | Applications";
  }, []);

  const openEditModal = (index: number) => {
    setEditingIndex(index);
    setShowEditModal(true);
  };

// Example inside handleUpdateStatus in your React component:
  const handleUpdateStatus = async (newStatus: string) => {
    if (editingIndex === null) return;

    const editedApp = filteredApps[editingIndex];
    const loanIdentifier = editedApp.loanNo; // must match the DB id used in backend

    // Optionally keep previousStatus for rollback
    const previousStatus = editedApp.status;

    // Optimistic UI update (optional):
    const optimisticApp = { ...editedApp, status: newStatus };
    setFilteredApps(prev => {
      const arr = [...prev];
      arr[editingIndex] = optimisticApp;
      return arr;
    });
    setApplications(prev => {
      const arr = [...prev];
      const idx = prev.findIndex(app => app.id === loanIdentifier);
      if (idx !== -1) arr[idx] = optimisticApp;
      return arr;
    });
    setShowEditModal(false);
    setEditingIndex(null);

    try {
      const response = await axios.patch(`/api/loans/${loanIdentifier}/status`, {
        status: newStatus.toLowerCase(),
      });
      console.log("Server response:", response.data);
      // Optionally replace optimistic data with server-returned data:
      // const updatedFromServer = response.data.loan;
      // setFilteredApps(...) and setApplications(...) accordingly.
    } catch (error) {
      console.error("Failed to update status on server:", error);
      // Rollback on error
      setFilteredApps(prev => {
        const arr = [...prev];
        // Find index again: careful because filteredApps state was overwritten optimistically
        const idx = prev.findIndex(app => app.id === loanIdentifier);
        if (idx !== -1) {
          arr[idx] = { ...arr[idx], status: previousStatus };
        }
        return arr;
      });
      setApplications(prev => {
        const arr = [...prev];
        const idx = prev.findIndex(app => app.id === loanIdentifier);
        if (idx !== -1) {
          arr[idx] = { ...arr[idx], status: previousStatus };
        }
        return arr;
      });
      alert("Failed to update status. Please try again.");
    }
  };


  const handleSearch = (query: string) => {
    const lowerQuery = query.trim().toLowerCase();

    if (lowerQuery === "") {
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

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      filteredApps.map(app => ({
        Name: app.name,
        "MHSTEMPC Policy No.": app.id,
        "Loan No.": app.loanNo,
        "Loan Amount": app.loanAmount,
        "Date Release": app.dateRelease,
        "Approved By": app.approvedBy,
        "Due Date": app.dueDate,
        "Approval Status": app.status,
      }))
    );

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Applications");
    XLSX.writeFile(workbook, "applications.xlsx");
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/loans/all');
      if (response.data && Array.isArray(response.data)) {
          // Transform the data
          const transformedData = response.data.map(item => ({
            name: item.name,
            id: item.policy_number,
            loanNo: item.id,
            loanAmount: `₱${Number(item.requested_amount).toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            })}`,
            dateRelease: item.application_date.slice(0, 10),
            approvedBy: "Admin", // Replace with actual data if available
            dueDate: item.due_date.slice(0, 10),
            status: item.status.charAt(0).toUpperCase() + item.status.slice(1), // e.g. 'Pending'
          }));

          // Set the state
          setApplications(transformedData);
          setFilteredApps(transformedData);
      } else {
        console.error("Unexpected response format:", response.data);
      }

    } catch (error) {
      console.error("Error fetching applications:", error);
    }
    };
    fetchData();
  }, []);

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
            onClick={exportToExcel}
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
