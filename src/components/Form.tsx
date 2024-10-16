import { IForm } from "../interfaces";
import Edit from "../assets/edit.svg";

import "../css/form.css";
import { useState } from "react";
import { Link } from "react-router-dom";

function Form({ title, fields, onSubmit, type, buttonValue }: IForm) {
  const [edit, setEdit] = useState<boolean>(false);

  const toggleEdit = () => {
    setEdit((prev) => !prev);
  };

  return (
    <form className="form-form" onSubmit={onSubmit}>
      {type === "account" ? (
        <div className="form-title-account">
          <h1>{title}</h1>
          <button className="form-edit-button" onClick={toggleEdit}>
            <img src={Edit} alt="tbd" />
          </button>
        </div>
      ) : (
        <h1 className="form-title">{title}</h1>
      )}
      {fields.map((field, i) => (
        <div className="form-input-wrapper" key={i}>
          <label className="form-label" htmlFor={field.name}>
            {field.label}
          </label>
          <input
            className="form-input"
            type={field.type}
            name={field.name}
            required={field.required}
          />
        </div>
      ))}
      <div className="form-button-wrapper">
        {type === "account" ? (
          edit ? (
            <input className="form-submit" type="submit" value={buttonValue} />
          ) : (
            ""
          )
        ) : (
          <input className="form-submit" type="submit" value={buttonValue} />
        )}
      </div>
      {type === "login" && (
        <Link className="form-link-texts" to="/register">
          No account? Register here
        </Link>
      )}
      {type === "register" && (
        <Link className="form-link-texts" to="/login">
          Got an account? Login here
        </Link>
      )}
    </form>
  );
}

export default Form;
