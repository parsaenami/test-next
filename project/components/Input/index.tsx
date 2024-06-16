import { Input as BaseInput, InputProps } from "@mui/base/Input";
import clsx from "clsx";
import { ReactElement } from "react";

interface Props {
  startSlot?: ReactElement;
  endSlot?: ReactElement;
  hintText?: string;
  label?: string;
  placeholder?: string;
}

function Input({ error, placeholder }: Props & InputProps) {
  return (
    <BaseInput
      className={clsx(
        "rounded-lg transition ease border border-solid border-gray-300 px-3.5 py-2.5 flex gap-2 items-center",
        {
          "focus-within:border-primary-300 focus-within:shadow-xs-focused-4px-primary-100-0":
            !error,
          "border-error-300 focus-within:shadow-xs-focused-4px-error-100-0":
            error,
        },
      )}
      slotProps={{
        input: {
          className: "focus-visible:outline-0 text-text-md-normal flex-1",
        },
      }}
      placeholder={placeholder}
      endAdornment={<div>(0)</div>}
      startAdornment={<div>$</div>}
    />
  );
}

export default Input;
