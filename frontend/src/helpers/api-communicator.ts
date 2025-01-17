import axios from "axios";

export const loginUser = async (email: string, password: string) => {
  const res = await axios.post("/user/login", { email, password });
  if (res.status !== 200) {
    console.log("Unable to login");
    throw new Error(res.data.message);
  }
  const data = await res.data;
  return data;
};
export const sendChatRequest = async (message: string) => {
  try {
    const res = await axios.post("/chat/new", { message });
    if (res.status !== 200) {
      console.log("Unable to send chat");
      throw new Error(res.data.message);
    }

    const data = res.data;
    if (!data || !data.chats) {
      throw new Error("Invalid response structure");
    }
    return data;
  } catch (error) {
    console.error("Error sending chat request:", error);
    throw error;
  }
};

export const getUserChats = async () => {
  try {
    const res = await axios.get("/chat/all-chats", {
      headers: {
        "Cache-Control": "no-cache",
        Pragma: "no-cache",
        Expires: "0",
      },
    });
    if (res.status !== 200 || !res.data) {
      console.error("Unable to fetch chats");
      throw new Error("Invalid response from server");
    }

    if (!res.data.chats) {
      console.warn("No chats found in the response");
      return { chats: [] }; // Devuelve una lista vacía si no hay chats
    }

    return res.data; // Devuelve la data que incluye los chats
  } catch (error) {
    console.error("Error fetching chat request:", error);
    throw error; // Lanza el error para manejarlo más arriba si es necesario
  }
};

export const deleteUserChats = async () => {
  const res = await axios.delete("/chat/delete");
  if (res.status !== 200) {
    console.log("Unable to delete chats");
    throw new Error(res.data.message);
  }
  const data = await res.data;
  return data;
};

export const checkAuthStatus = async () => {
  const res = await axios.get("/user/auth-status");
  if (res.status !== 200) {
    console.log("Unable to authenticate");
    throw new Error(res.data.message);
  }
  const data = await res.data;
  return data;
};
