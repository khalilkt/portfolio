import cx from "classnames";

export function Button({
  variant,
  ...props
}: {
  variant: "primary" | "text";
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const rootClassName =
    "flex gap-x-1.5 items-center px-3.5 py-2.5 text-sm rounded-[10px] leading-4.5 cursor-pointer transition-colors duration-150";

  const primaryClassname = "bg-primary text-white";
  const textClassname = "text-primary hover:bg-[#F0F0F0]";
  return (
    <button
      {...props}
      className={cx(
        rootClassName,
        variant === "primary" && primaryClassname,
        variant === "text" && textClassname,
        props.className && props.className,
      )}
    >
      {props.children}
    </button>
  );
}

export function Divider({
  isMini = false,
  ...props
}: { isMini?: boolean } & React.HTMLAttributes<HTMLHRElement>) {
  return (
    <hr
      {...props}
      className={cx(
        "border-t border-separator-gray w-full",
        isMini ? "" : "my-12",
        props.className,
      )}
    />
  );
}
