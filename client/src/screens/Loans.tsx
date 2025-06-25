/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Modal, Button } from 'react-bootstrap';
import * as XLSX from "xlsx";
import SearchBar from "../components/Dashboard/SearchBar";
import CustomTable from "../components/Dashboard/CustomTable";
import ButtonCustom from "../components/Dashboard/ButtonCustom";
import Backbutton from "../components/Dashboard/Backbutton";
import companyLogo from '../../src/assets/Images/logo.png';
import axios from '../api/axiosInstance';

interface LoanData {
  name: string;
  id: string;
  loanNo: string;
  loanAmount: string;
  terms: string;
  capitalShare: string;
  savings: string;
  dueDate: string;
  balance: string;  // now maps from net_loan_fee_proceeds
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

// Helpers
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
  if (year < 1900) {
    // Show as YYYY-MM-DD if very old year, or adjust per your needs
    return date.toISOString().split('T')[0];
  }
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const day = String(date.getUTCDate()).padStart(2, '0');
  return `${date.getUTCFullYear()}-${month}-${day}`;
};

const formatTerms = (term: string): string => {
  if (!term) return "-";
  if (/^\d+$/.test(term)) {
    return `${term} months`;
  }
  let s = term.replace(/_/g, ' ');
  s = s.replace(/([a-z])([A-Z])/g, '$1 $2');
  return s
    .split(' ')
    .map(w => w.length > 0 ? w[0].toUpperCase() + w.slice(1) : w)
    .join(' ');
};

// Map API item to LoanData
const mapApiToLoanData = (item: any): LoanData => {
  const amountNum = parseFloat(item.amount);
  const paidUpNum = parseFloat(item.paid_up_capital);
  const savingsNum = parseFloat(item.savings);
  const netLoanFeeNum = parseFloat(item.net_loan_fee_proceeds);

  const loanAmount = isNaN(amountNum) ? "-" : formatCurrency(amountNum);
  const capitalShare = isNaN(paidUpNum) ? "-" : formatCurrency(paidUpNum);
  const savings = isNaN(savingsNum) ? "-" : formatCurrency(savingsNum);
  const dueDate = formatDate(item.due_date);

  const balance = isNaN(netLoanFeeNum) ? "-" : formatCurrency(netLoanFeeNum);

  return {
    name: item.name || "-",
    id: item.id || "-",
    loanNo: item.loan_no || "-",
    loanAmount,
    terms: formatTerms(item.payment_terms),
    capitalShare,
    savings,
    dueDate,
    balance,
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
  const [selectedLoanRow, setSelectedLoanRow] = useState<React.ReactNode[] | null>(null);
  const handleRowClick = (row: React.ReactNode[]) => {
    setSelectedLoanRow(row);
    setShowModal(true);
  };
  const [selectedDropdown, setSelectedDropdown] = useState("Active Loans");
  const [selectedColumn, setSelectedColumn] = useState("Name");
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [searchQuery, setSearchQuery] = useState("");

  const [loanData, setLoanData] = useState<LoanData[]>([]);
  const [filteredLoans, setFilteredLoans] = useState<LoanData[]>([]);

  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.title = "MHSTEMPC | Loans";
  }, []);

  const handleDropdownClick = (label: string, path: string) => {
    setSelectedDropdown(label);
    navigate(path);
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
        const parseValue = (val: string) => {
          const num = parseFloat(val.replace(/[₱,]/g, "")) || 0;
          return num;
        };
        const aVal = parseValue(a[key]);
        const bVal = parseValue(b[key]);
        return newOrder === "asc" ? aVal - bVal : bVal - aVal;
      });
    } else {
      sorted = quickSort(sorted, key, newOrder);
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

  const downloadModalAsPDF = async () => {
    if (typeof window === 'undefined' || !modalRef.current || !selectedLoanRow) return;
    const html2pdf = (await import('html2pdf.js')).default;
    const borrowerName = (selectedLoanRow[0] as string)
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, '');
    const opt = {
      margin: 0.3,
      filename: `${borrowerName}-loan-details.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
    };
    setTimeout(() => {
      html2pdf().set(opt).from(modalRef.current!).save();
    }, 300);
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

  return (
    <div className="d-flex" style={{ minHeight: "100vh" }}>
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        centered
        backdrop="static"
        contentClassName="p-3 rounded-4"
      >
        <Modal.Body>
          <div className="d-flex align-items-center mb-0">
            <div className="flex-grow-1 text-center"></div>
            <button
              onClick={() => setShowModal(false)}
              className="btn btn-light rounded-circle p-1 ms-auto"
              style={{ width: "32px", height: "32px" }}
              aria-label="Close"
            >
              <i className="bi bi-x-lg fs-6"></i>
            </button>
          </div>
          <div ref={modalRef}>
            <div className="pdf-only mb-3 text-center">
              <img src={companyLogo} alt="Company Logo" style={{ width: "100px" }} />
            </div>
            <div className="text-center">
              <h5 className="mb-0 fw-bold">{selectedLoanRow?.[0]}</h5>
              <div className="text-muted mb-3">{selectedLoanRow?.[1]}</div>
              <div className="mb-3">
                <div
                  className="mx-auto bg-success d-flex justify-content-center align-items-center"
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                  }}
                >
                  <i className="bi bi-check-lg text-white fs-5"></i>
                </div>
              </div>
              <hr />
              <h6 className="text-muted mb-3">Computation</h6>
              <div className="d-flex justify-content-between mb-1">
                <span>Loan Amount</span> <span>{selectedLoanRow?.[3]}</span>
              </div>
              {/* Add other fields from API if available */}
              <hr />
              <div className="d-flex justify-content-between fw-bold mb-5">
                <span>Net Loan Fee Proceeds</span> <span>{selectedLoanRow?.[8]}</span>
              </div>
              <div className="mb-4 text-muted">Signature</div>
            </div>
          </div>
          <Button
            className="w-100 mt-3 text-white"
            style={{ backgroundColor: "#002d62", border: "none" }}
            onClick={downloadModalAsPDF}
          >
            <i className="bi bi-download me-2"></i>Download
          </Button>
        </Modal.Body>
      </Modal>

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
