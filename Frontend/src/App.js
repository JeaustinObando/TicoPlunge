import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./Components/Layout";
import Feedback from "./Views/Feedback/Feedback";
import Home from "./Views/Home/Home";
import CreateClass from "./Views/CreateClass/CreateClass";
import Appointment from "./Views/Appointment/Appointment";
import { NotFound } from "./GlobalVariables";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/Feedback" element={<Feedback />} />
            <Route path="/CreateClass" element={<CreateClass />} />
            <Route path="/AppointmentForm" element={<Appointment />} />
            <Route path="*" element={<NotFound mensaje="Página no encontrada" />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
