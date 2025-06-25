/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import CustomTable from "../components/Dashboard/CustomTable";
import Backbutton from "../components/Dashboard/Backbutton";
import SearchBar from "../components/Dashboard/SearchBar";
import ButtonCustom from "../components/Dashboard/ButtonCustom";
import LoanDetailModal from "../components/Dashboard/LoanDetailModal";

// QuickSort Function
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

// Column name to key mapping
const sortKeyMap: Record<string, string> = {
  "Date": "date",
  "OR": "or",
  "Interest": "interest",
  "Service Fee": "serviceFee",
  "Fines": "fines",
  "Due Date": "dueDate",
  "Received Amount": "receivedAmount"
};

const UserLoanScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [loans, setLoans] = useState<any[]>([]);
  const [filteredLoans, setFilteredLoans] = useState<any[]>([]);
  const [selectedColumn, setSelectedColumn] = useState<string>("Date");
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const [selectedLoan, setSelectedLoan] = useState<any | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    document.title = "MHSTEMPC | Loans";
    const sample = [
      {
        date: "2025-06-01",
        or: "001",
        interest: "₱200.00",
        serviceFee: "₱50.00",
        fines: "₱0.00",
        dueDate: "2025-06-15",
        receivedAmount: "₱5,000.00",
      },
      {
        date: "2025-05-20",
        or: "002",
        interest: "₱150.00",
        serviceFee: "₱40.00",
        fines: "₱10.00",
        dueDate: "2025-06-10",
        receivedAmount: "₱3,500.00",
      },
    ];
    setLoans(sample);
    setFilteredLoans(sample);
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const trimmed = query.trim().toLowerCase();
    if (!trimmed) {
      setFilteredLoans(loans);
      return;
    }

    const filtered = loans.filter(loan =>
      Object.values(loan).some(val =>
        typeof val === "string" && val.toLowerCase().includes(trimmed)
      )
    );
    setFilteredLoans(filtered);
  };

  const handleSort = (columnLabel: string, order: 'asc' | 'desc') => {
    const key = sortKeyMap[columnLabel];
    if (!key) return;
    let sorted = [...filteredLoans];

    if (["receivedAmount", "interest", "serviceFee", "fines"].includes(key)) {
      sorted.sort((a, b) => {
        const aVal = parseFloat(a[key].replace(/[₱,]/g, ""));
        const bVal = parseFloat(b[key].replace(/[₱,]/g, ""));
        return order === "asc" ? aVal - bVal : bVal - aVal;
      });
    } else {
      sorted = quickSort(sorted, key, order);
    }

    setFilteredLoans(sorted);
    setSelectedColumn(columnLabel);
    setSortOrder(order);
  };

  const handleExportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(filteredLoans);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Loans");
    XLSX.writeFile(wb, "loans.xlsx");
  };

  const handleExportToWord = () => {
    const content = filteredLoans.map(loan =>
      `Date: ${loan.date}\nOR: ${loan.or}\nInterest: ${loan.interest}\nService Fee: ${loan.serviceFee}\nFines: ${loan.fines}\nDue Date: ${loan.dueDate}\nReceived Amount: ${loan.receivedAmount}\n`
    ).join("\n");

    const blob = new Blob([content], { type: "application/msword;charset=utf-8" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "loans.doc";
    link.click();
  };

  const handleRowClick = (row: any[]) => {
    const loan = filteredLoans.find(item => item.or === row[1]); // OR number as unique key
    if (loan) {
      setSelectedLoan(loan);
      setShowModal(true);
    }
  };

  const rows = filteredLoans.map(loan => [
    loan.date,
    loan.or,
    loan.interest,
    loan.serviceFee,
    loan.fines,
    loan.dueDate,
    loan.receivedAmount
  ]);

  return (
    <div className="d-flex" style={{ minHeight: "100vh" }}>
      <div style={{ width: "200px", flexShrink: 0 }} />
      <div
        className="flex-grow-1 d-flex flex-column justify-content-start align-items-start"
        style={{ padding: "40px 20px" }}
      >
        <div className="d-flex align-items-center mb-3" style={{ gap: "12px" }}>
          <Backbutton />
          <h3 className="mb-0">Loans</h3>
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
            text="Download"
            icon="bi bi-download"
            backgroundColor="#fff"
            textColor="#000"
            borderColor="#d9d9d9"
            height="45px"
            isDropdown
            dropdownItems={[
              { label: "Export to Excel", onClick: handleExportToExcel },
              { label: "Export to Word", onClick: handleExportToWord },
            ]}
          />
        </div>

        {filteredLoans.length > 0 ? (
          <CustomTable
            columnHeadings={[
              "Date",
              "OR",
              "Interest",
              "Service Fee",
              "Fines",
              "Due Date",
              "Received Amount",
            ]}
            rows={rows}
            onRowClick={handleRowClick}
          />
        ) : (
          <div className="text-center w-100 mt-4 text-muted fs-5">
            No results found.
          </div>
        )}
      </div>

      {/* Loan Detail Modal */}
      <LoanDetailModal
        show={showModal}
        onClose={() => setShowModal(false)}
        loan={selectedLoan}
      />
    </div>
  );
};

export default UserLoanScreen;
