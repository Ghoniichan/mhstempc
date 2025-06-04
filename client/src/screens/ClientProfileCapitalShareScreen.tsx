// import Sidebar from "../components/Dashboard/Sidebar";
import InformationCard from "../components/Dashboard/InformationCard";

const ClientProfileCapitalShareScreen = () => {
  const columnHeadings = [
    'Date',
    'OR',
    'REF',
    'Received Amount',
    'Balance'
  ];

  const rows = [
    ['2023-01-01', 'OR001', 'REF001', '₱500', '₱500'],
    ['2023-01-01', 'OR001', 'REF001', '₱500', '₱500'],
    ['2023-01-01', 'OR001', 'REF001', '₱500', '₱500'],
    ['2023-01-01', 'OR001', 'REF001', '₱500', '₱500'],
    
    
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

export default ClientProfileCapitalShareScreen;
