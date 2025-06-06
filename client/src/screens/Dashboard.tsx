import { useNavigate } from "react-router-dom"
import SimpleCard from "../components/Dashboard/SimpleCard"
import { useEffect, useState } from "react";

const Dashboard = () => {
    const navigate = useNavigate();
    const [userRole, setUserRole] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Get user role from localStorage, sessionStorage, or API call
        const getUserRole = () => {
            // Option 1: From localStorage/sessionStorage
            const storedRole = localStorage.getItem('token');
            // If token exists, decode it to get user role
            if (storedRole) {
                const decodedToken = JSON.parse(atob(storedRole.split('.')[1]));
                const isAdmin = decodedToken.user.isAdmin;
                const role = isAdmin ? 'admin' : 'user';
                setUserRole(role);
                setIsLoading(false);
                return;
            }
        };

        getUserRole();
    }, []);

    if (isLoading) {
        return (
            <div style={{ 
                display: "flex", 
                justifyContent: "center", 
                alignItems: "center", 
                height: "100vh",
                marginLeft: "200px"
            }}>
                <h3>Loading Dashboard...</h3>
            </div>
        );
    }

    const renderAdminDashboard = () => (
      <>
        <h3 style={{ marginBottom: "20px" }}>Dashboard</h3>
        <div style={{display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <SimpleCard title="Applications" onClick={() => navigate('/application')}/>
          <SimpleCard title="Loans" onClick={() => navigate('/loans')}/>
          <SimpleCard title="Payment" onClick={() => navigate('/payment')}/>
          <SimpleCard title="Missed Payment" onClick={() => navigate('/missedPayment')}/>
        </div>
      </>
    );

    const renderUserDashboard = () => (
      <>
        <h3 style={{ marginBottom: "20px" }}>My Dashboard</h3>
        <div style={{display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <SimpleCard title="Loan"/>
          <SimpleCard title="Capital Share"/>
          <SimpleCard title="Savings"/>
        </div>
      </>
    );



    return (
      <div style={{ overflowX: "hidden" }}>
        <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          marginLeft: "200px", 
          padding: "45px 20px 450px 25px",
          boxSizing: "border-box",
        }}
      >
        {userRole === 'admin' ? renderAdminDashboard() : renderUserDashboard()}
            </div>
        </div>
    );
};

export default Dashboard