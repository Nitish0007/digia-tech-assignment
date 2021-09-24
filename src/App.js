import React, { useState } from "react";

import "./App.css";
import Body from "./Components/Body/Body";
import Navbar from "./Components/Navbar/Navbar";

function App() {
  const [searchedData, setSearchedData] = useState([]);
  const searchDataHandler = async (keyword) => {
    const response = await fetch(
      `https://newsapi.org/v2/everything?q=${keyword}&apiKey=a3ddae7573ad43e292472c388c8af9c6`
    );
    const searchResult = await response.json();
    setSearchedData(searchResult.articles);
  };
  return (
    <div className="App">
      <Navbar searched={searchDataHandler} />
      <Body searchedData={searchedData} />
    </div>
  );
}

export default App;
