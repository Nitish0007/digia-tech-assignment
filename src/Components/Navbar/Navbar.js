import React, { useState } from "react";

import "./Navbar.css";

function Navbar(props) {
  const [keyword, setKeyword] = useState("");

  const searchNews = async () => {
    if (!keyword.trim()) return;
    props.searched(keyword);
    setKeyword("");
  };

  return (
    <div className="navbar">
      <h2>News Portal</h2>
      <div className="navbar_search">
        <input
          type="search"
          placeholder="search..."
          onChange={(e) => {
            setKeyword(e.target.value);
          }}
        />
        <button onClick={searchNews}>Search</button>
      </div>
    </div>
  );
}

export default Navbar;
