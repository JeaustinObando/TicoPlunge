import { useEffect, useState } from "react";
import axios from "axios";
import "./Feedback.css";
import ViewAdmin from "./ViewAdmin";
import ViewUser from "./ViewUser";
import ViewNonelogin from "./ViewNonelogin";
import {
  createToBD,
  deleteByIDToBD,
  selectToBD,
  urlFeedback,
} from "../../GlobalVariables";

const Feedback = () => {
  // -------------------------------------------------------------
  // Variables basura que hay q borrar solo son para probar
  // -------------------------------------------------------------
  const [usuarioActivo, setUsuarioActivo] = useState("as");

  // -------------------------------------------------------------
  // Estas se mostraran en el HTML
  // -------------------------------------------------------------
  const [showComentarios, setshowComentarios] = useState("");
  const [showErroresForm, setshowErroresForm] = useState("");

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
    const newComentario = {
      comentario: inputComentario,
      usuario: usuarioActivo,
      rating: inputRating,
    };

    // Manda a crear el comentario a la base de datos
    createToBD(urlFeedback, newComentario).then(() => {
      // Si tiene éxito, llama al método selectComentariosBD.
      selectComentariosBD();
    });
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
  // Carga los comentarios
  // -------------------------------------------------------------
  const selectComentariosBD = async () => {
    const response = await selectToBD(urlFeedback);
    setshowComentarios(response);
  };

  // -------------------------------------------------------------
  // Borra un comentario
  // -------------------------------------------------------------
  const deleteComentariosBD = async (id) => {
    deleteByIDToBD(urlFeedback, id).then(() => {
      // Si la eliminación tiene éxito, llama al método selectComentariosBD.
      selectComentariosBD();
    });
  };

  // -------------------------------------------------------------
  // Llama a crear el comentario con la info del form
  // -------------------------------------------------------------
  const handleSubmit = (event) => {
    event.preventDefault();

    if (!inputRating || !inputComentario) {
      setshowErroresForm("Debe llenar todos los campos");
      return;
    }

    setshowErroresForm("");
    createComentariosBD();
  };

  return (
    <>
      {usuarioActivo === "Admin" && (
        <ViewAdmin
          showComentarios={showComentarios}
          deleteComentariosBD={deleteComentariosBD}
          renderStars={renderStars}
        />
      )}

      {usuarioActivo === "User" && (
        <ViewUser
          handleSubmit={handleSubmit}
          setInputRating={setInputRating}
          inputComentario={inputComentario}
          setinputComentario={setinputComentario}
          showErroresForm={showErroresForm}
          showComentarios={showComentarios}
          renderStars={renderStars}
        />
      )}

      {usuarioActivo !== "Admin" && usuarioActivo !== "User" && (
        <ViewNonelogin
          handleSubmit={handleSubmit}
          setInputRating={setInputRating}
          inputComentario={inputComentario}
          setinputComentario={setinputComentario}
          showErroresForm={showErroresForm}
          showComentarios={showComentarios}
          deleteComentariosBD={deleteComentariosBD}
          renderStars={renderStars}
        />
      )}
    </>
  );
};
export default Feedback;
