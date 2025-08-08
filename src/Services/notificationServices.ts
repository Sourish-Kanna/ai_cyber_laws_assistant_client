// import axios from "axios";
import { asyncHandler, apiClient } from "./helper";

const API_BASE_URL = import.meta.env.VITE_BASE_SERVER_URL;

interface NotificationPayload {
  id: string;
  title?: string;
  message?: string;
  is_read?: boolean;
  user_id?:number
  [key: string]: any;
}

interface ApiResponse<T = any> {
  data: T;
  status: number;
  message?: string;
}

export const get_current_notification_service = asyncHandler(
  async (user_id: number): Promise<ApiResponse> => {
    const payload = {
      user_id:user_id
    }
    const response = await apiClient.post(`${API_BASE_URL}/notification/get`,payload);
    return response;
  }
);



export const update_notification_service = asyncHandler(
  async (payload: NotificationPayload): Promise<ApiResponse> => {
    return await apiClient.post(`${API_BASE_URL}/notification/update`, payload);
  }
);
