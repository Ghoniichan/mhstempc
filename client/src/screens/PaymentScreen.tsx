/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import SearchBar from "../components/Dashboard/SearchBar";
import CustomTable from "../components/Dashboard/CustomTable";
import ButtonCustom from "../components/Dashboard/ButtonCustom";
import Backbutton from "../components/Dashboard/Backbutton";
import axios from '../api/axiosInstance';

interface Payment {
  name: string;
  id: string;
  loanNo: string;
  status: string;
  dateRelease: string;
  date: string;
  collectedBy: string;
  dueDate: string;
  loanAmount: string;
  remaining: string;
}

const sortKeyMap: Record<string, keyof Payment> = {
  Name: "name",
  "Loan No.": "loanNo",
  "Loan Amount": "loanAmount",
  "Payment Status": "status",
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

const submitPayment = async (id: string, amount: number): Promise<void> => {
  try {
    const response = await axios.patch(`/api/payments/${id}`, { amountPaid: amount });
    if (response.status !== 200) {
      throw new Error("Failed to submit payment");
    }
  } catch (error) {
    console.error("Error submitting payment:", error);
    throw error;
  }
}

const PaymentScreen = () => {
  const [selectedColumnLabel, setSelectedColumnLabel] = useState("Name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [searchQuery, setSearchQuery] = useState("");

  const [payments, setPayments] = useState<Payment[]>([]);

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

  const handlePaidSubmit = async (id: string) => {
    const input = inputValues[id];
    const amount = parseFloat(input);
    const payment = filteredPayments.find((p) => p.id === id);
    if (!payment) return;

    const loanAmountNum = parseFloat(payment.loanAmount.replace(/[₱,]/g, ""));
    if (!isNaN(amount) && amount > 0) {
      setPaidAmounts((prev) => ({ ...prev, [id]: (prev[id] || 0) + amount }));
      // Only show dropdown if fully paid
      if ((paidAmounts[id] || 0) + amount >= loanAmountNum) {
        setShowDropdown((prev) => ({ ...prev, [id]: true }));
      }
    }
    console.log(`Payment for ${id} submitted: ₱${amount}`);

    try {
      await submitPayment(id, amount);
    } catch (error) {
      console.error("Error submitting payment:", error);
    }
    setEditingRow(null);
  };

  const handlePaymentModeChange = (id: string, mode: string) => {
    setPaymentModes((prev) => ({ ...prev, [id]: mode }));
    setShowDropdown((prev) => ({ ...prev, [id]: false }));
  };

  const rows = filteredPayments.map((p) => {
    const loanAmountNum = parseFloat(p.loanAmount.replace(/[₱,]/g, ""));
    const paid = paidAmounts[p.id] || 0;
    const remaining = p.remaining;
    const remainingNum = parseFloat(p.remaining.replace(/[₱,]/g, ""));
    const isEditing = editingRow === p.id;
    const showModeDropdown = showDropdown[p.id] && paid >= loanAmountNum;
    const selectedPaymentMode = paymentModes[p.id] || "";

    const actionCell = (remainingNum === 0) ? (
      <span className="text-success fw-semibold">Paid</span>
    ) : isEditing ? (
      <div className="d-flex gap-1">
        <input
          type="number"
          className="form-control form-control-sm"
          placeholder="Amount"
          value={inputValues[p.id] || ""}
          onChange={(e) =>{
            const value = e.target.value;
            let numericValue = parseFloat(value);
            const remaining = parseFloat(p.remaining.replace(/[₱,]/g, ""));
            // Clamp the value to the remaining balance
            if (numericValue > remaining) {
              numericValue = remaining;
            }
            setInputValues((prev) => ({
              ...prev,
              [p.id]: !isNaN(numericValue) ? numericValue.toString() : "",
            }));
          }}
          style={{ width: "100px" }}
          autoFocus
        />
        <button
          className="btn btn-sm btn-primary"
          onClick={() => handlePaidSubmit(p.id)}
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
          onChange={(e) => handlePaymentModeChange(p.id, e.target.value)}
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
        onClick={() => setEditingRow(p.id)}
      >
        Paid
      </button>
    );

    return [
      p.name,
      p.loanNo,
      p.loanAmount,
      selectedPaymentMode || p.status,
      p.date,
      p.dueDate,
      remaining,
      actionCell,
    ];
  });

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(
      filteredPayments.map((p) => {
        return {
          Name: p.name,
          "Loan No.": p.loanNo,
          "Loan Amount": p.loanAmount,
          "Payment Status": paymentModes[p.loanNo] || p.status,
          "Payment Date": p.date,
          "Due Date": p.dueDate,
          "Remaining Balance": p.remaining,
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
      const remaining = parseFloat(p.remaining.replace(/[₱,]/g, ""));;
      content += `Name: ${p.name}\nLoan No.: ${p.loanNo}\nLoan Amount: ${p.loanAmount}\nMode of Payment: ${paymentModes[p.loanNo] || p.status}\nPayment Date: ${p.date}\nDue Date: ${p.dueDate}\nRemaining Balance: ${remaining.toLocaleString()}\n\n`;
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


  useEffect(() => {
    document.title = "MHSTEMPC | Payment";

    const fetchPayments = async () => {
      try {
        const res = await axios.get("/api/payments");
        const data = res.data; // array of raw payment records

        const mapped: Payment[] = data.map((item: any) => ({
          name: item.name, // Replace with actual name if available from join
          id: String(item.id),
          loanNo: item.loan_application_id,
          status: item.payment_status,
          dateRelease: "N/A", // Replace if you have release date
          date: item.payment_date
            ? new Date(item.payment_date).toISOString().split("T")[0]
            : "",
          collectedBy: "N/A", // Replace if you have collector data
          dueDate: new Date(item.due_date).toISOString().split("T")[0],
          loanAmount: `₱${parseFloat(item.amount_due).toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}`,
          remaining: `₱${parseFloat(item.remaining_balance).toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}`,
        }));

        setPayments(mapped);
        setFilteredPayments(mapped);
      } catch (err) {
        console.error("Failed to fetch payments:", err);
      }
    };

    fetchPayments();
  }, [filteredPayments]);

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
              "Payment Status",
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
