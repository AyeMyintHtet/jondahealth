import { sendAPI } from "../api-central"

export const CreateLanguage = async (data) => {
  return await sendAPI('language', 'POST', data)
}
export const GetAllLanguages = async (data) => {
  return await sendAPI('language', 'GET', data)
}