import React, { useEffect, useState } from "react";
import { api } from "./api";
import Form from "./components/Form";
import List from "./components/List";
import { v4 as uuidv4 } from 'uuid';

const App = () => {
  const [todo, setTodo] = useState([]);
  const [edit,setEdit] = useState(false)
  const [taskToEdit,setTaskToEdit] = useState({});

  const fetchTodo = async () => {
    const data = await api.get("/todoList");
    setTodo([...data.data]);
  };

// fetch data when the component mounted
  useEffect(() => {
    fetchTodo();
  }, []);

// add new task and update the state
  const addNewTodo = async(newTask) => {

    const newTaskList = {
      id: uuidv4(),
      title: newTask,
      complete: false
    }
    await api.post("/todoList",newTaskList);
    setTodo([...todo,newTaskList]);

  }

  // delete task from the api and the state
  const deleteTodo = async(id) => {
    await api.delete(`/todoList/${id}`)
    const newTodo = [...todo];
    setTodo(newTodo.filter((task)=> task.id !== id));

  }

  // partial upadte the data 
  const HandleComplete = async(id,currentStat) => {

    api.patch(`/todoList/${id}`,{complete:!currentStat});
  
    const currentTodo = todo.filter((task) => {
      if(task.id === id){
        task.complete = !currentStat;
        return task
      }
      return todo;
    });
    
    setTodo([...currentTodo])

  }

  const updateTodoName = (updateTask) => {

    api.patch(`/todoList/${updateTask.id}`,{title:updateTask.title});
  
    const currentTodo = todo.filter((task) => {
      if(task.id === updateTask.id){
        task.title = updateTask.title;
        return task
      }
      return todo;
    });
    
    setTodo([...currentTodo])

  }

  const listProps = {todo,HandleComplete,deleteTodo,edit,setEdit,setTaskToEdit}
  const formProps = {updateTodoName,addNewTodo,edit,setEdit,setTaskToEdit,taskToEdit}

  return (
    <div>
      <Form {...formProps} />
      <List {...listProps}/>
    </div>
  );
};

export default App;
