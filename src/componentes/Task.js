import {FaPen, FaTimes} from 'react-icons/fa'

const Task = ({task, onDelete, onOpenUpdate, taskUpd}) => {
    const updateClick = () =>{
        taskUpd(task)
        onOpenUpdate()
    }

    return (
        <div className={'task'}>
            <h3>
                {task.nombre} 
                <div className={'buttonInTask'}>
                    <FaPen id={"pencil"} style={{color: 'red', cursor:'pointer'}} onClick={updateClick}/>
                    <FaTimes  id={"delete"} style={{color: 'red', cursor:'pointer'}} onClick={() => onDelete(task.id)}/> 
                </div>
            </h3>
            <p>{task.direccion} - {task.ciudad}</p>
            <p>Codigo postal: {task.codigoPostal}</p>
        </div>
    )
}

export default Task
