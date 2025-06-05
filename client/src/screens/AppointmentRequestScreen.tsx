
// import SendSms from "../components/Dashboard/SendSms";

const AppointmentRequestScreen = () => {
  return (
    <div className="d-flex" style={{ minHeight: '100vh' }}>
      <div style={{ width: '200px', flexShrink: 0 }}>
        
      </div>
      <div
        className="flex-grow-1 d-flex flex-column justify-content-start align-items-start"
        style={{ padding: '40px 20px' }}
      >
        <h1>Appointment Requests</h1>
        {/* <SendSms /> */}
      </div>
    </div>
  );
};

export default AppointmentRequestScreen;
