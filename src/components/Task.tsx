import "../style/Task.css";
import { useNavigate } from "react-router-dom";

interface TaskType {
  id: number;
  title: string;
  context: string;
  createdAt: string;
  stat: boolean;
  due: string;
}
interface Props {
  task: TaskType;
  onDelete: (id: number) => void;
}
function Task({ task, onDelete }: Props) {
  const navigate = useNavigate();
  const onUpdate = () => {
    navigate("/update", { state: { task } });
  };

  const formattedDate = new Date(task.createdAt).toLocaleDateString("en-US");
  var stat;

  if (task.stat === false) {
    stat = "Not Done";
  } else {
    stat = "Done";
  }
  return (
    <>
      
      <div className="card row col-sm-6 overflow-hidden shadow rounded-4 border-0 mb-5">
      
        <div className="card-body p-0">
        
          <div className="d-flex align-items-center">
          
            <div className="p-5">
              <h2 className="fw-bolder">{task.title} </h2>
              <p>
                <p className="task-context">
                  <b>Context:</b>
                  <div className="col-lg-8">{task.context}</div>
                  
                </p>
                <p className="created-at">
                  <b>Created-At: </b>
                  <br></br>
                  {formattedDate}
                </p>
                <p className="status">
                  <b>Status: </b>
                  <br></br>
                  {stat}
                </p>
                <p className="due">
                  <b>Due: </b>
                  <br></br>
                  {task.due}
                </p>
                <div className="d-grid gap-3 d-sm-flex justify-content-sm-center justify-content-xxl-start mb-3">
                <button
                  className ="btn btn-outline-dark btn-lg px-5 py-3 fs-6 fw-bolder"
                  onClick={() => onDelete(task.id)}
                >
                  Delete
                </button>
                <br></br>
                <br></br>
                <button className="btn btn-primary btn-lg px-5 py-3 me-sm-3 fs-6 fw-bolder" onClick={onUpdate}>
                  Update
                </button>
                </div>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Task;
