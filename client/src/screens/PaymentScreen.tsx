import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";
import SearchBar from "../components/Dashboard/SearchBar";
import CustomTable from "../components/Dashboard/CustomTable";
import ButtonCustom from "../components/Dashboard/ButtonCustom";
import Backbutton from "../components/Dashboard/Backbutton";

const sortKeyMap: Record<string, string> = {
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
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

const PaymentScreen = () => {
  const navigate = useNavigate();

  const [selectedColumn, setSelectedColumn] = useState("Name");
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const [payments] = useState([
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

  const [filteredPayments, setFilteredPayments] = useState(payments);

  useEffect(() => {
    document.title = "MHSTEMPC | Payment";
  }, []);

  const handleSearch = (query: string) => {
    const lowerQuery = query.trim().toLowerCase();
    if (!lowerQuery) {
      setFilteredPayments(payments);
      return;
    }

    const result = payments.filter(
      payment =>
        payment.name.toLowerCase().includes(lowerQuery) ||
        payment.loanNo.toLowerCase().includes(lowerQuery)
    );

    setFilteredPayments(result);
  };

  const handleSort = (columnLabel: string, order: 'asc' | 'desc') => {
    const key = sortKeyMap[columnLabel];
    const sorted = quickSort([...filteredPayments], key, order);
    setFilteredPayments(sorted);
    setSelectedColumn(columnLabel);
    setSortOrder(order);
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      filteredPayments.map(payment => ({
        Name: payment.name,
        ID: payment.id,
        "Loan No.": payment.loanNo,
        Method: payment.method,
        "Date Release": payment.dateRelease,
        Date: payment.date,
        "Collected By": payment.collectedBy,
        "Due Date": payment.dueDate,
        "Loan Amount": payment.loanAmount,
      }))
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Payments");
    XLSX.writeFile(workbook, "payments.xlsx");
  };

  const exportToWord = () => {
    let content = "Payment Records\n\n";
    filteredPayments.forEach(payment => {
      content += `Name: ${payment.name}\nID: ${payment.id}\nLoan No.: ${payment.loanNo}\nMethod: ${payment.method}\nDate Release: ${payment.dateRelease}\nPayment Date: ${payment.date}\nCollected By: ${payment.collectedBy}\nDue Date: ${payment.dueDate}\nLoan Amount: ${payment.loanAmount}\n\n`;
    });

    const blob = new Blob([content], { type: "application/msword;charset=utf-8" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "payments.doc";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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

  const rows = filteredPayments.map(payment => [
    payment.name,
    payment.id,
    payment.loanNo,
    payment.method,
    payment.dateRelease,
    payment.date,
    payment.collectedBy,
    payment.dueDate,
    payment.loanAmount,
  ]);

  return (
    <div className="d-flex" style={{ minHeight: "100vh" }}>
      <div style={{ width: "200px", flexShrink: 0 }}></div>
      <div className="flex-grow-1 d-flex flex-column justify-content-start align-items-start" style={{ padding: "40px 20px" }}>
        <div className="d-flex align-items-center mb-3" style={{ gap: "12px" }}>
          <Backbutton />
          <h3 className="mb-0">Payments</h3>
        </div>

        <div className="d-flex align-items-center w-100 mb-4" style={{ gap: "5px" }}>
          <div style={{ flex: 1 }}>
            <SearchBar onSearch={handleSearch} />
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
                onClick: () => setSelectedColumn(label),
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
            text="Add Payment"
            icon="bi bi-cash-stack"
            backgroundColor="#ffffff"
            textColor="#000"
            borderColor="#d9d9d9"
            iconSize="20px"
            fontSize="15px"
            height="45px"
            onClick={() => navigate("/addPayment")}
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
      </div>
    </div>
  );
};

export default PaymentScreen;
