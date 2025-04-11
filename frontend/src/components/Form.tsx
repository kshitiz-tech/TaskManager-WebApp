import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constant";
import "../style/Login.css";
import LoadingIndicator from "./LoadingIndicator";

interface Props {
  route: string;
  method: string;
}

const Form = ({ route, method }: Props) => {
  const [userDetail, setUserDetail] = useState({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    setLoading(true);
    e.preventDefault();

    try {
      const res = await api.post(route, {
        username: userDetail.username,
        password: userDetail.password,
      });

      if (res.status == 200) {
      }

      if (method === "login") {
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
        navigate("/home");
      } else {
        localStorage.clear()
        navigate("/login");
      }
    } catch (error) {
      alert(error);
      console.log(import.meta.env.VITE_API_URL);
    } finally {
      setLoading(false);
    }
  };

  //for display
  const name = method === "login" ? "Login" : "Register";
  return (
    <div className="login-container">

      <section className="py-5">
        <div className="container px-5">
          <div className="bg-light rounded-4 py-5 px-4 px-md-5">
            <div className="text-center mb-5">
              <h1 className="fw-bolder">{name}</h1>
            </div>
            <div className="row gx-5 justify-content-center">
              <div className="col-lg-8 col-xl-6"></div>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    Username
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={userDetail.username}
                    onChange={(event) => {
                      setUserDetail({
                        ...userDetail,
                        username: event.target.value,
                      });
                    }}
                  />

                  <div id="emailHelp" className="form-text"></div>
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputPassword1" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="exampleInputPassword1"
                    required
                    value={userDetail.password}
                    onChange={(e) => {
                      setUserDetail({
                        ...userDetail,
                        password: e.target.value,
                      });
                    }}
                  />
                </div>
                

                <div className="d-grid">
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
                </div>
                {loading && <LoadingIndicator/>}
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Form;
