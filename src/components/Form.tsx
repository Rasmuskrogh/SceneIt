import { IForm } from "../interfaces";
import Edit from "../assets/edit.svg";
import { useState } from "react";
import { Link } from "react-router-dom";

import "../css/form.css";

function Form<T>({ title, fields, onSubmit, type, buttonValue }: IForm<T>) {
  const [edit, setEdit] = useState<boolean>(false);

  const toggleEdit = () => {
    setEdit((prev) => !prev);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData: Record<string, any> = {};

    fields.forEach((field) => {
      const input = e.currentTarget.elements.namedItem(
        field.name
      ) as HTMLInputElement;

      formData[field.name] = input.value;
    });

    onSubmit(formData as T);
  };

  return (
    <form className="form-form" onSubmit={handleSubmit}>
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
        <Link className="form-link-texts" to="/auth/register">
          No account? Register here
        </Link>
      )}
      {type === "register" && (
        <Link className="form-link-texts" to="/auth/login">
          Got an account? Login here
        </Link>
      )}
    </form>
  );
}

export default Form;
