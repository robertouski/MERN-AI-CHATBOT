import { Box, Avatar, Typography } from "@mui/material";
import { useAuth } from "../../context/AuthContext";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coldarkDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import React from "react";

function extractCodeFromString(message: string) {
  if (message.includes("```")) {
    const parts = message.split("```");
    const blocks = [];
  
    for (let i = 0; i < parts.length; i++) {
      if (i % 2 === 0) {
        if (parts[i].trim() !== "") {
          blocks.push({ type: 'text', content: parts[i].trim() });
        }
      } else {
        blocks.push({ type: 'code', content: parts[i].trim() });
      }
    }
  
    return blocks;
  }
}
function isCodeBlock(str: string) {
  if (
    str.includes("=") ||
    str.includes(";") ||
    str.includes("[") ||
    str.includes("]") ||
    str.includes("{") ||
    str.includes("}") ||
    str.includes("//") ||
    str.includes("##") ||
    str.includes("###") ||
    str.includes("####") 
    ) {
    return true;
  }
  return false;
}
const ChatItem = ({
  content,
  role,
}: {
  content: string;
  role: string | "user" | "assistant";
}) => {
  const messageBlocks = extractCodeFromString(content);
  const auth = useAuth();
  return role === "assistant" ? (
    <Box
      sx={{
        textAlign: "left",
        display: "flex",
        p: 2,
        bgcolor: "#004d5612",
        my: 2,
        gap: 2,
        wordWrap: "break-word",
        whiteSpace: "pre-wrap",
        maxWidth: "100%",
      }}
    >
      <Avatar sx={{ ml: 0, color: "black", background: "black" }}>
        <img src="minimalistLogo.png" alt="openai" width={"60px"} />{" "}
      </Avatar>
      <Box>
        {!messageBlocks && (
          <Typography sx={{ textAlign: "left", fontSize: "20px" }}>
            {content}
          </Typography>
        )}
        {messageBlocks &&
          messageBlocks.length &&
          messageBlocks.map((block, index) =>
            block.type === "code" || isCodeBlock(block.content) ? (
              <React.Fragment key={index}>
                <SyntaxHighlighter style={coldarkDark} language="javascript" >
                  {block.content}
                </SyntaxHighlighter>
                <Typography sx={{ fontSize: "20px" }} >
                  {block.content}
                </Typography>
              </React.Fragment>
            ) : null
          )}
      </Box>
    </Box>
  ) : (
    <Box
      sx={{
        textAlign: "left",
        display: "flex",
        p: 2,
        bgcolor: "#004654",
        gap: 2,
        justifyContent: "start",
        maxWidth: "100%",
        wordWrap: "break-word", // Asegura que el texto se ajuste al ancho del contenedor
        whiteSpace: "pre-wrap", // Mantiene los saltos de línea y espacios en blanco
      }}
    >
      <Avatar sx={{ ml: "0", bgcolor: "black", color: "white" }}>
        {auth?.user?.name[0] ?? "?"}
        {auth?.user?.name.split(" ")[1][0] ?? "?"}
      </Avatar>
      <Box>
        <Typography
          sx={{ p: 1, gap: 1, justifyContent: "start" }}
          fontSize={"20px"}
        >
          {" "}
          {content}
        </Typography>
      </Box>
    </Box>
  );
};

export default ChatItem;
