import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.scss';
import  PasswordField  from "./password";

function Login() {
  const [isEntering, setIsEntering] = useState(false);
  const navigate = useNavigate();

  const handleEnter = () => {
    setIsEntering(true);
    setTimeout(() => {
      navigate('/main');
    }, 1000);
  };

  return (
    <section className="hero is-primary is-fullheight">
      <div className="hero-body">
        <div className="container">
          <div className={`columns is-centered ${isEntering ? 'is-hidden' : ''}`}>
            <div className="column is-5-tablet is-4-desktop is-3-widescreen">
              <div className="card has-text-centered">
               
                <PasswordField/>
              
                <button 
                  onClick={handleEnter} 
                  className="button is-primary is-small is-width"
                >
                  login
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login; 