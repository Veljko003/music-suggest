import clsx from "clsx"
import {
  ExclamationCircleIcon,
  LinkIcon,
  CheckCircleIcon,
  ArrowPathIcon
} from "@heroicons/react/24/solid"
import {
  XMarkIcon,
  AdjustmentsHorizontalIcon,
  Bars3Icon
} from "@heroicons/react/24/outline"

const icons = {
  danger: ExclamationCircleIcon,
  link: LinkIcon,
  success: CheckCircleIcon,
  refresh: ArrowPathIcon,
  x: XMarkIcon,
  filter: AdjustmentsHorizontalIcon,
  hamburger: Bars3Icon
}
const Icon = (props) => {
  const { icon = "", className, ...otherProps } = props
  const SelectedIcon = icons[icon]

  return <SelectedIcon className={clsx(className)} {...otherProps} />
}

export default Icon
