import {FaPen, FaTimes} from 'react-icons/fa'

const Edificio = ({edificio, onDelete, onOpenUpdate, edificioUpd}) => {
    const updateClick = () =>{
        edificioUpd(edificio)
        onOpenUpdate()
    }

    return (
        <div className={'task'}>
            <h3>
                {edificio.nombre} 
                <div className={'buttonInTask'}>
                    <FaPen id={"pencil"} style={{color: 'red', cursor:'pointer'}} onClick={updateClick}/>
                    <FaTimes  id={"delete"} style={{color: 'red', cursor:'pointer'}} onClick={() => onDelete(edificio.id)}/> 
                </div>
            </h3>
            <p>{edificio.direccion} - {edificio.ciudad}</p>
            <p>Codigo postal: {edificio.codigoPostal}</p>
        </div>
    )
}

export default Edificio
