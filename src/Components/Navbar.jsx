import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";

function Navbar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchHistory, setSearchHistory] = useState([]);
  const [filteredHistory, setFilteredHistory] = useState([]);
  const navigate = useNavigate();
  const searchRef = useRef(null);

  useEffect(() => {
    // Load search history on mount
    const history = JSON.parse(localStorage.getItem("searchHistory") || "[]");
    setSearchHistory(history);
  }, []);

  useEffect(() => {
    // Close suggestions when clicking outside
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    // Filter search history based on current query
    if (searchQuery.trim()) {
      const filtered = searchHistory.filter(item =>
        item.query.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 8);
      setFilteredHistory(filtered);
    } else {
      setFilteredHistory(searchHistory.slice(0, 8));
    }
  }, [searchQuery, searchHistory]);

  const saveToHistory = (query) => {
    const history = JSON.parse(localStorage.getItem("searchHistory") || "[]");
    const newEntry = {
      query: query.trim(),
      timestamp: new Date().toISOString()
    };
    
    // Check if query already exists
    const existingIndex = history.findIndex(item => item.query === query.trim());
    if (existingIndex > -1) {
      history.splice(existingIndex, 1);
    }
    
    // Add to beginning and limit to 50 entries
    history.unshift(newEntry);
    const limitedHistory = history.slice(0, 50);
    localStorage.setItem("searchHistory", JSON.stringify(limitedHistory));
    setSearchHistory(limitedHistory);
  };

  const handleSearch = (e, query = searchQuery) => {
    if (e) e.preventDefault();
    if (query.trim()) {
      saveToHistory(query);
      navigate(`/search?q=${encodeURIComponent(query)}`);
      setSearchQuery("");
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (query) => {
    setSearchQuery(query);
    handleSearch(null, query);
  };

  const handleInputFocus = () => {
    setShowSuggestions(true);
  };

  const handleRemoveHistoryItem = (e, index) => {
    e.stopPropagation();
    const updated = searchHistory.filter((_, i) => i !== index);
    localStorage.setItem("searchHistory", JSON.stringify(updated));
    setSearchHistory(updated);
  };

  return (
    <div className={styles.navbar}>
      <div className={styles.logo}>
        <h1>YtClone</h1>
      </div>

      <form className={styles.searchContainer} onSubmit={handleSearch} ref={searchRef}>
        <input
          type="text"
          placeholder="Search videos..."
          className={styles.searchInput}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={handleInputFocus}
        />
        <button type="submit" className={styles.searchBtn}>
          🔍
        </button>
        
        {showSuggestions && filteredHistory.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-zinc-900 border border-zinc-800 rounded-lg shadow-lg overflow-hidden z-50">
            {filteredHistory.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between px-4 py-3 hover:bg-zinc-800 cursor-pointer group"
                onClick={() => handleSuggestionClick(item.query)}
              >
                <div className="flex items-center gap-3 flex-1">
                  <svg className="w-4 h-4 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-sm text-white">{item.query}</span>
                </div>
                <button
                  onClick={(e) => handleRemoveHistoryItem(e, index)}
                  className="text-zinc-500 hover:text-red-500 opacity-0 group-hover:opacity-100 transition p-1"
                  title="Remove"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        )}
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