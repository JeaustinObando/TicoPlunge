import { useEffect, useState } from "react";
import axios from "axios";
import "./CreateClass.css";

const CreateClass = () => {
  // -------------------------------------------------------------
  // Variables basura que hay q borrar solo son para probar
  // -------------------------------------------------------------
  const [usuarioActivo, setUsuarioActivo] = useState(["Usuario No Dado"]);

  // -------------------------------------------------------------
  // Estas se mostraran en el HTML
  // -------------------------------------------------------------
  const [showVariables, setshowVariables] = useState([""]);

  // -------------------------------------------------------------
  // Seran input
  // -------------------------------------------------------------
  const [inputDate, setinputDate] = useState("");
  const [inputHour, setinputHour] = useState("");
  const [inputRepeatEveryMinutes, setinputRepeatEveryMinutes] = useState(30);
  const [inputRepeatNTimes, setinputRepeatNTimes] = useState(1);
  const [inputRepeatWeekly, setinputRepeatWeekly] = useState(1);

  // -------------------------------------------------------------
  // Para Almacenar
  // -------------------------------------------------------------
  const [appointments, setAppointments] = useState([]);

  // -------------------------------------------------------------
  // Cada vez que carga la pantalla
  // -------------------------------------------------------------
  useEffect(() => {}, []); // El segundo argumento vacío asegura que se llame solo una vez al cargar la página

  const createClassBD = async (date, hour, usuario) => {
    const confirmacion = window.confirm("¿Está seguro?");

    if (confirmacion) {
      var newClass = {
        date: date,
        hour: hour,
        usuario: usuario,
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
          alert("Agregado con éxito");
          //   selectComentariosBD(); // para cargarlas en pantalla automáticamente después de crearlas
        } catch (error) {
          console.error("Error al insertar documento en MongoDB:", error);
        }
      }
    } else {
      alert("Acción cancelada.");
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

    setAppointments(newAppointments); // Actualizar el estado con las nuevas citas

    // Llamar a createClass para cada cita generada
    newAppointments.forEach((appointment) => {
      createClassBD(appointment.date, appointment.hour, appointment.usuario);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createAppointments();
  };

  return (
    <div className="createClassForm">
      <h2>Crear Clase</h2>
      <appointments></appointments>
      <form onSubmit={handleSubmit}>
        <div className="formGroup">
          <label htmlFor="inputActivity">Actividad:</label>
          <select id="inputActivity">
            <option value="">Seleccione una opcion</option>
            <option value="box">Box</option>
            <option value="plunche">Plunche</option>
            <option value="baile">Baile</option>
          </select>
        </div>

        <div className="formGroup">
          <label htmlFor="inputDate">Fecha:</label>
          <input
            type="date"
            id="inputDate"
            value={inputDate}
            onChange={(e) => setinputDate(e.target.value)}
          />
        </div>

        <div className="formGroup">
          <label htmlFor="inputHour">Hora:</label>
          <input
            type="time"
            id="inputHour"
            value={inputHour}
            onChange={(e) => setinputHour(e.target.value)}
          />
        </div>

        <div className="formGroup">
          <label htmlFor="inputRepeatEvery">Repetir cada (minutos):</label>
          <input
            type="number"
            id="inputRepeatEvery"
            value={inputRepeatEveryMinutes}
            onChange={(e) => setinputRepeatEveryMinutes(e.target.value)}
          />
        </div>

        <div className="formGroup">
          <label htmlFor="inputRepeatFor">Repetir por (veces):</label>
          <input
            type="number"
            id="inputRepeatFor"
            value={inputRepeatNTimes}
            onChange={(e) => setinputRepeatNTimes(e.target.value)}
          />
        </div>

        <div className="formGroup">
          <label htmlFor="inputRepeatWeekly">Repetir cada (semanas):</label>
          <input
            type="number"
            id="inputRepeatWeekly"
            value={inputRepeatWeekly}
            onChange={(e) => setinputRepeatWeekly(e.target.value)}
          />
        </div>

        <button type="submit">Crear Clase</button>
      </form>
    </div>
  );
};

export default CreateClass;
