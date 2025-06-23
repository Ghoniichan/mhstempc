import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomTable from "./CustomTable";
import "./TableCard.css";
import SearchBar from "./SearchBar";
import axios from "../../api/axiosInstance";
import ButtonCustom from "./ButtonCustom";

type PolicyRecord = {
  name: string;
  policy_number: string;
  fb_acc_email_address: string;
  tel_cel_no: string;
};

const TableCard: React.FC = () => {
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [clients, setClients] = useState<React.ReactNode[][]>([]);
  const [originalClients, setOriginalClients] = useState<React.ReactNode[][]>([]);
  const [selectedSort, setSelectedSort] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await axios.get<PolicyRecord[]>("/api/user/clients");
        const rows = formatRows(response.data);
        setOriginalClients(rows);
        setClients(rows);
      } catch (error) {
        console.error("Error fetching clients:", error);
      }
    };

    fetchClients();
  }, []);

  const formatRows = (data: PolicyRecord[]): React.ReactNode[][] => {
    const seen = new Set<string>();
    const rows: React.ReactNode[][] = [];

    data.forEach(item => {
      const key = `${item.policy_number}-${item.tel_cel_no}`;
      if (!seen.has(key)) {
        seen.add(key);
        rows.push([
          item.name,
          item.policy_number,
          item.fb_acc_email_address,
          item.tel_cel_no,
        ]);
      }
    });

    return rows;
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const trimmed = query.trim().toLowerCase();
    if (!trimmed) {
      setClients(originalClients);
      return;
    }
    const filtered = originalClients.filter(row =>
      row.some(cell => typeof cell === "string" && cell.toLowerCase().includes(trimmed))
    );
    setClients(filtered);
  };

  const handleSort = (type: string, order: 'asc' | 'desc') => {
    setSelectedSort(type);
    setSortOrder(order);

    const indexMap: Record<string, number> = {
      Name: 0,
      "MHSTEMPC Policy No.": 1,
      Email: 2,
      "Contact Number": 3,
    };
    const columnIndex = indexMap[type];

    const sorted = [...clients].sort((a, b) => {
      const valA = (a[columnIndex] ?? "").toString();
      const valB = (b[columnIndex] ?? "").toString();
      return order === 'asc' 
        ? valA.localeCompare(valB)
        : valB.localeCompare(valA);
    });
    setClients(sorted);
  };

  const handleRegisterClick = () => {
    navigate("/registerApplicationForm");
  };

  const handleRowClick = (row: React.ReactNode[]) => {
    const policyNumber = row[1] as string;
    localStorage.setItem("selectedPolicyNumber", policyNumber);
    navigate("/clientLoan");
  };

  const columnHeadings = [
    "Name",
    "MHSTEMPC Policy No.",
    "Email",
    "Contact Number",
  ];

  const dropdownItems = [
    {
      label: `${selectedSort === "Name" && sortOrder === 'asc' ? "✓ " : ""}Name (A-Z)`,
      onClick: () => handleSort("Name", "asc"),
    },
    {
      label: `${selectedSort === "Name" && sortOrder === 'desc' ? "✓ " : ""}Name (Z-A)`,
      onClick: () => handleSort("Name", "desc"),
    },
    {
      label: `${selectedSort === "MHSTEMPC Policy No." && sortOrder === 'asc' ? "✓ " : ""}Policy No. (Asc)`,
      onClick: () => handleSort("MHSTEMPC Policy No.", "asc"),
    },
    {
      label: `${selectedSort === "MHSTEMPC Policy No." && sortOrder === 'desc' ? "✓ " : ""}Policy No. (Desc)`,
      onClick: () => handleSort("MHSTEMPC Policy No.", "desc"),
    },
    {
      label: `${selectedSort === "Email" && sortOrder === 'asc' ? "✓ " : ""}Email (A-Z)`,
      onClick: () => handleSort("Email", "asc"),
    },
    {
      label: `${selectedSort === "Email" && sortOrder === 'desc' ? "✓ " : ""}Email (Z-A)`,
      onClick: () => handleSort("Email", "desc"),
    },
    {
      label: `${selectedSort === "Contact Number" && sortOrder === 'asc' ? "✓ " : ""}Contact (Asc)`,
      onClick: () => handleSort("Contact Number", "asc"),
    },
    {
      label: `${selectedSort === "Contact Number" && sortOrder === 'desc' ? "✓ " : ""}Contact (Desc)`,
      onClick: () => handleSort("Contact Number", "desc"),
    },
  ];

  return (
    <div className="table-card">
      <div className="card mb-4 mt-3 shadow-sm rounded" style={{ width: "100%" }}>
        <div className="card-body">
          <div className="d-flex flex-column align-items-center w-100">
            <div className="w-100">
              <div className="d-flex flex-column flex-md-row mb-2 align-items-center justify-content-between">
                <div className="mb-2 mb-md-0 flex-grow-1 w-100 me-md-2">
                  <SearchBar value={searchQuery} onSearch={handleSearch} />
                </div>

                <div className="table-card__button-group d-flex align-items-center" style={{ gap: "5px" }}>
                  <ButtonCustom
                    text="Sort"
                    icon="bi bi-arrow-down-up"
                    backgroundColor="#ffffff"
                    textColor="#000000"
                    borderColor="lightgray"
                    iconSize="18px"
                    fontSize="14px"
                    height="43px"
                    isDropdown
                    dropdownItems={dropdownItems}
                  />

                  <ButtonCustom
                    text="Register"
                    icon="bi bi-person-plus"
                    backgroundColor="#ffffff"
                    textColor="#000000"
                    borderColor="lightgray"
                    iconSize="18px"
                    fontSize="14px"
                    height="43px"
                    onClick={handleRegisterClick}
                  />

                  <ButtonCustom
                    text="Membership Type"
                    backgroundColor="#ffffff"
                    textColor="#000000"
                    borderColor="lightgray"
                    iconSize="18px"
                    fontSize="14px"
                    height="43px"
                    isDropdown
                    dropdownItems={[
                      { label: "All", onClick: () => alert("All clicked") },
                      { label: "Regular", onClick: () => alert("Regular clicked") },
                      { label: "Non-Member", onClick: () => alert("Non-Member clicked") },
                    ]}
                  />
                </div>
              </div>

              <div className="table-card__container">
                <CustomTable
                  columnHeadings={columnHeadings}
                  rows={clients}
                  onRowClick={handleRowClick}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableCard;
