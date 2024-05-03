import { useEffect, useState } from "react";
import axios from "axios";
import "./CreateClass.css";
import ViewStafCreateClass from "./ViewStafCreateClass";
import {
  createToBD,
  deleteByIDToBD,
  selectToBD,
  selectFilterToBD,
  urlClass,
  NotFound,
  SuccessAlert,
  ErrorAlert,
} from "../../GlobalVariables";

const CreateClass = () => {
  // -------------------------------------------------------------
  // Variables basura que hay q borrar solo son para probar
  // -------------------------------------------------------------
  const [usuarioActivo, setUsuarioActivo] = useState("Staff");

  // -------------------------------------------------------------
  // Estas se mostraran en el HTML
  // -------------------------------------------------------------
  const [showErroresForm, setshowErroresForm] = useState("");

  // -------------------------------------------------------------
  // Seran input
  // -------------------------------------------------------------
  const [inputData, setInputData] = useState({
    service: "",
    date: "",
    hour: "",
    repeatEveryMinutes: 1,
    repeatNTimes: 1,
    repeatWeekly: 1,
    capacity: "",
  });

  // -------------------------------------------------------------
  // Cada vez que carga la pantalla
  // -------------------------------------------------------------
  useEffect(() => {}, []); // El segundo argumento vacío asegura que se llame solo una vez al cargar la página

  // -------------------------------------------------------------
  // Crea las clases en la base de datos que se generaron en createAppointments
  // -------------------------------------------------------------
  const createClassBD = async (date, hour, usuario, service, capacity) => {
    const newClass = {
      date: date,
      hour: hour,
      usuario: usuario,
      service: service,
      capacity: capacity,
    };

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      await axios.post(urlClass, newClass, config);
      return true; // Retorna true si se crea con éxito
    } catch (error) {
      // console.error("Error al insertar documento en MongoDB:", error);
      return false; // Retorna false si hay un error
    }
  };

  // -------------------------------------------------------------
  // Crea n cantidad de Appointments segun el form
  // -------------------------------------------------------------
  const createAppointments = async () => {
    const initialDate = new Date(`${inputData.date}T${inputData.hour}:00`);
    const newAppointments = [];

    for (let i = 0; i < inputData.repeatNTimes; i++) {
      const newDate = new Date(
        initialDate.getTime() + i * inputData.repeatEveryMinutes * 60000
      );

      for (let j = 0; j < inputData.repeatWeekly; j++) {
        const finalDate = new Date(
          newDate.getTime() + j * 7 * 24 * 60 * 60 * 1000 // Ajustar aquí para cambiar las fechas cada semana
        );

        const formattedDate = finalDate.toISOString().split("T")[0];
        const formattedHour = finalDate.toTimeString().split(" ")[0];

        newAppointments.push({
          date: formattedDate,
          hour: formattedHour,
        });
      }
    }
    let allCreated = true;

    for (const appointment of newAppointments) {
      const exist = {
        $and: [
          { date: appointment.date },
          { hour: appointment.hour },
          { usuario: usuarioActivo },
          { service: inputData.service },
        ],
      };
      const response = await selectFilterToBD(urlClass, exist);
      if (response.length === 0) {
        // Verifica si no hay ningún registro existente
        const success = await createClassBD(
          appointment.date,
          appointment.hour,
          usuarioActivo,
          inputData.service,
          inputData.capacity
        );

        if (!success) {
          allCreated = false;
          break;
        }
      } else {
        allCreated = false;
        const message = `La clase para ${appointment.date} a las ${appointment.hour} ya existe.`;

        setshowErroresForm(<ErrorAlert message={message} />);
        break;
      }
    }

    if (allCreated) {
      setshowErroresForm(<SuccessAlert message="Todos creados con éxito" />);
      setTimeout(() => {
        setshowErroresForm("");
      }, 5000);
    } else {
      setshowErroresForm(
        <ErrorAlert message="Algunos no se pudieron crear o ya existían" />
      );
      setTimeout(() => {
        setshowErroresForm("");
      }, 5000);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !inputData.capacity ||
      !inputData.date ||
      !inputData.hour ||
      !inputData.service
    ) {
      setshowErroresForm(
        <ErrorAlert message="Debe llenar al menos los que tienen un simbolo (*)" />
      );
      return;
    }

    const confirmacion = window.confirm("¿Está seguro?");

    if (confirmacion) {
      createAppointments();
    } else {
      setshowErroresForm(<ErrorAlert message="Acción cancelada." />);
    }
  };

  return (
    <>
      {(usuarioActivo === "Staff" || usuarioActivo === "Admin") && (
        <ViewStafCreateClass
          inputData={inputData}
          showErroresForm={showErroresForm}
          handleSubmit={handleSubmit}
          setInputData={setInputData}
        />
      )}

      {usuarioActivo !== "Admin" && usuarioActivo !== "Staff" && (
        <NotFound mensaje="Por favor, inicia sesión para continuar" />
      )}
    </>
  );
};

export default CreateClass;
