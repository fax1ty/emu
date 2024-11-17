import { SealWarning } from "@phosphor-icons/react";
import { cva, VariantProps } from "class-variance-authority";

const warning = cva("flex gap-2 rounded-sm px-3 py-2 font-secondary text-xs", {
  variants: {
    intent: {
      primary: ["bg-blue-300 text-blue-900"],
    },
  },
  defaultVariants: {
    intent: "primary",
  },
});

export interface WarningProps
  extends React.BlockquoteHTMLAttributes<HTMLElement>,
    VariantProps<typeof warning> {}

export const Warning = ({
  className,
  intent,
  children,
  ...props
}: WarningProps) => (
  <blockquote className={warning({ intent, className })} {...props}>
    <SealWarning size={24} weight="fill" />
    <p className="flex-1">{children}</p>
  </blockquote>
);
