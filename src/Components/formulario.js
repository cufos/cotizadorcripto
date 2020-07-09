import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import axios from "axios";

import Error from "./error";
import useMoneda from "../hooks/useMoneda";
import useCryptomoneda from "../hooks/useCryptomoneda";

const Boton = styled.input`
  margin-top: 20px;
  font-weight: bold;
  font-size: 20px;
  padding: 10px;
  background-color: #66a2fe;
  border: none;
  width: 100%;
  border-radius: 10px;
  color: #fff;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #326ac0;
    cursor: pointer;
  }
`;

const Formulario = ({ guardarMoneda, guardarCriptomoneda }) => {
  //estado de cryptomonedas en el formulario
  const [listacripto, actualizarLista] = useState([]);

  //hook para el error
  const [error, guardarError] = useState(false);

  const Monedas = [
    { codigo: "MXN", nombre: "Peso Mexicano" },
    { codigo: "EUR", nombre: "Euro" },
    { codigo: "USD", nombre: "Dolar Americano" },
    { codigo: "GBP", nombre: "Libra Esterlina" },
  ];
  //utilizando e hook personalizado
  const [moneda, Seleccionar] = useMoneda("Elige tu Moneda", "", Monedas);
  //utilizando el hook de cryptomoneda
  const [crypto, SelectCrypto] = useCryptomoneda(
    "Elige tu Cryptomoneda",
    "",
    listacripto
  );

  //utilizando useEffect
  useEffect(() => {
    const ConsultarAPI = async () => {
      const url =
        "http://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD";

      const resultado = await axios.get(url);

      actualizarLista(resultado.data.Data);
    };

    ConsultarAPI();
  }, []);

  const cotizarMoneda = (e) => {
    e.preventDefault();

    //validar el formulario
    if (moneda === "" || crypto === "") {
      guardarError(true);
      return;
    }
    guardarError(false);
    guardarMoneda(moneda);
    guardarCriptomoneda(crypto);
  };

  return (
    <form onSubmit={cotizarMoneda}>
      {error ? <Error mensaje="Todos los campos son obligatorios" /> : null}
      <Seleccionar />
      <SelectCrypto />
      <Boton type="submit" value="Calcular" />
    </form>
  );
};

export default Formulario;
