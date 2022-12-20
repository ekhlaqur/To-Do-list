import React, { useState } from "react";
import "../styles/App.css";

function App() {
  const [list, updateList] = useState([]);
  const [todo, setTodo] = useState("");
  const [Edit, setEdit] = useState(false);
  const [currTodo, setcurrTodo] = useState({});
  // console.log(list, currTodo)

  const InputChange = (e) => {
    setTodo(e.target.value);
  }

  const FormSubmit = (e) => {
    e.preventDefault();

    if (todo !== "") {
      updateList([
        ...list,
        {
          id: list.length + 1,
          text: todo,
        },
      ]);
    }

    setTodo("");
  }

  const EditClick = (todo) => {
    setEdit(true);
    setcurrTodo({ ...todo });
    console.log(currTodo)
  console.log(todo);
  }

  const EditInputChange = (e) =>{
    setcurrTodo({ ...currTodo, text: e.target.value });
  }

  const EditFormSubmit = (e) => {
    e.preventDefault();

    UpdateTodo(currTodo.id, currTodo);
  }

  const UpdateTodo = (id, updatedTodo) => {
    const updatedItem = list.map((todo) => {
      return todo.id === id ? updatedTodo : todo;
    });
    setEdit(false);
    updateList(updatedItem);
    setcurrTodo({})
    console.log(updatedItem)
  }

  const DeleteClick = (id) => {
    const removeItem = list.filter((todo) => {
      return todo.id !== id;
    });
    updateList(removeItem);
  }

  

  return (
    <div className="App">
      {Edit ? (
        <form onSubmit={EditFormSubmit}>
          <h2>To Do List :</h2>
          <input
            type="text"
            value={currTodo.text}
            onChange={EditInputChange}
          />
          <button type="submit">Ok</button>
        </form>
      ) : (
        <form onSubmit={FormSubmit}>
          <h2>To Do List :</h2>
          <input 
            type="text"
            placeholder="Enter here"
            value={todo}
            onChange={InputChange}
          />
          <button type="submit">Add</button>
        </form>
      )}

        {list.map((todo) => (
      <table key={todo.id}>
        <tbody>
          <tr>
            <td>{todo.text}</td>
            <td>
              <button onClick={() => EditClick(todo)}>Edit</button>
            </td>
            <td>
              <button onClick={() => DeleteClick(todo.id)}>Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
        ))}
    </div>
  );
}

export default App;
