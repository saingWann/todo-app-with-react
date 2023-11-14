import React from 'react'
import '../style/list.css'

const List = ({todo , deleteTodo ,edit,setEdit,HandleComplete,setTaskToEdit}) => {

    const confirmDelete = (id) => {
        if(confirm('Are you sure to delete the task from the list.')){
             deleteTodo(id)
        }
        return;
    }

    const handleEdit = (task) => {
        setEdit(!edit)
        setTaskToEdit(task)
    }
  return (
    <div className='container'>
        <ul className='wrapper'>
            {todo.map((task) => (
                <li className={`${task.complete? "complete" : ""}`} key={task.id}>
                    <input checked={task.complete} onChange={() =>HandleComplete(task.id,task.complete) } type="checkbox" />
                    <p className={`${task.complete? "title" : ""}`}>{task.title}</p>
                    <button onClick={()=> handleEdit(task)}>edit</button>
                    <button onClick={() => confirmDelete(task.id)}>delete</button>
                </li>

            ))}
        </ul>
    </div>
  )
}

export default List