import React, {useState} from 'react';
import Error from './Error';
import shortid from 'shortid'

const Formulario   = ({guardarGasto, guardarCrearGasto}) => {
    const [nombre, guardarNombre] = useState(''); //inicia como string vacio
    const [cantidad, guardarCantidad] = useState (0); //inicia como 0, 
    const [error, guardarError] = useState(false);
    
    //cuando el usuario agrega un gasto.
    
    const agregarGasto = e => {
        e.preventDefault();

        //validar
        if( cantidad < 1 || isNaN(cantidad) || nombre.trim() ===''){
            guardarError(true);
            return;
        }
        guardarError(false);
        
        //construir el gasto
        const gasto = {
            nombre,
            cantidad,
            id: shortid.generate()
        }
        console.log(gasto)
        //pasar el gasto al componente principal
        guardarGasto(gasto);
        guardarCrearGasto(true);
        //resetear el formulario
        guardarNombre('');
        guardarCantidad(0)
    }
    return (  
        <form
        onSubmit={agregarGasto}
        >
            <h2> Agrega tus Gastos aca</h2>
        
        {error ? <Error mensaje="ambos campos son obligatorios"/> : null}

        <div className="campo">
            <label>Nombre Gasto</label>
            <input
                type="text"
                className="u-full-width"
                placeholder="Ej. Transporte"
                value={nombre}
                onChange={e => guardarNombre(e.target.value)} //lo que el usuario escriba se va a agregar al state
            />
        </div>
        <div className="campo">
            <label>Cantidad de Gasto</label>
            <input
                type="number"
                className="u-full-width"
                placeholder="Ej. 300"
                value={cantidad}
                onChange={e => guardarCantidad(parseInt(e.target.value, 10))} //parseint lo convierte en numero y el 10 le saca las comillas
            />
        </div>

        <input 
        type="submit"
        className="button-primary u-full-width"
        value="agregar gasto"
        />
        
        
        
        </form>
    );
}

export default Formulario;
