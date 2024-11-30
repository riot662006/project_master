import { SerializableProject } from "@/utils/types";
import showToast from "react-hot-toast";

export async function apiRequest<T>(
  url: string,
  method: "GET" | "POST" | "PUT" | "DELETE",
  body?: Record<string, unknown>,
  toast?: { success?: string; error?: string },
): Promise<T> {
  try {
    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
      throw new Error(toast?.success || "An error occurred");
    }

    const data: T = await response.json();
    if (toast?.success !== undefined)
      showToast.success(toast?.success || "Request successful");
    return data;
  } catch (error: any) {
    if (toast?.error !== undefined)
      showToast.error(toast?.error || "An error occurred");
    throw error;
  }
}
