import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer>
    <div
          style = {{
            color: "white",
            width: "100%",
            padding: 20,
            minHeight: "20vh",
            maxHeight: "30vh",
            marginTop: 50,
          }}
          >
            <p style={{ color: "white", textAlign: "center", fontSize: 30 }}>
              Built by
              <span>
                <Link className="nav-link" to= {'https://github.com/robertouski'}>robertouski</Link>
                with ❤️
              </span>
            </p>
      </div>
    </footer>
  );
}

