import CustomTable from "../components/Dashboard/CustomTable";
import Backbutton from "../components/Dashboard/Backbutton";
import { useEffect } from "react";

const UserSavings = () => {
  useEffect(() => {
        document.title = "MHSTEMPC | Savings";
      }, []);

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
          <h3 className="mb-0">Savings</h3>
        </div>

        {/* row for search + buttons */}

        <CustomTable
          columnHeadings={[
            "Date",
            "REF",
            "Received",
            "Withdrawal",
            "Balance",
          ]}
          rows={[]}
        />
      </div>
    </div>
  );
}

export default UserSavings