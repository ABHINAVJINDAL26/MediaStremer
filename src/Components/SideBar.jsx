import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Home,
  Clapperboard,
  Tv,
  History,
  ListVideo,
  Video,
  Clock4,
  ThumbsUp,
  Download,
  ChevronRight,
  Youtube,
} from "lucide-react";
import styles from "./Sidebar.module.css";

const SideBar = () => {
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const mainItems = [
    { label: "Home", path: "/", icon: Home, active: true },
    { label: "Shorts", path: "/", icon: Clapperboard },
    { label: "Subscriptions", path: "/", icon: Tv },
  ];

  const youItems = [
    { label: "History", path: "/watch-history", icon: History },
    { label: "Playlists", path: "/", icon: ListVideo },
    { label: "Your videos", path: "/", icon: Video },
    { label: "Watch later", path: "/", icon: Clock4 },
    { label: "Liked videos", path: "/", icon: ThumbsUp },
    { label: "Downloads", path: "/", icon: Download },
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
        {!isCollapsed && (
          <span className={styles.logoText}>
            <Youtube size={18} className={styles.logoIcon} />
            Watchly
          </span>
        )}
      </div>

      <nav className={styles.navigation}>
        <div className={styles.section}>
          {mainItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.label}
                className={`${styles.navItem} ${item.active ? styles.active : ""}`}
                onClick={() => navigate(item.path)}
                title={item.label}
              >
                <span className={styles.iconWrap}>
                  <Icon size={18} />
                </span>
                {!isCollapsed && <span className={styles.label}>{item.label}</span>}
              </button>
            );
          })}
        </div>

        <div className={styles.divider} />

        <div className={styles.sectionHeader}>
          {!isCollapsed && (
            <span className={styles.sectionTitle}>You</span>
          )}
          {!isCollapsed && <ChevronRight size={16} className={styles.sectionChevron} />}
        </div>
        <div className={styles.section}>
          {youItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.label}
                className={styles.navItem}
                onClick={() => navigate(item.path)}
                title={item.label}
              >
                <span className={styles.iconWrap}>
                  <Icon size={18} />
                </span>
                {!isCollapsed && <span className={styles.label}>{item.label}</span>}
              </button>
            );
          })}
        </div>
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
