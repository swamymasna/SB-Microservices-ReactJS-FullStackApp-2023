import React from "react";

const HeaderComponent = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-dark ">
        <a
          className="navbar-brand text-white"
          style={{ marginLeft: 20, fontSize: 27 }}
          href="/"
        >
          Employee Management System
        </a>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a
                className="nav-link text-white"
                style={{ fontSize: 23 }}
                href="/employees"
              >
                Employees
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link text-white"
                style={{ fontSize: 23 }}
                href="/departments"
              >
                Departments
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link text-white"
                style={{ fontSize: 23 }}
                href="/organizations"
              >
                Organizations
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default HeaderComponent;
