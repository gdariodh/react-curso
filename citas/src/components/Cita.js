import React from 'react';
import PropTypes from 'prop-types';

const Cita = ({cita,eliminarCita}) =>  ( 
    <div className="cita">

       <p>Mascota: {cita.mascota}</p>
       <p>Propietario: {cita.propietario}</p>
       <p>Fecha: {cita.fecha}</p>
       <p>Hora: {cita.hora}</p>
       <p>Sintomas: {cita.sintomas}</p>

       <button 
       className="button eliminar u-full-width"
       onClick={() => eliminarCita(cita.id)}
       >Eliminar &times;</button>
    </div>
 );

 Cita.propTypes = {
    cita: PropTypes.object.isRequired,
    eliminarCita: PropTypes.func.isRequired
 }

 
export default Cita;