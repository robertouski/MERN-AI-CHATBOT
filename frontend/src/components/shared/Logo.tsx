import  Typography  from "@mui/material/Typography";
import React from "react";
import { Link } from "react-router-dom";
const Logo = () => {
  return (
    <div
      style={{
        display: "flex",
        margin: "0px",
        alignItems: "center",
        justifyContent: "flex-start",
        gap: "0px",
      }}
    >
      <Link to={"/"}>
        <img
          src="minimalistLogo.png"
          alt="minimalistLogo"
          width={"100px"}
          height={"100px"}
          className="image-inverted"
          style={{ margin: "0px", verticalAlign:"middle"  }}
        />
      </Link>
      <Typography
          sx={{
            display: { md: "block", sm: "none", xs: "none" },
            mr: "10px",
            fontWeight: "800",
            textShadow: "2px 2px 20px #000000",
            fontSize: "20px",
            margin: "10px",
          }}
        >
          <span style ={{ fontSize: "20px"}}>MERN</span>-GPT
        </Typography>
    </div>
  );
};

export default Logo;
