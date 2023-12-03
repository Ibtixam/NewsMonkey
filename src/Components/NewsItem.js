import React from "react";

const NewsItem = (props) => {
  let { myTitle, mydesc, ImgUrl, NewsUrl, author, date, source } = props;
  return (
    <div className="card" id="news-card" style={{ width: "21rem" }}>
      <span className="position-absolute top-0 start-50 translate-middle badge rounded-pill bg-danger">
        {source}
      </span>
      <img
        src={
          !ImgUrl
            ? "https://img.freepik.com/premium-photo/businessman-using-tech-devices-icons-thin-line-interface_117023-904.jpg?w=2000"
            : ImgUrl
        }
        className="card-img-top"
        alt="..."
      />
      <div className="card-body">
        <h5 className="card-title">{myTitle}</h5>
        <p className="card-text">{mydesc}</p>
        <p className="card-text">
          <small className="text-body-secondary">
            BY {author} on {new Date(date).toUTCString()}
          </small>
        </p>
        <a
          href={NewsUrl}
          rel="noreferrer"
          target="_blank"
          className="btn btn-primary btn-sm"
        >
          Read More
        </a>
      </div>
    </div>
  );
};

export default NewsItem;
