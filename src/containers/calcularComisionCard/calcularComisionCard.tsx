import {
  Divider,
  Grid,
  TextField,
  TextFieldProps,
  Typography,
} from "@mui/material";
import * as masks from "../../helpers/masks";
import React, { useEffect, useState } from "react";
import { useExchangeRate } from "../../context/useExchangeRate";

const CalcularComisionCard = () => {
  const {
    BRLads,
    USDrates,
    valorEnviado,
    VEDads,
    resultWithComisions,
    calcularOfrecerCambio,
  } = useExchangeRate();
  const [porcentaje, setPorcentaje] = useState<string>("10");

  useEffect(() => {
    calcularOfrecerCambio(
      BRLads,
      VEDads,
      valorEnviado,
      USDrates,
      Number(porcentaje)
    );
  }, [porcentaje]);

  return (
    <div
      style={{
        height: "180px",
        width: "330px",
        backgroundColor: "#E2FBE9",
        borderRadius: "16px",
        padding: "16px",
      }}
    >
      <Grid container gap={2}>
        <Grid item xs={12} style={{ display: "flex", gap: "16px" }}>
          <Grid item xs={6}>
            <Typography variant="h6">Porcentaje</Typography>
            <TextField
              id="porcentaje"
              value={porcentaje}
              variant="outlined"
              type="number"
              InputProps={{
                startAdornment: (
                  <Typography style={{ marginRight: "5px" }}>%</Typography>
                ),
              }}
              style={{ background: "#F6F6F6" }}
              size="small"
              placeholder="0,00"
              onChange={(e) => setPorcentaje(e.target.value)}
              color="success"
            />
          </Grid>
          <Divider orientation="vertical" />
          <Grid item xs={6}>
            <Typography variant="h6">Comisión</Typography>
            <Typography
              variant="body2"
              color="#236636"
              style={{ opacity: 0.5 }}
            >
              Aproximadamente
            </Typography>
            <Typography
              variant="body1"
              color="#236636"
              style={{ opacity: 0.5 }}
            >
              {masks
                .dinero("pt-BR", "BRL")
                .format(resultWithComisions.comision)}
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item xs={12} style={{ display: "flex", gap: "16px" }}>
          <Grid item xs={4}>
            <Typography variant="subtitle1">Enviando</Typography>
            <Typography variant="body1" color="#4B9460">
              {masks
                .dinero("pt-BR", "BRL")
                .format(resultWithComisions.valorEnviandoBRL)}
            </Typography>
          </Grid>
          <Divider orientation="vertical" />
          <Grid item xs={5}>
            <Typography variant="subtitle1">Recibiendo</Typography>
            <Typography variant="body1" color="#4B9460">
              {masks
                .dinero("es-VE", "VES")
                .format(resultWithComisions.valorRecibiendoVED)}
            </Typography>
          </Grid>
          <Divider orientation="vertical" />
          <Grid item xs={3}>
            <Typography variant="subtitle1">VES/BRL</Typography>
            <Typography variant="body2" color="#4B9460">
              {masks.dinero("es-VE", "VES").format(resultWithComisions.tasa)}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default CalcularComisionCard;
