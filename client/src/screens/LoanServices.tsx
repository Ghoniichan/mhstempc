const LoanServices = () => {
  return (
    <div>
      <div className="loan-services-screen-wrapper">
        <div className="loan-services-container">
          <div className="loan-services-content py-3">

            {/* Title Section */}
            <div className="title-section text-center mb-4">
              <h1 className="loan-services-title gothic-a1-bold">Loan Services</h1>
            </div>

            {/* Services Cards Section */}
            <div className="services-cards-section d-flex justify-content-center">
              <div className="card-wrapper" style={{ maxWidth: '900px', width: '100%' }}>
                <div className="service-card shadow">
                  <div className="card-body p-4">
                    <h3 className="card-title gothic-a1-bold">Loan</h3>
                    <p className="card-text mb-1 gothic-a1-regular" style={{ textAlign: 'justify' }}>
                      In the Marikina High School Teachers Employee Multi-purpose Cooperative, loan applications are submitted in person by members or borrowers to the cooperative or financial institution. These applications typically include the borrower's personal details, desired loan amount, purpose of the loan, preferred repayment terms, and any required supporting documents.

                      Once the loan form is completed and submitted physically, the admin is responsible for encoding the loan information into the system. Each encoded loan entry includes comprehensive details such as the borrower’s name, policy number or member ID, loan amount, interest rate, loan term, payment frequency (e.g., monthly), and the start and due dates of the loan.

                      The system also captures any collateral attached to the loan, the purpose of the loan, and the repayment schedule that is automatically generated based on the encoded terms. The loan status is initially marked as “Pending” or “Approved” depending on the admin’s internal review.

                      Once the loan is encoded and approved, the funds are disbursed to the borrower through cash, bank transfer, or other approved channels. The system records the disbursement and updates the loan status to “Active.” From that point forward, the system tracks repayments according to the predefined schedule.

                      The admin regularly updates the system with payment information submitted by the borrower. If a payment is missed or delayed, the system flags it, allowing the admin to follow up or apply penalties if necessary. When the borrower completes the full repayment of the loan, the loan status is updated to “Completed.”

                      A final statement or clearance certificate can be generated if required. In cases where the borrower fails to meet their repayment obligations beyond the grace period, the system marks the loan as “Defaulted,” enabling the institution to initiate recovery or legal procedures. The entire process ensures that all loan data is securely stored, easy to access, and accurately reflects the status of each member’s loan.
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default LoanServices;
