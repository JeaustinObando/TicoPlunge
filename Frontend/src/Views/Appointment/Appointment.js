import { useEffect, useState } from "react";
import "./Appointment.css";
import ViewAdminAppointment from "./ViewAdminAppointment";
import ViewUserAppointment from "./ViewUserAppointment";
import {
  createToBD,
  deleteByIDToBD,
  selectFilterToBD,
  urlReserveClass,
  selectUserByToken,
  urlClass,
  NotFound,
  ErrorAlert,
} from "../../GlobalVariables";

let timeWaitAlert = 8000;

const Appointment = () => {
  // -------------------------------------------------------------
  // Variables basura que hay q borrar solo son para probar
  // -------------------------------------------------------------
  const [usuarioActivo, setUsuarioActivo] = useState("Client");

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

  /**
   * Función asincrónica para obtener y establecer el usuario activo utilizando el token de autenticación.
   */
  const GetUserActive = async () => {
    const user = await selectUserByToken();
    // setUsuarioActivo(user);
  };

  /**
   * Efecto secundario que se ejecuta al montar el componente (cargar la pagina)
   * El segundo argumento vacío asegura que se llame solo una vez al cargar la página.
   */
  useEffect(() => {
    // Llamar a la función para obtener y establecer el usuario activo
    GetUserActive();
    selectClassBD();
  }, []);

  const reserveAsClient = async () => {};

  const reserveAsAdmin = async () => {};

  /**
   * Función para seleccionar clases de la base de datos con fecha mayor a la actual.
   * Se utiliza para obtener las clases disponibles para reserva.
   */
  const selectClassBD = async () => {
    const fechaActual = new Date(); // Obtiene la fecha actual
    let filtro = {
      date: { $gt: fechaActual }, // Filtra las clases con fecha mayor a la fecha actual
    };

    const response = await selectFilterToBD(urlClass, filtro);
    setshowClasses(response);
  };

  /**
   * Función para buscar registros en la base de datos utilizando un filtro flexible.
   * Se busca por coincidencias parciales en los campos 'usuario', 'hour', 'service' y 'capacity',
   * y se filtran las clases con fecha mayor a la actual.
   */
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
    const response = await selectFilterToBD(urlClass, filtro);
    setshowClasses(response);
  };

  /**
   * Función para manejar el evento de envío del formulario de búsqueda.
   * Realiza la búsqueda en la base de datos según los criterios especificados en los campos de búsqueda.
   * Muestra un mensaje de error si no se proporciona ningún criterio de búsqueda.
   * @param {Event} event - Objeto de evento que representa el envío del formulario.
   */
  const handleSubmitSearch = async (event) => {
    event.preventDefault(); // Evitar que el formulario se envíe vacio
    if (!inputData.search && !inputData.searchDate) {
      setshowErrorSearch(
        <ErrorAlert
          message={"Bebe llenar al menos un campo para poder buscar"}
        />
      );
      setTimeout(() => {
        setshowErrorSearch("");
      }, timeWaitAlert);
      return;
    }
    setshowErrorSearch("");

    await searchByAnyBD();
  };

  return (
    <>
      {usuarioActivo === "Administrator" ||
        (usuarioActivo === "Staff" && (
          <ViewAdminAppointment
            showClasses={showClasses}
            reserve={reserveAsAdmin}
          />
        ))}

      {usuarioActivo === "Client" && (
        <ViewUserAppointment
          showClasses={showClasses}
          setInputData={setInputData}
          inputData={inputData}
          handleSubmitSearch={handleSubmitSearch}
          showErrorSearch={showErrorSearch}
          reserveAsClient={reserveAsClient}
        />
      )}

      {usuarioActivo !== "Administrator" &&
        usuarioActivo !== "Client" &&
        usuarioActivo !== "Staff" && (
          <NotFound mensaje="Por favor, inicia sesión para continuar" />
        )}
    </>
  );
};
export default Appointment;
