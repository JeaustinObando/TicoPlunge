import { useEffect, useState } from "react";
import axios from "axios";
import "./Feedback.css";

const baseUrl = "http://localhost:8080";

const Feedback = () => {
  // -------------------------------------------------------------
  // Variables basura que hay q borrar solo son para probar
  // -------------------------------------------------------------
  const [usuarioActivo, setUsuarioActivo] = useState(["Usuario No Dado"]);

  // -------------------------------------------------------------
  // Estas se mostraran en el HTML
  // -------------------------------------------------------------
  const [showComentarios, setshowComentarios] = useState([""]);

  // -------------------------------------------------------------
  // Seran input
  // -------------------------------------------------------------
  const [inputComentario, setinputComentario] = useState("");
  const [inputRating, setInputRating] = useState("");

  // -------------------------------------------------------------
  // Cada vez que carga la pantalla
  // -------------------------------------------------------------
  useEffect(() => {
    selectComentariosBD();
  }, []); // El segundo argumento vacío asegura que se llame solo una vez al cargar la página

  // -------------------------------------------------------------
  // Crea los comentarios en la base de datos
  // -------------------------------------------------------------
  const createComentariosBD = async () => {
    const confirmacion = window.confirm("¿Está seguro de crear el comentario?");

    if (confirmacion) {
      const newComentario = {
        comentario: inputComentario,
        usuario: usuarioActivo,
        rating: inputRating,
      };

      if (
        newComentario.comentario === "" ||
        newComentario.usuario === "" ||
        newComentario.rating === ""
      ) {
        alert("Debe ingresar todos los datos.");
      } else {
        try {
          const serviceUrl = `${baseUrl}/comentarios`;
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
    } else {
      alert("Acción cancelada.");
    }
  };

  const renderStars = (rating) => {
    const stars = [];

    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(
          <span className="star" key={i}>
            ★
          </span>
        );
      } else {
        stars.push(<span className="star" key={i}>☆</span>);
      }
    }

    return stars;
  };

  // -------------------------------------------------------------
  // Carga los comentarios y les agrega un boton de borrar a la par
  // -------------------------------------------------------------
  const selectComentariosBD = async () => {
    const serviceUrl = `${baseUrl}/comentarios`;
    let config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      let response = await axios.get(serviceUrl, config);

      if (response.data.length > 0) {
        let varList = response.data.map((item) => (
          <div key={item.id} className="feedbackBox">
            <span className="notititle">{item.usuario}</span>
            <br></br>
            <span>{renderStars(item.rating)}</span>
            <br></br>
            <span className="notibody">Comentario: {item.comentario}</span>
            <button
              className="btn btn-danger m-4"
              onClick={() => deleteComentariosBD(item._id)}
            >
              Borrar
            </button>
          </div>
        ));

        setshowComentarios(varList);
      } else {
        setshowComentarios(<i>No hay comentario</i>);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // -------------------------------------------------------------
  // Borra un comentario
  // -------------------------------------------------------------
  const deleteComentariosBD = async (id) => {
    const confirmacion = window.confirm("¿Está seguro de crear el comentario?");

    if (confirmacion) {
      const serviceUrl = `${baseUrl}/comentarios/${id}`;
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
    } else {
      alert("Acción cancelada.");
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Comentarios</h1>

      <div className="input-group mb-4">
        <div className="input-group mb-4">
          <div className="rating">
            <input
              value="5"
              name="rate"
              id="star5"
              type="radio"
              onChange={() => setInputRating("5")}
            />
            <label title="text" htmlFor="star5"></label>

            <input
              value="4"
              name="rate"
              id="star4"
              type="radio"
              onChange={() => setInputRating("4")}
            />
            <label title="text" htmlFor="star4"></label>

            <input
              value="3"
              name="rate"
              id="star3"
              type="radio"
              onChange={() => setInputRating("3")}
            />
            <label title="text" htmlFor="star3"></label>

            <input
              value="2"
              name="rate"
              id="star2"
              type="radio"
              onChange={() => setInputRating("2")}
            />
            <label title="text" htmlFor="star2"></label>

            <input
              value="1"
              name="rate"
              id="star1"
              type="radio"
              onChange={() => setInputRating("1")}
            />
            <label title="text" htmlFor="star1"></label>
          </div>
        </div>

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
      </div>

      <div className="input-group mb-4">
        <button
          className="btn btn-primary"
          type="button"
          onClick={createComentariosBD}
        >
          Crear Comentario
        </button>
      </div>

      <div className="mb-4">{showComentarios}</div>
    </div>
  );
};
export default Feedback;
