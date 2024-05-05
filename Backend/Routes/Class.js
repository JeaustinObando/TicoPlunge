const router = require("express").Router();

router.get("/", (req, res) => {
  const filtro = req.query.filtro; // Obtenemos el filtro de la consulta
  // console.log(filtro);
  // Si hay un filtro en la consulta, lo utilizamos en la consulta a la base de datos
  if (filtro) {
    const filtroObj = JSON.parse(filtro);

    db.collection("comentarios")
      .find(filtroObj)
      .toArray()
      .then((data) => {
        res.json(data); // Devuelve los datos como JSON
      })
      .catch((error) => {
        console.error("Error al consultar datos en MongoDB:", error);
        res.status(500).json({ error: "Error al consultar datos en MongoDB" });
      });
  } else {
    // Si no hay filtro en la consulta, simplemente obtenemos todos los comentarios
    db.collection("comentarios")
      .find()
      .toArray()
      .then((data) => {
        res.json(data); // Devuelve los datos como JSON
      })
      .catch((error) => {
        console.error("Error al consultar datos en MongoDB:", error);
        res.status(500).json({ error: "Error al consultar datos en MongoDB" });
      });
  }
});

// Ruta para manejar las solicitudes POST a /comentarios
router.post("/", (req, res) => {
  // Extraer los datos del comentario del cuerpo de la solicitud
  const comentario = req.body;

  // Insertar los datos del comentario en la colección de MongoDB
  db.collection("comentarios")
    .insertOne(comentario)
    .then((result) => {
      if (result && result.insertedId) {
        res.status(201).json({ message: "Comentario agregado exitosamente." });
      } else {
        console.error("No se pudo agregar el comentario.");
        res
          .status(500)
          .json({ error: "Error al agregar comentario en MongoDB" });
      }
    })
    .catch((error) => {
      console.error("Error al agregar comentario en MongoDB:", error);
      res.status(500).json({ error: "Error al agregar comentario en MongoDB" });
    });
});

// Ruta para manejar las solicitudes DELETE a /comentarios/:id
router.delete("/:id", (req, res) => {
  const comentarioId = req.params.id;

  // Eliminar el comentario de la colección de MongoDB
  db.collection("comentarios")
    .deleteOne({ _id: new ObjectId(comentarioId) }) // Utiliza new para crear un nuevo objeto ObjectId
    .then((result) => {
      if (result.deletedCount === 1) {
        res.status(200).json({ message: "Comentario eliminado exitosamente." });
      } else {
        console.error("No se pudo encontrar el comentario para eliminar.");
        res.status(404).json({ error: "Comentario no encontrado." });
      }
    })
    .catch((error) => {
      console.error("Error al eliminar comentario en MongoDB:", error);
      res
        .status(500)
        .json({ error: "Error al eliminar comentario en MongoDB" });
    });
});
