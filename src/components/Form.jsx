import React, { useState } from "react";
import '../style/form.css';

const Form = ({ addNewTodo, edit,setEdit,setTaskToEdit,taskToEdit,updateTodoName }) => {
  const [todoName, setTodoName] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    setTodoName("");
  };

  const udpateData = (e) => {
    e.preventDefault();
    // console.log(taskToEdit);
    // console.log("update");
    setEdit(!edit)
    setTaskToEdit({})
  }
  return (
    <div>
      {edit ? (
        <form
          onSubmit={(e) => {
            udpateData(e);
          }}>
          <input
            value={taskToEdit.title}
            onChange={(e) => setTaskToEdit({...taskToEdit,title:e.target.value})}
            type="text"
            placeholder="Enter task todo"
            className="input-task"
          />
          <button
            onClick={() => {
              updateTodoName(taskToEdit);
            }}>
            Update todo
          </button>
        </form>
      ) : (
        <form
          onSubmit={(e) => {
            handleSubmit(e);
          }}>
          <input
            value={todoName}
            onChange={(e) => setTodoName(e.target.value)}
            type="text"
            placeholder="Enter task todo"
            className="input-task"
          />
          <button
            onClick={() => {
              addNewTodo(todoName);
            }}>
            Add New Todo
          </button>
        </form>
      )}
    </div>
  );
};

export default Form;
