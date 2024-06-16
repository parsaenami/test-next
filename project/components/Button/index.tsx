import { Button as BaseButton, ButtonProps } from "@mui/base/Button";
import { PropsWithChildren, ReactElement } from "react";
import { cva } from "class-variance-authority";

type ButtonSizeType = "sm" | "md" | "lg" | "xl" | "2xl";
type ButtonVariantsType =
  | "primary"
  | "secondary"
  | "neutral"
  | "text"
  | "text-neutral"
  | "link";

interface Props {
  size?: ButtonSizeType;
  variant?: ButtonVariantsType;
  startSlot?: ReactElement;
  endSlot?: ReactElement;
}

function Button({
  children,
  size = "lg",
  variant = "primary",
  startSlot,
  endSlot,
  ...props
}: PropsWithChildren<Props & ButtonProps>) {
  const buttonCVA = cva("rounded-lg transition ease", {
    variants: {
      size: {
        sm: "text-text-sm-medium",
        md: "text-text-sm-medium",
        lg: "text-text-md-medium",
        xl: "text-text-md-medium",
        "2xl": "text-text-lg-medium",
      },
      variant: {
        primary: [
          "bg-primary-600 hover:bg-primary-700 disabled:bg-primary-200 active:bg-primary-800",
          "focus-visible:shadow-xs-focused-4px-primary-100-0",
          "border border-primary-600 disabled:border-primary-200",
          "text-base-white",
        ],
        secondary: [
          "bg-primary-50 hover:bg-primary-100 disabled:bg-primary-25 active:bg-primary-200",
          "focus-visible:shadow-xs-focused-4px-primary-100-0",
          "border border-primary-50 disabled:border-primary-25",
          "text-primary-700 disabled:text-primary-300",
        ],
        neutral: [
          "bg-base-white hover:bg-gray-50 disabled:bg-base-white active:bg-gray-100",
          "focus-visible:shadow-xs-focused-4px-grey-100-0",
          "border border-gray-300 disabled:border-gray-200",
          "text-gray-700 disabled:text-gray-300",
        ],
        text: [
          "bg-transparent hover:bg-primary-50 disabled:bg-transparent active:bg-primary-100",
          "border border-transparent disabled:border-transparent",
          "text-primary-700 disabled:text-gray-300",
        ],
        "text-neutral": [
          "bg-transparent hover:bg-gray-50 disabled:bg-transparent active:bg-gray-100",
          "border border-transparent disabled:border-transparent",
          "text-gray-500 disabled:text-gray-300",
        ],
        link: [
          "bg-transparent",
          "text-primary-700 hover:text-primary-800 disabled:text-gray-300",
        ],
      },
    },
    compoundVariants: [
      {
        size: "sm",
        variant: ["primary", "secondary", "neutral", "text", "text-neutral"],
        className: "px-3.5 py-2",
      },
      {
        size: "md",
        variant: ["primary", "secondary", "neutral", "text", "text-neutral"],
        className: "px-4 py-2.5",
      },
      {
        size: "lg",
        variant: ["primary", "secondary", "neutral", "text", "text-neutral"],
        className: "px-4.5 py-2.5",
      },
      {
        size: "xl",
        variant: ["primary", "secondary", "neutral", "text", "text-neutral"],
        className: "px-5 py-3",
      },
      {
        size: "2xl",
        variant: ["primary", "secondary", "neutral", "text", "text-neutral"],
        className: "px-7 py-4",
      },
    ],
  });

  return (
    <BaseButton className={buttonCVA({ size, variant })} {...props}>
      <div className="flex items-center justify-center gap-2 relative">
        {!!startSlot && startSlot}
        {children}
        {!!endSlot && endSlot}
      </div>
    </BaseButton>
  );
}

export default Button;
