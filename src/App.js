import { useState, useEffect } from "react"
import { BrowserRouter as Router, Route} from 'react-router-dom'
import Header from './componentes/Header'
import Footer from './componentes/Footer'
import Edificios from './componentes/Edificios'
import AddOrUpdateEdificio from './componentes/AddOrUpdateEdificio'
import About from './componentes/About'

const App = () => {
  const [showAddOrUpdateEdificio, setShowAddOrUpdateEdificio] = useState(false)
  const[edificios, setEdificios] = useState([])
  const[edificioUpd, setEdificioUpd] = useState(null)

  useEffect(() => {
    const getEdificios = async () =>{
      const edificiosFromServer = await fetchEdificios()
      setEdificios(edificiosFromServer)
    }

    getEdificios()
  }, [])

//Fetch edificios
const fetchEdificios = async (id) => {
  const res = await fetch('http://localhost:5000/edificios')
  const data = await res.json()

  return data
}

//Agregar tarea
const AddEdificio = async (task) =>{
  const res = await fetch('http://localhost:5000/edificios', 
  {method: 'POST', 
  headers: {'Content-type': 'application/json'}, 
  body: JSON.stringify(task)})

  const data = await res.json()

  setEdificios([...edificios, data])
}

//Borrar tarea
const deleteEdificio = async (id) =>{
  await fetch(`http://localhost:5000/edificios/${id}`, 
  {method: 'DELETE'})
  setEdificios(edificios.filter((task)=> task.id !== id))
}


const updateEdificio =  async (id, updTask) =>{
  const res = await fetch(`http://localhost:5000/edificios/${id}`,
  {method: 'PUT',
  headers: {'Content-type' : 'application/json'},
  body: JSON.stringify(updTask)})

  const data= await res.json()
  setEdificios(edificios.map((task)=>(task.id !== id) ? task : data))
}

  return (
    <Router>
    <div className="container">
      <Header onAdd={() => setShowAddOrUpdateEdificio(!showAddOrUpdateEdificio)} showAdd={showAddOrUpdateEdificio} />
     
      <Route path= '/' exact 
      render={(props) =>(
        <>           
        {showAddOrUpdateEdificio && <AddOrUpdateEdificio onAdd={AddEdificio} onUpdate={updateEdificio} afterAdd={()=>setShowAddOrUpdateEdificio(false)} edificioUpd ={edificioUpd} setEdificioUpd={setEdificioUpd}/>}
        
        {edificios.length > 0 ? <Edificios edificios={edificios} onDelete={deleteEdificio} onOpenUpdate ={()=>setShowAddOrUpdateEdificio(true)} edificioUpd = {setEdificioUpd}/>  : 'No hay edificios a mostrar'}
        </>
      )} />
      <Route path= '/About' component={About}/>
      <Footer />
    </div>
    </Router>
  );
}

export default App;
