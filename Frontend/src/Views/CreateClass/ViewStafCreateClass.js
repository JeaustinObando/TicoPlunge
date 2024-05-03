import React from "react";

const ViewStafCreateClass = ({
  inputService,
  inputDate,
  inputHour,
  inputCapacity,
  inputRepeatEveryMinutes,
  inputRepeatNTimes,
  inputRepeatWeekly,
  showErroresForm,
  handleSubmit,
  setinputService,
  setinputDate,
  setinputHour,
  setInputCapacity,
  setinputRepeatEveryMinutes,
  setinputRepeatNTimes,
  setinputRepeatWeekly,
}) => {
  return (
    <div className="createClassStyle">
      <div className="form-container">
        <h2 className="title">Crear Clase</h2>
        <div className="social-message">
          <div className="line"></div>
          <div className="message">Tus citas programadas</div>
          <div className="line"></div>
        </div>
        <form onSubmit={handleSubmit} className="form-CreateClass">
          <div className="input-group-CreateClass">
            <label htmlFor="inputActivity">*Actividad:</label>
            <select
              id="inputActivity"
              className="select-CreateClass"
              value={inputService}
              onChange={(e) => setinputService(e.target.value)}
            >
              <option value="">Seleccione una opcion</option>
              <option value="box">Box</option>
              <option value="plunche">Plunche</option>
              <option value="baile">Baile</option>
            </select>
          </div>
          <div className="input-group-CreateClass">
            <label htmlFor="inputDate">*Fecha:</label>
            <input
              type="date"
              id="inputDate"
              value={inputDate}
              onChange={(e) => setinputDate(e.target.value)}
              min={new Date().toISOString().split("T")[0]}
              className="input-group-CreateClass input"
              required
            />
          </div>
          <div className="input-group-CreateClass">
            <label htmlFor="inputHour">*Hora:</label>
            <input
              type="time"
              id="inputHour"
              value={inputHour}
              onChange={(e) => setinputHour(e.target.value)}
              className="input-group-CreateClass input"
              required
            />
          </div>
          <div className="input-group-CreateClass">
            <label htmlFor="inputCapacity">*Cantidad de cupos:</label>
            <input
              type="number"
              id="inputCapacity"
              value={inputCapacity}
              onChange={(e) => setInputCapacity(e.target.value)}
              min="1"
              max="500"
              required
            />
          </div>

          <div className="input-group-CreateClass">
            <label htmlFor="inputRepeatEvery">
              <hr />
              Opciones de abajo para más de 1 clase
              <hr />
              Repetir cada (minutos):
            </label>
            <input
              type="number"
              id="inputRepeatEvery"
              value={inputRepeatEveryMinutes}
              onChange={(e) => setinputRepeatEveryMinutes(e.target.value)}
              className="input-group-CreateClass input"
              min="1"
              max="999"
            />
          </div>
          <div className="input-group-CreateClass">
            <label htmlFor="inputRepeatFor">
              Repetir por (veces segun la cantidad de minutos anterior):
            </label>
            <input
              type="number"
              id="inputRepeatFor"
              value={inputRepeatNTimes}
              onChange={(e) => setinputRepeatNTimes(e.target.value)}
              className="input-group-CreateClass input"
              min="1"
              max="100"
            />
          </div>
          <div className="input-group-CreateClass">
            <label htmlFor="inputRepeatWeekly">
              Repetir cantidad todo lo anterior (semanas consecutivas):
            </label>
            <input
              type="number"
              id="inputRepeatWeekly"
              value={inputRepeatWeekly}
              onChange={(e) => setinputRepeatWeekly(e.target.value)}
              className="input-group-CreateClass input"
              min="1"
              max="52"
            />
          </div>

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

          <button type="submit" className="buttomCreate">
            Crear Clase
          </button>
        </form>
      </div>
    </div>
  );
};

export default ViewStafCreateClass;
