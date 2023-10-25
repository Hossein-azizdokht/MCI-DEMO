import React from "react";
import { Link } from "react-router-dom";
import AdminLogoImg from "../../assets/images/admin-logo.png";
import { RiDashboardLine, RiOrganizationChart } from "react-icons/ri";
import { Group, Settings } from "@material-ui/icons";

const Admin_Sidebar = (props) => {




  return (
    <ul className="admin-sidebar text-white pt-3">
      <li className="text-center pb-4">
        <img src={AdminLogoImg} alt="logo" width={100} />
      </li>
      <li>
        <Link to="/">
          <RiDashboardLine size={28} style={{ marginLeft: 10 }} />
          داشبورد
        </Link>
      </li>
      <li>
        <Link to="/">
          <Group size={28} style={{ marginLeft: 10 }} />
          کاربران
        </Link>
      </li>
      <li>
        <Link to="/">
          <RiOrganizationChart size={28} style={{ marginLeft: 10 }} />
          مدیریت دسترسی
        </Link>
      </li>
      <li>
        <Link to="/">
          <Settings size={28} style={{ marginLeft: 10 }} />
          تنظیمات
        </Link>
      </li>
    </ul>
  );
};

export default Admin_Sidebar;
