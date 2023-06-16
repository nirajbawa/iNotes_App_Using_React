import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import NoteState from "./context/notes/NoteState";
import AlertState from "./context/Alert/AlertState";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AlertState>
      <NoteState>
        <App />
      </NoteState>
    </AlertState>
  </React.StrictMode>
);
