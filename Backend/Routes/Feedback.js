const router = require("express").Router();

const { Feedback } = require("../Models/FeedbackModel");

// Ruta para obtener todos los comentarios
router.get("/", async (req, res) => {
  try {
    const comentarios = await Feedback.find(); // Obtenemos todos los comentarios

    console.log(comentarios);

    res.json(comentarios); // Devolvemos los comentarios como JSON
  } catch (error) {
    console.error("Error al consultar comentarios en MongoDB:", error);
    res
      .status(500)
      .json({ error: "Error al consultar comentarios en MongoDB" });
  }
});

// Ruta para agregar un nuevo comentario
router.post("/", async (req, res) => {
  // Extraemos los datos del comentario del cuerpo de la solicitud
  const comentario = req.body;

  console.log(req);

  try {
    const nuevoComentario = await Feedback.create(comentario); // Creamos un nuevo comentario
    res.status(201).json({
      message: "Comentario agregado exitosamente.",
      comentario: nuevoComentario,
    });
  } catch (error) {
    console.error("Error al agregar comentario en MongoDB:", error);
    res.status(500).json({ error: "Error al agregar comentario en MongoDB" });
  }
});

// Ruta para eliminar un comentario por su ID
router.delete("/:id", async (req, res) => {
  const comentarioId = req.params.id;

  try {
    const resultado = await Feedback.deleteOne({ _id: comentarioId }); // Eliminamos el comentario por su ID
    if (resultado.deletedCount === 1) {
      res.status(200).json({ message: "Comentario eliminado exitosamente." });
    } else {
      console.error("No se pudo encontrar el comentario para eliminar.");
      res.status(404).json({ error: "Comentario no encontrado." });
    }
  } catch (error) {
    console.error("Error al eliminar comentario en MongoDB:", error);
    res.status(500).json({ error: "Error al eliminar comentario en MongoDB" });
  }
});

module.exports = router;
