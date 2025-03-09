import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_BASE_SERVER_URL;

interface CreateChatSectionPayload {
  user_id: number;
}

interface DeleteChatSectionPayload {
  user_id: number;
  chat_section_id: number;
}

interface GetMessagesParams {
  user_id: number;
  chat_section_id: number | null;
}

interface create_message_params {
  user_id: number;
  chat_section_id: number | null;
}

interface create_message_payload {
  message: string;
  user_message : string;
}

export const getAllChatSections = async (userId: number) => {
  if (!userId) {
    throw new Error("User Id is required");
  }

  try {
    const response = await axios.get(`${API_BASE_URL}/chat/chat_section/all`, {
      params: { user_id: userId }
    });
    return response;
  } catch (error) {
    console.error("Error fetching chat sections:", error);
    throw error;
  }
};

export const createChatSection = async (payload: CreateChatSectionPayload) => {
  if (!payload.user_id) {
    console.error("User Id is required !");
  }
  try {
    const response = await axios.post(`${API_BASE_URL}/chat/create-chat-section`, payload);
    return response;
  } catch (error) {
    console.error("Error while creating chat sections:", error);
    throw error;
  }
};

export const deleteChatSection = async (payload: DeleteChatSectionPayload) => {
  if (!payload.user_id) {
    console.error("User Id is required !");
  }
  try {
    const response = await axios.patch(`${API_BASE_URL}/chat/delete_chat_section`, payload);
    return response;
  } catch (error) {
    console.error("Error while deleting chat sections:", error);
    throw error;
  }
};

export const get_messages = async (params: GetMessagesParams) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/chat/chats`, {
      params: params
    });
    return response;
  } catch (error) {
    console.error("Error while creating messages", error);
    throw error;
  }
};

export const create_message = async (
  params: create_message_params,
  payload: create_message_payload
) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/chat/chat`, payload, {
      params: params
    });

    return response;
  } catch (error) {
    console.error("Error while creating messages", error);
    throw error;
  }
};
