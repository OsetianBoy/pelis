import React, { useEffect, useState } from 'react'
import { Editar } from './Editar';

export const Listado = () => {

    const [listadoState, setListadoState] = useState([]);
    const [editar, setEditar] = useState([0]);
    
 
    useEffect(() => {

        window.addEventListener('storage', () => {
            
             setListadoState(JSON.parse(localStorage.getItem('pelis')) || [])   
          });

        console.log("componente listado cargado");
        conseguirPeliculas();
    }, [])

    const conseguirPeliculas = () => {
        let peliculas = JSON.parse(localStorage.getItem("pelis"));

        setListadoState(peliculas);

        return peliculas;
    }

    const borrarPeli = (id) =>{
        //conseguir peliculas guardadas
        let pelis_guardadas = conseguirPeliculas();

        //filtrar esas peliculas para que elimine del array lo que no quiero
        let nuevo_array_pelis = pelis_guardadas.filter(peli => peli.id !== parseInt(id));

        console.log(pelis_guardadas, nuevo_array_pelis);
        //actualizar estado del listado
        setListadoState(nuevo_array_pelis);

        //actualizar los datos en el LocalStorage
        localStorage.setItem('pelis', JSON.stringify(nuevo_array_pelis));
    };



    return (
        <>
            {listadoState != null ?
                listadoState.map(peli => {
                    return (
                        <article key={peli.id} className="peli-item">
                            <h3 className="title">{peli.title}</h3>
                            <p className="description">{peli.description}</p>

                            <button className="edit" onClick={ () => {setEditar(peli.id)}}>Editar</button>
                            <button className="delete" onClick={ () => borrarPeli(peli.id)}>Borrar</button>

                            {/* aparece un formulario */}
                            {editar === peli.id && (
                                <Editar peli={peli}
                                        conseguirPeliculas={conseguirPeliculas}
                                />
                            )}

                        </article>
                    );
                })
                : <h2>No hay peliculas para mostrar, agregue una.</h2>
            }

        </>
    )
}
