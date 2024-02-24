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
  // crea los comentarios en la base de datos
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

  // // -------------------------------------------------------------
  // // seleciona los comentarios de la base de datos
  // // -------------------------------------------------------------
  // const selectComentariosBD = async () => {
  //   const serviceUrl = "http://localhost:8080/comentarios";
  //   const config = {
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   };

  //   try {
  //     const response = await axios.get(serviceUrl, config);
  //     const varList = response.data;

  //     let variablesToRender;
  //     if (varList.length < 1) {
  //       variablesToRender = "No hay datos";
  //     } else {
  //       variablesToRender = varList.map((variable) => (
  //         <div key={variable._id}>
  //           <p>Comentario: {variable.comentario}</p>
  //         </div>
  //       ));
  //     }

  //     setshowVariables(variablesToRender);
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // };

  // -------------------------------------------------------------
  // seleciona las variables y les agrega un boton de borrar a la par
  // -------------------------------------------------------------
  const selectComentariosBD = async () => {
    const serviceUrl = "http://localhost:8080/comentarios";
    let config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      let response = await axios.get(serviceUrl, config);

      if (response.data.length > 0) {
        let varList = response.data.map((item) => (
          <li key={item.id}>
            {item.id} Nombre: {item.comentario}
            <button
              className="btn btn-danger m-4"
              onClick={() => deleteComentariosBD(item._id)}
            >
              Borrar
            </button>
          </li>
        ));

        setshowVariables(varList);
      } else {
        setshowVariables(<i>No hay datos</i>);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // -------------------------------------------------------------
  // borra una variable
  // -------------------------------------------------------------
  const deleteComentariosBD = async (id) => {
    const serviceUrl = `http://localhost:8080/comentarios/${id}`;
    try {
      const response = await axios.delete(serviceUrl);
      alert("Borrado con éxito");
      selectComentariosBD();
    } catch (error) {
      if (error.response) {
        // La solicitud fue realizada pero el servidor respondió con un código de error
        console.error(
          "Error en la respuesta del servidor:",
          error.response.data
        );
        alert("Error: No se pudo borrar la variable.");
      } else if (error.request) {
        // La solicitud se hizo pero no se recibió respuesta
        console.error("No se recibió respuesta del servidor:", error.request);
        alert("Error: No se pudo conectar al servidor.");
      } else {
        // Un error ocurrió durante la configuración de la solicitud
        console.error(
          "Error durante la configuración de la solicitud:",
          error.message
        );
        alert("Error: Ocurrió un problema durante la solicitud.");
      }
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
