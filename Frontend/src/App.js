import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./Components/Layout";
import Feedback from "./Views/Feedback/Feedback";
import Home from "./Views/Home/Home";
import CreateClass from "./Views/CreateClass/CreateClass";
import Appointment from "./Views/Appointment/Appointment";
import SignIn from "./Views/SingIn/SingIn";
import Login from "./Views/Login/Login";
import { NotFound } from "./GlobalVariables";
import Profile from "./Views/Profile/Profile";

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
            <Route path="/SignIn" element={<SignIn />} />
            <Route path="/LogIn" element={<Login />} />
            <Route path="/Profile" element={<Profile />} />
            <Route
              path="*"
              element={<NotFound mensaje="La página que busca no existe" />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
