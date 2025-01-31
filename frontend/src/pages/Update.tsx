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
        const month = String(date.getMonth()+1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
        
    }
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
      const res = await api.put(`api/task/update/${task.id}/`,  utask
      );
      if (res) {
        alert("Updated Successfully");
      }
      navigate("/");
    } catch (error) {
      alert("Error: " + error);
    }
  };

  return (
    <div>
      <label htmlFor="title">Title</label>
      <input
        className="form-control"
        type="text"
        value={utask.title}
        onChange={(event) => {
          setUTasks({ ...utask, title: event.target.value });
        }}
      />
      <label htmlFor="context">Context</label>
      <input
        className="form-control"
        type="text"
        value={utask.context}
        onChange={(event) => {
          setUTasks({ ...utask, context: event.target.value });
        }}
      />
      <label htmlFor="Stat">Stat</label>
      <select
        className="form-control"
        value={utask.stat ? "Done" : "Not-Done"}
        onChange={(event) => {
          setUTasks({ ...utask, stat: event.target.value === "Done" });
        }}
      >
        <option>Not-Done</option>
        <option>Done</option>
      </select>
      <label htmlFor="Due">Due</label>
      <input
        className="form-control"
        type="date"
        value={utask.due}
        
        onChange={(event) => {
          setUTasks({ ...utask, due: event.target.value });
        }}
      />

      <button className="delete-button" onClick={onUpdate}>
        Update
      </button>
    </div>
  );
};

export default Update;
