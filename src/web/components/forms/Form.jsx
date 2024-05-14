import { Formik, Form as FormikForm } from "formik"

const Form = (props) => {
  const { children, ...otherProps } = props

  return (
    <Formik {...otherProps}>
      <FormikForm
        noValidate
        className="flex flex-col justify-center items-center gap-5 mt-10">
        {children}
      </FormikForm>
    </Formik>
  )
}
export default Form
