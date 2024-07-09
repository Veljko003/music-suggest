import clsx from "clsx"
import {
  ExclamationCircleIcon,
  LinkIcon,
  CheckCircleIcon,
  ArrowPathIcon
} from "@heroicons/react/24/solid"

const icons = {
  danger: ExclamationCircleIcon,
  link: LinkIcon,
  success: CheckCircleIcon,
  refresh: ArrowPathIcon
}
const Icon = (props) => {
  const { icon = "", className, ...otherProps } = props
  const SelectedIcon = icons[icon]

  return <SelectedIcon className={clsx(className)} {...otherProps} />
}

export default Icon
