import { Box, useMediaQuery, useTheme} from "@mui/material";
import { TypingAnim } from "../components/typer/TypingAnim";
import { Footer } from "../components/footer/Footer";

const Home = () => {
  const footer = <Footer />;
  const theme = useTheme();
  const isBelowMd = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Box
      width={"100%"}
      height={"100%"}
      display={"flex"} //ojo que esto puedes borrar
    >
      <Box
        sx={{
          display: "flex",
          width: "100%",
          height: "100%",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
          mx: "auto",
          mt: 3,
        }}
      >
        <Box>
          <TypingAnim />
        </Box>
        <Box
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: {
              md: "row",
              xs: "column",
              sm: "column",
              width: isBelowMd ? "80%" : "90%",
            },
            gap: 5,
            my: 10,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src="chatbot.png"
            alt="chatbot"
            style={{ width: "200px", margin: "auto", borderRadius: 20 }}
          />
          <img
            className="rotate"
            src="openAI.png"
            alt="openAI"
            style={{ width: "200px", margin: "auto", borderRadius: 20 }}
          />
        </Box>
        <Box
        sx={{
          display: "flex",
          width: "100%",
          mx: "auto",
          justifyContent: "center",
          alignItems: "center",
          mt: "auto"
        }}
      >
        <img
          src="imageChat.png"
          alt="imageChat"
          style={{
            width: "60%",
            margin: "auto",
            borderRadius: 20,
            boxShadow: "-2px -2px 50px #64f3d5",
            marginTop: 20,
            marginBottom: 20,
          }}
        />
      </Box>
    {footer}
      </Box>
    </Box>
  );
};

export default Home;
