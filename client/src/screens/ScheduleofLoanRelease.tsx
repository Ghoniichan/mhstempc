import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../components/Dashboard/SearchBar";
import CustomTable from "../components/Dashboard/CustomTable";
import ButtonCustom from "../components/Dashboard/ButtonCustom";
import Backbutton from "../components/Dashboard/Backbutton";

const SchedofLoanRelease = () => {
  const navigate = useNavigate();
  const [selectedDropdown, setSelectedDropdown] = useState("Schedule of Loan Release");
  const [searchValue, setSearchValue] = useState("");

  const handleDropdownClick = (label: string, path: string) => {
    setSelectedDropdown(label);
    navigate(path);
  };

  const handleSearch = (query: string): void => {
    setSearchValue(query);
    console.log("Search query:", query);
  };

  return (
    <div className="d-flex" style={{ minHeight: "100vh" }}>
      <div style={{ width: "200px", flexShrink: 0 }}>
        {/* Sidebar or nav placeholder */}
      </div>
      <div
        className="flex-grow-1 d-flex flex-column justify-content-start align-items-start"
        style={{ padding: "40px 20px" }}
      >
        <div className="d-flex align-items-center mb-3" style={{ gap: "12px" }}>
          <Backbutton />
          <h3 className="mb-0">Schedule of Loan Release</h3>
        </div>

        {/* row for search + buttons */}
            <div style={{ flex: 1 }}>
            <SearchBar value={searchValue} onSearch={handleSearch} />
            </div>

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
            text="Export Excel"
            icon="bi bi-file-earmark-excel"
            backgroundColor="#0d7239"
            textColor="#fff"
            borderColor="#0d7239"
            iconSize="20px"
            fontSize="15px"
            height="43px"
          />
        </div>

        <CustomTable
          columnHeadings={[
            "Name",
            "Date Granted",
            "Due Date",
            "Voucher No.",
            "Cash Received",
            "Loan Amount",
            "Interest",
            "Service Fee",
            "Fine",
            "Savings",
            "Capital Build Up",
            "Loan Balance",
          ]}
          rows={[]}
        />
    </div>
  );
};

export default SchedofLoanRelease;
