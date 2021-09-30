import Edificio from './Edificio'

const Edificios = ({edificios, onDelete, onOpenUpdate, edificioUpd}) => {
    return (
        <>
            {edificios.map((edificio) => 
            (<Edificio key={edificio.id} edificio={edificio} onDelete={onDelete} onOpenUpdate={onOpenUpdate} edificioUpd={edificioUpd}/>
            ))}
        </>
    )
}

export default Edificios
