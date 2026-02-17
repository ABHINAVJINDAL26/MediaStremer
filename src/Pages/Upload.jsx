import React, { useState } from "react";
import styles from "./Page.module.css";

const Upload = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    file: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      file: e.target.files[0],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Upload data:", formData);
    alert("Video upload functionality coming soon!");
  };

  return (
    <div className={styles.page}>
      <h2 className={styles.title}>Upload Video</h2>
      <form
        onSubmit={handleSubmit}
        style={{
          maxWidth: "500px",
          backgroundColor: "#1f1f1f",
          padding: "20px",
          borderRadius: "8px",
        }}
      >
        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", marginBottom: "8px" }}>
            Video Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="Enter video title"
            style={{
              width: "100%",
              padding: "10px",
              backgroundColor: "#262626",
              color: "#fff",
              border: "1px solid #404040",
              borderRadius: "4px",
              boxSizing: "border-box",
            }}
            required
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", marginBottom: "8px" }}>
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Enter video description"
            rows="5"
            style={{
              width: "100%",
              padding: "10px",
              backgroundColor: "#262626",
              color: "#fff",
              border: "1px solid #404040",
              borderRadius: "4px",
              boxSizing: "border-box",
              fontFamily: "inherit",
            }}
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", marginBottom: "8px" }}>
            Select Video File
          </label>
          <input
            type="file"
            onChange={handleFileChange}
            accept="video/*"
            style={{
              width: "100%",
              padding: "10px",
              backgroundColor: "#262626",
              color: "#fff",
              border: "1px solid #404040",
              borderRadius: "4px",
            }}
            required
          />
        </div>

        <button
          type="submit"
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
            transition: "background-color 0.3s ease",
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#aa0000")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "#cc0000")}
        >
          Upload Video
        </button>
      </form>
    </div>
  );
};

export default Upload;
