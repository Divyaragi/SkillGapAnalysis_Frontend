import React from "react";
import "./loginPage.css";
import { loginTextSamples } from "../../utils/constants";

function LoginPage() {
  return (
    <>
      <div className="login-main-container" >
        <div className="background-login-logo-container">
          <div className="background-login-logo">
            <img src={loginTextSamples.BILVANTIS_LOGO_IMAGE} alt={loginTextSamples.BILVANTIS_LOGO_ALT} className="bilvantis-logo mt-2" />
          </div>
        </div>
        <div className="d-flex flex-column align-items-center justify-content-center login-container">
          <div className="login-microsoft-card">
            <h1 className="login-text">{loginTextSamples.LOGIN}</h1>
            <div class="d-flex align-items-center w-100 mt-30 mb-10">
              <div class="line"></div>
              <p class="text-small text-secondary px-3">{loginTextSamples.LOGIN_WITH}</p>
              <div class="line"></div>
            </div>
            <button
              type="button"
              className="microsoft-button bg-hover-btn"
              onClick={() => (window.location.href = 'http://localhost:3000/authlogin/login')}
            >
              <div className="d-flex align-items-center justify-content-center">
                <img src={loginTextSamples.MICROSOFT_IMAGE} alt={loginTextSamples.MICROSOFT_ALT} />
                <p className="microsoft-logo">{loginTextSamples.MICROSOFT_TEXT}</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
