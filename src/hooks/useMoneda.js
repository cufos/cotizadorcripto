import React, { useState, Fragment } from "react";

const useMoneda = () => {
  //estado de el custom hook
  const [state, actualizarState] = useState("");

  const Seleccionar = () => (
    <Fragment>
      <label>Moneda</label>

      <select>
        <option value="MXN">Peso Mexícano</option>
      </select>
    </Fragment>
  );

  //retornando el estado, la interfaz y la funcion que modifica estado

  return { state, Seleccionar, actualizarState };
};

export default useMoneda;
