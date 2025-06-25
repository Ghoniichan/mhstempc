/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";
import SearchBar from "../components/Dashboard/SearchBar";
import CustomTable from "../components/Dashboard/CustomTable";
import ButtonCustom from "../components/Dashboard/ButtonCustom";
import Backbutton from "../components/Dashboard/Backbutton";
import EditStatus from "../components/Dashboard/EditStatus";
import axios from '../api/axiosInstance';
import { JSX } from "react";

const quickSort = <T extends Record<string, any>>(arr: T[], key: string, order: 'asc' | 'desc' = 'asc'): T[] => {
  if (arr.length <= 1) return arr;
  const pivot = arr[arr.length - 1];
  const left: T[] = [];
  const right: T[] = [];

  for (let i = 0; i < arr.length - 1; i++) {
    const a = arr[i][key];
    const b = pivot[key];
    const cond = order === 'asc' ? a < b : a > b;
    if (cond) left.push(arr[i]);
    else right.push(arr[i]);
  }

  return [...quickSort(left, key, order), pivot, ...quickSort(right, key, order)];
};

const sortKeyMap: Record<string, string> = {
  "Name": "name",
  "MHSTEMPC Policy No.": "id",
  "Loan No.": "loanNo",
  "Loan Amount": "loanAmount",
  "Date Release": "dateRelease",
  "Approve by": "approvedBy",
  "Due Date": "dueDate",
  "Status": "status"
};

const Application = () => {
  const navigate = useNavigate();
  const [applications, setApplications] = useState<any[]>([]);
  const [filteredApps, setFilteredApps] = useState<any[]>([]);
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [selectedColumn, setSelectedColumn] = useState<string>("Name");
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    document.title = "MHSTEMPC | Applications";
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('/api/loans/all');
      if (response.data && Array.isArray(response.data)) {
        const transformed = response.data.map((item: any) => ({
          name: item.name,
          id: item.policy_number,
          loanNo: item.id,
          loanAmount: `₱${Number(item.requested_amount).toLocaleString(undefined, { minimumFractionDigits: 2 })}`,
          dateRelease: item.application_date.slice(0, 10),
          approvedBy: "Admin",
          dueDate: item.due_date.slice(0, 10),
          status: item.status.charAt(0).toUpperCase() + item.status.slice(1)
        }));
        setApplications(transformed);
        setFilteredApps(transformed);
      }
    } catch (err) {
      console.error("Error fetching data", err);
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const trimmed = query.toLowerCase();
    const result = applications.filter(app =>
      Object.values(app).some(val =>
        typeof val === "string" && val.toLowerCase().includes(trimmed)
      ) &&
      (selectedStatus === "All" || app.status.toLowerCase() === selectedStatus.toLowerCase())
    );
    setFilteredApps(result);
  };

  const filterByStatus = (status: string) => {
    setSelectedStatus(status);
    const result = applications.filter(app =>
      (status === "All" || app.status.toLowerCase() === status.toLowerCase()) &&
      (searchQuery.trim() === "" || Object.values(app).some(val =>
        typeof val === "string" && val.toLowerCase().includes(searchQuery.toLowerCase())
      ))
    );
    setFilteredApps(result);
  };

  const handleSort = (columnLabel: string, order: 'asc' | 'desc') => {
    const key = sortKeyMap[columnLabel];
    if (!key) return;
    let sorted = [...filteredApps];

    if (key === "loanAmount") {
      sorted.sort((a, b) => {
        const aVal = parseFloat(a[key].replace(/[₱,]/g, ""));
        const bVal = parseFloat(b[key].replace(/[₱,]/g, ""));
        return order === "asc" ? aVal - bVal : bVal - aVal;
      });
    } else {
      sorted = quickSort(sorted, key, order);
    }

    setFilteredApps(sorted);
    setSelectedColumn(columnLabel);
    setSortOrder(order);
  };

  const handleUpdateStatus = async (newStatus: string) => {
    if (editingIndex === null) return;
    const app = filteredApps[editingIndex];
    const prevStatus = app.status;
    const loanNo = app.loanNo;

    const capitalizedStatus = newStatus.charAt(0).toUpperCase() + newStatus.slice(1);

    const optimistic = { ...app, status: capitalizedStatus };
    const updatedList = [...filteredApps];
    updatedList[editingIndex] = optimistic;
    setFilteredApps(updatedList);

    try {
      await axios.patch(`/api/loans/${loanNo}/status`, { status: newStatus.toLowerCase() });
    } catch {
      updatedList[editingIndex] = { ...app, status: prevStatus };
      setFilteredApps(updatedList);
    }

    setShowEditModal(false);
    setEditingIndex(null);
  };

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(filteredApps);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Applications");
    XLSX.writeFile(wb, "applications.xlsx");
  };

  const exportToWord = () => {
    const content = filteredApps.map(app =>
      `Name: ${app.name}\nPolicy No: ${app.id}\nLoan No: ${app.loanNo}\nLoan Amount: ${app.loanAmount}\nDate Release: ${app.dateRelease}\nApproved By: ${app.approvedBy}\nDue Date: ${app.dueDate}\nStatus: ${app.status}\n`
    ).join("\n");
    const blob = new Blob([content], { type: "application/msword;charset=utf-8" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "applications.doc";
    link.click();
  };

  const exportAsImage = async (format: 'jpeg' | 'png') => {
    const table = document.querySelector("table");
    if (!table) return;
    const html2canvas = (await import('html2canvas')).default;
    html2canvas(table).then(canvas => {
      const link = document.createElement("a");
      link.download = `applications.${format}`;
      link.href = canvas.toDataURL(`image/${format}`);
      link.click();
    });
  };

  const rows = filteredApps.map((app, idx) => {
    const status = app.status.toLowerCase();

    let actionColumn: JSX.Element;

    if (status === "pending") {
      actionColumn = (
        <button
          key={idx}
          className="btn btn-sm btn-outline-primary"
          onClick={() => {
            setEditingIndex(idx);
            setShowEditModal(true);
          }}
        >
          Update
        </button>
      );
    } else if (status === "disapproved") {
      actionColumn = <span className="text-danger">Disapproved</span>;
    } else {
      actionColumn = <span className="text-success">Approved</span>;
    }

    return [
      app.name,
      app.id,
      app.loanNo,
      app.loanAmount,
      app.dateRelease,
      app.approvedBy,
      app.dueDate,
      app.status,
      actionColumn
    ];
  });

  return (
    <div className="d-flex" style={{ minHeight: "100vh" }}>
      <div style={{ width: "200px", flexShrink: 0 }} />
      <div className="flex-grow-1 d-flex flex-column p-4">
        <div className="d-flex align-items-center mb-3" style={{ gap: 12 }}>
          <Backbutton />
          <h3 className="mb-0">Applications</h3>
        </div>

        <div className="d-flex align-items-center mb-4 w-100" style={{ gap: "5px" }}>
          <div style={{ flex: 1 }}>
            <SearchBar value={searchQuery} onSearch={handleSearch} />
          </div>

          <ButtonCustom
            text="Sort"
            icon="bi bi-arrow-down-up"
            backgroundColor="#fff"
            textColor="#000"
            borderColor="#d9d9d9"
            height="45px"
            isDropdown
            dropdownItems={[
              { label: "Choose column to sort by:", onClick: () => {} },
              ...Object.keys(sortKeyMap).map(label => ({
                label: label === selectedColumn ? `✓ ${label}` : label,
                onClick: () => handleSort(label, sortOrder),
              })),
              { label: "────────────", onClick: () => {} },
              {
                label: sortOrder === "asc" ? "✓ Ascending" : "Ascending",
                onClick: () => handleSort(selectedColumn, "asc")
              },
              {
                label: sortOrder === "desc" ? "✓ Descending" : "Descending",
                onClick: () => handleSort(selectedColumn, "desc")
              }
            ]}
          />

          <ButtonCustom
            text={`Status: ${selectedStatus}`}
            backgroundColor="#fff"
            textColor="#000"
            borderColor="#d9d9d9"
            height="45px"
            isDropdown
            dropdownItems={[
              { label: "All", onClick: () => filterByStatus("All") },
              { label: "Approved", onClick: () => filterByStatus("Approved") },
              { label: "Disapproved", onClick: () => filterByStatus("Disapproved") },
              { label: "Pending", onClick: () => filterByStatus("Pending") }
            ]}
          />

          <ButtonCustom
            text="Application"
            icon="bi bi-file-earmark-text"
            backgroundColor="#fff"
            textColor="#000"
            borderColor="#d9d9d9"
            height="45px"
            onClick={() => navigate("/applicationForm")}
          />

          <ButtonCustom
            text="Download"
            icon="bi bi-download"
            backgroundColor="#fff"
            textColor="#000"
            borderColor="#d9d9d9"
            height="45px"
            isDropdown
            dropdownItems={[
              { label: "Export to Excel", onClick: exportToExcel },
              { label: "Export to Word", onClick: exportToWord },
              { label: "Download as JPEG", onClick: () => exportAsImage("jpeg") },
              { label: "Download as PNG", onClick: () => exportAsImage("png") }
            ]}
          />
        </div>

        {filteredApps.length > 0 ? (
          <CustomTable
            columnHeadings={[
              "Name",
              "MHSTEMPC Policy No.",
              "Loan No.",
              "Loan Amount",
              "Date Release",
              "Approve by",
              "Due Date",
              "Status",
              "Update Status"
            ]}
            rows={rows}
          />
        ) : (
          <div className="text-center w-100 mt-4 text-muted fs-5">No results found.</div>
        )}

        {showEditModal && editingIndex !== null && (
          <div className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center" style={{ background: "rgba(0,0,0,0.3)", zIndex: 1050 }}>
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
