// commonHelper.ts

import axios, { AxiosResponse } from "axios";

// A simple async wrapper for catching errors
type AsyncFunction<T = any> = (...args: any[]) => Promise<T>;

const asyncHandler = <T = any>(fn: AsyncFunction<T>): AsyncFunction<T> => {
  return async (...args: any[]): Promise<T> => {
    try {
      return await fn(...args);
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  };
};

// Type-safe API client
type Headers = Record<string, string>;

const apiClient = {
  get: async <T = any>(url: string, headers: Headers = {}): Promise<AxiosResponse<T>> => {
    return axios.get<T>(url, {
      headers,
      withCredentials: true
    });
  },

  post: async <T = any>(
    url: string,
    data: any,
    headers: Headers = {}
  ): Promise<AxiosResponse<T>> => {
    if (data instanceof FormData) {
      delete headers["Content-Type"];
    } else if (!headers["Content-Type"]) {
      headers["Content-Type"] = "application/json";
    }

    return axios.post<T>(url, data, {
      headers,
      withCredentials: true
    });
  }
};

export { asyncHandler, apiClient };
