import { Edit } from "@mui/icons-material";
import { Divider, Typography, Grid, IconButton } from "@mui/material";
import { useExchangeRate } from "../../context/useExchangeRate";
import * as masks from "../../helpers/masks";
import React, { useState } from "react";
import EditarTasa from "./editarTasa/editarTasa";
import CalcularComisionCard from "../calcularComisionCard/calcularComisionCard";

const Results = () => {
  const [editarTasaModal, setEditarTasaModal] = useState(false);
  const { result, editarTasa } = useExchangeRate();

  return (
    <>
      {editarTasaModal && (
        <EditarTasa
          open={editarTasaModal}
          onEditar={editarTasa}
          onClose={() => setEditarTasaModal(false)}
        />
      )}
      <div
        style={{
          marginTop: "40px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "25px",
        }}
      >
        <Typography variant="h4" fontWeight="bold">
          Resultado
        </Typography>
        <div
          style={{
            height: "200px",
            width: "330px",
            backgroundColor: "#E2FBE9",
            borderRadius: "16px",
            padding: "16px",
          }}
        >
          <Grid container gap={2}>
            <Grid item xs={12} style={{ display: "flex", gap: "16px" }}>
              <Grid item xs={6}>
                <Typography variant="h6">Enviando</Typography>
                <div style={{ display: "flex", alignItems: "baseline" }}>
                  <Typography variant="body1" color="#4B9460">
                    {masks
                      .dinero("pt-BR", "BRL")
                      .format(result.valorEnviandoBRL)}
                  </Typography>
                  <IconButton onClick={() => setEditarTasaModal(true)}>
                    <Edit
                      style={{
                        width: "16px",
                        height: "16px",
                        color: "#4B9460",
                      }}
                    />
                  </IconButton>
                </div>
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
                  {masks.dinero("en-US", "USD").format(result.valorEnviandoUSD)}
                </Typography>
              </Grid>
              <Divider orientation="vertical" />
              <Grid item xs={6}>
                <Typography variant="h6">Recibiendo</Typography>
                <Typography variant="body1" color="#4B9460">
                  {masks
                    .dinero("es-VE", "VES")
                    .format(result.valorRecibiendoVED)}
                </Typography>
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
                    .dinero("en-US", "USD")
                    .format(result.valorRecibiendoUSD)}
                </Typography>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Divider />
            </Grid>
            <Grid item xs={12} style={{ display: "flex", gap: "16px" }}>
              <Grid item xs={6}>
                <Typography variant="h6">Variación</Typography>
                <div
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    gap: "5px",
                  }}
                >
                  <Typography variant="body1" color="#4B9460">
                    {result.variacion > 0 ? "+" : ""}
                    {masks.dinero("en-US", "USD").format(result.variacion)}
                  </Typography>
                  <Typography variant="body2" color="#428555">
                    {masks.porcentaje.format(result.variacionPorcentaje / 100)}
                  </Typography>
                </div>
              </Grid>
              <Divider orientation="vertical" />
              <Grid
                item
                xs={6}
                style={{ display: "flex", gap: "10px", paddingTop: "5px" }}
              >
                <div>
                  <Typography variant="subtitle1">VES/BRL</Typography>
                  <Typography variant="body1" color="#4B9460">
                    {masks.dinero("es-VE", "VES").format(result.tasa)}
                  </Typography>
                </div>
                <Divider orientation="vertical" />
                <div>
                  <Typography variant="subtitle1">BRL/VES</Typography>
                  <Typography variant="body1" color="#4B9460">
                    {masks.dinero("pt-BR", "BRL").format(result.tasaInvertida)}
                  </Typography>
                </div>
              </Grid>
            </Grid>
          </Grid>
        </div>
        <Typography variant="h5" fontWeight="bold">
          Calcular comisión
        </Typography>
        <CalcularComisionCard />
      </div>
    </>
  );
};

export default Results;
