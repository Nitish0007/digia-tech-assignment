import React, { useState } from "react";

import "./Card.css";

function Card(props) {
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
          {props?.data?.description?.length > 60
            ? props.data.description.slice(0, 60)
            : props?.data?.description}
          <span style={{ color: "grey", cursor: "pointer" }}> more...</span>
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
        {/* <Link to={props?.data?.url}>Go to Source</Link> */}
        <p
          style={{
            textAlign: "right",
            fontSize: "14px",
            color: "grey",
            padding: "5px",
          }}
        >
          2021-09-24T01:22:24.9297636Z
        </p>
      </div>
    </div>
  );
}

export default Card;
