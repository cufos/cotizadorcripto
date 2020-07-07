import React from "react";
import styled from "@emotion/styled";

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

const Formulario = () => {
  const Monedas = [
    { codigo: "MXN", nombre: "Peso Mexicano" },
    { codigo: "EUR", nombre: "Euro" },
    { codigo: "USD", nombre: "Dolar Americano" },
    { codigo: "GBP", nombre: "Libra Esterlina" },
  ];
  //utilizando e hook personalizado
  const [moneda, Seleccionar] = useMoneda("Elige tu Moneda", "", Monedas);

  const [crypto, SelectCrypto] = useCryptomoneda("Elige tu Cryptomoneda", "");

  return (
    <form>
      <Seleccionar />
      <SelectCrypto />
      <Boton type="submit" value="Calcular" />
    </form>
  );
};

export default Formulario;
