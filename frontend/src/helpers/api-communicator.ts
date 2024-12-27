import axios from "axios"

export const loginUser = async (email: string, password: string) => {
  
  const res = await axios.post("/user/login", {email,password})
  if(res.status !== 200){
    console.log("Unable to login")
    throw new Error(res.data.message)
  }
  const data = await res.data
  return data
}
export const sendChatRequest = async (message: string) => {
  try{
    const res = await axios.post("/chat/new", { message })
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


export const checkAuthStatus = async () => {
  
  const res = await axios.get("/user/auth-status")
  if(res.status !== 200){
    console.log("Unable to authenticate")
    throw new Error(res.data.message)
  }
  const data = await res.data
  return data
}

