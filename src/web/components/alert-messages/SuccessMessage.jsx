import Alert from "@/web/components/Alert"

const SuccessMessage = (props) => {
  const { children } = props

  return (
    <Alert variant="success">
      <p>{children}</p>
    </Alert>
  )
}
export default SuccessMessage
