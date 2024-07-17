import React from "react";

export default function Loginpage() {
  return (
    <>
    <div className="container-fluid" style={{ height: "100vh" }}>
      <div className="row no-gutter h-100">
        <div className="col-md-6 d-flex flex-column justify-content-center align-items-center">
          {/* <img src="LinkSphere.png" className="link-sphere-image" alt="Link Sphere" /> */}
          <div className ="login-microsoft">
            <h4 className="login-text">login</h4>
            <button
              type="button"
              className="microsoft-button bg-hover-btn"
              onClick={() => (window.location.href = 'http://localhost:3000/login')}
            >
              <div className="d-flex align-items-center justify-content-center">
                <img src="https://cdn.kekastatic.net/login/v/M178_2024.06.15.1/images/logos/microsoft.svg" alt="Microsoft Logo" />
                <p className="microsoft-logo">Microsoft</p>
              </div>
            </button>
          </div>
        </div>

        <div className="col-md-6 d-flex flex-column justify-content-center align-items-center bg-image main-logo">
          <div className="white-log-setting">
            <img src="BilvantisWhiteLogo.png" className="bilvantis-white-logo" alt="Bilvantis White Logo" />
          </div>
          <img src="ConnectionLoginImage.png" className="connecting-logo h-75" alt="Connection Login" />
          <div className="background-image-text">
            <div className="application-text-div">
              <h1 className="application-text">
                Connect with every application
              </h1>
              <p className="custom-text">
                Everything you need in an easily customizable dashboard
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
    );
}
