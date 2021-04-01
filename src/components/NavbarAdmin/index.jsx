import React, { useState, useEffect } from "react";
import "./NavAdmin.scss";
import { Link } from "react-router-dom";
export default function NavBarAdmin() {
  const user = JSON.parse(localStorage.getItem("UserAdmin")).taiKhoan;
  // let [countClick, setCountClick] = useState(1);
  // useEffect(() => {
  //   if (countClick % 2 === 0) {
  //     document.getElementById("sideBar").style.transform = "translateX(0)";
  //   } else {
  //     document.getElementById("sideBar").style.transform = "translateX(-100%)";
  //   }
  // }, [countClick]);
  return (
    <nav className="navbar navbar-expand-lg navbar-light " id="navBarAdmin">
      <div className="btnMenu">
        <div className="MenuLine"></div>
        <div className="MenuLine"></div>
        <div className="MenuLine"></div>
      </div>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <a
          className="nav-link dropdown-toggle p-0"
          href="#"
          id="navbarDropdown"
          role="button"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          Welcome back! {JSON.parse(localStorage.getItem("UserAdmin")).taiKhoan}
        </a>
        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
          <Link to="/auth" className="dropdown-item" href="#">
            Đăng xuất
          </Link>
        </div>
      </div>
    </nav>
  );
}
