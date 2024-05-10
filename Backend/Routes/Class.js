const router = require("express").Router();
const { Class, validateClass } = require("../Models/ClassModel");

// Ruta para obtener todas las clases
router.get("/", async (req, res) => {
  try {
    // Obtenemos el filtro de la consulta
    const filtro = req.query.filtro;

    // Si hay un filtro en la consulta, lo utilizamos en la consulta a la base de datos
    let clases;
    if (filtro) {
      // Convierte el filtro de cadena JSON a objeto
      const filtroObj = JSON.parse(filtro);
      clases = await Class.find(filtroObj);
    } else {
      // Si no hay filtro en la consulta, simplemente obtenemos todas las clases
      clases = await Class.find();
    }

    res.json(clases); // Devuelve las clases como JSON
  } catch (error) {
    console.error("Error al consultar clases en MongoDB:", error);
    res.status(500).json({ error: "Error al consultar clases en MongoDB" });
  }
});

// Ruta para agregar una nueva clase
router.post("/", async (req, res) => {
  // Extraemos los datos de la clase del cuerpo de la solicitud
  const claseData = req.body;

  // Validamos los datos de la clase
  const { error } = validateClass(claseData);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const nuevaClase = await Class.create(claseData); // Creamos una nueva clase
    res.status(201).json({
      message: "Clase agregada exitosamente.",
      clase: nuevaClase,
    });
  } catch (error) {
    console.error("Error al agregar clase en MongoDB:", error);
    res.status(500).json({ error: "Error al agregar clase en MongoDB" });
  }
});

// Ruta para eliminar una clase por su ID
router.delete("/:id", async (req, res) => {
  const claseId = req.params.id;

  try {
    const resultado = await Class.deleteOne({ _id: claseId }); // Eliminamos la clase por su ID
    if (resultado.deletedCount === 1) {
      res.status(200).json({ message: "Clase eliminada exitosamente." });
    } else {
      console.error("No se pudo encontrar la clase para eliminar.");
      res.status(404).json({ error: "Clase no encontrada." });
    }
  } catch (error) {
    console.error("Error al eliminar clase en MongoDB:", error);
    res.status(500).json({ error: "Error al eliminar clase en MongoDB" });
  }
});

module.exports = router;
