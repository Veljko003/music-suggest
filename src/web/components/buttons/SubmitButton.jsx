import Button from "@/web/components/buttons/Button"

const SubmitButton = (props) => {
  const { ...otherProps } = props

  return <Button type="submit" {...otherProps} />
}

export default SubmitButton
