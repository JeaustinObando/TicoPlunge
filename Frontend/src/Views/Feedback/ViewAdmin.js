import React from "react";

const ViewAdmin = ({ showComentarios, deleteComentariosBD, renderStars }) => {
  return (
    <div className="FeedbackStyle">
      <div className="container mt-4 ">
        <div>
          {showComentarios.length > 0 ? (
            showComentarios.map((item, index) => (
              <div key={index} className="feedbackBox m-4">
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
    </div>
  );
};

export default ViewAdmin;
