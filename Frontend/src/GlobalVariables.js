import axios from "axios";
// -------------------------------------------------------------
// urls del backend
// -------------------------------------------------------------

export const baseUrl = "http://localhost:8080";

export const urlFeedback = `${baseUrl}/comentarios`;
export const urlAppointment = `${baseUrl}/comentarios`;
export const urlClass = `${baseUrl}/comentarios`;

// -------------------------------------------------------------
// funciones globlaes
// -------------------------------------------------------------

/**
 * Realiza una solicitud GET a un servicio web y devuelve los datos obtenidos.
 * @param {string} serviceUrl - La URL del servicio web al que se va a realizar la solicitud.
 * @returns {Promise<Array|String>} - Una promesa que resuelve en un array de datos si la solicitud es exitosa, o una cadena de texto que indica la ausencia de datos si no se encuentran resultados.
 */
export const selectToBD = async (serviceUrl) => {
  let config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    let response = await axios.get(serviceUrl, config);
    // Verifica si response.data es un array, si no lo es, devuelve un array vacío.
    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    console.error("Error al obtener los datos:", error);
    return [];
  }
};

/**
 * Realiza una solicitud GET a un servicio web con un filtro y devuelve los datos obtenidos.
 * @param {string} serviceUrl - La URL del servicio web al que se va a realizar la solicitud.
 * @param {object} searchBy - El filtro a aplicar en la consulta, en formato de objeto JSON.
 * @returns {Promise<Array>} - Una promesa que resuelve en un array de datos obtenidos.
 */
export const selectFilterToBD = async (serviceUrl, searchBy) => {
  try {
    // Realizar la solicitud GET con el filtro como parámetro de consulta
    const response = await selectToBD(
      `${serviceUrl}?filtro=${JSON.stringify(searchBy)}`
    );
    return response; // Retornar los datos obtenidos
  } catch (error) {
    console.error("Error al obtener datos:", error);
    return []; // Devolver un array vacío en caso de error
  }
};

/**
 * Creates a new document in the MongoDB database via a POST request to the specified service URL.
 * @param {string} serviceUrl - The URL of the service where the document will be created.
 * @param {Object} infoToSave - The data to be saved as the new document.
 * @returns {Promise<void>} A promise that resolves when the document is successfully created, or rejects with an error.
 */
export const createToBD = async (serviceUrl, infoToSave) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    // Send a POST request to the service URL with the provided data
    await axios.post(serviceUrl, infoToSave, config);

    // Alert user upon successful creation
    alert("Creado con éxito");
  } catch (error) {
    // Log any errors that occur during the creation process
    console.error("Error al insertar documento en MongoDB:", error);

    // Alert user about the error
    alert("Error.");
  }
};

/**
 * Borra un comentario de la base de datos haciendo una solicitud DELETE a la URL especificada.
 * @param {string} url - La URL base del servicio donde se encuentra el recurso a borrar.
 * @param {string} id - El ID del comentario que se desea borrar.
 * @returns {Promise<void>} - Una promesa que resuelve sin valor una vez que se haya completado la solicitud de borrado.
 */
export const deleteByIDToBD = async (url, id) => {
  // Se muestra un mensaje de confirmación al usuario antes de proceder con el borrado.
  const confirmacion = window.confirm("¿Está seguro de borrar el comentario?");

  if (confirmacion) {
    // Se construye la URL completa para la solicitud DELETE.
    const serviceUrl = `${url}/${id}`;
    try {
      // Se realiza la solicitud DELETE utilizando Axios.
      await axios.delete(serviceUrl);
      // Se muestra una alerta indicando que el borrado fue exitoso.
      alert("Borrado con éxito");
    } catch (error) {
      // Manejo de errores según el tipo de error generado.
      if (error.response) {
        // Error de respuesta del servidor con un código de error.
        console.error(
          "Error en la respuesta del servidor:",
          error.response.data
        );
        alert("Error: No se pudo borrar la variable.");
      } else if (error.request) {
        // La solicitud se realizó pero no se recibió respuesta.
        console.error("No se recibió respuesta del servidor:", error.request);
        alert("Error: No se pudo conectar al servidor.");
      } else {
        // Error durante la configuración de la solicitud.
        console.error(
          "Error durante la configuración de la solicitud:",
          error.message
        );
        alert("Error: Ocurrió un problema durante la solicitud.");
      }
    }
  } else {
    // Se muestra un mensaje indicando que la acción fue cancelada por el usuario.
    alert("Acción cancelada.");
  }
};

/**
 *Renderiza un componente de error cuando no se encuentran resultados.
 *@param {string} mensaje - El mensaje de error que se mostrará.
 *@returns {JSX.Element} - El componente de error NotFound.
 */
export function NotFound({ mensaje }) {
  return (
    <div className="NotFound">
      <div>
        <h1>{mensaje}</h1>
      </div>
      <div className="conteiner-hamster">
        <div
          aria-label="Orange and tan hamster running in a metal wheel"
          role="img"
          className="wheel-and-hamster"
        >
          <div className="wheel"></div>
          <div className="hamster">
            <div className="hamster__body">
              <div className="hamster__head">
                <div className="hamster__ear"></div>
                <div className="hamster__eye"></div>
                <div className="hamster__nose"></div>
              </div>
              <div className="hamster__limb hamster__limb--fr"></div>
              <div className="hamster__limb hamster__limb--fl"></div>
              <div className="hamster__limb hamster__limb--br"></div>
              <div className="hamster__limb hamster__limb--bl"></div>
              <div className="hamster__tail"></div>
            </div>
          </div>
          <div className="spoke"></div>
        </div>
      </div>
    </div>
  );
}
