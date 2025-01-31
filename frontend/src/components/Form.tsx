import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN, USERNAME } from "../constant";
import "../style/Login.css"

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
  console.log(loading);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    setLoading(true);
    e.preventDefault();

    try {
      const res = await api.post(route, {
        username: userDetail.username,
        password: userDetail.password,
      });

      if (res.status == 200) {
        localStorage.setItem(USERNAME,userDetail.username);
        
      }

      if (method === "login") {
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
        
        navigate("/");
      } else {
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
      <h1 className="title">{name}</h1>
      <div className="LoginForm">
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
                setUserDetail({ ...userDetail, username: event.target.value });
              }}
            />

            <div id="emailHelp" className="form-text"></div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              required
              value={userDetail.password}
              onChange={(e) => {
                setUserDetail({ ...userDetail, password: e.target.value });
              }}
            />
          </div>
          <button type="submit"  className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Form;
