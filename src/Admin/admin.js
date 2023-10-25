import React, { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

import Admin_TopBar from "./_layout/Admin_TopBar";
import Admin_Sidebar from "./_layout/Admin_Sidebar";

const AdminPanel = (props) => {

  const [toggleMenu, setToggleMenu] = useState(false)

// -- logOut --------------------
  function logOut() {
    localStorage.removeItem("token");
    Navigate('/')
  }
// -- menu toggle --------------------
  function menuClick(e) {
    e.preventDefault();
    setToggleMenu(!toggleMenu);
  }



  return (
    <>
      <Admin_TopBar onClickLogOut={logOut} onClickToggleMenu={menuClick} username={props.username} />
      <div className={`admin-main ${toggleMenu ? 'collapsed' : ''}`}>
        <Admin_Sidebar />
        <div className="admin-wrapper">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default AdminPanel;
