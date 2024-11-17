import { cva, VariantProps } from "class-variance-authority";

const button = cva(
  "flex items-center rounded font-primary font-semibold duration-300 hover:opacity-75 active:opacity-65 disabled:opacity-60",
  {
    variants: {
      intent: {
        primary: ["bg-blue-900 text-blue-400"],
        secondary: ["bg-blue-400 text-blue-900"],
        alternative: ["bg-purple-800 text-purple-200"],
        link: [
          "inline-flex h-auto rounded-none px-0 underline underline-offset-4",
        ],
      },
      size: {
        icon: ["size-8 justify-center"],
        small: ["h-8 gap-1.5 px-4 text-xs"],
        medium: ["h-10 justify-between gap-4 px-3 text-sm"],
      },
    },
    defaultVariants: {
      intent: "primary",
      size: "medium",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof button> {}

export const Button = ({ className, intent, size, ...props }: ButtonProps) => (
  <button className={button({ intent, size, className })} {...props} />
);
