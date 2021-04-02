import React from "react";
import "./NavAdmin.scss";
import { Link } from "react-router-dom";
export default function NavBarAdmin() {
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
          id="navbarDropdown"
          role="button"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
          href='#navDropDown'
        >
          Welcome back! {JSON.parse(localStorage.getItem("UserAdmin")).taiKhoan}
        </a>
        <div className="dropdown-menu" aria-labelledby="navbarDropdown" id='navDropDown'>
          <Link to="/auth" className="dropdown-item">
            Đăng xuất
          </Link>
        </div>
      </div>
    </nav>
  );
}
