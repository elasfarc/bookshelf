import "../styles/404.css";
import { ReactComponent as Svg404 } from "./image.svg";
import { useNavigate, Link } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div style={{ width: "90vw" }}>
      <Svg404 />
      <div style={{}}>
        <button
          to={`/discover`}
          style={{
            padding: "1rem 2rem",
            backgroundColor: "black",
            color: "white",
            borderRadius: "2rem",
            marginTop: "2rem",
            position: "absolute",
            left: "50%",
            transform: "translateX(-10%)",
          }}
          onClick={() => navigate("/")}
        >
          Go Home
        </button>
      </div>
    </div>
  );
};
export default NotFound;
