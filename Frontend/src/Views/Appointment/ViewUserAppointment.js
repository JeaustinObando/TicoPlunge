import React from "react";

const ViewUserAppointment = ({
  showClasses,
  reserve,
  handleSubmitSearch,
  setinputSearch,
  inputSearchDate,
  inputSearch,
  showErrorSearch,
  setinputSearchDate,
}) => {
  return (
    <div className="AppointmentStyle">
      <div className="container mt-5 ">
        <div className="search">
          <form className="form-inline" onSubmit={handleSubmitSearch}>
            <div className="form-group mx-sm-3 mb-2">
              <input
                type="text"
                className="form-control"
                id="searchInput"
                placeholder="Ingrese su búsqueda"
                value={inputSearch}
                onChange={(e) => setinputSearch(e.target.value)}
              />
            </div>
            <div className=" mb-2">
              <input
                type="date"
                id="inputDate"
                className="input-date"
                value={inputSearchDate}
                onChange={(e) => setinputSearchDate(e.target.value)}
                min={new Date().toISOString().split("T")[0]}
              />
            </div>

            {/* por si hay un error en el form de buscar se muetre*/}
            <div className={`error m-3 ${showErrorSearch ? "" : "d-none"}`}>
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
              <div class="error__title">{showErrorSearch}</div>
            </div>

            <button type="submit" className="btn btn-primary m-4">
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

export default ViewUserAppointment;
