import Icon from "@/web/components/Icon"
import FormField from "@/web/components/forms/FormField"

const LinkField = ({ ...otherProps }) => (
  <div className="relative">
    <Icon
      icon="link"
      className="absolute top-3/4 right-2 transform -translate-y-1/2 w-6"
    />
    <FormField type="text" className="pr-10" {...otherProps} />
  </div>
)

export default LinkField
