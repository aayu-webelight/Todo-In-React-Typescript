import React, { useEffect, useState } from "react";
import "./App.css";

type tasklist = {
  _id: string;
  task: string;
  __v: number;
};

function App() {
  const [onchanging, setonchanging] = useState(false);
  const [task, setTask] = useState("");
  const [list, setList] = useState<tasklist[]>([]);

  useEffect(() => {
    fetch("http://localhost:3002/todo/getall").then((res) => {
      res.json().then((res) => {
        setonchanging(false);
        setList(res);
      });
    });
  }, [onchanging]);

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTask(event.target.value);
  };

  const handleAdd = (event: React.FormEvent<HTMLFormElement>) => {
    fetch("http://localhost:3002/todo/add", {
      method: "post",
      body: JSON.stringify({
        task,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.status === 201) {
          setonchanging(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    event.preventDefault();
  };

  const handleDelete = (
    event: React.MouseEvent<HTMLInputElement>,
    task: tasklist
  ) => {
    fetch("http://localhost:3002/todo/delete", {
      method: "delete",

      headers: {
        "Content-Type": "application/json",
        id: task._id,
      },
    })
      .then((res) => {
        if (res.status === 201) {
          setonchanging(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    event.preventDefault();
  };
  return (
    <div className="App">
      <header className="App-header">
        <div>
          <form onSubmit={handleAdd}>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Your Task"
              aria-label="Enter Your Task"
              onChange={(event) => handleInput(event)}
            />
            <br></br>
            <input
              className="btn btn-primary"
              type="submit"
              value="Submit"
            ></input>
          </form>
        </div>

        <br></br>
        <ol className="list-group list-group-numbered todolist">
          {list.map((task: tasklist, key: number) => {
            return (
              <>
                <li className="list-group-item mb-3 ms-3 " key={key}>
                  {task.task} &nbsp;&nbsp;&nbsp;
                  <input
                    className="btn btn-primary"
                    type="submit"
                    value="Delete"
                    onClick={(event) => handleDelete(event, task)}
                  ></input>
                </li>
              </>
            );
          })}
        </ol>
      </header>
    </div>
  );
}

export default App;
