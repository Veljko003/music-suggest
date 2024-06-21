import clsx from "clsx"
import Icon from "@/web/components/Icon"

const variants = {
  danger: { icon: "danger", className: "bg-red-200 text-red-800" },
  success: { icon: "success", className: "bg-green-200 text-green-800" }
}
const Alert = ({ className, variant = "danger", children, ...otherProps }) => {
  const { icon: variantIcon, className: variantClassName } = variants[variant]

  return (
    <div
      className={clsx(
        "p-3 rounded-lg flex items-center gap-4",
        variantClassName,
        className
      )}
      {...otherProps}>
      <Icon icon={variantIcon} className="w-10 h-10" />
      {children}
    </div>
  )
}

export default Alert
