import { useEffect, useState } from "react";
import axios from "axios";
import "./AppointmentForm.css";

const AppointmentForm = () => {
  // -------------------------------------------------------------
  // Variables basura que hay q borrar solo son para probar
  // -------------------------------------------------------------
  const [usuarioActivo, setUsuarioActivo] = useState(["Usuario No Dado"]);

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

  // -------------------------------------------------------------
  // seleciona las variables y les agrega un boton de borrar a la par
  // -------------------------------------------------------------
  const selectClassBD = async () => {
    const serviceUrl = "http://localhost:8080/comentarios";
    let config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      let response = await axios.get(serviceUrl, config);

      if (response.data.length > 0) {
        setshowClasses(response.data); // Guardar los datos en el estado directamente
      } else {
        setshowClasses(<i>No hay clases</i>);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="container mt-5 ">
      <div className="card-container">
        {showClasses.length > 0 ? (
          showClasses.map((item, index) => (
            <div key={index} className="card">
              <span>Profesor: {item.usuario}</span>
              <br />
              <span>Hora: {item.hour}</span>
              <br />
              <span>Fecha: {item.date}</span>
              <button
                className="btn btn-primary m-4"
                onClick={() => reserve(item._id)}
              >
                AGENDAR
              </button>
            </div>
          ))
        ) : (
          <div className="no-data">
            <h2>No hay datos disponibles</h2>
          </div>
        )}
      </div>
    </div>
  );
};
export default AppointmentForm;
