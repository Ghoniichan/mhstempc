import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";
import SearchBar from "../components/Dashboard/SearchBar";
import CustomTable from "../components/Dashboard/CustomTable";
import ButtonCustom from "../components/Dashboard/ButtonCustom";
import Backbutton from "../components/Dashboard/Backbutton";

interface LoanData {
  name: string;
  id: string;
  loanNo: string;
  loanAmount: string;
  terms: string;
  capitalShare: string;
  savings: string;
  dueDate: string;
  balance: string;
}

const Loans = () => {
  const navigate = useNavigate();
  const [selectedDropdown, setSelectedDropdown] = useState("Active Loans");

  const [loanData] = useState<LoanData[]>([
    {
      name: "Micha Bandasan",
      id: "MHST12345",
      loanNo: "LN20240601",
      loanAmount: "₱50,000",
      terms: "6 months",
      capitalShare: "₱5,000",
      savings: "₱3,000",
      dueDate: "2025-12-01",
      balance: "₱20,000",
    },
    {
      name: "Jane Doe",
      id: "MHST54321",
      loanNo: "LN20240522",
      loanAmount: "₱30,000",
      terms: "12 months",
      capitalShare: "₱4,000",
      savings: "₱2,000",
      dueDate: "2026-05-22",
      balance: "₱18,000",
    },
  ]);

  const [filteredLoans, setFilteredLoans] = useState<LoanData[]>(loanData);

  const handleDropdownClick = (label: string, path: string) => {
    setSelectedDropdown(label);
    navigate(path);
  };

  const handleSearch = (query: string) => {
    const trimmed = query.trim().toLowerCase();

    if (trimmed === "") {
      setFilteredLoans(loanData);
      return;
    }

    const result = loanData.filter(
      loan =>
        loan.name.toLowerCase().includes(trimmed) ||
        loan.loanNo.toLowerCase().includes(trimmed) ||
        loan.id.toLowerCase().includes(trimmed)
    );

    setFilteredLoans(result);
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      filteredLoans.map(loan => ({
        Name: loan.name,
        ID: loan.id,
        "Loan No.": loan.loanNo,
        "Loan Amount": loan.loanAmount,
        "Terms of Payment": loan.terms,
        "Capital Share": loan.capitalShare,
        Savings: loan.savings,
        "Due Date": loan.dueDate,
        Balance: loan.balance,
      }))
    );

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Loans");
    XLSX.writeFile(workbook, "loans.xlsx");
  };

  const rows = filteredLoans.map(loan => [
    loan.name,
    loan.id,
    loan.loanNo,
    loan.loanAmount,
    loan.terms,
    loan.capitalShare,
    loan.savings,
    loan.dueDate,
    loan.balance,
  ]);

  return (
    <div className="d-flex" style={{ minHeight: "100vh" }}>
      <div style={{ width: "200px", flexShrink: 0 }}></div>
      <div
        className="flex-grow-1 d-flex flex-column justify-content-start align-items-start"
        style={{ padding: "40px 20px" }}
      >
        <div className="d-flex align-items-center mb-3" style={{ gap: "12px" }}>
          <Backbutton />
          <h3 className="mb-0">Loans</h3>
        </div>

        <div className="d-flex align-items-center w-100 mb-4" style={{ gap: "16px" }}>
          <div style={{ flex: 1 }}>
            <SearchBar onSearch={handleSearch} />
          </div>

          <ButtonCustom
            text={selectedDropdown}
            backgroundColor="#ffffff"
            textColor="#000"
            borderColor="#d9d9d9"
            iconSize="20px"
            fontSize="14px"
            height="45px"
            isDropdown={true}
            dropdownItems={[
              {
                label: "Active Loans",
                onClick: () => handleDropdownClick("Active Loans", "/loans"),
              },
              {
                label: "Schedule of Loan Release",
                onClick: () => handleDropdownClick("Schedule of Loan Release", "/loanRelease"),
              },
            ]}
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
            "ID",
            "Loan No.",
            "Loan Amount",
            "Terms of Payment",
            "Capital Share",
            "Savings",
            "Due Date",
            "Balance",
          ]}
          rows={rows}
        />
      </div>
    </div>
  );
};

export default Loans;
