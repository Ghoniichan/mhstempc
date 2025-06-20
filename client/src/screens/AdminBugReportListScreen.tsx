import { useState } from "react";
import CustomTable from "../components/Dashboard/CustomTable";

const AdminBugReportListScreen = () => {
  const [bugReports, setBugReports] = useState([
    {
      clientName: "Alice Johnson",
      dateSubmitted: "2025-06-15",
      subject: "App Crash on Login",
      detail: "The app crashes whenever I try to log in using my credentials.",
      status: "Pending",
    },
    {
      clientName: "Bob Williams",
      dateSubmitted: "2025-06-14",
      subject: "Wrong Data Displayed",
      detail: "My account balance is showing incorrect values after update. I’ve tried re-logging but the issue persists across multiple devices. Please look into it as soon as possible since it's affecting my records.",
      status: "Pending",
    },
  ]);

  const [expandedRows, setExpandedRows] = useState<number[]>([]);

  const handleResolve = (index: number) => {
    const updatedReports = [...bugReports];
    updatedReports[index].status = "Resolved";
    setBugReports(updatedReports);

    alert(
      `You have marked the bug report from ${updatedReports[index].clientName} as Resolved.`
    );
  };

  const toggleExpand = (index: number) => {
    setExpandedRows((prev) =>
      prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index]
    );
  };

  return (
    <div
      className="appointment-cont"
      style={{ minHeight: "100vh", position: "relative", paddingLeft: "200px" }}
    >
      <div className="contOne flex-grow-1 d-flex flex-column p-4">
        <div
          className="d-flex align-items-center mb-3"
          style={{ gap: "12px", paddingTop: "20px" }}
        >
          <h3 className="mb-0">Bug Reports</h3>
        </div>
        <div className="conttwo d-flex align-items-center mb-4" style={{ gap: "16px" }}>
          <div style={{ width: "100%", overflowX: "auto" }}>
            <CustomTable
              columnHeadings={[
                "Client Name",
                "Date Submitted",
                "Subject",
                "Detail",
                "Status",
                "Actions",
              ]}
              rows={bugReports.map((report, index) => {
                const isExpanded = expandedRows.includes(index);
                const detailContent = report.detail;

                return [
                  report.clientName,
                  report.dateSubmitted,
                  report.subject,
                  <div key={index}>
                    <div style={{ maxWidth: "300px", whiteSpace: "pre-wrap" }}>
                      {isExpanded
                        ? detailContent
                        : detailContent.length > 100
                        ? `${detailContent.substring(0, 100)}...`
                        : detailContent}
                    </div>
                    {detailContent.length > 100 && (
                      <button
                        className="btn btn-link btn-sm p-0"
                        onClick={() => toggleExpand(index)}
                      >
                        {isExpanded ? "View Less" : "View More"}
                      </button>
                    )}
                  </div>,
                  report.status,
                  <button
                    className="btn btn-success btn-sm"
                    onClick={() => handleResolve(index)}
                    disabled={report.status !== "Pending"}
                  >
                    Resolve
                  </button>,
                ];
              })}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminBugReportListScreen;
