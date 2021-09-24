import React, { useEffect, useState } from "react";

import Card from "../Card/Card";

import "./Body.css";

const filterNames = [
  {
    name: "Business",
    value: "business",
  },
  {
    name: "Health",
    value: "health",
  },
  {
    name: "Entertainment",
    value: "entertainment",
  },
  {
    name: "Technology",
    value: "technology",
  },
  {
    name: "Science",
    value: "science",
  },
  {
    name: "Sports",
    value: "sports",
  },
];

function Body(props) {
  const [fetched, setFetched] = useState(false);
  const [error, setError] = useState("");
  const [news, setNews] = useState([]);
  const [filter, setFilter] = useState({
    business: false,
    health: false,
    entertainment: false,
    technology: false,
    science: false,
    sports: false,
  });
  const [allNews, setAllNews] = useState([]);

  const clearFilter = () => {
    setFilter({
      business: false,
      health: false,
      entertainment: false,
      technology: false,
      science: false,
      sports: false,
    });
    setNews(allNews);
  };

  const getFilteredNews = async () => {
    const appliedFilter = Object.keys(filter)
      .filter((item) => filter[item])
      .map((item) => item);

    if (appliedFilter.length === 0) return;

    setFetched(false);
    const response = await fetch(
      `https://newsapi.org/v2/everything?q=${appliedFilter.join(
        " And "
      )}&apiKey=a3ddae7573ad43e292472c388c8af9c6`
    );
    const result = await response.json();
    if (result.status !== "ok") {
      setError("Failed to fetch data!!!");
    }

    setFetched(true);
    setNews(result.articles);
  };

  const getNews = async () => {
    const topHeadlines = await fetch(
      "https://newsapi.org/v2/top-headlines?country=in&apiKey=a3ddae7573ad43e292472c388c8af9c6"
    );
    const response = await topHeadlines.json();
    if (response.status !== "ok") {
      setError("Failed to fetch data!!!");
    }

    setFetched(true);
    setNews(response.articles);
    setAllNews(response.articles);
  };

  useEffect(() => {
    getNews();
  }, []);

  useEffect(() => {
    if (props.searchedData && props?.searchedData?.length > 0) {
      setNews(props.searchedData);
    } else {
      setNews(allNews);
    }
  }, [props.searchedData]);

  return error === "" ? (
    fetched ? (
      <div className="body">
        <h2 style={{ borderBottom: "3px solid rgb(1, 100, 124)" }}>Top News</h2>
        <div className="body_main">
          <div className="body_main_news">
            {news?.map((item) => (
              <Card
                data={item}
                key={Math.random() * 30 + Date.now()}
                readMore={false}
              />
            ))}
          </div>
          <div className="body_main_filter">
            <div className="body_main_filter-top">
              <p style={{ fontSize: "20px", fontWeight: "medium" }}>
                Apply Filter
              </p>
              <p
                style={{
                  color: "rgb(1, 100, 124)",
                  fontSize: "16px",
                  cursor: "pointer",
                }}
                onClick={clearFilter}
              >
                Clear Filter
              </p>
            </div>
            <div className="body_main_filter-body">
              {filterNames.map((item, i) => (
                <div className="checkbox-container" key={i}>
                  <input
                    checked={filter[item.value]}
                    type="checkbox"
                    onChange={(e) =>
                      setFilter({ ...filter, [item.value]: e.target.checked })
                    }
                  />
                  <p>{item.name}</p>
                </div>
              ))}
              <button onClick={getFilteredNews}>Apply</button>
            </div>
          </div>
        </div>
      </div>
    ) : (
      <h2>Loading...</h2>
    )
  ) : (
    <p
      style={{
        fontSize: "26px",
        fontWeight: "bold",
        color: "red",
        width: "100px",
      }}
    >
      {error}
    </p>
  );
}

export default Body;
