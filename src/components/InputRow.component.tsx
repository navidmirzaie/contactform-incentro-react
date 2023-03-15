import { ReactNode } from "react";

type InputRowProps = {
  children: ReactNode;
};

export const InputRow = (props: InputRowProps) => {
  const { children } = props;
  return <div className="form-row">{children}</div>;
};
