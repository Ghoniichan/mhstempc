const AboutSettingScreen = () => {
  return (
    <div
      className="mt-1"
      style={{
        marginLeft: '200px', 
        padding: '2rem 1rem',
        boxSizing: 'border-box',
      }}
    >
      <h1 className="mb-4">About</h1>
      <div
        className="card shadow-sm mt-5"
        style={{
          maxWidth: '1000px',
          margin: '0 auto',
        }}
      >
        <div className="card-body">
          <h5 className="mb-4 text-center" style={{color:'#002d62'}}>About MHSTEMPC</h5>
          <p className="text-muted mb-3">
            Welcome to MHSTEMPC (Marikina High School Teachers and Employees Multi-Purpose Cooperative). We are committed to providing quality financial and support services to our members with transparency, security, and excellence.
          </p>
          <p>
            This system is designed to help manage loans, monitor cooperative transactions, and empower members to track their financial interactions with ease. Whether you're applying for a loan, reviewing your profile, or checking cooperative policies, this portal ensures everything is accessible and simple to use.
          </p>
          <p>
            For questions or support, please contact our cooperative office or email us at <strong>support@mhstempc.com</strong>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutSettingScreen;
