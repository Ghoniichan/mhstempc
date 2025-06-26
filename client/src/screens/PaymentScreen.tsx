/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
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
  loanAmount: string;
}

const sortKeyMap: Record<string, keyof Payment> = {
  Name: "name",
  "Loan No.": "loanNo",
  "Loan Amount": "loanAmount",
  "Mode of Payment": "method",
  "Payment Date": "date",
  "Due Date": "dueDate",
};

const quickSort = <T,>(arr: T[], key: keyof T, order: "asc" | "desc"): T[] => {
  if (arr.length <= 1) return arr;
  const pivot = arr[arr.length - 1];
  const left: T[] = [];
  const right: T[] = [];
  for (let i = 0; i < arr.length - 1; i++) {
    const a = (arr[i] as any)[key] as string | number;
    const b = (pivot as any)[key] as string | number;
    if (order === "asc" ? a < b : a > b) left.push(arr[i]);
    else right.push(arr[i]);
  }
  return [...quickSort(left, key, order), pivot, ...quickSort(right, key, order)];
};

const PaymentScreen = () => {
  const [selectedColumnLabel, setSelectedColumnLabel] = useState("Name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
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
  const [editingRow, setEditingRow] = useState<string | null>(null);
  const [inputValues, setInputValues] = useState<Record<string, string>>({});
  const [paidAmounts, setPaidAmounts] = useState<Record<string, number>>({});
  const [paymentModes, setPaymentModes] = useState<Record<string, string>>({});
  const [showDropdown, setShowDropdown] = useState<Record<string, boolean>>({});

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
      payments.filter((p) =>
        Object.values(p).some(
          (v) => typeof v === "string" && v.toLowerCase().includes(q)
        )
      )
    );
  };

  const handleSort = (columnLabel: string, order: "asc" | "desc") => {
    const key = sortKeyMap[columnLabel];
    const isCurrencyField = key === "loanAmount";

    let sorted: Payment[];
    if (isCurrencyField) {
      sorted = [...filteredPayments].sort((a, b) => {
        const aVal = parseFloat(a.loanAmount.replace(/[₱,]/g, ""));
        const bVal = parseFloat(b.loanAmount.replace(/[₱,]/g, ""));
        return order === "asc" ? aVal - bVal : bVal - aVal;
      });
    } else {
      sorted = quickSort(filteredPayments, key, order);
    }

    setFilteredPayments(sorted);
    setSelectedColumnLabel(columnLabel);
    setSortOrder(order);
  };

  const handlePaidSubmit = (loanNo: string) => {
    const input = inputValues[loanNo];
    const amount = parseFloat(input);
    if (!isNaN(amount)) {
      setPaidAmounts((prev) => ({ ...prev, [loanNo]: amount }));
      setShowDropdown((prev) => ({ ...prev, [loanNo]: true }));
    }
    setEditingRow(null);
  };

  const handlePaymentModeChange = (loanNo: string, mode: string) => {
    setPaymentModes((prev) => ({ ...prev, [loanNo]: mode }));
    setShowDropdown((prev) => ({ ...prev, [loanNo]: false }));
  };

  const rows = filteredPayments.map((p) => {
    const loanAmountNum = parseFloat(p.loanAmount.replace(/[₱,]/g, ""));
    const paid = paidAmounts[p.loanNo] || 0;
    const remaining = Math.max(0, loanAmountNum - paid);
    const isEditing = editingRow === p.loanNo;
    const showModeDropdown = showDropdown[p.loanNo];
    const selectedPaymentMode = paymentModes[p.loanNo] || "";

    const actionCell = selectedPaymentMode ? (
      <span className="text-success fw-semibold">Paid</span>
    ) : isEditing ? (
      <div className="d-flex gap-1">
        <input
          type="number"
          className="form-control form-control-sm"
          placeholder="Amount"
          value={inputValues[p.loanNo] || ""}
          onChange={(e) =>
            setInputValues((prev) => ({
              ...prev,
              [p.loanNo]: e.target.value,
            }))
          }
          style={{ width: "100px" }}
          autoFocus
        />
        <button
          className="btn btn-sm btn-primary"
          onClick={() => handlePaidSubmit(p.loanNo)}
        >
          Enter
        </button>
      </div>
    ) : showModeDropdown ? (
      <div className="d-flex flex-column">
        <label className="form-label mb-1 small">Mode of Payment:</label>
        <select
          className="form-select form-select-sm"
          style={{ width: "120px" }}
          value={selectedPaymentMode}
          onChange={(e) => handlePaymentModeChange(p.loanNo, e.target.value)}
        >
          <option value="" disabled>
            Select
          </option>
          <option value="Cash">Cash</option>
          <option value="Card">Card</option>
        </select>
      </div>
    ) : (
      <button
        className="btn btn-sm btn-success"
        onClick={() => setEditingRow(p.loanNo)}
      >
        Paid
      </button>
    );

    return [
      p.name,
      p.loanNo,
      p.loanAmount,
      selectedPaymentMode || p.method,
      p.date,
      p.dueDate,
      `₱${remaining.toLocaleString()}`,
      actionCell,
    ];
  });

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(
      filteredPayments.map((p) => {
        const loanAmount = parseFloat(p.loanAmount.replace(/[₱,]/g, ""));
        const paid = paidAmounts[p.loanNo] || 0;
        const remaining = Math.max(0, loanAmount - paid);
        return {
          Name: p.name,
          "Loan No.": p.loanNo,
          "Loan Amount": p.loanAmount,
          "Mode of Payment": paymentModes[p.loanNo] || p.method,
          "Payment Date": p.date,
          "Due Date": p.dueDate,
          "Remaining Balance": `₱${remaining.toLocaleString()}`,
        };
      })
    );
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Payments");
    XLSX.writeFile(wb, "payments.xlsx");
  };

  const exportToWord = () => {
    let content = "Payment Records\n\n";
    filteredPayments.forEach((p) => {
      const loanAmount = parseFloat(p.loanAmount.replace(/[₱,]/g, ""));
      const paid = paidAmounts[p.loanNo] || 0;
      const remaining = Math.max(0, loanAmount - paid);
      content += `Name: ${p.name}\nLoan No.: ${p.loanNo}\nLoan Amount: ${p.loanAmount}\nMode of Payment: ${paymentModes[p.loanNo] || p.method}\nPayment Date: ${p.date}\nDue Date: ${p.dueDate}\nRemaining Balance: ₱${remaining.toLocaleString()}\n\n`;
    });
    const blob = new Blob([content], {
      type: "application/msword;charset=utf-8",
    });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "payments.doc";
    link.click();
  };

  const exportAsImage = async (format: "jpeg" | "png") => {
    const table = document.querySelector("table");
    if (!table) return;
    const html2canvas = (await import("html2canvas")).default;
    html2canvas(table).then((canvas) => {
      const link = document.createElement("a");
      link.download = `payments.${format}`;
      link.href = canvas.toDataURL(`image/${format}`);
      link.click();
    });
  };

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
              ...Object.keys(sortKeyMap).map((label) => ({
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
              { label: "Download as JPEG", onClick: () => exportAsImage("jpeg") },
              { label: "Download as PNG", onClick: () => exportAsImage("png") },
            ]}
          />
        </div>

        {filteredPayments.length > 0 ? (
          <CustomTable
            columnHeadings={[
              "Name",
              "Loan No.",
              "Loan Amount",
              "Mode of Payment",
              "Payment Date",
              "Due Date",
              "Remaining Balance",
              "Actions",
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
