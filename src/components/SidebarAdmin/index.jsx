import React, { useState, useEffect } from "react";
import "./SidebarAdmin.scss";
import { NavLink } from "react-router-dom";
import "./SidebarAdmin.scss";
import "../NavbarAdmin/NavAdmin.scss";

import { Link } from "react-router-dom";
export default function SideBarAdmin() {
  let [count, setCount] = useState(1);
  useEffect(() => {
    if (count % 2 === 0) {
      document.getElementById("sideBarRes").style.transform = "translateX(0)";
    } else {
      document.getElementById("sideBarRes").style.transform =
        "translateX(-100%)";
    }
  }, [count]);
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light " id="navBarAdmin">
        <div
          className="btnMenu"
          onClick={() => {
            setCount((count += 1));
          }}
        >
          <div className="MenuLine"></div>
          <div className="MenuLine"></div>
          <div className="MenuLine"></div>
        </div>
        <div className="navBarRight row">
          <div className="rightIcon">
            <i className="fa fa-bell"></i>
            <i className="fa fa-cog"></i>
          </div>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <a
              className="nav-link  p-0"
              href='#navAdminDD'
              id="navbarDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              {JSON.parse(localStorage.getItem("UserAdmin")).taiKhoan}
            </a>
            <div className="dropdown-menu" aria-labelledby="navbarDropdown" id='navAdminDD'>
              <Link to="/auth" className="dropdown-item text-center" onClick={()=>{
                localStorage.clear()
              }}>
                Đăng xuất
              </Link>
            </div>
          </div>
        </div>
      </nav>
      <div id="sideBar" className="hiddenWhen">
        <div className="sideBarMain">
          <ul className="sideBarItem ">
            <li className="quanLyPhim">
              <NavLink  to="/quan-ly-phim" activeClassName="active">
                <i className="fa fa-film"></i>
                <p>Quản Lý Phim</p>
              </NavLink>
            </li>
            <li className="quanLyNguoiDung">
              <NavLink
                
                to="/quan-ly-nguoi-dung"
                activeClassName="active"
              >
                <i className="fa fa-user"></i>
                <p>Quản Lý Người Dùng</p>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
      <div id="sideBarRes" className="hiddenWhen">
        <div
          className="sideBarMain"
          onClick={() => {
            setCount((count += 1));
          }}
        >
          <div className="btnMenu ">
            <div className="MenuLine"></div>
            <div className="MenuLine"></div>
            <div className="MenuLine"></div>
          </div>
          <ul className="sideBarItem ">
            <li className="quanLyPhim">
              <NavLink  to="/quan-ly-phim" activeClassName="active">
                <i className="fa fa-film"></i>
                <p>Quản Lý Phim</p>
              </NavLink>
            </li>
            <li className="quanLyNguoiDung">
              <NavLink
                
                to="/quan-ly-nguoi-dung"
                activeClassName="active"
              >
                <i className="fa fa-user"></i>
                <p>Quản Lý Người Dùng</p>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
