/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import CustomTable from "../components/Dashboard/CustomTable";
import Backbutton from "../components/Dashboard/Backbutton";
import SearchBar from "../components/Dashboard/SearchBar";
import ButtonCustom from "../components/Dashboard/ButtonCustom";
import LoanDetailModal from "../components/Dashboard/LoanDetailModal";
import axios from "../api/axiosInstance";
import { getUserIdFromJwt } from "../utils/tokenDecoder";

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

  const normalizeLoanKeys = (loan: any) => ({
    date: loan.date,
    or: loan.or,
    interest: loan.interest,
    serviceFee: loan.service_fee,
    fines: loan.fines,
    dueDate: loan.due_date,
    receivedAmount: loan.received_amount
  });

  const formatDate = (isoString: string): string => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(isoString).toLocaleDateString('en-PH', options); // or 'en-US' if you prefer
  };

  const formatCurrency = (amount: number | string): string => {
    const num = typeof amount === "string" ? parseFloat(amount) : amount;
    return `₱${num.toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  useEffect(() => {
    document.title = "MHSTEMPC | Loans";

    

    const fetchLoansByPN = async () => {
      const userId = getUserIdFromJwt(localStorage.getItem('token') || '');
      
      try {
        const response = await axios.get(`/api/user/profile/${userId}`);
        const policy_no = response.data?.policy_number;
        if (!policy_no) {
          const response = await axios.get(`/api/loan/user/${userId}`);
          return response.data;
        }

        const { data } = await axios.get(`/api/loans/by-policy/${policy_no}`);
        return data;
      } catch (error) {
        console.error("Error fetching loans:", error);
        return [];
      } 
    }

    fetchLoansByPN().then(data => {
      const dataArray = Array.isArray(data) ? data : [data]; // 👈 convert to array if needed
      const normalized = dataArray.map(normalizeLoanKeys);
      setLoans(normalized);
      setFilteredLoans(normalized);
    });
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
    formatDate(loan.date),
    loan.or,
    formatCurrency(loan.interest),
    formatCurrency(loan.serviceFee),
    formatCurrency(loan.fines),
    formatDate(loan.dueDate),
    formatCurrency(loan.receivedAmount)
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
