import { useEffect, useState } from "react";
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

const sortKeyMap: Record<string, keyof LoanData> = {
  "Name": "name",
  "ID": "id",
  "Loan No.": "loanNo",
  "Loan Amount": "loanAmount",
  "Terms of Payment": "terms",
  "Capital Share": "capitalShare",
  "Savings": "savings",
  "Due Date": "dueDate",
  "Balance": "balance"
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const quickSort = <T extends Record<string, any>>(arr: T[], key: string, order: 'asc' | 'desc'): T[] => {
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

const Loans = () => {
  const navigate = useNavigate();
  const [selectedDropdown, setSelectedDropdown] = useState("Active Loans");
  const [selectedColumn, setSelectedColumn] = useState("Name");
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

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

  useEffect(() => {
    document.title = "MHSTEMPC | Loans";
  }, []);

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

  const handleSort = (columnLabel: string, order: 'asc' | 'desc') => {
    const key = sortKeyMap[columnLabel];
    const sorted = quickSort([...filteredLoans], key, order);
    setFilteredLoans(sorted);
    setSelectedColumn(columnLabel);
    setSortOrder(order);
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

  const exportToWord = () => {
    let content = "Active Loans\n\n";
    filteredLoans.forEach(loan => {
      content += `Name: ${loan.name}\nPolicy No.: ${loan.id}\nLoan No.: ${loan.loanNo}\nLoan Amount: ${loan.loanAmount}\nTerms: ${loan.terms}\nCapital Share: ${loan.capitalShare}\nSavings: ${loan.savings}\nDue Date: ${loan.dueDate}\nBalance: ${loan.balance}\n\n`;
    });

    const blob = new Blob([content], {
      type: "application/msword;charset=utf-8"
    });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "loans.doc";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportAsImage = async (format: 'jpeg' | 'png') => {
    const table = document.querySelector("table");
    if (!table) return;

    const html2canvas = (await import("html2canvas")).default;
    html2canvas(table).then(canvas => {
      const link = document.createElement("a");
      link.download = `loans.${format}`;
      link.href = canvas.toDataURL(`image/${format}`);
      link.click();
    });
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
      <div className="flex-grow-1 d-flex flex-column justify-content-start align-items-start" style={{ padding: "40px 20px" }}>
        <div className="d-flex align-items-center mb-3" style={{ gap: "12px" }}>
          <Backbutton />
          <h3 className="mb-0">Loans</h3>
        </div>

        <div className="d-flex align-items-center w-100 mb-4" style={{ gap: "5px" }}>
          <div style={{ flex: 1 }}>
            <SearchBar onSearch={handleSearch} />
          </div>

          <ButtonCustom
            text="Sort"
            icon="bi bi-arrow-down-up"
            backgroundColor="#ffffff"
            textColor="#000"
            borderColor="#d9d9d9"
            height="45px"
            isDropdown={true}
            dropdownItems={[
              { label: "Choose column to sort by:", onClick: () => {} },
              ...Object.keys(sortKeyMap).map(label => ({
                label: label === selectedColumn ? `✓ ${label}` : label,
                onClick: () => setSelectedColumn(label),
              })),
              { label: "────────────", onClick: () => {} },
              {
                label: sortOrder === "asc" ? "✓ Ascending" : "Ascending",
                onClick: () => handleSort(selectedColumn, "asc"),
              },
              {
                label: sortOrder === "desc" ? "✓ Descending" : "Descending",
                onClick: () => handleSort(selectedColumn, "desc"),
              },
            ]}
          />

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
            text="Download"
            icon="bi bi-download"
            backgroundColor="#ffffff"
            textColor="#000"
            borderColor="#d9d9d9"
            iconSize="20px"
            fontSize="15px"
            height="43px"
            isDropdown={true}
            dropdownItems={[
              { label: "Export to Excel", onClick: exportToExcel },
              { label: "Export to Word", onClick: exportToWord },
              { label: "Download as JPEG", onClick: () => exportAsImage('jpeg') },
              { label: "Download as PNG", onClick: () => exportAsImage('png') },
            ]}
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
