import { useEffect, useState } from "react";
import "./Appointment.css";
import ViewAdmin from "./ViewAdmin";
import ViewUser from "./ViewUser";
import {
  createToBD,
  deleteByIDToBD,
  selectFilterToBD,
  selectToBD,
  urlAppointment,
} from "../../GlobalVariables";

const Appointment = () => {
  // -------------------------------------------------------------
  // Variables basura que hay q borrar solo son para probar
  // -------------------------------------------------------------
  const [usuarioActivo, setUsuarioActivo] = useState("User");

  // -------------------------------------------------------------
  // Seran input
  // -------------------------------------------------------------
  const [inputSearch, setinputSearch] = useState("");

  // -------------------------------------------------------------
  // Estas se mostraran en el HTML
  // -------------------------------------------------------------
  const [showClasses, setshowClasses] = useState("");

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

  const searchByAnyBD = async () => {
    const filtro = {
      $or: [
        { date: { $regex: inputSearch, $options: "i" } },
        { usuario: { $regex: inputSearch, $options: "i" } },
        { hour: { $regex: inputSearch, $options: "i" } },
        { service: { $regex: inputSearch, $options: "i" } },
        { capacity: { $regex: inputSearch, $options: "i" } },
      ],
    };
    const response = await selectFilterToBD(urlAppointment, filtro);
    setshowClasses(response);
  };

  const handleSubmitSearch = async (event) => {
    event.preventDefault(); // Evitar que el formulario se envíe vacio
    await searchByAnyBD();
  };

  return (
    <>
      {usuarioActivo === "Admin" && (
        <ViewAdmin showClasses={showClasses} reserve={reserveAsAdmin} />
      )}

      {usuarioActivo === "User" && (
        <ViewUser
          showClasses={showClasses}
          reserve={reserve}
          inputSearch={inputSearch}
          setinputSearch={setinputSearch}
          handleSubmitSearch={handleSubmitSearch}
        />
      )}

      {usuarioActivo !== "Admin" && usuarioActivo !== "User" && (
        <h2>Debe logearse</h2>
      )}
    </>
  );
};
export default Appointment;
