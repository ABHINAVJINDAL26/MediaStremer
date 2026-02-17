import React from "react";
import styles from "./Page.module.css";

const Profile = () => {
  const user = {
    name: "John Doe",
    email: "john@example.com",
    subscribers: "10.5K",
    uploadedVideos: 42,
    avatar: "👤",
  };

  return (
    <div className={styles.page}>
      <h2 className={styles.title}>User Profile</h2>

      <div
        style={{
          maxWidth: "500px",
          backgroundColor: "#1f1f1f",
          padding: "30px",
          borderRadius: "8px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontSize: "80px",
            marginBottom: "20px",
          }}
        >
          {user.avatar}
        </div>

        <h3 style={{ margin: "0 0 8px 0", fontSize: "24px" }}>{user.name}</h3>
        <p style={{ margin: "0 0 20px 0", color: "#aaa" }}>{user.email}</p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "20px",
            marginBottom: "20px",
            padding: "20px 0",
            borderTop: "1px solid #303030",
            borderBottom: "1px solid #303030",
          }}
        >
          <div>
            <p style={{ margin: "0 0 8px 0", color: "#aaa", fontSize: "12px" }}>
              SUBSCRIBERS
            </p>
            <p style={{ margin: 0, fontSize: "20px", fontWeight: "600" }}>
              {user.subscribers}
            </p>
          </div>
          <div>
            <p style={{ margin: "0 0 8px 0", color: "#aaa", fontSize: "12px" }}>
              VIDEOS UPLOADED
            </p>
            <p style={{ margin: 0, fontSize: "20px", fontWeight: "600" }}>
              {user.uploadedVideos}
            </p>
          </div>
        </div>

        <button
          style={{
            width: "100%",
            padding: "12px",
            backgroundColor: "#cc0000",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "16px",
            fontWeight: "600",
            marginBottom: "10px",
            transition: "background-color 0.3s ease",
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#aa0000")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "#cc0000")}
        >
          Edit Profile
        </button>

        <button
          style={{
            width: "100%",
            padding: "12px",
            backgroundColor: "transparent",
            color: "#fff",
            border: "1px solid #303030",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "16px",
            fontWeight: "600",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#262626")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "transparent")}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
