import { useEffect, useState } from "react";
import "./Appointment.css";
import ViewAdmin from "./ViewAdmin";
import ViewUser from "./ViewUser";
import {
  createToBD,
  deleteByIDToBD,
  selectToBD,
  urlAppointment,
} from "../../GlobalVariables";

const Appointment = () => {
  // -------------------------------------------------------------
  // Variables basura que hay q borrar solo son para probar
  // -------------------------------------------------------------
  const [usuarioActivo, setUsuarioActivo] = useState("User");

  // -------------------------------------------------------------
  // Estas se mostraran en el HTML
  // -------------------------------------------------------------
  const [showClasses, setshowClasses] = useState([""]);

  // -------------------------------------------------------------
  // Cada vez que carga la pantalla
  // -------------------------------------------------------------
  useEffect(() => {
    selectClassBD();
  }, []); // El segundo argumento vacío asegura que se llame solo una vez al cargar la página

  const reserve = async () => {};

  const reserveAsAdmin = async () => {};

  // -------------------------------------------------------------
  // seleciona las variables y les agrega un boton de borrar a la par
  // -------------------------------------------------------------
  const selectClassBD = async () => {
    const response = await selectToBD(urlAppointment);
    setshowClasses(response);
  };

  return (
    <>
      {usuarioActivo === "Admin" && (
        <ViewAdmin showClasses={showClasses} reserve={reserveAsAdmin} />
      )}

      {usuarioActivo === "User" && (
        <ViewUser showClasses={showClasses} reserve={reserve} />
      )}

      {usuarioActivo !== "Admin" && usuarioActivo !== "User" && (
        <h2>Debe logearse</h2>
      )}
    </>
  );
};
export default Appointment;
