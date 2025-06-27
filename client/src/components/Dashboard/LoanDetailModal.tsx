import { Modal, Button } from "react-bootstrap";
import { useRef } from "react";
import companyLogo from '../../../src/assets/Images/logo.png';

interface LoanDetailModalProps {
  show: boolean;
  onClose: () => void;
  loan: {
    name: string;
    id: string;
    loanAmount: string;
    interest: string;
    serviceFee: string;
    capitalShare: string;
    savings: string;
    balance: string;
  } | null;
}

const LoanDetailModal: React.FC<LoanDetailModalProps> = ({ show, onClose, loan }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const downloadModalAsPDF = async () => {
    if (typeof window === 'undefined' || !modalRef.current || !loan) return;
    const html2pdf = (await import('html2pdf.js')).default;
    const borrowerName = loan.name
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, '');
    const opt = {
      margin: 0.3,
      filename: `${borrowerName}-loan-details.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
    };
    setTimeout(() => {
      html2pdf().set(opt).from(modalRef.current!).save();
    }, 300);
  };

  return (
    <Modal
      show={show}
      onHide={onClose}
      centered
      backdrop="static"
      contentClassName="p-3 rounded-4"
    >
      <Modal.Body>
        <div className="d-flex align-items-center mb-0">
          <div className="flex-grow-1 text-center"></div>
          <button
            onClick={onClose}
            className="btn btn-light rounded-circle p-1 ms-auto"
            style={{ width: "32px", height: "32px" }}
            aria-label="Close"
          >
            <i className="bi bi-x-lg fs-6"></i>
          </button>
        </div>
        <div ref={modalRef}>
          <div className="pdf-only mb-3 text-center">
            <img src={companyLogo} alt="Company Logo" style={{ width: "100px" }} />
          </div>
          <div className="text-center">
            <h5 className="mb-0 gothic-a1-bold">{loan?.name}</h5>
            <div className="text-muted mb-3 gothic-a1-regular">{loan?.id}</div>
            <div className="mb-3">
              <div
                className="mx-auto bg-success d-flex justify-content-center align-items-center"
                style={{ width: "40px", height: "40px", borderRadius: "50%" }}
              >
                <i className="bi bi-check-lg text-white fs-5"></i>
              </div>
            </div>
            <hr />
            <h6 className="text-muted gothic-a1-bold mb-3">Computation</h6>
            <div className="d-flex justify-content-between mb-1">
              <span className="gothic-a1-bold">Loan Amount</span> <span className="gothic-a1-regular">{loan?.loanAmount}</span>
            </div>
            <div className="d-flex justify-content-between mb-1">
              <span className="gothic-a1-bold">Interest</span> <span className="gothic-a1-regular">{loan?.interest}</span>
            </div>
            <div className="d-flex justify-content-between mb-1">
              <span className="gothic-a1-bold">Service Fee</span> <span className="gothic-a1-regular">{loan?.serviceFee}</span>
            </div>
            <div className="d-flex justify-content-between mb-1">
              <span className="gothic-a1-bold">Paid–Up Capital</span> <span className="gothic-a1-regular"> {loan?.capitalShare}</span>
            </div>
            <div className="d-flex justify-content-between mb-3">
              <span className="gothic-a1-bold">Savings</span> <span className="gothic-a1-regular">{loan?.savings}</span>
            </div>
            <hr />
            <div className="d-flex justify-content-between fw-bold mb-5">
              <span className="gothic-a1-bold">Net Loan Fee Proceeds</span> <span className="gothic-a1-bold">{loan?.balance}</span>
            </div>
            <div className="mb-4 text-muted gothic-a1-bold">Signature</div>
          </div>
        </div>
        <Button
          className="w-100 mt-3 text-white gothic-a1-bold"
          style={{ backgroundColor: "#002d62", border: "none", height: "50px" }}
          onClick={downloadModalAsPDF}
        >
          <i className="bi bi-download me-2"></i>Download
        </Button>
      </Modal.Body>
    </Modal>
  );
};

export default LoanDetailModal;
