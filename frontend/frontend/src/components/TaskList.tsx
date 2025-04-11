
interface Props {
    id: number,
    title: string,
    body: string,
}



const TaskList = ({id, title, body}:Props) => {
  return (
  <>
    <div className="card" key = {id}>
    <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{body}</p>
        <a href="#" className="btn btn-primary">Go somewhere</a>
    </div>
    </div>
    
  </>
  );


};

export default TaskList;
