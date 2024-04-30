import { useEffect, useState } from "react";
import "./Login.css";
import {
  createToBD,
  deleteByIDToBD,
  selectToBD,
  urlFeedback,
} from "../../GlobalVariables";

const Login = () => {
  // -------------------------------------------------------------
  // Seran input
  // -------------------------------------------------------------
  const [inputName, setinputName] = useState("");
  const [inputPasword, setinputPasword] = useState("");

  // -------------------------------------------------------------
  // Cada vez que carga la pantalla
  // -------------------------------------------------------------
  useEffect(() => {
    selectComentariosBD();
  }, []); // El segundo argumento vacío asegura que se llame solo una vez al cargar la página

  return <></>;
};
export default Login;
