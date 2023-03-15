import { ChangeEvent, FocusEvent } from "react";
import { HtmlAttributes } from "../types/html-attributes.type";

type handleChangeEvent = (event: ChangeEvent<HTMLInputElement>) => void;
type handleBlurEvent = (event: FocusEvent<HTMLInputElement>) => void;

export type InputProps = HtmlAttributes<"input"> & {
  label: string;
  onChange?: handleChangeEvent;
  onBlur?: handleBlurEvent;
};

export const Input = (props: InputProps) => {
  const { label, name, onChange, onBlur, ...inputProps } = props;
  return (
    <div className="input-field">
      <label htmlFor={name}>{label}</label>
      <input name={name} onChange={onChange} onBlur={onBlur} {...inputProps} />
    </div>
  );
};
