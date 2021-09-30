import { useState, useEffect } from "react"
import { BrowserRouter as Router, Route} from 'react-router-dom'
import Header from './componentes/Header'
import Footer from './componentes/Footer'
import Tasks from './componentes/Tasks'
import AddTask from './componentes/AddTask'
import About from './componentes/About'

const App = () => {
  const [showAddTask, setShowAddTask] = useState(false)
  const[tasks, setTasks] = useState([])
  const[taskUpd, setTaskUpd] = useState(null)

  useEffect(() => {
    const getEdificios = async () =>{
      const tasksFromServer = await fetchEdificios()
      setTasks(tasksFromServer)
    }

    getEdificios()
  }, [])

//Fetch tasks
const fetchEdificios = async (id) => {
  const res = await fetch('http://localhost:5000/edificios')
  const data = await res.json()

  return data
}

//Agregar tarea
const addTask = async (task) =>{
  const res = await fetch('http://localhost:5000/edificios', 
  {method: 'POST', 
  headers: {'Content-type': 'application/json'}, 
  body: JSON.stringify(task)})

  const data = await res.json()

  setTasks([...tasks, data])
}

//Borrar tarea
const deleteTask = async (id) =>{
  await fetch(`http://localhost:5000/edificios/${id}`, 
  {method: 'DELETE'})
  setTasks(tasks.filter((task)=> task.id !== id))
}


const updateTask =  async (id, updTask) =>{
  const res = await fetch(`http://localhost:5000/edificios/${id}`,
  {method: 'PUT',
  headers: {'Content-type' : 'application/json'},
  body: JSON.stringify(updTask)})

  const data= await res.json()
  setTasks(tasks.map((task)=>(task.id !== id) ? task : data))
}

  return (
    <Router>
    <div className="container">
      <Header onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask} />
     
      <Route path= '/' exact 
      render={(props) =>(
        <>           
        {showAddTask && <AddTask onAdd={addTask} onUpdate={updateTask} afterAdd={()=>setShowAddTask(false)} taskUpd ={taskUpd} setTaskUpd={setTaskUpd}/>}
        
        {tasks.length > 0 ? <Tasks tasks={tasks} onDelete={deleteTask} onOpenUpdate ={()=>setShowAddTask(true)} taskUpd = {setTaskUpd}/>  : 'No hay edificios a mostrar'}
        </>
      )} />
      <Route path= '/About' component={About}/>
      <Footer />
    </div>
    </Router>
  );
}

export default App;
