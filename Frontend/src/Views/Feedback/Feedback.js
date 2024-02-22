import { useEffect, useState } from "react";
import axios from "axios";
import "./Feedback.css";

const Feedback = () => {
  // -------------------------------------------------------------
  // Estas se mostraran en el HTML
  // -------------------------------------------------------------
  const [showVariables, setshowVariables] = useState(["sii"]);

  // -------------------------------------------------------------
  // Seran input
  // -------------------------------------------------------------
  const [inputComentario, setinputComentario] = useState("");

  // -------------------------------------------------------------
  // Cada vez que carga la pantalla
  // -------------------------------------------------------------
  useEffect(() => {
    selectComentariosBD();
  }, []); // El segundo argumento vacío asegura que se llame solo una vez al cargar la página

  // -------------------------------------------------------------
  // crea las variables
  // -------------------------------------------------------------
  const createComentariosBD = async () => {
    var newComentario = {
      comentario: inputComentario,
    };

    if (newComentario.comentario === "") {
      alert("Debe ingresar un comentario.");
    } else {
      try {
        const serviceUrl = "http://localhost:8080/comentarios";
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };

        const response = await axios.post(serviceUrl, newComentario, config);
        alert("Agregado con éxito");
        selectComentariosBD(); // para cargarlas en pantalla automáticamente después de crearlas
      } catch (error) {
        console.error("Error al insertar documento en MongoDB:", error);
      }
    }
  };

  // -------------------------------------------------------------
  // seleciona
  // -------------------------------------------------------------
  const selectComentariosBD = async () => {
    const serviceUrl = "http://localhost:8080/comentarios";
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await axios.get(serviceUrl, config);
      const varList = response.data;

      let variablesToRender;
      if (varList.length < 1) {
        variablesToRender = "No hay datos";
      } else {
        variablesToRender = varList.map((variable) => (
          <div key={variable._id}>
            <p>Comentario: {variable.comentario}</p>
          </div>
        ));
      }

      setshowVariables(variablesToRender);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Comentarios</h1>

      <div className="mb-4">{showVariables}</div>

      <div className="input-group mb-4">
        <div className="input-group-prepend">
          <label className="input-group-text" htmlFor="inputName">
            Comentario:
          </label>
        </div>
        <input
          type="text"
          id="inputName"
          className="form-control"
          value={inputComentario}
          onChange={(e) => setinputComentario(e.target.value)}
        />

        <div className="input-group-append">
          <button
            className="btn btn-primary"
            type="button"
            onClick={createComentariosBD}
          >
            Crear Comentario
          </button>
        </div>
      </div>
    </div>
  );
};
export default Feedback;
