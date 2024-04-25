import "./App.css";
import { BrowserRouter,  Route, Routes } from "react-router-dom";
import Layout from "./Components/Layout";
import Forms from "./Views/Feedback/Feedback";
import Home from "./Views/Home/Home";
import CreateClass from "./Views/CreateClass/CreateClass";
import AppointmentForm from "./Views/AppointmentForm/AppointmentForm";

function App() {
  function NotFound() {
    return (
      <div className="NotFound">
        <div>
          <h1>La página que busca no existe</h1>
        </div>
      </div>
    );
  }

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/Feedback" element={<Forms />} />
            <Route path="/CreateClass" element={<CreateClass />} />
            <Route path="/AppointmentForm" element={<AppointmentForm />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
