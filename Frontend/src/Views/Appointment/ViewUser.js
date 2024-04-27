import React from "react";

const ViewUser = ({ showClasses, reserve }) => {
  return (
    <div className="AppointmentStyle">
      <div className="container mt-5 ">
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
                <span>Actividad: {item.activity}</span>
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
