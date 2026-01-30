import cx from "classnames";

export default function ImageWrapper({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cx("bg-gray-200 p-8 rounded", className)}>{children}</div>
  );
}
