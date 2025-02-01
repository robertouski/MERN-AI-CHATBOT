import { TypeAnimation } from "react-type-animation";

export const TypingAnim = () => {
  return (
    <TypeAnimation
      sequence={[
        // Same substring at the start will only be typed once, initially
        "Chat With Your OWN AI🤖",
        1000,
        "Built With OpenAI 🛠️ ",
        2000,
        "Your Own Customizaed ChatGPT 💻",
        1500,
      ]}
      speed={30}
      style={{ fontSize: "50px", color: "white", display: "inline-block", textShadow: "1px 1px 2px #000" }}
      repeat={Infinity}
    />
  );
};

