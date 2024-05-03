import React from "react";

const ViewNoneloginFeedback = ({
  handleSubmit,
  setInputData,
  inputData,
  showErroresForm,
  comentarios,
  deleteComentario,
  renderStars,
}) => {
  return (
    <div className="FeedbackStyle">
      <div className="rating-card">
        <form onSubmit={handleSubmit}>
          <div className="text-wrapper">
            <p className="text-title">Deja tu comentario</p>
            <p className="text-subtitle">Nos gustaría saber tu opinión</p>
          </div>

          <div className="rating-stars-container">
            {[...Array(5)].map((_, i) => (
              <React.Fragment key={i}>
                <input
                  value={i + 1}
                  name="rate"
                  id={`star${i + 1}`}
                  type="radio"
                  onChange={() =>
                    setInputData({ ...inputData, rating: `${i + 1}` })
                  }
                />
                <label htmlFor={`star${i + 1}`} className="star-label">
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z"
                      pathLength="360"
                    ></path>
                  </svg>
                </label>
              </React.Fragment>
            ))}
          </div>

          <div className="input-group-prepend "></div>
          <textarea
            type="text"
            id="inputComentario"
            className="form-control mt-3"
            value={inputData.comentario}
            onChange={(e) =>
              setInputData({ ...inputData, comentario: e.target.value })
            }
            required
          />

          {/* por si hay un error en el form se muetre*/}
          <div className={`error m-3 ${showErroresForm ? "" : "d-none"}`}>
            <div class="error__icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                viewBox="0 0 24 24"
                height="24"
                fill="none"
              >
                <path
                  fill="#393a37"
                  d="m13 13h-2v-6h2zm0 4h-2v-2h2zm-1-15c-1.3132 0-2.61358.25866-3.82683.7612-1.21326.50255-2.31565 1.23915-3.24424 2.16773-1.87536 1.87537-2.92893 4.41891-2.92893 7.07107 0 2.6522 1.05357 5.1957 2.92893 7.0711.92859.9286 2.03098 1.6651 3.24424 2.1677 1.21325.5025 2.51363.7612 3.82683.7612 2.6522 0 5.1957-1.0536 7.0711-2.9289 1.8753-1.8754 2.9289-4.4189 2.9289-7.0711 0-1.3132-.2587-2.61358-.7612-3.82683-.5026-1.21326-1.2391-2.31565-2.1677-3.24424-.9286-.92858-2.031-1.66518-3.2443-2.16773-1.2132-.50254-2.5136-.7612-3.8268-.7612z"
                ></path>
              </svg>
            </div>
            <div class="error__title">{showErroresForm}</div>
          </div>

          <div className="input-group mt-3">
            <button className="btn btn-primary" type="submit">
              Crear Comentario
            </button>
          </div>
        </form>
      </div>

      <div className="container mt-4 ">
        <div>
          {comentarios.length > 0 ? (
            comentarios.map((item) => (
              <div key={item._id} className="feedbackBox m-4">
                <span className="notititle">{item.usuario}</span>
                <br></br>
                <span>{renderStars(parseInt(item.rating))}</span>
                <br></br>
                <span className="notibody">Comentario: {item.comentario}</span>
                <button
                  className="btn btn-danger m-4"
                  onClick={() => deleteComentario(item._id)}
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

export default ViewNoneloginFeedback;
