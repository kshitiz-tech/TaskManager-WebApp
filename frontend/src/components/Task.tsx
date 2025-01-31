
import "../style/Task.css"
import {  useNavigate } from "react-router-dom";

interface TaskType {
    id: number;
    title: string;
    context: string;
    createdAt: string;
    stat: boolean;
    due: string;
  
  }
interface Props{
    task: TaskType;
    onDelete: (id:number) => void;
    
}
function Task({ task, onDelete}:Props){

    const navigate = useNavigate();
    const onUpdate = () => {
        navigate("/update",{state: {task}});
    };

    const formattedDate =   new Date(task.createdAt).toLocaleDateString("en-US");
    var stat; 

    if (task.stat === false) {
        stat = "Not Done";
    }else {
        stat = "Done";
    }
    return(
    <div>
        <div className="task-container">
            <p className="task-title"><b>Title: </b>{task.title}</p>
            <p className="task-context"><b>Context: </b>{task.context}</p>
            <p className="created-at"><b>Created-At: </b>{formattedDate}</p>
            <p className="status"><b>Status: </b>{stat}</p>
            <p className="due"><b>Due: </b>{task.due}</p>
            <button className="delete-button" onClick={()=> onDelete(task.id)}>Delete</button>
            <br></br>
            <br></br>  
            <button className="delete-button" onClick={onUpdate}>Update</button>
           
        </div>
    </div>
    );


}

export default Task;
