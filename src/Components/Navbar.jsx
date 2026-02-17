import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";

function Navbar() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/?search=${searchQuery}`);
      setSearchQuery("");
    }
  };

  return (
    <div className={styles.navbar}>
      <div className={styles.logo}>
        <h1>📺 YtClone</h1>
      </div>

      <form className={styles.searchContainer} onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search videos..."
          className={styles.searchInput}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit" className={styles.searchBtn}>
          🔍
        </button>
      </form>

      <div className={styles.userMenu}>
        <button className={styles.uploadBtn} onClick={() => navigate("/upload")}>
          ⬆️ Upload
        </button>
        <button className={styles.profileBtn} onClick={() => navigate("/profile")}>
          👤
        </button>
      </div>
    </div>
  );
}

export default Navbar;