import { useState } from "react";
import MembershipForm from "../components/Dashboard/MembershipForm";
import MembershipFormSecond from "../components/Dashboard/MembershipFormSecond";


const RegisterApplicationFormScreen = () => {
  const [step, setStep] = useState(1);

  const handleNext = () => {
    setStep(2);
  };

  const handleCancel = () => {
    setStep(1);
  };

  return (
    <div className="d-flex" style={{ minHeight: "100vh" }}>
      <div style={{ width: "200px", flexShrink: 0 }}>
        {/* sidebar or whatever */}
      </div>
      <div
        className="flex-grow-1 d-flex flex-column justify-content-start align-items-start"
        style={{ padding: "40px 20px" }}
      >
        <h1>Register Application Form</h1>
        {step === 1 && <MembershipForm onNext={handleNext} />}
        {step === 2 && <MembershipFormSecond onCancel={handleCancel} />}
      </div>
    </div>
  );
};

export default RegisterApplicationFormScreen;
