import { useState } from "react";
import axios from 'axios';

const TaskForm = () => {
  const [FormData, setFormData] = useState({
    title: "",
    body: "",
  });

  const pastSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    try {
      const success = await axios.post("http://127.0.0.1:8000/tasks/",{
        title: FormData.title,
        body: FormData.body
  
      })
    if (success) {
      alert("Task Successfully Created")
      setFormData({...FormData, title: '',body: ''})

    }

    } catch (error) {
      alert("Submission Failed" + error)

    }
    


  }
  return (
    <>
      <h1 className="title">New Task</h1>
      <div className="TaskForm">
        <form method="POST" action="" onSubmit={pastSubmit}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              value={FormData.title}
              required
              onChange={(event) => {
                setFormData({ ...FormData, title: event.target.value });
              }}
            />
            <div id="emailHelp" className="form-text">
              Keep title short.
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              About Task
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              required
              value={FormData.body} onChange={(e)=>{setFormData({...FormData,body: e.target.value})}}
            />
          </div>
          <button type="submit" className="btn btn-primary" onSubmit={pastSubmit}>
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default TaskForm;
