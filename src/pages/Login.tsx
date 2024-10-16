import Form from "../components/Form";

import "../css/login.css";

const dummyclick = () => {};

function Login() {
  const fields = [
    { label: "Username", name: "username", type: "text", required: true },
    { label: "Password", name: "password", type: "password", required: true },
  ];
  return (
    <section className="login-section">
      <Form
        title="Login"
        fields={fields}
        onSubmit={dummyclick}
        type="login"
        buttonValue="Login"
      />
    </section>
  );
}

export default Login;
