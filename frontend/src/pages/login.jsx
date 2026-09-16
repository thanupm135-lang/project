import { useState } from "react";
import RoleSelection from "./roleselection";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      alert("Please enter username and password");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setLoggedIn(true);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Cannot connect to backend");
    }
  };

  // After successful login → blank page
  if (loggedIn) {
  return <RoleSelection />;
}

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
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
          Welcome
        </h1>

        <h2
          style={{
            textAlign: "center",
            fontSize: "21px",
          }}
        >
          Sir Venkateshwara College of Engineering
        </h2>

        <h3
          style={{
            textAlign: "center",
            fontSize: "16px",
            color: "#555",
            marginBottom: "30px",
          }}
        >
          Department of Computer Science and Engineering
        </h3>

        <form onSubmit={handleLogin}>

          <label>Username</label>

          <input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{
              width: "100%",
              padding: "12px",
              marginTop: "7px",
              marginBottom: "20px",
              boxSizing: "border-box",
              border: "1px solid #ccc",
              borderRadius: "6px",
            }}
          />

          <label>Password</label>

          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: "100%",
              padding: "12px",
              marginTop: "7px",
              marginBottom: "10px",
              boxSizing: "border-box",
              border: "1px solid #ccc",
              borderRadius: "6px",
            }}
          />

          <div
            style={{
              textAlign: "right",
              marginBottom: "20px",
            }}
          >
            <button
              type="button"
              style={{
                border: "none",
                background: "none",
                color: "#2563eb",
                cursor: "pointer",
              }}
            >
              Forgot Password?
            </button>
          </div>

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "12px",
              backgroundColor: "#2563eb",
              color: "white",
              border: "none",
              borderRadius: "6px",
              fontSize: "16px",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            Login
          </button>

        </form>
      </div>
    </div>
  );
}

export default Login;