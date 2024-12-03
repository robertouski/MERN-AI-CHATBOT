import axios from "axios"

export const loginUser = async (email: string, password: string) => {
  
  const res = await axios.post("/user/login", {email,password})
  if(res.status !== 200){
    console.log("Unable to login")
    throw new Error(res.data.message)
  }
  console.log("I passed")
  const data = await res.data
  return data
}
export const checkAuthStatus = async () => {
  
  const res = await axios.get("/user/auth-status")
  if(res.status !== 200){
    console.log("Unable to authenticate")
    throw new Error(res.data.message)
  }
  const data = await res.data
  return data
}