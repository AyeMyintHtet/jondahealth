import { sendAPI } from "../api-central"

export const GetAllRecord = async () => {
  return await sendAPI('record', 'GET')
}
export const PostRecord = async (data) => {
  return await sendAPI('record', 'POST', data)
}
export const UpdateRecord = async (data, id) => {
  return await sendAPI('record', 'PUT', data, id)
}
export const DeleteRecords = async (data, id) => {
  return await sendAPI('record', 'DELETE', data, id)
}