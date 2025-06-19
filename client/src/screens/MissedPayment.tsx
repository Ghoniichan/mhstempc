import { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import SearchBar from "../components/Dashboard/SearchBar";
import CustomTable from "../components/Dashboard/CustomTable";
import ButtonCustom from "../components/Dashboard/ButtonCustom";
import Backbutton from "../components/Dashboard/Backbutton";

// Quick sort function
const quickSort = <T,>(arr: T[], key: keyof T, order: 'asc' | 'desc'): T[] => {
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

type MissedPaymentType = {
  name: string;
  id: string;
  loanNo: string;
  loanAmount: string;
  dueDate: string;
  penalty: string;
  totalAmount: string;
  contactNo: string;
};

const columnMap: Record<string, keyof MissedPaymentType> = {
  "Name": "name",
  "ID": "id",
  "Loan No.": "loanNo",
  "Loan Amount": "loanAmount",
  "Due Date": "dueDate",
  "Penalty": "penalty",
  "Total Amount": "totalAmount",
  "Contact No.": "contactNo",
};

const MissedPayment = () => {
  const [missedPayments] = useState<MissedPaymentType[]>([
    {
      name: "Micha Bandasan",
      id: "MHST12345",
      loanNo: "LN20240601",
      loanAmount: "₱50,000",
      dueDate: "2025-06-01",
      penalty: "₱2,000",
      totalAmount: "₱52,000",
      contactNo: "09123456789",
    },
    {
      name: "Juan Dela Cruz",
      id: "MHST67890",
      loanNo: "LN20240520",
      loanAmount: "₱30,000",
      dueDate: "2025-05-20",
      penalty: "₱1,500",
      totalAmount: "₱31,500",
      contactNo: "09987654321",
    },
  ]);

  const [filteredData, setFilteredData] = useState<MissedPaymentType[]>(missedPayments);
  const [selectedColumn, setSelectedColumn] = useState("Name");
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    document.title = "MHSTEMPC | Missed Payment";
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const lowerQuery = query.trim().toLowerCase();
    if (!lowerQuery) {
      setFilteredData(missedPayments);
      return;
    }

    const result = missedPayments.filter(payment =>
      Object.values(payment).some(value =>
        typeof value === "string" && value.toLowerCase().includes(lowerQuery)
      )
    );

    setFilteredData(result);
  };

  const handleSort = (column: string, order: 'asc' | 'desc') => {
    const key = columnMap[column];
    if (!key) return;

    const isCurrencyField = ["loanAmount", "penalty", "totalAmount"].includes(key);
    let sorted = [...filteredData];

    if (isCurrencyField) {
      sorted.sort((a, b) => {
        const aVal = parseFloat(a[key].replace(/[₱,]/g, ""));
        const bVal = parseFloat(b[key].replace(/[₱,]/g, ""));
        return order === "asc" ? aVal - bVal : bVal - aVal;
      });
    } else {
      sorted = quickSort(sorted, key, order);
    }

    setFilteredData(sorted);
    setSelectedColumn(column);
    setSortOrder(order);
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Missed Payments");
    XLSX.writeFile(workbook, "missed_payments.xlsx");
  };

  const exportToWord = () => {
    let content = "Missed Payment Records\n\n";
    filteredData.forEach(payment => {
      content += `Name: ${payment.name}\nID: ${payment.id}\nLoan No.: ${payment.loanNo}\nLoan Amount: ${payment.loanAmount}\nDue Date: ${payment.dueDate}\nPenalty: ${payment.penalty}\nTotal Amount: ${payment.totalAmount}\nContact No.: ${payment.contactNo}\n\n`;
    });

    const blob = new Blob([content], { type: "application/msword;charset=utf-8" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "missed_payments.doc";
    link.click();
  };

  const exportAsImage = async (format: "jpeg" | "png") => {
    const table = document.querySelector("table");
    if (!table) return;

    const html2canvas = (await import("html2canvas")).default;
    html2canvas(table).then(canvas => {
      const link = document.createElement("a");
      link.download = `missed_payments.${format}`;
      link.href = canvas.toDataURL(`image/${format}`);
      link.click();
    });
  };

  const rows = filteredData.map(payment => [
    payment.name,
    payment.id,
    payment.loanNo,
    payment.loanAmount,
    payment.dueDate,
    payment.penalty,
    payment.totalAmount,
    payment.contactNo,
  ]);

  return (
    <div className="d-flex" style={{ minHeight: "100vh" }}>
      <div style={{ width: "200px", flexShrink: 0 }}></div>
      <div className="flex-grow-1 d-flex flex-column p-4">
        <div className="d-flex align-items-center mb-3" style={{ gap: "12px" }}>
          <Backbutton />
          <h3 className="mb-0">Missed Payments</h3>
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
              ...Object.keys(columnMap).map(label => ({
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
            backgroundColor="#ffffff"
            textColor="#000"
            borderColor="#d9d9d9"
            height="43px"
            isDropdown={true}
            dropdownItems={[
              { label: "Export to Excel", onClick: exportToExcel },
              { label: "Export to Word", onClick: exportToWord },
              { label: "Download as JPEG", onClick: () => exportAsImage("jpeg") },
              { label: "Download as PNG", onClick: () => exportAsImage("png") },
            ]}
          />
        </div>

        {filteredData.length > 0 ? (
          <CustomTable
            columnHeadings={[
              "Name",
              "ID",
              "Loan No.",
              "Loan Amount",
              "Due Date",
              "Penalty",
              "Total Amount",
              "Contact No.",
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

export default MissedPayment;
