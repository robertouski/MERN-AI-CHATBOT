import { Avatar, Box, Typography, Button, IconButton } from "@mui/material";
import { red } from "@mui/material/colors";
import { useAuth } from "../context/AuthContext";
import ChatItem from "../components/chat/ChatItem";
import { IoMdSend } from "react-icons/io";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  deleteUserChats,
  getUserChats,
  sendChatRequest,
} from "../helpers/api-communicator";
import "../components/chat/Chat.css";
import toast from "react-hot-toast";
type Message = {
  _id?: string;
  content: string;
  role: "user" | "assistant";
};

const Chat = () => {
  const chatContainerRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const auth = useAuth();
  const [chatMessages, setChatMessages] = useState<Message[]>([]);

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    const content = inputRef.current?.value.trim() as string;
    if (!content) {
      // Podrías mostrar una notificación o simplemente no hacer nada si el contenido está vacío
      toast.error("Please enter a message before sending.");
      return;
    }
    if (inputRef.current) {
      inputRef.current.value = "";
    }
    const newMessage: Message = {
      content,
      role: "user",
    };
    setChatMessages((prev) => [...prev, newMessage]);
    try {
      const chatData = await sendChatRequest(content);
      if (chatData && chatData.chats) {
        const newChats = chatData.chats.filter(
          (chat: Message) => !chatMessages.some((msg) => msg._id === chat._id)
        );
        setChatMessages([...chatMessages, ...newChats]);
      } else {
        console.error("Invalid response from server:", chatData);
      }
    } catch (error) {
      console.error("Error sending chat request:", error);
    }
  };

  const handleDeleteChats = async () => {
    try {
      await deleteUserChats();
      toast.loading("Deleting Chats...", {
        id: "deletechats",
        position: "top-right",
      });
      setChatMessages([]);
      toast.success("Chats deleted successfully", {
        id: "deletechats",
        position: "top-right",
      });
    } catch (error) {
      console.error("Error deleting chat:", error);
      toast.error("Error deleting chat", {
        id: "deletechats",
        position: "top-right",
      });
    }
  };


  useEffect(() => {
    if (chatContainerRef.current) {
      const { scrollHeight, clientHeight } = chatContainerRef.current;
      chatContainerRef.current.scrollTo(0, scrollHeight - clientHeight);
    }
  }, [chatMessages]);

  useLayoutEffect(() => {
    if (auth?.isLoggedIn && auth.user) {
      toast.loading("Loading Chats...", {
        id: "loadchats",
        position: "top-right",
      });
      getUserChats()
        .then((data) => {
          setChatMessages([...data.chats]);
          toast.success("Chats loaded successfully", {
            id: "loadchats",
            position: "top-right",
          });
        })
        .catch((error) => {
          console.error("Error loading chats", error);
          toast.error("Error loading chats", {
            id: "loadchats",
            position: "top-right",
          });
        });
    }
  }, [auth]);

  return (
    <Box
      sx={{
        display: "flex",
        flex: 1,
        width: "100%",
        height: "90vh",
        mt: 3,
        gap: 3,
      }}
    >
      <Box
        sx={{
          display: { md: "flex", xs: "none", sm: "none" },
          flex: 0.2,
          flexDirection: "column",
        }}
      >
        <Box
          className="custom-scrollbar"
          sx={{
            display: "flex",
            width: "100%",
            height: "60vh",
            bgcolor: "#0D1C24",
            flex: 1,
            flexDirection: "column",
            mx: "40px",
            mt: 2,
            borderRadius: 2,
            overflow: "auto",
            overflowX: "auto",
            overflowY: "auto",
          }}
        >
          <Avatar
            sx={{
              mx: "auto",
              my: 2,
              bgcolor: "white",
              color: "black",
              fontWeight: 700,
              width: 40,
              height: 40,
              fontSize: "1rem",
            }}
          >
            {auth?.user?.name[0] ?? "?"}
            {auth?.user?.name.split(" ")[1][0] ?? "?"}
          </Avatar>
          <Typography
            sx={{
              mx: "auto",
              fontFamily: "Work Sans, sans-serif",
              fontWeight: 700,
            }}
          >
            You are talkin to a chatbot
          </Typography>
          <Typography
            sx={{
              mx: "auto",
              fontFamily: "Work Sans, sans-serif",
              my: -2,
              p: 3,
            }}
          >
            You can ask some questions related to Knowledge, Business, Advices,
            Education, etc. But avoid sharing personal information.
          </Typography>
          <Button
            onClick={handleDeleteChats}
            sx={{
              width: "200px",
              my: "auto",
              color: "white",
              fontWeight: "700",
              borderRadius: 3,
              mx: "auto",
              bgcolor: red[400],
              ":hover": {
                bgcolor: red[500],
              },
            }}
          >
            Clear conversation
          </Button>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flex: 0.75,
          flexDirection: "column",
          mx: "auto",
          width: "100%",
          maxWidth: "900px",
        }}
      >
        <Typography
          sx={{
            textAlign: "center",
            fontSize: "30px",
            color: "white",
            mb: 1,
            ml: "auto",
            width: "fit-content",
            marginRight: "auto",
          }}
        >
          Model - GPT-4o mini
        </Typography>
        <Box
          sx={{
            width: "100%",
            height: "60vh",
            flex: 1,
            borderRadius: 3,
            mx: "auto",
            display: "flex",
            flexDirection: "column",
            bgcolor: "#0D1C24",
            overflow: "hidden",
            overflowX: "auto",
            overflowY: "auto",
            padding: "10px",
            wordWrap: "break-word",
            whiteSpace: "pre-wrap",
          }}
          className="custom-scrollbar"
        >
          {chatMessages.map((chat, index) => (
            //Box que contiene el chat para enviar
            <Box
              key={index}
              sx={{
                wordWrap: "break-word",
                whiteSpace: "pre-wrap",
                mb: 1,
              }}
            >
              <ChatItem content={chat.content} role={chat.role} />
            </Box>
          ))}
        </Box>
        <div
          style={{
            display: "flex",
            width: "100%",
            padding: "10px ",
            borderRadius: 8,
            backgroundColor: "rgb(17,27,29)",
            margin: "10px 0",
          }}
        >
          <input
            ref={inputRef}
            type="text"
            onKeyDown={handleKeyPress}
            style={{
              width: "100%",
              display: "flex",
              flex: 1,
              backgroundColor: "transparent",
              padding: "10px",
              border: "none",
              outline: "none",
              color: "white",
              fontSize: "20px",
            }}
          />
          <IconButton
            onClick={handleSubmit}
            sx={{ ml: "auto", color: "white" }}
          >
            <IoMdSend />
          </IconButton>
        </div>
      </Box>
    </Box>
  );
};

export default Chat;
