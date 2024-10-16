import Form from "../components/form";

import "../css/register.css";
const dummyclick = () => {};

function Register() {
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
  return (
    <section className="register-section">
      <Form
        title="Register"
        fields={fields}
        onSubmit={dummyclick}
        type="register"
        buttonValue="Register"
      />
    </section>
  );
}

export default Register;
