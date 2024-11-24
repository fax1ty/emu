import { cva, VariantProps } from "class-variance-authority";

const badge = cva("flex items-center rounded px-1", {
  variants: {
    intent: {
      success: ["bg-cyan-800 text-cyan-200"],
      info: ["bg-blue-800 text-blue-200"],
    },
    size: {
      small: ["gap-1 py-0.5 font-primary text-xxs font-semibold"],
    },
  },
  defaultVariants: {
    intent: "success",
    size: "small",
  },
});

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badge> {}

export const Badge = ({ className, intent, size, ...props }: BadgeProps) => (
  <div className={badge({ intent, size, className })} {...props} />
);
