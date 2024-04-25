import { useEffect, useState } from "react";
import axios from "axios";
import "./Feedback.css";
import { urlFeedback } from "../../GlobalVariables";

const FeedbackAdmin = () => {
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
          const serviceUrl = urlFeedback;
          const config = {
            headers: {
              "Content-Type": "application/json",
            },
          };

          const response = await axios.post(serviceUrl, newComentario, config);
          alert("Comentario agregado con éxito");
          selectComentariosBD(); // para cargarlas en pantalla automáticamente después de crearlas
        } catch (error) {
          console.error("Error al insertar documento en MongoDB:", error);
          alert("Error.");
        }
      }
    } else {
      alert("Acción cancelada.");
    }
  };

  // -------------------------------------------------------------
  // Cambia los numeros por estrellas para mostrar
  // -------------------------------------------------------------
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
        stars.push(
          <span className="star" key={i}>
            ☆
          </span>
        );
      }
    }

    return stars;
  };

  // -------------------------------------------------------------
  // Carga los comentarios y les agrega un boton de borrar a la par
  // -------------------------------------------------------------
  const selectComentariosBD = async () => {
    const serviceUrl = urlFeedback;
    let config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      let response = await axios.get(serviceUrl, config);

      setshowComentarios(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // -------------------------------------------------------------
  // Borra un comentario
  // -------------------------------------------------------------
  const deleteComentariosBD = async (id) => {
    const confirmacion = window.confirm(
      "¿Está seguro de borrar el comentario?"
    );

    if (confirmacion) {
      const serviceUrl = `${urlFeedback}/${id}`;
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

  // -------------------------------------------------------------
  // Llama a crear el comentario con la info del form
  // -------------------------------------------------------------
  const handleSubmit = (event) => {
    event.preventDefault();

    if (!inputRating) {
      alert("Debes seleccionar una calificación");
      return;
    }

    if (!inputComentario) {
      alert("Debes ingresar un comentario");
      return;
    }

    createComentariosBD();
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Comentarios</h1>

      <div className="rating-card">
        <form onSubmit={handleSubmit}>
          <div className="text-wrapper">
            <p className="text-primary">Deja tu comentario</p>
            <p className="text-secondary">Nos gustaría saber tu opinión</p>
          </div>

          <div className="rating-stars-container">
            <input
              value="5"
              name="rate"
              id="star5"
              type="radio"
              onChange={() => setInputRating("5")}
            />
            <label htmlFor="star5" className="star-label">
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z"
                  pathLength="360"
                ></path>
              </svg>
            </label>
            <input
              value="4"
              name="rate"
              id="star4"
              type="radio"
              onChange={() => setInputRating("4")}
            />
            <label htmlFor="star4" className="star-label">
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z"
                  pathLength="360"
                ></path>
              </svg>
            </label>
            <input
              value="3"
              name="rate"
              id="star3"
              type="radio"
              onChange={() => setInputRating("3")}
            />
            <label htmlFor="star3" className="star-label">
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z"
                  pathLength="360"
                ></path>
              </svg>
            </label>
            <input
              value="2"
              name="rate"
              id="star2"
              type="radio"
              onChange={() => setInputRating("2")}
            />
            <label htmlFor="star2" className="star-label">
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z"
                  pathLength="360"
                ></path>
              </svg>
            </label>
            <input
              value="1"
              name="rate"
              id="star1"
              type="radio"
              onChange={() => setInputRating("1")}
            />
            <label htmlFor="star1" className="star-label">
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z"
                  pathLength="360"
                ></path>
              </svg>
            </label>
          </div>

          <div className="input-group-prepend "></div>
          <input
            type="text"
            id="inputComentario"
            className="form-control mb-3"
            value={inputComentario}
            onChange={(e) => setinputComentario(e.target.value)}
            required
          />

          <div className="input-group mb-3">
            <button className="btn btn-primary" type="submit">
              Crear Comentario
            </button>
          </div>
        </form>
      </div>

      <div className="mb-4">
        {showComentarios.length > 0 ? (
          showComentarios.map((item, index) => (
            <div key={index} className="feedbackBox">
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
export default FeedbackAdmin;
