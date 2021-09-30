import Task from './Task'

const Tasks = ({tasks, onDelete, onOpenUpdate, taskUpd}) => {
    return (
        <>
            {tasks.map((task) => 
            (<Task key={task.id} task={task} onDelete={onDelete} onOpenUpdate={onOpenUpdate} taskUpd={taskUpd}/>
            ))}
        </>
    )
}

export default Tasks
