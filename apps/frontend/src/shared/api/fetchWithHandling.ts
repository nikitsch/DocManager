import { ApiError } from "~shared/api/ApiError";

export const fetchWithHandling = async <T>(url: string, options?: RequestInit): Promise<T> => {
  try {
    const response = await fetch(url, options);
    const data = await response.json();

    if (!response.ok) {
      throw new ApiError(data.message, response.status, data?.error);
    }

    return data;
  } catch (err) {
    if (err instanceof ApiError) {
      console.error(`Error API: ${err.message}, Code: ${err.statusCode}, Type: ${err.error ?? 'unknown'}`);
    } else {
      console.error('Error', err);
    }
    throw err;
  }
};
