import { Box, Avatar, Typography } from "@mui/material";
import { useAuth } from "../../context/AuthContext";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coldarkDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import React from "react";

interface MessageBlock {
  type: "text" | "code";
  content: string;
}

function processTextBlocks(blocks: MessageBlock[]): MessageBlock[] {
  return blocks.map((block) => {
    if (block.type === "text") {
      // Convertir **texto** a negrita
      block.content = block.content.replace(
        /\*\*(.*?)\*\*/g,
        "<strong>$1</strong>"
      );
      // Convertir ### a encabezados
      block.content = block.content.replace(
        /### (.*?)(?=\n|$)/g,
        "<h3>$1</h3>"
      );
      // Convertir _texto_ a cursiva
      block.content = block.content.replace(
        /_(.*?)_/g,
        "<em>$1</em>"
      );
      // Convertir ++texto++ a subrayado
      block.content = block.content.replace(
        /\+\+(.*?)\+\+/g,
        "<u>$1</u>"
      );
      // Convertir ~~texto~~ a tachado
      block.content = block.content.replace(
        /~~(.*?)~~/g,
        "<del>$1</del>"
      );
    }
    return block;
  });
}
// Función para extraer bloques de código del texto
function extractCodeFromString(message: string): MessageBlock[] {
  const parts = message.split("```");
  const blocks: MessageBlock[] = [];

  parts.forEach((part, i) => {
    const trimPart = part.trim();
    if (trimPart) {
      blocks.push({ type: i % 2 === 0 ? "text" : "code", content: trimPart });
    }
  });

  return blocks;
}

function isCodeBlock(str: string): boolean {
  return /[=;[]\{\}\/\/#]+/.test(str);
}

interface ChatItemProps {
  content: string;
  role: "user" | "assistant";
}

// Componente para visualizar cada ítem del chat
const ChatItem: React.FC<ChatItemProps> = ({ content, role }) => {
  const messageBlocks = processTextBlocks(extractCodeFromString(content));
  const auth = useAuth();

  return (
    <Box
      className="custom-scrollbar"
      sx={{
        overflowY: "hidden",
        overflowX: "hidden",
        textAlign: "left",
        display: "flex",
        p: 2,
        bgcolor: role === "assistant" ? "#004d5612" : "#004654",
        my: 2,
        gap: 2,
        wordWrap: "break-word",
        whiteSpace: "pre-wrap",
        maxWidth: "auto",
      }}
    >
      <Avatar
        sx={{
          bgcolor: role === "assistant" ? "black" : "black",
          ml: 0,
          color: "white",
          maxWidth: "50px",
        }}
      >
        {role === "assistant" ? (
          <img src="minimalistLogo.png" alt="openai" width={"60px"} />
        ) : (
          <>
          {auth?.user?.name ? auth.user.name[0] : "?"}
          {auth?.user?.lastname ? auth.user.lastname[0] : "?"}
        </>
        )}
      </Avatar>
      <Box
      className="custom-scrollbar"
      sx={{
        maxWidth: '800px',
        width: '100%',
        overflowX: 'auto',
      }}>
        {messageBlocks.map((block, index) => (
          <React.Fragment key={index}>
            {block.type === "code" || isCodeBlock(block.content) ? (
              <SyntaxHighlighter style={coldarkDark} language="javascript" 
              customStyle={{
                lineHeight: '1.5',
                color: '#dcdcdc',
                fontSize: '1rem',
                borderRadius: '10px',
                backgroundColor: '#131313',
                padding: '20px',
                overflowX: 'auto',
              }}>
                {block.content}
              </SyntaxHighlighter>
            ) : (
              <Typography><div
              style={{ fontSize: "20px" }}
              dangerouslySetInnerHTML={{ __html: block.content }}
            /></Typography>
            )}
          </React.Fragment>
        ))}
      </Box>
    </Box>
  );
};

export default ChatItem;
