import {useState} from 'react'
import { useEffect } from 'react/cjs/react.development'

const AddTask = ({onAdd, onUpdate, afterAdd, edificioUpd, setEdificioUpd}) => {
 
        const [direccion, setDireccion] = useState('')
        const [ciudad, setCiudad] = useState('')
        const [nombre, setNombre] = useState('')
        const [codigoPostal, setCodigoPostal] = useState('')
        const [esParticular, setEsParticular] = useState(false)
        const [constructoraID, setConstructoraID] = useState('')
    
        useEffect(()=>{
            if(edificioUpd){
                setDireccion(edificioUpd.direccion)
                setCiudad(edificioUpd.ciudad)
                setNombre(edificioUpd.nombre)
                setCodigoPostal(edificioUpd.codigoPostal)
                setEsParticular(edificioUpd.esParticular)
                setConstructoraID(edificioUpd.constructoraID)
            }
            return () => {
                setEdificioUpd(null)
            }
        }, [edificioUpd])
    
    
const onSubmit = (e) =>{
    e.preventDefault()

    if(!direccion || !ciudad || !nombre || !codigoPostal || (!esParticular && !constructoraID)){
        alert('Por favor, Ingrese correctamente los datos del edificio')
        return
    }
    if(edificioUpd){
        onUpdate(edificioUpd.id, {direccion, ciudad, nombre, codigoPostal, esParticular, constructoraID})
    }else{
        onAdd({direccion, ciudad, nombre, codigoPostal, esParticular, constructoraID})
    }

    afterAdd()
}


    return (
        <form className='add-form' onSubmit={onSubmit}>
            <div className='form-control'>
                <label>Direccion</label>
                <input type='text' placeholder = 'Agregar direccion' value={direccion} onChange={(e) => setDireccion(e.target.value)}/>
            </div>
            <div className='form-control'>
                <label>Ciudad</label>
                <input type='text' placeholder = 'Agregar ciudad' value={ciudad} onChange={(e) => setCiudad(e.target.value)}/>
            </div>
            <div className='form-control'>
                <label>Nombre</label>
                <input type='text' placeholder = 'Agregar nombre' value={nombre} onChange={(e) => setNombre(e.target.value)}/>
            </div>
            <div className='form-control'>
                <label>Codigo Postal</label>
                <input type='text' placeholder = 'Agregar codigo postal' value={codigoPostal} onChange={(e) => setCodigoPostal(e.target.value)}/>
            </div>
            <div className='form-control-check'>
                <label>Es particular?</label>
                <input type='checkbox' checked={esParticular} value={esParticular} onChange={(e) => setEsParticular(e.currentTarget.checked)}/>
            </div>
            <div className='form-control'>
                <label>Constructora ID</label>
                <input type='text' placeholder = 'Agregar el id de la constructora' value={constructoraID} onChange={(e) => setConstructoraID(e.target.value)}/>
            </div>

            <input type='submit' value='Guardar edificio' className='btn btn-block'/>
        </form>
        
    ) 
}

export default AddTask
