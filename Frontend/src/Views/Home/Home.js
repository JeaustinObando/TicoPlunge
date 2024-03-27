import React from "react";
import "./Home.css";

const Home = () => {
  return (
    <div className="homeStyle">
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="text-center">
              <h2>Fila 1, Columna 1</h2>
              <p>Texto de la primera fila y primera columna.</p>
            </div>
          </div>
          <div className="col bg-image"></div>
        </div>
        <div className="row">
          <div className="col bg-image"></div>
          <div className="col">
            <div className="text-center">
              <h2>Fila 2, Columna 2</h2>
              <p>Texto de la segunda fila y segunda columna.</p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className="text-center">
              <h2>Fila 3, Columna 1</h2>
              <p>Texto de la tercera fila y primera columna.</p>
            </div>
          </div>
          <div className="col bg-image"></div>
        </div>
      </div>
    </div>
  );
};

export default Home;
