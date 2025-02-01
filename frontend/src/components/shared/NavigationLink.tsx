import { Link } from "react-router-dom";

type Props = {
  to: string;
  bg: string;
  text: string;
  textColor: string;
  onClick?: () => Promise<void>;
};

const NavigationLink = (props: Props) => {
  return (
    <Link
      onClick={props.onClick}
      className="nav-link"
      to={props.to}
      style={{ 
        backgroundColor: props.bg, 
        color: props.textColor,
        padding: '10px 20px',  
        fontSize: '1.2rem',
        margin: '0 10px',
      }}
    >
      {props.text}
    </Link>
  );
};

export default NavigationLink;
