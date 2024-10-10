import stringifyUrl from "@helper/stringifyUrl";
import axios from "axios";

export const getChatBot = async (query) => {
  const { data } = await axios.get(stringifyUrl({ url: `chat-bots/`, query }));
  return data;
};
export const showChatBot = async (id) => {
  const { data } = await axios.get(`chat-bots//${id}`);
  return data;
};
export const sendMessage = async (input) => {
  const { data } = await axios.post(`chat-bots/`, input);
  return data;
};
export const createBulkChatBot = async (input) => {
  const { data } = await axios.post(`chat-bots//bulk/create`, input);
  return data;
};
export const updateChatBot = async (id, input) => {
  const { data } = await axios.patch(`chat-bots//${id}`, input);
  return data;
};
export const deleteChatBot = async (id) => {
  const { data } = await axios.delete(`chat-bots//${id}`);
  return data;
};
export const deleteBulkChatBot = async (input) => {
  const { data } = await axios.delete(`chat-bots//bulk/delete`, {
    data: { ids: input },
  });
  return data;
};
