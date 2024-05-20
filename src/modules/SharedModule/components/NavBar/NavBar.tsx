import { useContext } from "react";
import navLogo from "../../../../assets/nav-logo.png";
import avatar from "../../../../assets/Avatar.png";
import Notification from "../../../../assets/Group.png";
import { AuthContext } from "../../../../Context/AuthContext";

const NavBar: React.FC = () => {
  const { loginData } = useContext(AuthContext);

  return (
    <nav className="navbar navbar-expand-lg py-2 bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand py-0" href="#">
          <img src={navLogo} alt="navLogo" />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item p-0 p-md-0 rounded-4 mx-auto position-relative d-flex flex-wrap align-items-center justify-content-center">
              <div className="Notification me-3">
                <img src={Notification} alt="Notification-Bell" style={{ width: "30px" }} />
              </div>
              <div className="vr me-3"></div>
              <img src={avatar} alt="User Avatar" className="me-2" style={{ width: "40px" }} />
            </li>
            <li className="nav-item d-flex flex-column align-items-start">
              <span className="fw-medium" style={{ color: "#0E382F" }}>
                {loginData ? loginData.userName : "Guest"}
              </span>
              <p className="text-secondary m-0">
                {loginData ? loginData.userEmail : "guest@example.com"}
              </p>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
