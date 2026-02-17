import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Sidebar.module.css";

const SideBar = () => {
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    { icon: "🏠", label: "Home", path: "/" },
    { icon: "🔥", label: "Trending", path: "/?category=trending" },
    { icon: "⬆️", label: "Upload", path: "/upload" },
    { icon: "👤", label: "Profile", path: "/profile" },
  ];

  return (
    <div className={`${styles.sidebar} ${isCollapsed ? styles.collapsed : ""}`}>
      <button
        className={styles.toggleBtn}
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        ☰
      </button>

      <div className={styles.logo}>
        {!isCollapsed && <span>YtClone</span>}
      </div>

      <nav className={styles.navigation}>
        {menuItems.map((item) => (
          <button
            key={item.path}
            className={styles.navItem}
            onClick={() => navigate(item.path)}
            title={item.label}
          >
            <span className={styles.icon}>{item.icon}</span>
            {!isCollapsed && <span className={styles.label}>{item.label}</span>}
          </button>
        ))}
      </nav>

      <div className={styles.footer}>
        {!isCollapsed && (
          <p>© 2024 YtClone<br />All rights reserved</p>
        )}
      </div>
    </div>
  );
};

export default SideBar;
