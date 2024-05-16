import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  return (
    <div className="homeStyle">
      <header className="header">
        <div className="container">
          <h1 className="titulo">¡Bienvenido a TICO PLUNGE!</h1>
          <p className="descripcion">Explora todo lo que tenemos para ofrecerte.</p>
          <div className="caracteristicas">
            <i>• Cold Plunge</i>
            <p>• Pilates</p>
            <p>• Zumba</p>
            <p>• Yoga</p>
            <p>• Boxeo</p>
          </div>
          <Link to="/AppointmentForm" className="btn btn-primary">RESERVA YA!!</Link>
        </div>
      </header>
      
      <section className="quienes-somos">
        <div className="container">
          <h2>¿Quiénes somos?</h2>
          <p>Somos una empresa comprometida con nuestros clientes.</p>
          <Link to="/nosotros" className="btn btn-secondary">Conoce más</Link>
        </div>
      </section>

      <section className="visit-comunity">
        <div className="container">
          <div className="visit-comunity-content">
            <div className="visit">
              <h2>¡Visítanos!</h2>
              <p>Estamos ubicados en:</p>
              <p>Tu Dirección, Ciudad, País</p>
              <a href="https://api.whatsapp.com/message/NQD6MTRNSIW5N1?autoload=1&app_absent=0" className="btn btn-info" target="_blank" rel="noopener noreferrer">Whatsapp</a>
              <p className="horario">Horario de atención: Lunes a Viernes, 9am - 6pm</p>
            </div>
          </div>
        </div>
      </section>
      <section className="view">
        <div className="comunity">
              <h2>¡Únete a nuestra comunidad!</h2>
              <p>Síguenos en nuestras redes sociales.</p>
              <a href="https://www.facebook.com/profile.php?id=61553047905206" className="btn btn-info" target="_blank" rel="noopener noreferrer">Facebook</a>
              <a href="https://www.instagram.com/ticoplunge?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" className="btn btn-info" target="_blank" rel="noopener noreferrer">Instagram</a>
        </div>
      </section>
      <footer>
        <div className="container">
          <p>&copy;Tico Plunge</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
