import React, { useState, useEffect, useRef } from "react";
import { Modal, Button } from "react-bootstrap";
import companyLogo from "../../../src/assets/Images/logo.png";
import html2pdf from "html2pdf.js";
import axios from "../../api/axiosInstance";

interface StatementOfAccountModalProps {
  show: boolean;
  onClose: () => void;
  userId: string; // Only pass the account_id, all data will be fetched here
}

const StatementOfAccountModal: React.FC<StatementOfAccountModalProps> = ({
  show,
  onClose,
  userId,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const [data, setData] = useState<{
    name: string;
    policyNumber: string;
    totalLoan: string;
    totalPaid: string;
    remainingBalance: string;
    payments: { date: string; amount: string }[];
  }>({
    name: '',
    policyNumber: '',
    totalLoan: '',
    totalPaid: '',
    remainingBalance: '',
    payments: [],
  });

  useEffect(() => {
    if (!userId) return;

    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/user/statement/${userId}`);
        const raw = response.data;

        type RawPayment = { due_date: string; amount_due: string };
        const formattedPayments = (raw.payments as RawPayment[]).map((p) => ({
          date: new Date(p.due_date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          }),
          amount: parseFloat(p.amount_due).toFixed(2),
        }));

        setData({
          name: raw.user.name,
          policyNumber: raw.user.policy_number,
          totalLoan: parseFloat(raw.totals.total_loan).toFixed(2),
          totalPaid: parseFloat(raw.totals.paid).toFixed(2),
          remainingBalance: parseFloat(raw.totals.remaining).toFixed(2),
          payments: formattedPayments,
        });
      } catch (err) {
        console.error("Error fetching statement:", err);
      }
    };

    fetchData();
  }, [userId]);

  const downloadPDF = () => {
    if (!modalRef.current) return;
    html2pdf()
      .set({
        margin: 0.3,
        filename: `${data.name.replace(/\s+/g, "_").toLowerCase()}_soa.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
      })
      .from(modalRef.current)
      .save();
  };

  return (
    <Modal show={show} onHide={onClose} centered backdrop="static" contentClassName="p-3 rounded-4">
      <Modal.Body>
        {/* Close button */}
        <div className="d-flex align-items-center mb-0">
          <div className="flex-grow-1 text-center" />
          <button
            onClick={onClose}
            className="btn btn-light rounded-circle p-1 ms-auto"
            style={{ width: "32px", height: "32px" }}
            aria-label="Close"
          >
            <i className="bi bi-x-lg fs-6" />
          </button>
        </div>

        <div ref={modalRef}>
          {/* Logo */}
          <div className="mb-3 text-center">
            <img src={companyLogo} alt="Company Logo" style={{ width: "100px" }} />
          </div>

          {/* User Info */}
          <div className="text-center">
            <h5 className="mb-0 gothic-a1-bold">{data.name}</h5>
            <div className="text-muted mb-3 gothic-a1-regular">{data.policyNumber}</div>

            <div
              className="mx-auto bg-success d-flex justify-content-center align-items-center mb-3"
              style={{ width: "40px", height: "40px", borderRadius: "50%" }}
            >
              <i className="bi bi-check-lg text-white fs-5" />
            </div>

            {/* Statement Summary */}
            <hr />
            <h6 className="text-muted gothic-a1-bold mb-3">Statement Summary</h6>
            <div className="d-flex justify-content-between mb-1">
              <span className="gothic-a1-bold">Total Loan</span>
              <span className="gothic-a1-regular">₱ {data.totalLoan}</span>
            </div>
            <div className="d-flex justify-content-between mb-1">
              <span className="gothic-a1-bold">Total Paid</span>
              <span className="gothic-a1-regular">₱ {data.totalPaid}</span>
            </div>
            <div className="d-flex justify-content-between mb-3">
              <span className="gothic-a1-bold">Remaining Balance</span>
              <span className="gothic-a1-regular">₱ {data.remainingBalance}</span>
            </div>

            {/* Payments Breakdown */}
            {data.payments.length > 0 && (
              <>
                <hr />
                <h6 className="text-muted gothic-a1-bold mb-3">Payment Breakdown</h6>
                <div className="mb-4">
                  {data.payments.map((p, i) => (
                    <div key={i} className="d-flex justify-content-between mb-1 gothic-a1-regular">
                      <span>{p.date}</span>
                      <span>₱ {p.amount}</span>
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* Signature */}
            <div className="mb-4 text-muted gothic-a1-bold" style={{ paddingTop: "50px" }}>
              Signature
            </div>
          </div>
        </div>

        {/* Download Button */}
        <Button
          className="w-100 mt-3 text-white gothic-a1-bold"
          style={{ backgroundColor: "#002d62", border: "none", height: "50px" }}
          onClick={downloadPDF}
        >
          <i className="bi bi-download me-2" />
          Download
        </Button>
      </Modal.Body>
    </Modal>
  );
};

export default StatementOfAccountModal;
