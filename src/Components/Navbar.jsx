import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Mic, Upload, User, Youtube } from "lucide-react";
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
        <h1 className={styles.logoText}>
          <Youtube size={20} className={styles.logoIcon} />
          Watchly
        </h1>
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
        <button type="submit" className={styles.searchBtn} aria-label="Search">
          <Search size={18} />
        </button>
        <button type="button" className={styles.micBtn} aria-label="Voice search">
          <Mic size={18} />
        </button>
        
        {showSuggestions && (
          <div className={styles.suggestions}>
            <div className={styles.suggestionsHeader}>
              <span className={styles.suggestionsTitle}>Recent searches</span>
              {searchHistory.length > 0 && (
                <button
                  type="button"
                  onClick={() => {
                    localStorage.removeItem("searchHistory");
                    setSearchHistory([]);
                  }}
                  className={styles.clearAll}
                >
                  Clear all
                </button>
              )}
            </div>

            {filteredHistory.length === 0 ? (
              <div className={styles.emptyState}>No recent searches</div>
            ) : (
              <div className={styles.suggestionsList}>
                {filteredHistory.map((item, index) => (
                  <div
                    key={index}
                    className={styles.suggestionItem}
                    onClick={() => handleSuggestionClick(item.query)}
                  >
                    <div className={styles.suggestionLeft}>
                      <div className={styles.suggestionIcon}>
                        <svg className={styles.suggestionSvg} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div className={styles.suggestionText}>
                        <span className={styles.suggestionQuery}>{item.query}</span>
                        <span className={styles.suggestionTime}>
                          {new Date(item.timestamp).toLocaleString()}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={(e) => handleRemoveHistoryItem(e, index)}
                      className={styles.removeBtn}
                      title="Remove"
                    >
                      <svg className={styles.removeSvg} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </form>

      <div className={styles.userMenu}>
        <button className={styles.uploadBtn} onClick={() => navigate("/upload")}>
          <Upload size={16} />
          Create
        </button>
        <button className={styles.profileBtn} onClick={() => navigate("/profile")}>
          <User size={16} />
          Profile
        </button>
      </div>
    </div>
  );
}

export default Navbar;