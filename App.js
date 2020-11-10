import React,{useState, useEffect} from 'react';
import Pregunta from './components/Pregunta';
import Formulario from './components/Formulario';
import Listado from './components/Listado';
import ControlPresupuesto from './components/ControlPresupuesto';

function App() {
//definir el state
    const [ presupuesto, guardarPresupuesto ] = useState(0);
    const [ restante, guardarRestante ] = useState(0);
    const [ mostrarPregunta, actualizarPregunta] = useState(true);  
    const [ gastos, guardarGastos] = useState([]);
    const [ gasto, guardarGasto ] = useState({});
    const [ crearGasto, guardarCrearGasto ] = useState(false);



    //useEffect que actualiza el restante
  useEffect(() =>{

    //agrega el nuevo presupuesto
    if (crearGasto){
      guardarGastos([
        ...gastos, //aca tomamos una copia de los gastos
        gasto
      ]);

      //resta del presupuestoactual
      const presupuestoRestante = restante - gasto.cantidad;
      guardarRestante(presupuestoRestante);

      //resetear a false
      guardarCrearGasto(false);
    }
  },[gasto, crearGasto, gastos, restante]);

return (
<div className="container">
  <header>
    <h1>Gasto Semanal</h1>
  </header>
    <div className="contenido-principal contenido">
      { mostrarPregunta ? 
      ( 
        <Pregunta
        guardarPresupuesto={guardarPresupuesto}
        guardarRestante={guardarRestante}
        actualizarPregunta={actualizarPregunta}
        />
      ) : ( 
        <div className="row">
          <div className="one-half column"> 
          <Formulario
            guardarGasto={guardarGasto}
            guardarCrearGasto={guardarCrearGasto}
          />
          </div>
          <div className="one-half column"> 
          <Listado 
            gastos={gastos}
          />
          <ControlPresupuesto 
            presupuesto={presupuesto}
            restante={restante}
          />
          </div>
        </div>
      )
      }
    </div>

</div>



);
}

export default App;
