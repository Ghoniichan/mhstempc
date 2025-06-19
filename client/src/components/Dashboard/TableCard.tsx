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
  const [clients, setClients] = useState<React.ReactNode[][]>([]);
  const [originalClients, setOriginalClients] = useState<React.ReactNode[][]>([]);
  const [selectedSort, setSelectedSort] = useState<string>("Name");

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

  const handleSearch = (query: string) => {
    const trimmed = query.trim().toLowerCase();
    if (trimmed === "") {
      setClients(originalClients);
      return;
    }
    const filtered = originalClients.filter(row =>
      row.some(cell => typeof cell === "string" && cell.toLowerCase().includes(trimmed))
    );
    setClients(filtered);
  };

  const handleSort = (type: string) => {
    setSelectedSort(type);
    const indexMap: Record<string, number> = {
      Name: 0,
      "MHSTEMPC Policy Number": 1,
      Email: 2,
      "Contact Number": 3,
    };
    const columnIndex = indexMap[type];
    const sorted = [...clients].sort((a, b) => {
      const valA = a[columnIndex] as string;
      const valB = b[columnIndex] as string;
      return valA.localeCompare(valB);
    });
    setClients(sorted);
  };

  const handleRegisterClick = () => {
    navigate("/registerApplicationForm");
  };

  const handleRowClick = (row: React.ReactNode[]) => {
    const policyNumber = row[1] as string;
    navigate("/clientLoan", { state: { policy_no: policyNumber } });
  };

  const columnHeadings = [
    "Name",
    "MHSTEMPC Policy No.",
    "Email",
    "Contact Number",
  ];

  return (
    <div className="card mb-4 mt-3 shadow-sm rounded" style={{ width: "100%" }}>
      <div className="card-body">
        <div className="d-flex flex-column align-items-center w-100">
          <div className="w-100">
            <div className="d-flex flex-column flex-md-row mb-2 align-items-center justify-content-between">
              <div className="mb-2 mb-md-0 flex-grow-1 w-100 me-md-2">
                <SearchBar onSearch={handleSearch} />
              </div>
              <div className="d-flex align-items-center" style={{ gap: "5px" }}>
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
                  dropdownItems={[
                    {
                      label: selectedSort === "Name" ? "✓ Name" : "Name",
                      onClick: () => handleSort("Name"),
                    },
                    {
                      label:
                        selectedSort === "MHSTEMPC Policy No."
                          ? "✓ MHSTEMPC Policy No."
                          : "MHSTEMPC Policy No.",
                      onClick: () => handleSort("MHSTEMPC Policy No."),
                    },
                    {
                      label: selectedSort === "Email" ? "✓ Email" : "Email",
                      onClick: () => handleSort("Email"),
                    },
                    {
                      label:
                        selectedSort === "Contact Number"
                          ? "✓ Contact Number"
                          : "Contact Number",
                      onClick: () => handleSort("Contact Number"),
                    },
                  ]}
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
                    {
                      label: "Non-Member",
                      onClick: () => alert("Non-Member clicked"),
                    },
                  ]}
                />
              </div>
            </div>

            <CustomTable
              columnHeadings={columnHeadings}
              rows={clients}
              onRowClick={handleRowClick}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableCard;
