import { Button } from "@mui/material";
import { Typography, TextField } from "@mui/material";
import React from "react";
import { useState } from "react";
import { useExchangeRate } from "../../context/useExchangeRate";
const Home = () => {
  const [valorBRL, setValorBRL] = useState<string>();
  const { buscarTasa } = useExchangeRate();
  const handleBuscarTasaDeCambio = () => {
    buscarTasa(Number(valorBRL) || 100);
  };

  return (
    <div
      style={{
        marginTop: "40px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",

        gap: "50px",
      }}
    >
      <Typography variant="h4" fontWeight="bold">
        Tasa de cambio
      </Typography>
      <TextField
        id="valor"
        value={valorBRL}
        variant="outlined"
        label="Valor en BRL"
        InputProps={{
          startAdornment: (
            <Typography style={{ marginRight: "5px" }}>R$</Typography>
          ),
        }}
        type="number"
        placeholder="0,00"
        onChange={(e) => setValorBRL(e.target.value)}
        color="success"
      />
      <Button
        style={{
          backgroundColor: "#6ab07e",
          color: "white",
          height: "50px",
          borderRadius: "100px",
        }}
        onClick={handleBuscarTasaDeCambio}
      >
        Buscar mejor tasa
      </Button>
      <div>
        <Button
          color="success"
          onClick={() =>
            window.open("https://cors-anywhere.herokuapp.com/corsdemo")
          }
        >
          Desactivar CORS
        </Button>
      </div>
    </div>
  );
};

export default Home;
