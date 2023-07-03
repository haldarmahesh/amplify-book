import React, { useState, useEffect } from "react";
import { API } from "aws-amplify";
const TodoPage = () => {
  const [newItemField, setNewItemField] = useState("");

  const [todoList, setTodoList] = useState([]);

  const addNewItem = (title) => {
    API.post("todosapi", "/todos", { body: { title, done: false } })
      .then((data) => {
        console.log("Creation success with data", data);
        setTodoList([...todoList, data]);
        setNewItemField("");
      })
      .catch((err) => {
        console.log("ERROR while calling POST api call");
      });
  };

  useEffect(() => {
    API.get("todosapi", "/todos").then((data) => {
      setTodoList(data);
    });
  }, []);
  
  return (
    <>
      <h1>Todo lists</h1>
      <ol>
        {todoList.map((item) => {
          return (
            <li>{item.done ? <strike>{item.title}</strike> : item.title}</li>
          );
        })}
      </ol>

      <div>
        <input
          type="text"
          onChange={(event) => {
            setNewItemField(event.target.value);
          }}
          value={newItemField}
        />
      </div>
      <div>
        <button onClick={() => addNewItem(newItemField)}>+ Add new item</button>
      </div>
    </>
  );
};
export default TodoPage;
