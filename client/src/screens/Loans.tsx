/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";
import SearchBar from "../components/Dashboard/SearchBar";
import CustomTable from "../components/Dashboard/CustomTable";
import ButtonCustom from "../components/Dashboard/ButtonCustom";
import Backbutton from "../components/Dashboard/Backbutton";
import axios from "../api/axiosInstance";
import LoanDetailModal from "../components/Dashboard/LoanDetailModal";

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
  interest: string;
  serviceFee: string;
  termsOfPayment?: {
    month: string;
    amount: string;
  }[];
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

const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};

const formatDate = (isoString: string): string => {
  if (!isoString) return "-";
  const date = new Date(isoString);
  if (isNaN(date.getTime())) return "-";
  const year = date.getUTCFullYear();
  if (year < 1900) return date.toISOString().split('T')[0];
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const day = String(date.getUTCDate()).padStart(2, '0');
  return `${date.getUTCFullYear()}-${month}-${day}`;
};

const formatTerms = (term: string): string => {
  if (!term) return "-";
  if (/^\d+$/.test(term)) return `${term} months`;
  let s = term.replace(/_/g, ' ');
  s = s.replace(/([a-z])([A-Z])/g, '$1 $2');
  return s.split(' ').map(w => w.length > 0 ? w[0].toUpperCase() + w.slice(1) : w).join(' ');
};

const mapApiToLoanData = (item: any): LoanData => {
  const amountNum = parseFloat(item.amount);
  const paidUpNum = parseFloat(item.paid_up_capital);
  const savingsNum = parseFloat(item.savings);
  const netLoanFeeNum = parseFloat(item.net_loan_fee_proceeds);
  const interestNum = parseFloat(item.interest);
  const serviceFeeNum = parseFloat(item.service_fee);
  const termCount = parseInt(item.payment_terms, 10);

  const termAmount = isNaN(amountNum) || isNaN(termCount) || termCount === 0
    ? 0
    : +(amountNum / termCount).toFixed(2);

  const termsOfPayment = Array.from({ length: termCount }, (_, i) => {
    const date = new Date();
    date.setMonth(date.getMonth() + i);
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();
    return {
      month: `${month} ${year}`,
      amount: formatCurrency(termAmount),
    };
  });

  return {
    name: item.name || "-",
    id: item.id || "-",
    loanNo: item.loan_no || "-",
    loanAmount: isNaN(amountNum) ? "-" : formatCurrency(amountNum),
    terms: formatTerms(item.payment_terms),
    capitalShare: isNaN(paidUpNum) ? "-" : formatCurrency(paidUpNum),
    savings: isNaN(savingsNum) ? "-" : formatCurrency(savingsNum),
    dueDate: formatDate(item.due_date),
    balance: isNaN(netLoanFeeNum) ? "-" : formatCurrency(netLoanFeeNum),
    interest: isNaN(interestNum) ? "-" : formatCurrency(interestNum),
    serviceFee: isNaN(serviceFeeNum) ? "-" : formatCurrency(serviceFeeNum),
    termsOfPayment,
  };
};

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
  const [showModal, setShowModal] = useState(false);
  const [selectedLoanItem, setSelectedLoanItem] = useState<LoanData | null>(null);
  const [selectedDropdown, setSelectedDropdown] = useState("Active Loans");
  const [selectedColumn, setSelectedColumn] = useState("Name");
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [searchQuery, setSearchQuery] = useState("");
  const [loanData, setLoanData] = useState<LoanData[]>([]);
  const [filteredLoans, setFilteredLoans] = useState<LoanData[]>([]);

  useEffect(() => {
    document.title = "MHSTEMPC | Loans";
  }, []);

  useEffect(() => {
    const fetchLoanData = async () => {
      try {
        const response = await axios.get('/api/loans/active');
        const apiItems: any[] = response.data;
        const mapped: LoanData[] = apiItems.map(mapApiToLoanData);
        setLoanData(mapped);
        setFilteredLoans(mapped);
      } catch (error) {
        console.error("Error fetching loan data:", error);
      }
    };
    fetchLoanData();
  }, []);

  const handleDropdownClick = (label: string, path: string) => {
    setSelectedDropdown(label);
    navigate(path);
  };

  const handleRowClick = (row: React.ReactNode[]) => {
    const found = filteredLoans.find(loan => loan.id === String(row[1]));
    setSelectedLoanItem(found || null);
    setShowModal(true);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const trimmed = query.trim().toLowerCase();
    if (trimmed === "") {
      setFilteredLoans(loanData);
      return;
    }
    const result = loanData.filter(loan =>
      Object.values(loan).some(value =>
        typeof value === "string" && value.toLowerCase().includes(trimmed)
      )
    );
    setFilteredLoans(result);
  };

  const handleSort = (columnLabel: string, order?: 'asc' | 'desc') => {
  const key = sortKeyMap[columnLabel];
  const newOrder: 'asc' | 'desc' =
    order ?? (selectedColumn === columnLabel && sortOrder === 'asc' ? 'desc' : 'asc');

  let sorted = [...filteredLoans];

  if (["loanAmount", "capitalShare", "savings", "balance"].includes(key)) {
    sorted.sort((a, b) => {
      const parseValue = (val: string) => parseFloat(val.replace(/[₱,]/g, "")) || 0;
      const aVal = parseValue(a[key] as string);
      const bVal = parseValue(b[key] as string);
      return newOrder === "asc" ? aVal - bVal : bVal - aVal;
    });
  } else {
    // ✅ Ensure all values are treated as strings during sorting
    sorted = quickSort(
      sorted.map(item => ({ ...item, [key]: String(item[key] ?? "") })),
      key,
      newOrder
    );
  }

  setFilteredLoans(sorted);
  setSelectedColumn(columnLabel);
  setSortOrder(newOrder);
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
    let content = `${selectedDropdown}\n\n`;
    filteredLoans.forEach(loan => {
      content += `Name: ${loan.name}\nPolicy No.: ${loan.id}\nLoan No.: ${loan.loanNo}\nLoan Amount: ${loan.loanAmount}\nTerms: ${loan.terms}\nCapital Share: ${loan.capitalShare}\nSavings: ${loan.savings}\nDue Date: ${loan.dueDate}\nBalance: ${loan.balance}\n\n`;
    });
    const blob = new Blob([content], { type: "application/msword;charset=utf-8" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "loans.doc";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportAsImage = async (format: 'jpeg' | 'png') => {
    const tableWrapper = document.querySelector(".custom-table-wrapper") || document.querySelector("table");
    if (!tableWrapper) return;
    const html2canvas = (await import("html2canvas")).default;
    html2canvas(tableWrapper as HTMLElement).then(canvas => {
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
      <LoanDetailModal
        show={showModal}
        onClose={() => setShowModal(false)}
        loan={selectedLoanItem}
      />

      <div style={{ width: "200px", flexShrink: 0 }}></div>
      <div className="flex-grow-1 d-flex flex-column p-4">
        <div className="d-flex align-items-center mb-3" style={{ gap: "12px" }}>
          <Backbutton />
          <h3 className="mb-0">Loans</h3>
        </div>

        <div className="d-flex align-items-center w-100 mb-4" style={{ gap: "5px" }}>
          <div style={{ flex: 1 }}>
            <SearchBar value={searchQuery} onSearch={handleSearch} />
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
                onClick: () => handleSort(label),
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

        {filteredLoans.length > 0 ? (
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
            onRowClick={handleRowClick}
          />
        ) : (
          <div className="text-center w-100 mt-4 text-muted fs-5">No results found.</div>
        )}
      </div>
    </div>
  );
};

export default Loans;
