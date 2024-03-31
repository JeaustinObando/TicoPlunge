import { useEffect, useState } from "react";
import axios from "axios";
import "./CreateClass.css";

const CreateClass = () => {
  // -------------------------------------------------------------
  // Variables basura que hay q borrar solo son para probar
  // -------------------------------------------------------------
  const [usuarioActivo, setUsuarioActivo] = useState(["Usuario No Dado"]);

  // -------------------------------------------------------------
  // Seran input
  // -------------------------------------------------------------
  const [inputActivity, setinputActivity] = useState("");
  const [inputDate, setinputDate] = useState("");
  const [inputHour, setinputHour] = useState("");
  const [inputRepeatEveryMinutes, setinputRepeatEveryMinutes] = useState(30);
  const [inputRepeatNTimes, setinputRepeatNTimes] = useState(1);
  const [inputRepeatWeekly, setinputRepeatWeekly] = useState(1);

  // -------------------------------------------------------------
  // Cada vez que carga la pantalla
  // -------------------------------------------------------------
  useEffect(() => {}, []); // El segundo argumento vacío asegura que se llame solo una vez al cargar la página

  const createClassBD = async (date, hour, usuario, activity) => {
    var newClass = {
      date: date,
      hour: hour,
      usuario: usuario,
      activity: activity,
    };

    if (
      newClass.date === "" ||
      newClass.hour === "" ||
      newClass.usuario === ""
    ) {
      alert("Debe ingresar todos los datos.");
    } else {
      try {
        const serviceUrl = "http://localhost:8080/comentarios";
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };

        const response = await axios.post(serviceUrl, newClass, config);
      } catch (error) {
        console.error("Error al insertar documento en MongoDB:", error);
      }
    }
  };

  const createAppointments = () => {
    const initialDate = new Date(`${inputDate}T${inputHour}:00`);

    const newAppointments = [];

    for (let i = 0; i < inputRepeatNTimes; i++) {
      const newDate = new Date(
        initialDate.getTime() + i * inputRepeatEveryMinutes * 60000
      );

      for (let j = 0; j < inputRepeatWeekly; j++) {
        const finalDate = new Date(
          newDate.getTime() + j * 7 * 24 * 60 * 60 * 1000
        );

        const formattedDate = finalDate.toISOString().split("T")[0];
        const formattedHour = finalDate.toTimeString().split(" ")[0];

        newAppointments.push({
          date: formattedDate,
          hour: formattedHour,
          usuario: usuarioActivo,
        });
      }
    }

    // Llamar a createClass para cada cita generada
    newAppointments.forEach((appointment) => {
      createClassBD(
        appointment.date,
        appointment.hour,
        usuarioActivo,
        inputActivity
      );
    });
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
            value={inputActivity}
            onChange={(e) => setinputActivity(e.target.value)}
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
            className="input-group-CreateClass input"
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
          />
        </div>

        <div className="input-group-CreateClass">
          <label htmlFor="inputRepeatEvery">Repetir cada (minutos):</label>
          <input
            type="number"
            id="inputRepeatEvery"
            value={inputRepeatEveryMinutes}
            onChange={(e) => setinputRepeatEveryMinutes(e.target.value)}
            className="input-group-CreateClass input"
            min="1"
            max="100"
          />
        </div>

        <div className="input-group-CreateClass">
          <label htmlFor="inputRepeatFor">Repetir por (veces):</label>
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
          <label htmlFor="inputRepeatWeekly">Repetir cada (semanas):</label>
          <input
            type="number"
            id="inputRepeatWeekly"
            value={inputRepeatWeekly}
            onChange={(e) => setinputRepeatWeekly(e.target.value)}
            className="input-group-CreateClass input"
            min="1"
            max="100"
          />
        </div>

        <button type="submit" className="buttomCreate">
          Crear Clase
        </button>
      </form>
    </div>
  );
};

export default CreateClass;
