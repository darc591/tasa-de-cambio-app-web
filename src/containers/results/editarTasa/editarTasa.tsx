import {
  Button,
  Dialog,
  DialogContent,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import React, { useState } from "react";

const EditarTasa = ({
  open,
  onClose,
  onEditar,
}: {
  open: boolean;
  onClose: () => void;
  onEditar: (valor: number) => void;
}) => {
  const [valorBRL, setValorBRL] = useState<string>();

  const handleEditar = () => {
    onEditar(Number(valorBRL));
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent
        style={{ display: "flex", flexDirection: "column", gap: "30px" }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h5">Editar</Typography>
          <IconButton onClick={onClose}>
            <Close />
          </IconButton>
        </div>
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
          onClick={handleEditar}
        >
          Editar
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default EditarTasa;
