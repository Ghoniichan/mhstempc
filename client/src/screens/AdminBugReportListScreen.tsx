import { useEffect, useState } from "react";
import CustomTable from "../components/Dashboard/CustomTable";
import axios from "../api/axiosInstance";

interface BugReport {
  id: string;
  clientName: string;
  dateSubmitted: string;
  subject: string;
  detail: string;
  status: string;
}

interface ApiBugReport {
  id: string;
  reporter_name: string;
  date_submitted: string;
  subject: string;
  details: string;
  status: string;
}

const AdminBugReportListScreen = () => {
  const [bugReports, setBugReports] = useState<BugReport[]>([]);

  const [expandedRows, setExpandedRows] = useState<number[]>([]);

  const handleResolve = async (index: number) => {
    const updatedReports = [...bugReports];
    // Log the report id and status before changing it
    const reportId = updatedReports[index].id;
    try {
      // Call the API to resolve the bug report
      await axios.put(`/api/bugs/${reportId}`);
      
      // Log the successful resolution
      console.log(`Bug report ${reportId} resolved successfully.`);
    } catch (error) {
      console.error("Error resolving bug report:", error);
      alert("Failed to resolve the bug report. Please try again later.");
      return;
      
    }

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

  useEffect(() => {
    const fetchBugReports = async () => {
      try {
        const response = await axios.get("/api/bugs");
        const reports = response.data.map((report: ApiBugReport) => ({
          id: report.id,
          clientName: report.reporter_name,
          dateSubmitted: new Date(report.date_submitted).toLocaleDateString(),
          subject: report.subject,
          detail: report.details,
          status: report.status,
        }));
        setBugReports(reports);        
      } catch (error) {
        console.error("Error fetching bug reports:", error);
      }
    };

    fetchBugReports();
  }, []);

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
                    disabled={report.status !== "pending"}
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
