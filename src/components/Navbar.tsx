
import { Link } from "react-router-dom";

interface Props {
  name: string | null;
}
const Navbar = ({name}:Props) => {
    

    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-white py-3">
          <div className="container px-5">
            <a className="navbar-brand" href="#">
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
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0 small fw-bolder">
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    onClick={() => {
                      window.location.reload();
                    }}
                    to="/home"
                  >
                    Home{" "}
                  </Link>
                </li>

                <li className="nav-item">
                  <Link
                    className="nav-link"
                    onClick={() => {
                      window.location.reload();
                    }}
                    to="/logout"
                  >
                    Logout
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    );
};
export default Navbar;
