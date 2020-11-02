import React, { Fragment, useState } from "react";
// para documentar un prototype
import PropTypes from 'prop-types';
import uuid from 'uuid/dist/v4';  
// uuid es una libreria importada! - generador de id 

const Formulario = ({crearCita}) => {

  // objeto de formulario con state
  const [cita, actualizarCita] = useState({
    mascota: '',
    propietario: '',
    fecha: '',
    hora: '',
    sintomas: ''
  });

  // es recomendable hacer otro state para mas funciones que no estan relacionadas y permite escalar mas la app
  const [error,actualizarError]=useState(false)

  // funcion para modificar el state con formulario 
  const actualizarState = e => {
    actualizarCita({
      ...cita,
      [e.target.name]: e.target.value,
    });
  };

  // extraer informacion modificada del state
  const { mascota, propietario, fecha, hora, sintomas } = cita;

  // cuando el usuario envia el formulario
 const enviarCita = e => {
   // para que no recargue la pagina y no aparezca en la url como parametros como metodo get
   e.preventDefault();
   // validar - trim() --> elimina los espacios en blanco que ingresa el usuario al inicio y al final
   if(mascota.trim() === '' || propietario.trim() === '' || fecha.trim() === '' 
   || hora.trim() === '' || sintomas.trim() === ''){
       actualizarError(true);
    return;
   }
   // eliminar el error previo - opcional!
   actualizarError(false);

   // asignar ID
   cita.id = uuid();

  // crear cita 
  crearCita(cita);

   // reiniciar form 
   actualizarCita({
    mascota: '',
    propietario: '',
    fecha: '',
    hora: '',
    sintomas: ''
   });
 }

  return (
    <Fragment>
      <h2>Crear Cita</h2>

      {
          error ? 
          <p className="alerta-error">Todos los campos son obligatorios</p>
          : null
      }

      <form 
      onSubmit={enviarCita}
      >
        <label>Nombre Mascota</label>
        <input
          type='text'
          name='mascota'
          className='u-full-width'
          placeholder='Nombre mascota'
          onChange={actualizarState}
          value={mascota}
        />

        <label>Nombre Propetario</label>
        <input
          type='text'
          name='propietario'
          className='u-full-width'
          placeholder='Nombre dueño'
          onChange={actualizarState}
          value={propietario}
        />

        <label>Fecha</label>
        <input
          type='date'
          name='fecha'
          className='u-full-width'
          onChange={actualizarState}
          value={fecha}
        />

        <label>Hora</label>
        <input
          type='time'
          name='hora'
          className='u-full-width'
          onChange={actualizarState}
          value={hora}
        />

        <label>Sintomas</label>
        <textarea
          className='u-full-width'
          name='sintomas'
          onChange={actualizarState}
          value={sintomas}></textarea>

        <button type='submit' className='u-full-width button-primary'>
          Agregar cita
        </button>
      </form>
    </Fragment>
  );
};

Formulario.propTypes ={
  crearCita: PropTypes.func.isRequired
}

export default Formulario;
