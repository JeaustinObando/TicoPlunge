import { useEffect, useState } from "react";
import axios from "axios";
import "./CreateClass.css";
import {
  createToBD,
  deleteByIDToBD,
  selectToBD,
  urlClass,
} from "../../GlobalVariables";

const CreateClass = () => {
  // -------------------------------------------------------------
  // Variables basura que hay q borrar solo son para probar
  // -------------------------------------------------------------
  const [usuarioActivo, setUsuarioActivo] = useState("Staff");

  // -------------------------------------------------------------
  // Seran input
  // -------------------------------------------------------------
  const [inputService, setinputService] = useState("");
  const [inputDate, setinputDate] = useState("");
  const [inputHour, setinputHour] = useState("");
  const [inputRepeatEveryMinutes, setinputRepeatEveryMinutes] = useState("");
  const [inputRepeatNTimes, setinputRepeatNTimes] = useState("");
  const [inputRepeatWeekly, setinputRepeatWeekly] = useState("");
  const [inputCapacity, setInputCapacity] = useState("");

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
      console.error("Error al insertar documento en MongoDB:", error);
      return false; // Retorna false si hay un error
    }
  };

  // -------------------------------------------------------------
  // Crea n cantidad de Appointments segun el form
  // -------------------------------------------------------------
  const createAppointments = async () => {
    const initialDate = new Date(`${inputDate}T${inputHour}:00`);
    const newAppointments = [];

    for (let i = 0; i < inputRepeatNTimes; i++) {
      const newDate = new Date(
        initialDate.getTime() + i * inputRepeatEveryMinutes * 60000
      );

      for (let j = 0; j < inputRepeatWeekly; j++) {
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
      const success = await createClassBD(
        appointment.date,
        appointment.hour,
        usuarioActivo,
        inputService,
        inputCapacity // Pasar la capacidad al método
      );

      if (!success) {
        allCreated = false;
        break;
      }
    }

    if (allCreated) {
      alert("Todos creados con éxito");
    } else {
      alert("Algunos no se pudieron crear");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const confirmacion = window.confirm("¿Está seguro?");

    if (confirmacion) {
      createAppointments();
    } else {
      alert("Acción cancelada.");
    }
  };

  return (
    <>
      {(usuarioActivo === "Staff" || usuarioActivo === "Admin") && (
        <div className="createClassStyle">
          <div className="form-container">
            <h2 className="title">Crear Clase</h2>
            <div className="social-message">
              <div className="line"></div>
              <div className="message">Tus citas programadas</div>
              <div className="line"></div>
            </div>
            <form onSubmit={handleSubmit} className="form-CreateClass">
              <div className="input-group-CreateClass">
                <label htmlFor="inputActivity">Actividad:</label>
                <select
                  id="inputActivity"
                  className="select-CreateClass"
                  value={inputService}
                  onChange={(e) => setinputService(e.target.value)}
                  required
                >
                  <option value="">Seleccione una opcion</option>
                  <option value="box">Box</option>
                  <option value="plunche">Plunche</option>
                  <option value="baile">Baile</option>
                </select>
              </div>

              <div className="input-group-CreateClass">
                <label htmlFor="inputDate">Fecha:</label>
                <input
                  type="date"
                  id="inputDate"
                  value={inputDate}
                  onChange={(e) => setinputDate(e.target.value)}
                  min={new Date().toISOString().split("T")[0]}
                  className="input-group-CreateClass input"
                  required
                />
              </div>

              <div className="input-group-CreateClass">
                <label htmlFor="inputHour">Hora:</label>
                <input
                  type="time"
                  id="inputHour"
                  value={inputHour}
                  onChange={(e) => setinputHour(e.target.value)}
                  className="input-group-CreateClass input"
                  required
                />
              </div>

              <div className="input-group-CreateClass">
                <label htmlFor="inputCapacity">Cantidad de cupos:</label>
                <input
                  type="number"
                  id="inputCapacity"
                  value={inputCapacity}
                  onChange={(e) => setInputCapacity(e.target.value)}
                  min="1"
                  max="500"
                  required
                />
              </div>

              <div className="input-group-CreateClass">
                <label htmlFor="inputRepeatEvery">
                  Repetir cada (minutos):
                </label>
                <input
                  type="number"
                  id="inputRepeatEvery"
                  value={inputRepeatEveryMinutes}
                  onChange={(e) => setinputRepeatEveryMinutes(e.target.value)}
                  className="input-group-CreateClass input"
                  min="1"
                  max="999"
                />
              </div>

              <div className="input-group-CreateClass">
                <label htmlFor="inputRepeatFor">
                  Repetir por (veces segun la cantidad de minutos anterior):
                </label>
                <input
                  type="number"
                  id="inputRepeatFor"
                  value={inputRepeatNTimes}
                  onChange={(e) => setinputRepeatNTimes(e.target.value)}
                  className="input-group-CreateClass input"
                  min="1"
                  max="100"
                />
              </div>

              <div className="input-group-CreateClass">
                <label htmlFor="inputRepeatWeekly">
                  Repetir cantidad todo lo anterior (semanas consecutivas):
                </label>
                <input
                  type="number"
                  id="inputRepeatWeekly"
                  value={inputRepeatWeekly}
                  onChange={(e) => setinputRepeatWeekly(e.target.value)}
                  className="input-group-CreateClass input"
                  min="1"
                  max="52"
                />
              </div>

              <button type="submit" className="buttomCreate">
                Crear Clase
              </button>
            </form>
          </div>
        </div>
      )}

      {usuarioActivo !== "Admin" && usuarioActivo !== "Staff" && (
        <h2>Debe logearse</h2>
      )}
    </>
  );
};

export default CreateClass;
