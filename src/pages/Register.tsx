import { useState } from "react";
import Form from "../components/Form";
import { RegisterFormData } from "../interfaces";
import { useAuthContext } from "../hooks/useContext/AuthContext";
import { useNavigate } from "react-router-dom";

import "../css/register.css";
import { API } from "../constant";
import { setToken } from "../helpers";
import useBackendStatus from "../hooks/useBackendStatus";

function Register() {
  const [isLoading, setisLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const { setUserData } = useAuthContext();
  const navigate = useNavigate();

  const { backendReady } = useBackendStatus(
    `${API.replace("/api", "")}/admin/_health`
  );

  const fields = [
    { label: "Username", name: "username", type: "text", required: true },
    { label: "Email", name: "email", type: "email", required: true },
    { label: "Password", name: "password", type: "password", required: true },
    {
      label: "Repeat password",
      name: "repeat",
      type: "password",
      required: true,
    },
  ];

  const handleRegister = async (values: RegisterFormData) => {
    setisLoading(true);
    try {
      const response = await fetch(`${API}/auth/local/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: values.username,
          email: values.email,
          password: values.password,
        }),
      });

      const data = await response.json();
      if (data.error) {
        throw new Error(data.error.message);
      } else {
        setToken(data.jwt);
        setUserData(data.user);
        navigate("/auth/login", { replace: true });
      }
    } catch (error: any) {
      setError(error.message || "An error occured during registration.");
    } finally {
      setisLoading(false);
    }
  };

  if (!backendReady) {
    return (
      <div className="backend-not-ready">
        <p>
          Please wait while backend it starting up. <br /> It lies dormant while
          the app is not beeing used.
        </p>
      </div>
    );
  }

  return (
    <section className="register-section">
      {error && <div className="registration-error-message">{error}</div>}
      <Form
        title="Register"
        fields={fields}
        onSubmit={(values: RegisterFormData) => handleRegister(values)}
        type="register"
        buttonValue={isLoading ? "Loading..." : "Register"}
      />
    </section>
  );
}

export default Register;
