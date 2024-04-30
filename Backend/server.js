const express = require("express");
const cors = require("cors");
const { MongoClient, ObjectId } = require("mongodb");

const app = express();
const port = 8080;

app.use(cors());
app.use(express.json()); // Configura body-parser para analizar JSON

// URL de conexión a tu base de datos MongoDB
const mongoURI = "mongodb://127.0.0.1:27017/proyectReact";
// const mongoURI =
//   "mongodb+srv://isaacm:isaacm@clusterticoplunge.sgaaiup.mongodb.net/";

// Conexión a la base de datos MongoDB
MongoClient.connect(mongoURI)
  .then((client) => {
    console.log("Conectado a la base de datos MongoDB");
    const db = client.db(); // Obtén una referencia a la base de datos

    // Ruta para manejar las solicitudes GET a /comentarios
    // app.get("/comentarios", (req, res) => {
    //   db.collection("comentarios")
    //     .find()
    //     .toArray()
    //     .then((data) => {
    //       res.json(data); // Devuelve los datos como JSON
    //     })
    //     .catch((error) => {
    //       console.error("Error al consultar datos en MongoDB:", error);
    //       res
    //         .status(500)
    //         .json({ error: "Error al consultar datos en MongoDB" });
    //     });
    // });

    // Ruta para manejar las solicitudes GET a /comentarios
    app.get("/comentarios", (req, res) => {
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
            res
              .status(500)
              .json({ error: "Error al consultar datos en MongoDB" });
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
            res
              .status(500)
              .json({ error: "Error al consultar datos en MongoDB" });
          });
      }
    });

    // Ruta para manejar las solicitudes POST a /comentarios
    app.post("/comentarios", (req, res) => {
      // Extraer los datos del comentario del cuerpo de la solicitud
      const comentario = req.body;

      // Insertar los datos del comentario en la colección de MongoDB
      db.collection("comentarios")
        .insertOne(comentario)
        .then((result) => {
          if (result && result.insertedId) {
            res
              .status(201)
              .json({ message: "Comentario agregado exitosamente." });
          } else {
            console.error("No se pudo agregar el comentario.");
            res
              .status(500)
              .json({ error: "Error al agregar comentario en MongoDB" });
          }
        })
        .catch((error) => {
          console.error("Error al agregar comentario en MongoDB:", error);
          res
            .status(500)
            .json({ error: "Error al agregar comentario en MongoDB" });
        });
    });

    // Ruta para manejar las solicitudes DELETE a /comentarios/:id
    app.delete("/comentarios/:id", (req, res) => {
      const comentarioId = req.params.id;

      // Eliminar el comentario de la colección de MongoDB
      db.collection("comentarios")
        .deleteOne({ _id: new ObjectId(comentarioId) }) // Utiliza new para crear un nuevo objeto ObjectId
        .then((result) => {
          if (result.deletedCount === 1) {
            res
              .status(200)
              .json({ message: "Comentario eliminado exitosamente." });
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

    // Inicia el servidor Express en el puerto especificado
    app.listen(port, () => {
      console.log(`Servidor Express iniciado en http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error("Error al conectar a la base de datos MongoDB:", error);
  });
