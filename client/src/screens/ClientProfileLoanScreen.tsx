// import Sidebar from "../components/Dashboard/Sidebar";
import InformationCard from "../components/Dashboard/InformationCard";

const ClientProfileLoanScreen = () => {
  const columnHeadings = [
    'Date',
    'OR',
    'Interest',
    'Service Fee',
    'Fines',
    'Due Date',
    'Received Amount'
  ];

  const rows = [
    ['2023-01-01', 'OR001', '₱500', '₱50', '₱0', '2023-02-01', '₱550'],
    ['2023-02-01', 'OR002', '₱600', '₱60', '₱10', '2023-03-01', '₱670'],
    ['2023-03-01', 'OR003', '₱550', '₱55', '₱0', '2023-04-01', '₱605'],
    ['2023-03-01', 'OR003', '₱550', '₱55', '₱0', '2023-04-01', '₱605'],
    ['2023-03-01', 'OR003', '₱550', '₱55', '₱0', '2023-04-01', '₱605'],
    ['2023-03-01', 'OR003', '₱550', '₱55', '₱0', '2023-04-01', '₱605'],
    ['2023-03-01', 'OR003', '₱550', '₱55', '₱0', '2023-04-01', '₱605'],
    ['2023-03-01', 'OR003', '₱550', '₱55', '₱0', '2023-04-01', '₱605'],
    ['2023-03-01', 'OR003', '₱550', '₱55', '₱0', '2023-04-01', '₱605'],
    ['2023-03-01', 'OR003', '₱550', '₱55', '₱0', '2023-04-01', '₱605'],
  ];

  return (
    <div className="d-flex">
      <div style={{ width: '200px', flexShrink: 0 }}>
        {/* <Sidebar /> */}
      </div>
      <div
        className="flex-grow-1 d-flex flex-column justify-content-start align-items-start"
        style={{ padding: '40px 20px' }}
      >
        <h1>Client Profile</h1>
        <InformationCard
          name="John Doe"
          title="Client Loan Profile"
          department="Finance"
          policyNumber="MHSTEMPC-123456"
          address="123 Main St, City, Country"
          contactNumber="+1234567890"
          loanStatus="Active"
          membershipType="Standard"
          membershipDate="2023-01-01"
          columnHeadings={columnHeadings}
          rows={rows}
        />
      </div>
    </div>
  );
};

export default ClientProfileLoanScreen;
