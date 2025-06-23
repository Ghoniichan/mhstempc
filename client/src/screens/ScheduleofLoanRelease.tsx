import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";
import html2canvas from "html2canvas";

import SearchBar from "../components/Dashboard/SearchBar";
import CustomTable from "../components/Dashboard/CustomTable";
import ButtonCustom from "../components/Dashboard/ButtonCustom";
import Backbutton from "../components/Dashboard/Backbutton";

// 1. Define your columns & keys in one place
const columns = [
  { header: "Name", key: "name" },
  { header: "Date Granted", key: "dateGranted" },
  { header: "Due Date", key: "dueDate" },
  { header: "Voucher No.", key: "voucherNo" },
  { header: "Cash Received", key: "cashReceived" },
  { header: "Loan Amount", key: "loanAmount" },
  { header: "Interest", key: "interest" },
  { header: "Service Fee", key: "serviceFee" },
  { header: "Fine", key: "fine" },
  { header: "Savings", key: "savings" },
  { header: "Capital Build Up", key: "capitalBuildUp" },
  { header: "Loan Balance", key: "loanBalance" },
] as const;
type LoanKey = typeof columns[number]["key"];

// 2. Sample data
const initialData: Record<LoanKey, string>[] = [
  {
    name: "Alice",
    dateGranted: "2025-06-01",
    dueDate: "2025-12-01",
    voucherNo: "V123",
    cashReceived: "₱10,000",
    loanAmount: "₱100,000",
    interest: "5%",
    serviceFee: "₱500",
    fine: "₱0",
    savings: "₱2,000",
    capitalBuildUp: "₱1,000",
    loanBalance: "₱96,500",
  },
  {
    name: "Bob",
    dateGranted: "2025-05-15",
    dueDate: "2025-11-15",
    voucherNo: "V124",
    cashReceived: "₱20,000",
    loanAmount: "₱200,000",
    interest: "4%",
    serviceFee: "₱800",
    fine: "₱100",
    savings: "₱3,000",
    capitalBuildUp: "₱2,000",
    loanBalance: "₱194,100",
  },
];

const SchedofLoanRelease: React.FC = () => {
  const navigate = useNavigate();

  // 3. State: view switcher, search, data, sort key
  const [selectedView, setSelectedView] = useState("Schedule of Loan Release");
  const [searchValue, setSearchValue] = useState("");
  const [data, setData] = useState(initialData);
  const [sortKey, setSortKey] = useState<LoanKey>("name");

  // 4. Filtered & sorted list
  const filtered = useMemo(() => {
    const q = searchValue.trim().toLowerCase();
    return q
      ? data.filter(item =>
          columns.some(col =>
            item[col.key].toLowerCase().includes(q)
          )
        )
      : data;
  }, [data, searchValue]);

  // 5. Handlers
  const handleSort = (key: LoanKey) => {
    setSortKey(key);
    setData(prev =>
      [...prev].sort((a, b) => a[key].localeCompare(b[key]))
    );
  };

  const exportToExcel = () => {
    const sheet = XLSX.utils.json_to_sheet(
      filtered.map(item =>
        columns.reduce((obj, col) => {
          obj[col.header] = item[col.key];
          return obj;
        }, {} as Record<string,string>)
      )
    );
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, sheet, "Schedule");
    XLSX.writeFile(wb, "schedule_of_loan_release.xlsx");
  };

  const exportToWord = () => {
    let txt = "Schedule of Loan Release\n\n";
    filtered.forEach(item => {
      columns.forEach(col => {
        txt += `${col.header}: ${item[col.key]}\n`;
      });
      txt += "\n";
    });
    const blob = new Blob([txt], { type: "application/msword;charset=utf-8" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "schedule_of_loan_release.doc";
    a.click();
  };

  const exportAsImage = async (format: "png" | "jpeg") => {
    const table = document.querySelector("table");
    if (!table) return;
    const canvas = await html2canvas(table as HTMLElement);
    const a = document.createElement("a");
    a.href = canvas.toDataURL(`image/${format}`);
    a.download = `schedule_of_loan_release.${format}`;
    a.click();
  };

  // 6. Build dropdown items
  const sortItems = columns.map(col => ({
    label: `${col.header}${col.key === sortKey ? " ✓" : ""}`,
    onClick: () => handleSort(col.key),
  }));
  const downloadItems = [
    { label: "Excel", onClick: exportToExcel },
    { label: "Word",  onClick: exportToWord },
    { label: "PNG",   onClick: () => exportAsImage("png") },
    { label: "JPEG",  onClick: () => exportAsImage("jpeg") },
  ];

  // 7. View switcher items
  const viewItems = [
    { label: "Active Loans", onClick: () => { setSelectedView("Active Loans"); navigate("/loans"); } },
    { label: "Schedule of Loan Release", onClick: () => { setSelectedView("Schedule of Loan Release"); navigate("/loanRelease"); } },
  ];

  return (
    <div className="d-flex" style={{ minHeight: "100vh" }}>
      <div style={{ width: 200, flexShrink: 0 }} />

      <div className="flex-grow-1 d-flex flex-column" style={{ padding: "40px 20px" }}>
        <div className="d-flex align-items-center mb-4" style={{ gap: 12 }}>
          <Backbutton />
          <h3>Schedule of Loan Release</h3>
        </div>

        <div className="d-flex align-items-center mb-4" style={{ gap: 16 }}>
          <div style={{ flexGrow: 1, maxWidth: 600 }}>
            <SearchBar value={searchValue} onSearch={setSearchValue} />
          </div>

          <div className="d-flex" style={{ gap: 6 }}>
            <ButtonCustom
              text={`Sort by: ${columns.find(c => c.key === sortKey)!.header}`}
              icon="bi bi-sort-up"
              isDropdown
              dropdownItems={sortItems}
              backgroundColor="#fff"
              textColor="#000"
              borderColor="#d9d9d9"
              iconSize="20px"
              fontSize="14px"
              height="45px"
            />

            <ButtonCustom
              text={selectedView}
              isDropdown
              dropdownItems={viewItems}
              backgroundColor="#fff"
              textColor="#000"
              borderColor="#d9d9d9"
              fontSize="14px"
              height="45px"
            />

            <ButtonCustom
              text="Download"
              icon="bi bi-download"
              isDropdown
              dropdownItems={downloadItems}
              backgroundColor="#ffffff"
              textColor="#000"
              borderColor="#d9d9d9"
              iconSize="20px"
              fontSize="15px"
              height="43px"
            />
          </div>
        </div>

        <CustomTable
          columnHeadings={columns.map(c => c.header)}
          rows={filtered.map(item =>
            columns.map(c => item[c.key])
          )}
        />
      </div>
    </div>
  );
};

export default SchedofLoanRelease;
