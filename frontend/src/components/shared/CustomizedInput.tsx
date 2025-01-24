import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";

// Estilización personalizada para el TextField
const StyledTextField = styled(TextField)({
  "& label": {
    color: "white",
  },
  "& label.Mui-focused": {
    color: "white",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "white",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "white",
    },
    "&:hover fieldset": {
      borderColor: "white",
    },
    "&.Mui-focused fieldset": {
      borderColor: "white",
    },
    "& input": {
      color: "white",
    },
  },
  "& .MuiOutlinedInput-input-root.Mui-focused, .MuiOutlinedInput-notchedOutline":
    {
      borderColor: "white !important",
    },
  marginBottom: "16px",
});

type Props = {
  name: string;
  lastname?: string;
  type: string;
  label: string;
};

const CustomizedInput = (props: Props) => {
  return <StyledTextField name={props.name} label={props.label} type={props.type} />;
};

export default CustomizedInput;
