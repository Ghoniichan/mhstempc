import { useNavigate, useLocation } from "react-router-dom";
import SimpleCard from "../components/Dashboard/SimpleCard";
import { useEffect, useState } from "react";
import ButtonCustom from "../components/Dashboard/ButtonCustom";
import StatementOfAccount from "../components/Dashboard/StatementOfAccount";

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [userRole, setUserRole] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [showStatement, setShowStatement] = useState(false);
  const [userName, setUserName] = useState('');
  const [userId, setUserId] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const user = payload.user;
        setUserId(user.id);
        setUserName(`${user.lastName}, ${user.firstName}`);
        const role = user.isAdmin ? 'admin' : 'user';
        setUserRole(role);
      } catch (err) {
        console.error('Error decoding token:', err);
      }
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    let title = "MHSTEMPC";
    if (userRole === 'admin') {
      if (location.pathname === '/application') {
        title = "MHSTEMPC | Applications";
      } else if (location.pathname === '/loans') {
        title = "MHSTEMPC | Loans";
      } else if (location.pathname === '/payment') {
        title = "MHSTEMPC | Payment";
      } else if (location.pathname === '/missedPayment') {
        title = "MHSTEMPC | Missed Payment";
      } else {
        title = "MHSTEMPC | Admin Dashboard";
      }
    } else if (userRole === 'user') {
      if (location.pathname === '/userLoan') {
        title = "MHSTEMPC | My Loan";
      } else if (location.pathname === '/userCapitalShare') {
        title = "MHSTEMPC | Capital Share";
      } else if (location.pathname === '/userSavings') {
        title = "MHSTEMPC | Savings";
      } else {
        title = "MHSTEMPC | My Dashboard";
      }
    }
    document.title = title;
  }, [location.pathname, userRole]);

  if (isLoading) {
    return (
      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        paddingLeft: "200px"
      }}>
        <h3>Loading Dashboard...</h3>
      </div>
    );
  }

  const dashboardWrapperStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    padding: "45px 20px",
    boxSizing: "border-box",
    marginLeft: window.innerWidth > 768 ? "200px" : "0",
  };

  const cardContainerStyle: React.CSSProperties = {
    display: "flex",
    flexWrap: "wrap",
    gap: "16px",
    justifyContent: "flex-start",
  };

  const renderAdminDashboard = () => (
    <>
      <h3 style={{ marginBottom: "20px" }}>Dashboard</h3>
      <div style={cardContainerStyle}>
        <SimpleCard title="Applications" onClick={() => navigate('/application')} />
        <SimpleCard title="Loans" onClick={() => navigate('/loans')} />
        <SimpleCard title="Payment" onClick={() => navigate('/payment')} />
        <SimpleCard title="Missed Payment" onClick={() => navigate('/missedPayment')} />
      </div>
    </>
  );

  const renderUserDashboard = () => (
    <>
      <h3 style={{ marginBottom: "20px" }}>My Dashboard</h3>
      <div style={cardContainerStyle}>
        <SimpleCard title="Loan" onClick={() => navigate('/userLoan')} />
        <SimpleCard title="Capital Share" onClick={() => navigate('/userCapitalShare')} />
        <SimpleCard title="Savings" onClick={() => navigate('/userSavings')} />
        <SimpleCard title="Payments" onClick={() => navigate('/userPayments')} />
      </div>
    </>
  );

  return (
    <div style={{ overflowX: "hidden" }}>
      <div style={dashboardWrapperStyle}>
        {userRole === 'admin' ? renderAdminDashboard() : renderUserDashboard()}
      </div>

      {/* Show Statement of Account only for user */}
      {userRole === 'user' && (
        <>
          {/* Statement of Account Button */}
          <div className="d-flex justify-content-end shadow mb-1" style={{ position: 'absolute', top: '50px', right: '50px' }}>
            <ButtonCustom
              text="Statement of Account"
              icon="bi bi-download"
              backgroundColor="#fff"
              textColor="#000"
              borderColor="#d9d9d9"
              height="45px"
              onClick={() => setShowStatement(true)}
            />
          </div>

          {/* Modal Statement of Account */}
          {showStatement && (
            <StatementOfAccount
              show={showStatement}
              onClose={() => setShowStatement(false)}
              user={{ name: userName, id: userId }}
              totals={{
                totalLoan: "₱5,000.00",
                totalPaid: "₱2,000.00",
                remainingBalance: "₱3,000.00"
              }}
              payments={[
                { date: "Jan 15, 2025", amount: "₱1,000.00" },
                { date: "Feb 15, 2025", amount: "₱1,000.00" },
              ]}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Dashboard;
