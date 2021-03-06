import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import imagen from "./cryptomonedas.png";
import Formulario from "./Components/formulario";
import Cotizacion from "./Components/cotizacion";
import Spinner from "./Components/spinner";
import axios from "axios";

const Contenedor = styled.div`
  max-width: 900px;
  margin: 0 auto;
  @media (min-width: 992px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-column-gap: 2rem;
  }
`;

const Imagen = styled.img`
  max-width: 100%;
  margin-top: 5rem;
`;

const Heading = styled.h1`
  font-family: "Bebas Neue", cursive;
  color: #fff;
  text-align: left;
  font-weight: 700;
  font-size: 50px;
  margin-bottom: 50px;
  margin-top: 80px;

  &::after {
    content: "";
    width: 100px;
    height: 6px;
    background-color: #66a2fe;
    display: block;
  }
`;

function App() {
  //estado para la moneda
  const [moneda, guardarMoneda] = useState("");

  //creando estado para el spinner
  const [cargando, guardarCargando] = useState(false);

  //estado para la criptomoneda
  const [criptomoneda, guardarCriptomoneda] = useState("");

  //guardando resultado de la cotizacion
  const [resultado, guardarResultado] = useState({});

  useEffect(() => {
    const solicitarCotizacion = async () => {
      if (moneda === "") return;

      const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;

      const resultado = await axios(url);
      console.log(resultado);

      //Mostrando el spinner
      guardarCargando(true);

      setTimeout(() => {
        //ocultando el spinner
        guardarCargando(false);

        //mostrando precio
        guardarResultado(resultado.data.DISPLAY[criptomoneda][moneda]);
      }, 3000);
    };
    //prevenir llamada a la api
    solicitarCotizacion();
  }, [moneda, criptomoneda]);

  //Mostrando el spinner o el resultado
  const componente = cargando ? (
    <Spinner />
  ) : (
    <Cotizacion resultado={resultado} />
  );

  return (
    <Contenedor>
      <div>
        <Imagen src={imagen} alt="Imagen cripto" />
      </div>
      <div>
        <Heading>Cotiza Cryptomonedas al Instante</Heading>

        <Formulario
          guardarMoneda={guardarMoneda}
          guardarCriptomoneda={guardarCriptomoneda}
        />
        {componente}
      </div>
    </Contenedor>
  );
}

export default App;
