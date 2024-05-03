import { useEffect, useState } from "react";
import "./Appointment.css";
import ViewAdminAppointment from "./ViewAdminAppointment";
import ViewUserAppointment from "./ViewUserAppointment";
import {
  createToBD,
  deleteByIDToBD,
  selectFilterToBD,
  selectToBD,
  urlAppointment,
  NotFound,
} from "../../GlobalVariables";

const Appointment = () => {
  // -------------------------------------------------------------
  // Variables basura que hay q borrar solo son para probar
  // -------------------------------------------------------------
  const [usuarioActivo, setUsuarioActivo] = useState("User");

  // -------------------------------------------------------------
  // Seran input
  // -------------------------------------------------------------
  const [inputData, setInputData] = useState({
    search: "",
    searchDate: "",
  });

  // -------------------------------------------------------------
  // Estas se mostraran en el HTML
  // -------------------------------------------------------------
  const [showClasses, setshowClasses] = useState("");
  const [showErrorSearch, setshowErrorSearch] = useState("");

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
    const fechaActual = new Date();
    let filtro = {
      date: { $gt: fechaActual }, // Filtra las clases con fecha mayor a la fecha actual
    };

    const response = await selectFilterToBD(urlAppointment, filtro);
    setshowClasses(response);
  };

  const searchByAnyBD = async () => {
    const fechaActual = new Date();
    // filtro al buscar
    let filtro = {
      $and: [
        {
          $or: [
            { usuario: { $regex: inputData.search, $options: "i" } },
            { hour: { $regex: inputData.search, $options: "i" } },
            { service: { $regex: inputData.search, $options: "i" } },
            { capacity: { $regex: inputData.search, $options: "i" } },
          ],
        },
        { date: { $gt: fechaActual } }, // Filtra las clases con fecha mayor a la fecha actual
      ],
    };

    // Verificar si se ha seleccionado una fecha
    if (inputData.searchDate) {
      filtro.$and.push({
        date: { $regex: inputData.searchDate, $options: "i" },
      });
    }
    const response = await selectFilterToBD(urlAppointment, filtro);
    setshowClasses(response);
  };

  const handleSubmitSearch = async (event) => {
    event.preventDefault(); // Evitar que el formulario se envíe vacio
    if (!inputData.search && !inputData.searchDate) {
      setshowErrorSearch("Bebe llenar al menos un campo para poder buscar");
      return;
    }
    setshowErrorSearch("");

    await searchByAnyBD();
  };

  return (
    <>
      {usuarioActivo === "Admin" && (
        <ViewAdminAppointment
          showClasses={showClasses}
          reserve={reserveAsAdmin}
        />
      )}

      {usuarioActivo === "User" && (
        <ViewUserAppointment
          showClasses={showClasses}
          setInputData={setInputData}
          inputData={inputData}
          handleSubmitSearch={handleSubmitSearch}
          showErrorSearch={showErrorSearch}
        />
      )}

      {usuarioActivo !== "Admin" && usuarioActivo !== "User" && (
        <NotFound mensaje="Por favor, inicia sesión para continuar" />
      )}
    </>
  );
};
export default Appointment;
