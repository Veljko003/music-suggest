import clsx from "clsx"

const variants = {
  primary:
    "items-center bg-blue-700 rounded-lg px-3 py-3 box-border text-white cursor-pointer inline-flex text-base font-semibold justify-center leading-5 min-w-0 overflow-hidden p-0 pl-5 pr-5 text-center select-none align-middle hover:bg-blue-800 text-white active:bg-gray-900",
  styless:
    "items-center border-none px-3 py-3 cursor-pointer inline-flex text-base font-semibold justify-center leading-5 min-w-0 overflow-hidden p-0 pl-5 pr-5 text-center select-none align-middle"
}
const Button = (props) => {
  const { btnLabel, variant = "primary", ...otherProps } = props

  return (
    <>
      <button className={clsx(variants[variant])} {...otherProps}>
        {btnLabel}
      </button>
    </>
  )
}

export default Button
