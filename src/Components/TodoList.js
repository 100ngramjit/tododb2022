import { useState, useEffect } from "react";
import axios from "axios";

function TodoList() {
  const baseURL = " https://testapi.io/api/Sangramjit/resource/new";
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");
  const [editing, setEditing] = useState(null);
  const [editingtext, setEditingtext] = useState("");

  const getData = () => {
    axios.get(baseURL).then((resp) => setTodos(resp.data.data));
    console.log("todo", todos);
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    const temp = JSON.stringify(todos);
    localStorage.setItem("todos", temp);
  }, [todos]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(baseURL, {
      title: todo
    });
    setTodo("");
    getData();
  };

  const deleteTodo = (id) => {
    axios.delete(`${baseURL}/${id}`).then(() => {
      axios.get(baseURL).then((resp) => setTodos(resp.data.data));
    });
  };

  const editTodo = (id) => {
    [...todos].map((todo) => {
      if (todo.id === id) {
        axios.put(`${baseURL}/${id}`, {
          title: editingtext
        });
      }
    });

    setEditing(null);
    setEditingtext("");
    getData();
  };

  return (
    <div className="todolist">
      <h3>Things To Do</h3>
      <form
        className="todo-form"
        onSubmit={(e) => {
          handleSubmit(e);
          getData();
        }}
      >
        <input
          className="input"
          placeholder="Add a new task"
          type="text"
          onChange={(e) => setTodo(e.target.value)}
          value={todo}
        />
        <button className="btn btn-primary" type="submit">
          Add
        </button>
      </form>
      <div className="todos">
        {todos.map(({ title, id }) => (
          <div key={id} className="todo-list">
            {editing === id ? (
              <input
                type="text"
                onChange={(e) => setEditingtext(e.target.value)}
                value={editingtext}
              />
            ) : (
              <div>{title}</div>
            )}
            <button className="btn btn-danger" onClick={() => deleteTodo(id)}>
              delete
            </button>
            {editing === id ? (
              <button
                className="btn btn-secondary"
                onClick={() => {
                  editTodo(id);
                  getData();
                }}
              >
                submit edits
              </button>
            ) : (
              <button
                className="btn btn-secondary"
                onClick={() => {
                  setEditing(id);
                  getData();
                }}
              >
                edit
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default TodoList;
