import { useEffect, useState } from "react";
import axios from "axios";
import "./Feedback.css";
import ViewAdminFeedback from "./ViewAdminFeedback";
import ViewUserFeedback from "./ViewUserFeedback";
import ViewNoneloginFeedback from "./ViewNoneloginFeedback";
import {
  createToBD,
  deleteByIDToBD,
  selectToBD,
  urlFeedback,
  SuccessAlert,
  selectUserByToken,
  ErrorAlert,
} from "../../GlobalVariables";

let timeWaitAlert = 8000;

const Feedback = () => {
  // -------------------------------------------------------------
  // Variables basura que hay q borrar solo son para probar
  // -------------------------------------------------------------
  const [usuarioActivo, setUsuarioActivo] = useState("User");

  // -------------------------------------------------------------
  // Estas se mostraran en el HTML
  // -------------------------------------------------------------
  const [showComentarios, setshowComentarios] = useState("");
  const [showErroresForm, setshowErroresForm] = useState("");

  // -------------------------------------------------------------
  // Seran input
  // -------------------------------------------------------------
  const [inputData, setInputData] = useState({
    comentario: "",
    rating: "",
  });

  const GetUserActive = async () => {
    const token = localStorage.getItem("token");
    const user = await selectUserByToken(token);
    setUsuarioActivo(user.firstName);
  };

  // -------------------------------------------------------------
  // Cada vez que carga la pantalla
  // -------------------------------------------------------------
  useEffect(() => {
    GetUserActive();

    selectComentariosBD();
  }, []); // El segundo argumento vacío asegura que se llame solo una vez al cargar la página

  // -------------------------------------------------------------
  // Crea los comentarios en la base de datos
  // -------------------------------------------------------------
  const createComentariosBD = async () => {
    const newComentario = {
      comentario: inputData.comentario,
      usuario: usuarioActivo,
      rating: inputData.rating,
    };

    // Manda a crear el comentario a la base de datos
    const response = await createToBD(urlFeedback, newComentario);

    await selectComentariosBD();

    // Deja un mensaje de exito o error al crear
    setshowErroresForm(response);
    setTimeout(() => {
      setshowErroresForm("");
    }, timeWaitAlert);
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

    if (!inputData.rating || !inputData.comentario) {
      setshowErroresForm(
        <ErrorAlert message="Debe llenar las estrellas y el comentario" />
      );
      return;
    }

    setshowErroresForm("");
    createComentariosBD();
  };

  return (
    <>
      {usuarioActivo === "Admin" && (
        <ViewAdminFeedback renderStars={renderStars} />
      )}

      {usuarioActivo === "User" && (
        <ViewUserFeedback renderStars={renderStars} />
      )}

      {usuarioActivo !== "Admin" && usuarioActivo !== "User" && (
        <ViewNoneloginFeedback
          handleSubmit={handleSubmit}
          setInputData={setInputData}
          inputData={inputData}
          showErroresForm={showErroresForm}
          comentarios={showComentarios}
          deleteComentario={deleteComentariosBD}
          renderStars={renderStars}
        />
      )}
    </>
  );
};
export default Feedback;
