import React, { useState, useEffect } from "react";
import { API } from "aws-amplify";
const TodoPage = () => {
  const [newItemField, setNewItemField] = useState("");

  const [todoList, setTodoList] = useState([]);

  const addNewItem = (title) => {
    API.graphql({
      query: `
      mutation {    
        addItem(done:false, title: "${title}") {    
        id    
        title    
        done
      }
    }
    `,
    }).then((data) => {
      console.log("Creation success with data", data);
      setTodoList([...todoList, data.data.addItem]);
      setNewItemField("");
    });
  };

  useEffect(() => {
    API.graphql({
      query: `query {todos {
      done
      id
      title
    }}
    `,
    }).then((data) => {
      setTodoList(data.data.todos);
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
