import React from "react";
import { Global, css } from "@emotion/react";
import Home from "./containers/home/home";
import { useExchangeRate } from "./context/useExchangeRate";
import { CircularProgress } from "@mui/material";
import Results from "./containers/results/results";
function App() {
  const { result, loading } = useExchangeRate();
  return (
    <>
      <Global
        styles={css`
          * {
            margin: 0;
            padding: 0;
            border: 0;
          }
          body {
            display: flex;
            flex-direction: column;
            align-items: center;
          }
        `}
      />
      {loading ? (
        <div
          style={{
            marginTop: "200px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "50px",
          }}
        >
          <CircularProgress color={"success"} />
        </div>
      ) : result ? (
        <Results />
      ) : (
        <Home />
      )}
    </>
  );
}

export default App;
