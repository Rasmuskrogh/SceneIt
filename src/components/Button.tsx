import { IButton } from "../interfaces";

function Button({ ClassName, OnClick, Label }: IButton) {
  return (
    <button className={ClassName} onClick={OnClick}>
      {Label.includes("svg") ? <img src={Label} alt="icon" /> : Label}
    </button>
  );
}

export default Button;
