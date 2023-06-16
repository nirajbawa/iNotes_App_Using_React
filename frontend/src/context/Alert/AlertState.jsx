import { useState } from "react";
import AlertContext from "./AlertContext";

const AlertState = (props) => {
  let [message, setMessage] = useState("");
  let [open, setOpen] = useState(false);
  let [color, setColor] = useState("green");
  const [theme, setTheme] = useState(false);

  let setDarkMode = () => {
    if (theme == false) {
      setTheme(true);
      document.body.classList.add("dark");
      document
        .querySelector("meta[name='theme-color']")
        .setAttribute("content", "#132237");
    } else {
      setTheme(false);
      document.body.classList.remove("dark");
      document
        .querySelector("meta[name='theme-color']")
        .setAttribute("content", "#ffffff");
    }
  };

  let detectTheme = () => {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      document.body.classList.add("dark");
      setDarkMode(true);
    }
  };


  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (event) => {
    setDarkMode()
});

  let setAlert = (msg, color) => {
    setMessage(msg);
    setOpen(true);
    setColor(color);
    setTimeout(() => {
      setOpen(false);
    }, 7000);
  };

  return (
    <AlertContext.Provider
      value={{
        setAlert,
        open,
        setOpen,
        message,
        color,
        theme,
        setDarkMode,
        detectTheme,
      }}
    >
      {props.children}
    </AlertContext.Provider>
  );
};

export default AlertState;
