import React, { useEffect } from "react";
import { BiLogOutCircle } from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";
import { MdMenu } from "react-icons/md";



const Admin_TopBar = (props) => {



  return (
    <div className="admin-topbar">
      <a href="" onClick={props.onClickToggleMenu} style={{ width: "40px" }}>
        <MdMenu />
      </a>
      <span style={{ flexGrow: "1" }}>
        <FaUserCircle style={{ marginLeft: "0.5rem", opacity: "0.7" }} />
        کاربر حسین خوش آمدید
      </span>
      <a href="" onClick={props.onClickLogOut} className="left">
        <BiLogOutCircle />
        خروج از سیستم
      </a>
    </div>
  );
};

export default Admin_TopBar;
