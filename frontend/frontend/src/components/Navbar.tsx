import { USERNAME } from "../constant";
import { Link } from "react-router-dom";

const Navbar = () => {
  const name = localStorage.getItem(USERNAME);
  var user_status = false;

  function Reload() {
    window.location.reload;
    return null;
  }


  function Alert() {
    alert(" Access Denied Please Login! ")
  }

  let funct;


  if (name) {
    user_status = true;
    funct = Reload();
    
  } else {
    funct = Alert();
  }
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-white py-3">
        <div className="container px-5">
          <a className="navbar-brand" href="index.html">
            <span className="fw-bolder text-primary">
              Hello! <b>{name}</b>
            </span>
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
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 small fw-bolder">
              <li className="nav-item">
                  <Link className="nav-link" onClick = { () => {funct} } to="/">
                  Home </Link> 
            </li>
              <li className="nav-item">
            {user_status ? null : <Link className="nav-link" onClick = { () => {window.location.reload}} to="/register">
                  Register
                </Link> }
                
              </li>
              {user_status ? (
                <li className="nav-item">
                  <Link className="nav-link" onClick = { () => {window.location.reload}}to="/logout">
                    Logout
                  </Link>
                </li>
              ) : null}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
