import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";
import SearchBar from "../components/Dashboard/SearchBar";
import CustomTable from "../components/Dashboard/CustomTable";
import ButtonCustom from "../components/Dashboard/ButtonCustom";
import Backbutton from "../components/Dashboard/Backbutton";

const PaymentScreen = () => {
  const navigate = useNavigate();

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
      <div
        className="flex-grow-1 d-flex flex-column justify-content-start align-items-start"
        style={{ padding: "40px 20px" }}
      >
        <div className="d-flex align-items-center mb-3" style={{ gap: "12px" }}>
          <Backbutton />
          <h3 className="mb-0">Payments</h3>
        </div>

        <div className="d-flex align-items-center w-100 mb-4" style={{ gap: "16px" }}>
          <div style={{ flex: 1 }}>
            <SearchBar onSearch={handleSearch} />
          </div>

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
            text="Export Excel"
            icon="bi bi-file-earmark-excel"
            backgroundColor="#0d7239"
            textColor="#fff"
            borderColor="#0d7239"
            iconSize="20px"
            fontSize="15px"
            height="43px"
            onClick={exportToExcel} 
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
