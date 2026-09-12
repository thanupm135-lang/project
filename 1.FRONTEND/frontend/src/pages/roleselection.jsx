import { useState } from "react";

function RoleSelection() {
  const [selectedRole, setSelectedRole] = useState("");

  const roles = [
    "Team Member",
    "Team Lead",
    "Technical Head",
    "Project Lead",
    "HOD",
  ];

  const handleSubmit = () => {
    if (!selectedRole) {
      alert("Please select a role");
      return;
    }

    alert(`Selected role: ${selectedRole}`);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f3f4f6",
      }}
    >
      <div
        style={{
          width: "420px",
          padding: "40px",
          backgroundColor: "white",
          borderRadius: "12px",
          boxShadow: "0 8px 25px rgba(0,0,0,0.12)",
        }}
      >
        <h1 style={{ textAlign: "center" }}>
          Select Your Role
        </h1>

        <div style={{ marginTop: "30px" }}>
          {roles.map((role) => (
            <button
              key={role}
              onClick={() => setSelectedRole(role)}
              style={{
                width: "100%",
                padding: "12px",
                marginBottom: "12px",
                borderRadius: "6px",
                border: "1px solid #ccc",
                backgroundColor:
                  selectedRole === role ? "#2563eb" : "white",
                color:
                  selectedRole === role ? "white" : "black",
                cursor: "pointer",
                fontSize: "16px",
              }}
            >
              {role}
            </button>
          ))}
        </div>

        <button
          onClick={handleSubmit}
          style={{
            width: "100%",
            padding: "12px",
            marginTop: "15px",
            backgroundColor: "#2563eb",
            color: "white",
            border: "none",
            borderRadius: "6px",
            fontSize: "16px",
            fontWeight: "600",
            cursor: "pointer",
          }}
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default RoleSelection;