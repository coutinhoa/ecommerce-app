import "./SuccessMessage.css";
import { Link } from "react-router-dom";

export const SuccessMessage = () => {
  return (
    <div className="modal">
      <div className="modal-header">
        <div className="done-icon">
          <i className="bi bi-check-circle-fill"></i>
        </div>
        <div className="success">Success!</div>
      </div>
      <div className="modal-body">
        <p>Thank you for your purchase!!!!</p>
        <button className="close">
          <Link
            to={`/`}
            style={{
              textDecoration: "none",
              color: "green",
              fontWeight: "bold",
              justifyContent: "center",
            }}
          >
            Ok
          </Link>
        </button>
      </div>
    </div>
  );
};

export default SuccessMessage;
