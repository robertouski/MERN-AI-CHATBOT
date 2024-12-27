import { Box, Avatar, Typography } from "@mui/material";
import { useAuth } from "../../context/AuthContext";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  coldarkDark,
} from "react-syntax-highlighter/dist/esm/styles/prism";
import React from "react";

function extractCodeFromString(message: string) {
  if (message.includes("```")) {
    const blocks = message.split("```");
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
    str.includes("#") ||
    str.includes("//")
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
    <Box sx={{ display: "flex", p: 2, bgcolor: "#004d5612", my: 2, gap: 2 }}>
      <Avatar sx={{ ml: 0, color: "black", background: "black" }}>
        <img src="minimalistLogo.png" alt="openai" width={"60px"} />{" "}
      </Avatar>
      <Box>
        {!messageBlocks && (
          <Typography sx={{ fontSize: "20px" }}>{content}</Typography>
        )}
        {messageBlocks &&
          messageBlocks.length &&
          messageBlocks.map((block, index) =>
            isCodeBlock(block) ? (
              <React.Fragment key={index}>
                <SyntaxHighlighter style={coldarkDark} language="javascript">
                  {block}
                </SyntaxHighlighter>
                <Typography sx={{ fontSize: "20px" }}>{block}</Typography>
              </React.Fragment>
            ) : null
          )}
      </Box>
    </Box>
  ) : (
    <Box
      sx={{
        display: "flex",
        p: 2,
        bgcolor: "#004654",
        gap: 2,
        justifyContent: "start",
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
