// Import React and other necessary libraries
import { useEffect, useState } from "react";
import { selectUserByToken } from "../../GlobalVariables";
import "./Profile.css";

const Profile = () => {
  // -------------------------------------------------------------
  // Se usara para optener los datos de la persona activa
  // -------------------------------------------------------------
  const [usuarioActivo, setUsuarioActivo] = useState({});

  // -------------------------------------------------------------
  // Seran input
  // -------------------------------------------------------------
  const [inputData, setInputData] = useState({
    name: "",
  });

  // -------------------------------------------------------------
  // Estas se mostraran en el HTML
  // -------------------------------------------------------------
  const [showAlerts, setshowAlerts] = useState("");

  /**
   * Función asincrónica para obtener y establecer el usuario activo utilizando el token de autenticación.
   */
  const GetUserActive = async () => {
    const user = await selectUserByToken();
    setUsuarioActivo(user);
    console.log(user);
  };

  /**
   * Efecto secundario que se ejecuta al montar el componente (cargar la pagina)
   * El segundo argumento vacío asegura que se llame solo una vez al cargar la página.
   */
  useEffect(() => {
    // Llamar a la función para obtener y establecer el usuario activo
    GetUserActive();
  }, []);

  return (
    <div className="ProfileStyle">
      {usuarioActivo.role ? (
        <>
          <h1>Rol: {usuarioActivo.role}</h1>
          <h1>Email: {usuarioActivo.email}</h1>
          <h1>First Name: {usuarioActivo.firstName}</h1>
          <h1>creditos: {usuarioActivo.creditos}</h1>
        </>
      ) : (
        <h1>Inicia sesión para ver esta información</h1>
      )}
    </div>
  );
};

export default Profile;
