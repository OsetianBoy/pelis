import React from 'react'

export const Editar = ({peli, conseguirPeliculas}) => {

    const titleComponent = "Editar pelicula";

    const guardarEdicion = (e, id) => {
        e.preventDefault();
        
        //Consigo formulario(target) del evento
        let target = e.target;

        //Busco el indice del objeto de la peli a actualizar
        const pelis_almacenadas = conseguirPeliculas();
        const indice = pelis_almacenadas.findIndex(peli => peli.id === id);

        //console.log(indice)

        //creo objeto con ese indice
        let peli = {
            id,
            title: target.title.value,
            description: target.description.value
        };
        console.log(indice, peli)
    }

  return (
    <div className='edit_form'>
        <h3 className='title'>{titleComponent}</h3>

        <form onSubmit={e => guardarEdicion(e, peli.id)}>
            <input 
                    type="text"
                    name="title"
                    className="titulo_editado"
                    defaultValue={peli.title}       
            />

            <textarea
                    name="description"
                    defaultValue={peli.description}
                    className="descripcion_editada"
            />

            <input type="submit" className="editar" value="Actualizar" />
        </form>
    </div>
  )
}
