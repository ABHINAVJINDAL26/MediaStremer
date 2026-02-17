import React from "react";
import Navbar from "./Navbar";
import SideBar from "./SideBar";
import styles from "./Layout.module.css";

const Layout = ({ children }) => {
  return (
    <div className={styles.container}>
      <Navbar />
      <div className={styles.mainContent}>
        <SideBar />
        <div className={styles.contentArea}>{children}</div>
      </div>
    </div>
  );
};

export default Layout;
