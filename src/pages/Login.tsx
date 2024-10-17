import { useState } from "react";
import Form from "../components/Form";

import "../css/login.css";
import { useAuthContext } from "../hooks/useContext/AuthContext";
import { useNavigate } from "react-router-dom";
import { LoginFormData } from "../interfaces";
import { API } from "../constant";
import { setToken } from "../helpers";

function Login() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const { setUser } = useAuthContext();
  const navigate = useNavigate();

  const fields = [
    { label: "Username", name: "username", type: "text", required: true },
    { label: "Password", name: "password", type: "password", required: true },
  ];

  const handleLogin = async (values: LoginFormData) => {
    setIsLoading(true);
    setError("");
    try {
      const value = {
        identifier: values.username,
        password: values.password,
      };

      const response = await fetch(`${API}/auth/local`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(value),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 400) {
          throw new Error("Invalid username or password.");
        } else if (response.status === 500) {
          throw new Error("Server error. Please try again later.");
        } else {
          throw new Error("An error occurred. Please try again later.");
        }
      }
      setToken(data.jwt);
      setUser(data.user);
      navigate("/");
    } catch (error: any) {
      setError(
        error.message || "An unexpected error occured please try again later."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="login-section">
      {error && <div className="login-error-message">{error}</div>}
      <Form
        title="Login"
        fields={fields}
        onSubmit={handleLogin}
        type="login"
        buttonValue={isLoading ? "Loading..." : "Login"}
      />
    </section>
  );
}

export default Login;
