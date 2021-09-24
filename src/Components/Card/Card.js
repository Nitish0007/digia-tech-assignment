import React, { useState } from "react";
import moment from "moment";

import "./Card.css";

function Card(props) {
  console.log(props.data);
  const [showMore, setShowMore] = useState(false);
  return (
    <div className="card">
      {props?.data?.urlToImage ? (
        <img src={props?.data?.urlToImage} height="150px" width="300px"></img>
      ) : (
        ""
      )}
      <div
        className={!props?.data?.urlToImage ? "upper-border" : "card-content"}
      >
        <p className="card_title">{props?.data?.title}</p>
        <p className="card_content_desc">
          {!showMore
            ? props.data.description.slice(0, 60)
            : props?.data?.description}
          <span
            style={{ color: "grey", cursor: "pointer" }}
            onClick={() => setShowMore(!showMore)}
          >
            {showMore ? "  less" : " ...more"}
          </span>
        </p>
        <p
          style={{
            fontWeight: "bold",
            fontSize: "16px",
            color: "rgb(1, 100, 124)",
            textAlign: "right",
            paddingRight: "5px",
          }}
        >
          -{props?.data?.author ? props.data.author : "Author"}
        </p>
        <p
          onClick={() => window.open(`${props?.data?.url}`, "_blank")}
          style={{
            cursor: "pointer",
            fontSize: "16px",
            color: "rgb(1, 100, 124)",
            textAlign: "right",
            padding: "5px",
          }}
        >
          Go to Source
        </p>
        <p
          style={{
            textAlign: "right",
            fontSize: "14px",
            color: "grey",
            padding: "5px",
          }}
        >
          {moment.utc(props?.data?.publishedAt).toDate().toUTCString()}
        </p>
      </div>
    </div>
  );
}

export default Card;
