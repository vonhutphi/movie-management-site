import React from "react";
import SideBarAdmin from '../../components/SidebarAdmin'
import NavBarAdmin from '../../components/NavbarAdmin'
import {Switch, Route } from "react-router-dom";
import QuanLyPhim from './QuanLyPhim'
import QuanLyNguoiDung from './QuanLyNguoiDung'

import { Redirect } from "react-router-dom";

function AdminLayout(props) {
  return (
    <div id='management'>
      <SideBarAdmin />
      {/* <NavBarAdmin /> */}
      {props.children}
    </div>
  );
}
export default function AdminTemplate({ Compnent, ...props }) {
  return (
    <Route
      {...props}
      render={(propsComponent) => {
        if (localStorage.getItem("UserAdmin")) {
          return (
            <AdminLayout>
              <Compnent {...propsComponent} />
            </AdminLayout>
          );
        }
        return <Redirect to='/auth'/>
      }}
    />
  );
}
