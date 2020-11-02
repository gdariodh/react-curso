import React, { Fragment, useState, useEffect } from "react";
import Formulario from "./components/Formulario";
import Cita from "./components/Cita";

function App() {

  // Citas guardadas en el LocalStorage
  let citasStorage = JSON.parse(localStorage.getItem('citas'));
  if(!citasStorage){
    citasStorage=[];
  }

  /* Citas globales -- antes useState estaba como un array vacio [], pero despues del localstorage se puso 
  useState(citasStorage) para que pudiera funcionar el localStorage, y hay que usarlo en useEffect tambien*/
 
  const [citas, guardarCitas] = useState(citasStorage);

  // useEffect para realizar una accion cuando el state cambia 
  useEffect(() => {
    if(citasStorage){
      localStorage.setItem('citas',JSON.stringify(citas));
    }else{
      localStorage.setItem('citas',JSON.stringify([]));
    }
  }, [citas,citasStorage]);

  // crear citas global
  const crearCita = (cita) => {
    guardarCitas([...citas, cita]);
  };

  // funcion para eliminar una cita usando el id 
  const eliminarCita = id => {
    const nuevasCitas = citas.filter(cita => cita.id !== id);
    guardarCitas(nuevasCitas);
  }

  // mensaje condicional 
  const titulo = citas.length === 0 ? 'No hay citas' : 'Administra tus citas'

  return (
    <Fragment>
      <h1>Administrador de pacientes</h1>

      <div className='container'>
        <div className='row'>
          <div className='one-half column'>
            <Formulario crearCita={crearCita} />
          </div>

          <div className='one-half column'>
           <h2>{titulo}</h2>
            {citas.map((cita) => (
              <Cita 
              cita={cita} 
              key={cita.id} 
              eliminarCita={eliminarCita}
              />
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
