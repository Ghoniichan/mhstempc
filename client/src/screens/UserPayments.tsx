/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import SearchBar from "../components/Dashboard/SearchBar";
import CustomTable from "../components/Dashboard/CustomTable";
import ButtonCustom from "../components/Dashboard/ButtonCustom";
import Backbutton from "../components/Dashboard/Backbutton";

interface PaymentData {
  name: string;
  policyNo: string;
  amountPaid: string;
  loanAmount: string;
  datePaid: string;
}

const sortKeyMap: Record<string, keyof PaymentData> = {
  "Name": "name",
  "MHSTEMPC Policy No.": "policyNo",
  "Amount Paid": "amountPaid",
  "Loan Amount": "loanAmount",
  "Date Paid": "datePaid"
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

const UserPayments = () => {
  const [selectedColumn, setSelectedColumn] = useState("Name");
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [searchQuery, setSearchQuery] = useState("");

  const [paymentData] = useState<PaymentData[]>([
    {
      name: "Micha Bandasan",
      policyNo: "MHST12345",
      amountPaid: "₱5,000",
      loanAmount: "₱50,000",
      datePaid: "2025-06-15",
    },
    {
      name: "Jane Doe",
      policyNo: "MHST54321",
      amountPaid: "₱3,000",
      loanAmount: "₱30,000",
      datePaid: "2025-06-10",
    },
  ]);

  const [filteredPayments, setFilteredPayments] = useState<PaymentData[]>(paymentData);

  useEffect(() => {
    document.title = "MHSTEMPC | User Payments";
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const trimmed = query.trim().toLowerCase();

    if (!trimmed) {
      setFilteredPayments(paymentData);
      return;
    }

    const result = paymentData.filter(payment =>
      Object.values(payment).some(value =>
        typeof value === "string" && value.toLowerCase().includes(trimmed)
      )
    );

    setFilteredPayments(result);
  };

  const handleSort = (columnLabel: string, order?: 'asc' | 'desc') => {
    const key = sortKeyMap[columnLabel];
    const newOrder: 'asc' | 'desc' =
      order ?? (selectedColumn === columnLabel && sortOrder === 'asc' ? 'desc' : 'asc');

    let sorted = [...filteredPayments];

    if (["amountPaid", "loanAmount"].includes(key)) {
      sorted.sort((a, b) => {
        const aVal = parseFloat(a[key].replace(/[₱,]/g, ""));
        const bVal = parseFloat(b[key].replace(/[₱,]/g, ""));
        return newOrder === "asc" ? aVal - bVal : bVal - aVal;
      });
    } else {
      sorted = quickSort(sorted, key, newOrder);
    }

    setFilteredPayments(sorted);
    setSelectedColumn(columnLabel);
    setSortOrder(newOrder);
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      filteredPayments.map(payment => ({
        Name: payment.name,
        "MHSTEMPC Policy No.": payment.policyNo,
        "Amount Paid": payment.amountPaid,
        "Loan Amount": payment.loanAmount,
        "Date Paid": payment.datePaid,
      }))
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "UserPayments");
    XLSX.writeFile(workbook, "user_payments.xlsx");
  };

  const exportToWord = () => {
    let content = "User Payments\n\n";
    filteredPayments.forEach(payment => {
      content += `Name: ${payment.name}\nMHSTEMPC Policy No.: ${payment.policyNo}\nAmount Paid: ${payment.amountPaid}\nLoan Amount: ${payment.loanAmount}\nDate Paid: ${payment.datePaid}\n\n`;
    });

    const blob = new Blob([content], {
      type: "application/msword;charset=utf-8"
    });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "user_payments.doc";
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
      link.download = `user_payments.${format}`;
      link.href = canvas.toDataURL(`image/${format}`);
      link.click();
    });
  };

  const rows = filteredPayments.map(payment => [
    payment.name,
    payment.policyNo,
    payment.amountPaid,
    payment.loanAmount,
    payment.datePaid,
  ]);

  return (
    <div className="d-flex" style={{ minHeight: "100vh" }}>
      <div style={{ width: "200px", flexShrink: 0 }}></div>
      <div className="flex-grow-1 d-flex flex-column p-4">
        <div className="d-flex align-items-center mb-3" style={{ gap: "12px" }}>
          <Backbutton />
          <h3 className="mb-0">User Payments</h3>
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
            isDropdown
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
            text="Download"
            icon="bi bi-download"
            backgroundColor="#ffffff"
            textColor="#000"
            borderColor="#d9d9d9"
            height="43px"
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
              "MHSTEMPC Policy No.",
              "Amount Paid",
              "Loan Amount",
              "Date Paid",
            ]}
            rows={rows}
          />
        ) : (
          <div className="text-center w-100 mt-4 text-muted fs-5">No results found.</div>
        )}
      </div>
    </div>
  );
};

export default UserPayments;
