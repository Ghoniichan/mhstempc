import { useState } from "react";
import * as XLSX from "xlsx";
import SearchBar from "../components/Dashboard/SearchBar";
import CustomTable from "../components/Dashboard/CustomTable";
import ButtonCustom from "../components/Dashboard/ButtonCustom";
import Backbutton from "../components/Dashboard/Backbutton";

const MissedPayment = () => {
  const [missedPayments] = useState([
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

  const [filteredData, setFilteredData] = useState(missedPayments);

  const handleSearch = (query: string) => {
    const lowerQuery = query.trim().toLowerCase();

    if (!lowerQuery) {
      setFilteredData(missedPayments);
      return;
    }

    const result = missedPayments.filter(
      payment =>
        payment.name.toLowerCase().includes(lowerQuery) ||
        payment.loanNo.toLowerCase().includes(lowerQuery)
    );

    setFilteredData(result);
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      filteredData.map(payment => ({
        Name: payment.name,
        ID: payment.id,
        "Loan No.": payment.loanNo,
        "Loan Amount": payment.loanAmount,
        "Due Date": payment.dueDate,
        Penalty: payment.penalty,
        "Total Amount": payment.totalAmount,
        "Contact No.": payment.contactNo,
      }))
    );

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Missed Payments");
    XLSX.writeFile(workbook, "missed_payments.xlsx");
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
      <div
        className="flex-grow-1 d-flex flex-column justify-content-start align-items-start"
        style={{ padding: "40px 20px" }}
      >
        <div className="d-flex align-items-center mb-3" style={{ gap: "12px" }}>
          <Backbutton />
          <h3 className="mb-0">Missed Payments</h3>
        </div>

        <div className="d-flex align-items-center w-100 mb-4" style={{ gap: "16px" }}>
          <div style={{ flex: 1 }}>
            <SearchBar onSearch={handleSearch} />
          </div>

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
            "Loan Amount",
            "Due Date",
            "Penalty",
            "Total Amount",
            "Contact No.",
          ]}
          rows={rows}
        />
      </div>
    </div>
  );
};

export default MissedPayment;
