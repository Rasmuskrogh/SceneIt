import Form from "../components/Form";

import "../css/account.css";

function Account() {
  const dumyclickName = () => {};

  const fields = [
    { label: "First name:", name: "firstName", type: "text", required: false },
    { label: "Last name:", name: "lastName", type: "text", required: false },
    { label: "Username:", name: "username", type: "text", required: true },
    { label: "Email:", name: "email", type: "email", required: true },
    { label: "Password:", name: "password", type: "password", required: true },
  ];
  return (
    <section className="wrapper">
      <section className="account-information-section">
        <Form
          title="Account information"
          fields={fields}
          onSubmit={dumyclickName}
          buttonValue="Save"
          type="account"
        />
      </section>
    </section>
  );
}

export default Account;
