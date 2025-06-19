/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";
import SearchBar from "../components/Dashboard/SearchBar";
import CustomTable from "../components/Dashboard/CustomTable";
import ButtonCustom from "../components/Dashboard/ButtonCustom";
import Backbutton from "../components/Dashboard/Backbutton";

interface Payment {
  name: string;
  id: string;
  loanNo: string;
  method: string;
  dateRelease: string;
  date: string;
  collectedBy: string;
  dueDate: string;
  loanAmount: string;  // currency string
}

// Map from UI label to the actual Payment key
const sortKeyMap: Record<string, keyof Payment> = {
  "Name": "name",
  "ID": "id",
  "Loan No.": "loanNo",
  "Method": "method",
  "Date Release": "dateRelease",
  "Date": "date",
  "Collected by": "collectedBy",
  "Due Date": "dueDate",
  "Loan Amount": "loanAmount"
};

// A generic quickSort that takes a `keyof T`
const quickSort = <T,>(
  arr: T[],
  key: keyof T,
  order: 'asc' | 'desc'
): T[] => {
  if (arr.length <= 1) return arr;
  const pivot = arr[arr.length - 1];
  const left: T[] = [];
  const right: T[] = [];
  for (let i = 0; i < arr.length - 1; i++) {
    const a = (arr[i] as any)[key] as string | number;
    const b = (pivot as any)[key] as string | number;
    if (order === 'asc' ? a < b : a > b) left.push(arr[i]);
    else right.push(arr[i]);
  }
  return [...quickSort(left, key, order), pivot, ...quickSort(right, key, order)];
};

const PaymentScreen = () => {
  const navigate = useNavigate();

  // 1) store the LABEL (e.g. "Name"), not the key
  const [selectedColumnLabel, setSelectedColumnLabel] = useState("Name");
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [searchQuery, setSearchQuery] = useState("");

  const [payments] = useState<Payment[]>([
    {
      name: "Micha Bandasan",
      id: "MHST12345",
      loanNo: "LN20240601",
      method: "Cash",
      dateRelease: "2025-06-01",
      date: "2025-06-10",
      collectedBy: "Cashier 1",
      dueDate: "2025-12-01",
      loanAmount: "₱50,000",
    },
    {
      name: "Juan Dela Cruz",
      id: "MHST67890",
      loanNo: "LN20240520",
      method: "Online",
      dateRelease: "2025-05-20",
      date: "2025-06-05",
      collectedBy: "Cashier 2",
      dueDate: "2025-11-20",
      loanAmount: "₱30,000",
    },
  ]);
  const [filteredPayments, setFilteredPayments] = useState<Payment[]>(payments);

  useEffect(() => {
    document.title = "MHSTEMPC | Payment";
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const q = query.trim().toLowerCase();
    if (!q) {
      setFilteredPayments(payments);
      return;
    }
    setFilteredPayments(
      payments.filter(p =>
        Object.values(p).some(v =>
          typeof v === 'string' && v.toLowerCase().includes(q)
        )
      )
    );
  };

  const handleSort = (columnLabel: string, order: 'asc' | 'desc') => {
    // 2) look up the actual keyof Payment
    const key = sortKeyMap[columnLabel];
    const isCurrencyField = key === "loanAmount";

    let sorted: Payment[];
    if (isCurrencyField) {
      // Numeric parse for currency
      sorted = [...filteredPayments].sort((a, b) => {
        const aVal = parseFloat(a.loanAmount.replace(/[₱,]/g, ""));
        const bVal = parseFloat(b.loanAmount.replace(/[₱,]/g, ""));
        return order === 'asc' ? aVal - bVal : bVal - aVal;
      });
    } else {
      // Generic sort
      sorted = quickSort(filteredPayments, key, order);
    }

    setFilteredPayments(sorted);
    // 3) store the LABEL here
    setSelectedColumnLabel(columnLabel);
    setSortOrder(order);
  };

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(
      filteredPayments.map(p => ({
        Name: p.name,
        ID: p.id,
        "Loan No.": p.loanNo,
        Method: p.method,
        "Date Release": p.dateRelease,
        Date: p.date,
        "Collected by": p.collectedBy,
        "Due Date": p.dueDate,
        "Loan Amount": p.loanAmount,
      }))
    );
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Payments");
    XLSX.writeFile(wb, "payments.xlsx");
  };

  const exportToWord = () => {
    let content = "Payment Records\n\n";
    filteredPayments.forEach(p => {
      content += `Name: ${p.name}\nID: ${p.id}\nLoan No.: ${p.loanNo}\nMethod: ${p.method}\nDate Release: ${p.dateRelease}\nPayment Date: ${p.date}\nCollected by: ${p.collectedBy}\nDue Date: ${p.dueDate}\nLoan Amount: ${p.loanAmount}\n\n`;
    });
    const blob = new Blob([content], { type: "application/msword;charset=utf-8" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "payments.doc";
    link.click();
  };

  const exportAsImage = async (format: 'jpeg' | 'png') => {
    const table = document.querySelector("table");
    if (!table) return;
    const html2canvas = (await import("html2canvas")).default;
    html2canvas(table).then(canvas => {
      const link = document.createElement("a");
      link.download = `payments.${format}`;
      link.href = canvas.toDataURL(`image/${format}`);
      link.click();
    });
  };

  const rows = filteredPayments.map(p => [
    p.name,
    p.id,
    p.loanNo,
    p.method,
    p.dateRelease,
    p.date,
    p.collectedBy,
    p.dueDate,
    p.loanAmount,
  ]);

  return (
    <div className="d-flex" style={{ minHeight: "100vh" }}>
      <div style={{ width: 200, flexShrink: 0 }} />
      <div className="flex-grow-1 d-flex flex-column p-4">
        <div className="d-flex align-items-center mb-3" style={{ gap: 12 }}>
          <Backbutton />
          <h3 className="mb-0">Payments</h3>
        </div>

        <div className="d-flex align-items-center mb-4 w-100" style={{ gap: 12 }}>
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
                label: label === selectedColumnLabel ? `✓ ${label}` : label,
                onClick: () => handleSort(label, sortOrder),
              })),
              { label: "────────────", onClick: () => {} },
              {
                label: sortOrder === "asc" ? "✓ Ascending" : "Ascending",
                onClick: () => handleSort(selectedColumnLabel, "asc"),
              },
              {
                label: sortOrder === "desc" ? "✓ Descending" : "Descending",
                onClick: () => handleSort(selectedColumnLabel, "desc"),
              },
            ]}
          />

          <ButtonCustom
            text="Add Payment"
            icon="bi bi-cash-stack"
            backgroundColor="#fff"
            textColor="#000"
            borderColor="#d9d9d9"
            onClick={() => navigate("/addPayment")}
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
              { label: "Download as JPEG", onClick: () => exportAsImage('jpeg') },
              { label: "Download as PNG", onClick: () => exportAsImage('png') },
            ]}
          />
        </div>

        {filteredPayments.length > 0 ? (
          <CustomTable
            columnHeadings={[
              "Name",
              "ID",
              "Loan No.",
              "Method",
              "Date Release",
              "Date",
              "Collected by",
              "Due Date",
              "Loan Amount",
            ]}
            rows={rows}
          />
        ) : (
          <div className="text-center w-100 mt-4 text-muted fs-5">
            No results found.
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentScreen;
