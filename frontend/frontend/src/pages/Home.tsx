import { useEffect, useState } from "react";
import api from "../api";
import Task from "../components/Task";
import "../style/Home.css";

interface TaskType {
  id: number;
  title: string;
  context: string;
  createdAt: string;
  stat: boolean;
  due: string;

}
const Home = () => {
  const [ tasks, setTasks] = useState<TaskType[]>([]);
  const [task, setTask] = useState({
    id:0,
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
        console.log(data)
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

    api.post("api/task/", { title: task.title, context:task.context, stat: task.stat, due: task.due }).then((res) => {
        console.log(res)
        if (res.status === 201){
          alert("Note created!");
        }

        else {
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
      <div>
        <h1>Tasks</h1>
        {tasks.map( (each_task)=> (<Task task={each_task} onDelete ={deleteNotes} />))}

      </div>
      <div className="form-container">
        <form onSubmit={createNotes}>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Task title
            </label>
            <input
              type="text"
              name="title"
              required
              value={task.title}
              className="form-control"
              onChange={(e) => setTask({ ...task, title: e.target.value })}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Task context
            </label>

            <input
              type="text"
              name="title"
              value={task.context}
              className="form-control"
              onChange={(e) => setTask({ ...task, context: e.target.value })}
            />
          </div>
          <input
            type="date"
            name="due"
            value={task.due}
            onChange={(e) => setTask({ ...task, due: e.target.value })}

          />
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default Home;
