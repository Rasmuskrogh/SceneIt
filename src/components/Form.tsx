import { IForm } from "../interfaces";

function Form({ title, fields, onSubmit, type }: IForm) {
  return (
    <form onSubmit={onSubmit}>
      {type === "account" ? (
        <div>
          <h1>Account information</h1>
          <img src="tbd" alt="tbd" />
        </div>
      ) : (
        <h1>{title}</h1>
      )}
      {fields.map((field, i) => (
        <div key={i}>
          <label htmlFor={field.name}>{field.label}</label>
          <input
            type={field.type}
            name={field.name}
            required={field.required}
          />
          {type === "account" ? (
            <input type="submit" value="Save" />
          ) : (
            <input type="submit" value="Save" />
          )}
        </div>
      ))}
    </form>
  );
}

export default Form;
