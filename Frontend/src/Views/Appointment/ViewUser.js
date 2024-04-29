import React from "react";

const ViewUser = ({
  showClasses,
  reserve,
  handleSubmitSearch,
  setinputSearch,
  inputSearch,
}) => {
  return (
    <div className="AppointmentStyle">
      <div className="container mt-5 ">
        <div className="search">
          <form className="form-inline" onSubmit={handleSubmitSearch}>
            <div className="form-group mx-sm-3 mb-2">
              <label htmlFor="searchInput" className="sr-only">
                Buscar
              </label>
              <input
                type="text"
                className="form-control"
                id="searchInput"
                placeholder="Ingrese su búsqueda"
                value={inputSearch}
                onChange={(e) => setinputSearch(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary mb-2">
              Buscar
            </button>
          </form>
        </div>
        <div className="card-container">
          {showClasses.length > 0 ? (
            showClasses.map((item, index) => (
              <div key={index} className="card">
                <span>Profesor: {item.usuario}</span>
                <br />
                <span>Hora: {item.hour}</span>
                <br />
                <span>Fecha: {item.date}</span>
                <br />
                <span>Cupos disponibles: {item.capacity}</span>
                <br />
                <span>Actividad: {item.service}</span>
                <button
                  className="btn btn-primary m-4"
                  onClick={() => reserve(item._id)}
                >
                  AGENDAR
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

export default ViewUser;
