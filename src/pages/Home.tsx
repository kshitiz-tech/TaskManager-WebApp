import { useEffect, useState } from "react";
import api from "../api";
import Task from "../components/Task";
import "../style/Home.css";
import "../style/Task.css";

interface TaskType {
  id: number;
  title: string;
  context: string;
  createdAt: string;
  stat: boolean;
  due: string;
}

const Home = () => {
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [task, setTask] = useState({
    id: 0,
    title: "",
    context: "",
    stat: false,
    due: "",
  });

  const getNotes = () => {
    api
      .get<TaskType[]>("api/task/")
      .then((res) => res.data)
      .then((data) => {
        setTasks(data);
        console.log(data);
      });
  };

  const deleteNotes = (id: number) => {
    api
      .delete(`api/task/delete/${id}/`)
      .then((res) => {
        if (res.status === 204) alert("Deleted successfully!");
        else alert("Failed to delete note!");
        getNotes();
      })
      .catch((error) => {
        alert(error);
      });
  };

  const createNotes = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    api
      .post("api/task/", {
        title: task.title,
        context: task.context,
        stat: task.stat,
        due: task.due,
      })
      .then((res) => {
        console.log(res);
        if (res.status === 201) {
          alert("Note created!");
        } else {
          alert("Failed to make notes");
        }
        getNotes();
      })
      .catch((error) => {
        alert(error);
      });
  };

  useEffect(() => {
    getNotes();
  }, []);

  return (
    <>
      <section className="py-5">
        <div className="container px-5 mb-5">
          <div className="text-center mb-5">
            <h1 className="display-5 fw-bolder mb-0">
              <span className="text-primary">Your Tasks</span>
            </h1>
          </div>
          <div className="row gx-5 justify-content-center">
            
          

          {tasks.map((each_task) => (
            <Task task={each_task} onDelete={deleteNotes} />
          ))}
    
        </div>
        </div>
      </section>

      <section className="bg-light rounded-4 py-5 px-4 px-md-5">
        <div className="text-center mb-5">
          <h1 className="fw-bolder">Task Manager</h1>
          <p className="lead fw-normal text-muted mb-0">Add your tasks!</p>
        </div>
        <div className="row gx-5 justify-content-center">
          <div className="col-lg-8 col-xl-6">
            <form onSubmit={createNotes}>
              <div className="form-floating mb-3">
                <input
                  className="form-control"
                  type="text"
                  id="title"
                  required
  
                  placeholder="Enter your name..."
                  value={task.title}
                  onChange={(e) => setTask({ ...task, title: e.target.value })}
                />
                <label htmlFor="title" className="form-label">
                  Task Title
                </label>
                {task.title ? null : (
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
                  type="text"
                  id="context"
                  required
                  value={task.context}
                  placeholder="Enter context"
                  className="form-control"
                  onChange={(e) =>
                    setTask({ ...task, context: e.target.value })
                  }
                />
                <label htmlFor="title" className="form-label">
                  Task Context
                </label>
                {task.context ? null : (
                  <div className="invalidfeedback">A context is required</div>
                )}
              </div>
              <div className="form-floating mb-3">
                <input
                  id="due"
                  className="form-control"
                  type="date"
                   required
                  value={task.due}
                  onChange={(e) => setTask({ ...task, due: e.target.value })}
                />
                <label htmlFor="due">Due Date</label>
                {task.due ? null : (
                  <div className="invalidfeedback">Due Date is required</div>
                )}
              </div>

              <div className="d-grid">
                <button
                  className="btn btn-primary btn-lg"
                  id="submitButton"
                  type="submit"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
