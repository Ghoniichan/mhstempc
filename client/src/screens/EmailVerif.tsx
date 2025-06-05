import { useRef, useState } from "react";
import ColumnLayoutCard from "../components/Dashboard/ColumnLayoutCard";
import Form from "react-bootstrap/Form";
import CustomButton from "../components/Dashboard/CustomButton";
import { useNavigate } from "react-router-dom";

const EmailVerif = () => {
  const [code, setCode] = useState<string[]>(["", "", "", ""]);
  const [error, setError] = useState(false);
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
  const navigate = useNavigate();

  const handleInputChange = (index: number, value: string) => {
    if (value.length > 1) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
    setError(false); // Clear error when user starts typing

    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<Element>) => {
  if (e.key === "Backspace" && !code[index] && index > 0) {
    inputRefs.current[index - 1]?.focus();
  }

  if (e.key === "v" && (e.ctrlKey || e.metaKey)) {
    e.preventDefault();
    navigator.clipboard.readText().then((text) => {
      const digits = text.replace(/\D/g, "").slice(0, 4);
      const newCode = [...code];
      for (let i = 0; i < digits.length && i < 4; i++) {
        newCode[i] = digits[i];
      }
      setCode(newCode);

      const nextIndex = Math.min(digits.length, 3);
      inputRefs.current[nextIndex]?.focus();
      setError(false);
    });
  }
};


  const handleContinue = () => {
    const fullCode = code.join("");
    if (fullCode.length !== 4 || code.includes("")) {
      setError(true);
      return;
    }

    // Proceed with verification
    navigate("/newpass");
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        maxHeight: "100%",
        width: "100vw",
        height: "48vh",
        padding: "30px 0",
        boxSizing: "border-box",
        marginTop: "200px",
      }}
    >
      <ColumnLayoutCard
        title="Email Verification"
        description="Please enter the 4 digit code that you received on your email"
        titleStyle={{ fontSize: "20px", paddingLeft: "15px" }}
        descriptionStyle={{
          fontSize: "15px",
          color: "#1e1e1e",
          textAlign: "left",
          paddingLeft: "15px",
        }}
      >
        <div className="container">
          <div
            className="inputField"
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "15px",
              marginBottom: "10px",
            }}
          >
            {code.map((digit, index) => (
              <Form.Control
                key={index}
                ref={(el) => {
                  inputRefs.current[index] = el;
                }}
                type="text"
                value={digit}
                onChange={(e) => handleInputChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                style={{
                  width: "60px",
                  height: "65px",
                  textAlign: "center",
                  fontSize: "24px",
                  fontWeight: "bold",
                  border:
                    error && !digit ? "2px solid red" : "2px solid #dee2e6",
                  borderRadius: "8px",
                  backgroundColor: "#fff",
                }}
                maxLength={1}
                inputMode="numeric"
                pattern="[0-9]*"
              />
            ))}
          </div>

          {error && (
            <div
              style={{
                color: "red",
                fontSize: "14px",
                textAlign: "center",
                marginBottom: "20px",
              }}
            >
              Please enter the full 4-digit code.
            </div>
          )}

          <div style={{ display: "flex", justifyContent: "center", paddingTop: '20px' }}>
            <CustomButton
              label="Continue"
              type="button"
              onClick={handleContinue}
            />
          </div>
        </div>
      </ColumnLayoutCard>
    </div>
  );
};

export default EmailVerif;
