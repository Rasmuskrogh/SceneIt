import { useEffect, useState } from "react";
import Form from "../components/Form";

import "../css/account.css";
import { useAuthContext } from "../hooks/useContext/AuthContext";
import { IAccountFormData } from "../interfaces";
import { API, BEARER } from "../constant";
import { getToken, removeToken } from "../helpers";
import { useNavigate } from "react-router-dom";

function Account() {
  const [isEditable, setIsEditable] = useState<boolean>(false);
  const [accountFormData, setAccountFormData] = useState<IAccountFormData>({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
  });
  const { userData } = useAuthContext();
  const navigate = useNavigate();

  const authToken: string | null = getToken();

  const updateAccount = async (formData: IAccountFormData) => {
    if (!authToken || !userData) {
      console.error("No token found, cannot update account");
      return;
    }
    setTimeout(() => {
      setIsEditable(false);
    }, 200);
    try {
      const response = await fetch(`${API}/users/${userData.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${BEARER} ${authToken}`,
        },
        body: JSON.stringify({
          firstname: formData.firstName,
          lastname: formData.lastName,
          username: formData.username,
          email: formData.email,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error("Failed to update account information");
      }
      console.log("Account succesfully updated", data);
    } catch (error) {
      console.log("Error updating account: error");
    }
  };

  const handleSubmit = (formData: IAccountFormData) => {
    if (!formData.username || !formData.email) {
      console.error("Username and email are required");
      return;
    }

    updateAccount(formData);
  };

  const toggleEdit = () => {
    console.log("toggleEdit triggered");
    setIsEditable((prev) => !prev);
  };

  const handleChangeInputValues = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { name, value } = e.target;
    setAccountFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const logoutUser = () => {
    removeToken();
    console.log("button clicked");
    navigate("/auth/login");
  };

  useEffect(() => {
    if (userData) {
      setAccountFormData({
        firstName: userData.firstName || "",
        lastName: userData.lastName || "",
        username: userData.username || "",
        email: userData.email || "",
        password: "", // Återställ lösenord eller lämna det tomt
      });
    }
  }, [userData]);

  const fields = [
    {
      label: "First name:",
      name: "firstName",
      type: "text",
      required: false,
      value: accountFormData.firstName,
      readOnly: !isEditable,
      handleChangeInputValues,
    },
    {
      label: "Last name:",
      name: "lastName",
      type: "text",
      required: false,
      value: accountFormData.lastName,
      readOnly: !isEditable,
      handleChangeInputValues,
    },
    {
      label: "Username:",
      name: "username",
      type: "text",
      required: true,
      value: accountFormData.username,
      readOnly: !isEditable,
      handleChangeInputValues,
    },
    {
      label: "Email:",
      name: "email",
      type: "email",
      required: true,
      value: accountFormData.email,
      readOnly: !isEditable,
      handleChangeInputValues,
    },
    /*  {
      label: "Password:",
      name: "password",
      type: "password",
      required: false,
      value: accountFormData.password,
      readOnly: !isEditable,
      handleChangeInputValues,
    }, */
  ];

  return (
    <section className="wrapper account-section">
      <section className="account-information-section">
        <Form
          title="Account information"
          fields={fields}
          onSubmit={(formData: IAccountFormData) => handleSubmit(formData)}
          isEditable={isEditable}
          toggleEdit={toggleEdit}
          buttonValue="Save"
          type="account"
        />
      </section>
      <section className="logout-section">
        <div className="button-wrapper">
          <button onClick={logoutUser} className="logout-button">
            Logout
          </button>
        </div>
      </section>
    </section>
  );
}

export default Account;
