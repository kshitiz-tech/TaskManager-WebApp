import { useState } from "react";
import api from "../api";
import { useLocation, useNavigate } from "react-router-dom";
import "../style/Task.css";

interface TaskType {
  id: number;
  title: string;
  context: string;
  createdAt: string;
  stat: boolean;
  due: string;
}

const Update = () => {
  const location = useLocation();
  const task = location.state.task as TaskType;
  const navigate = useNavigate();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  const [utask, setUTasks] = useState({
    id: task.id,
    title: task.title,
    context: task.context,
    createdAt: task.createdAt,
    stat: task.stat,
    due: formatDate(task.due),
  });
  const isValidDate = (dateString: string) => {
    const date = new Date(dateString);
    return !isNaN(date.getTime()); // Check if the date is valid
  };

  const onUpdate = async () => {
    if (!isValidDate(utask.due)) {
      alert("Please enter a valid date.");
      return;
    }

    try {
      const res = await api.put(`api/task/update/${task.id}/`, utask);
      if (res) {
        alert("Updated Successfully");
      }
      navigate("/home");
    } catch (error) {
      alert("Error: " + error);
    }
  };

  return (
    <div>
      <section className="py-5">
        <div className="container px-5">
          <div className="bg-light rounded-4 py-5 px-4 px-md-5">
            <div className="text-center mb-5">
              <h1 className="fw-bolder">Update Your Tasks!</h1>
            </div>
            <div className="row gx-5 justify-content-center">
              <div className="col-lg-8 col-xl-6">
                <div className="form-floating mb-3">
                  <input
                    className="form-control"
                    type="text"
                    value={utask.title}
                    placeholder="title"
                    onChange={(event) => {
                      setUTasks({ ...utask, title: event.target.value });
                    }}
                  />
                  <label htmlFor="title">Title</label>
                  {utask.title ? null : (
                    <div
                      className="invalidfeedback"
                      data-sb-feedback="title:required"
                    >
                      A title is required
                    </div>
                  )}
                </div>
                <div className="form-floating mb-3">
                  <input
                    className="form-control"
                    type="text"
                    value={utask.context}
                    placeholder="context"
                    onChange={(event) => {
                      setUTasks({ ...utask, context: event.target.value });
                    }}
                  />
                  <label htmlFor="context">Context</label>
                  {utask.context ? null : (
                    <div className="invalidfeedback">A context is required</div>
                  )}
                </div>
                <div className="form-floating mb-3">
                  <select
                    className="form-control"
                    value={utask.stat ? "Done" : "Not-Done"}
                    onChange={(event) => {
                      setUTasks({
                        ...utask,
                        stat: event.target.value === "Done",
                      });
                    }}
                  >
                    <option>Not-Done</option>
                    <option>Done</option>
                  </select>
                  <label htmlFor="Stat">Status</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    className="form-control"
                    type="date"
                    value={utask.due}
                    onChange={(event) => {
                      setUTasks({ ...utask, due: event.target.value });
                    }}
                  />
                  <label htmlFor="Due">Due</label>
                </div>
                <div className="d-grid">
                  <button className="delete-button" onClick={onUpdate}>
                    Update
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Update;
