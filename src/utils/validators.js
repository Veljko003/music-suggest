import { string, number } from "yup"

export const idValidator = number().integer().min(1).required()
export const nameValidator = string()
