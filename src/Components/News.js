import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export default function News(props) {
  const capitalize = (word) => {
    const lower = word.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  };

  const [articles, setarticles] = useState([]);
  const [loading, setloading] = useState(false);
  const [page, setpage] = useState(1);
  const [totalResults, settotalResults] = useState(0);

  const NewsUpdate = async () => {
    props.setProgress(10);
    setloading(true);
    const url = `https://newsapi.org/v2/top-headlines?country=us&category=${props.category}&apiKey=c2ce35353b6444cbbb82cbac5ad80e8f&page=${page}&pagesize=${props.pageSize}`;
    let data = await fetch(url);
    props.setProgress(30);
    let parseData = await data.json();
    props.setProgress(70);
    setarticles(parseData.articles);
    settotalResults(parseData.totalResults);
    setloading(false);
    props.setProgress(100);
  };

  useEffect(() => {
    NewsUpdate();
    document.title = `NewsMonkey - ${capitalize(props.category)}`;
    // eslint-disable-next-line
  }, []);

  const fetchMoreData = async (e) => {
    setpage(page + 1);
    setTimeout(async () => {
      const url = `https://newsapi.org/v2/top-headlines?country=us&category=${props.category}&apiKey=c2ce35353b6444cbbb82cbac5ad80e8f&page=${page}&pagesize=${props.pageSize}`;
      let data = await fetch(url);
      let parseData = await data.json();
      setarticles(articles.concat(parseData.articles));
      settotalResults(parseData.totalResults);
    }, 800);
  };

  return (
    <React.Fragment>
      <h1
        noScroll={fetchMoreData}
        className="text-center"
        style={{ margin: "50px 0", marginTop: "100px" }}
      >
        NewsMonekey - Top {capitalize(props.category)} Headlines
      </h1>
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={articles.length !== totalResults ? <Spinner /> : ""}
      >
        <div className="container">
          {loading && <Spinner />}
          <div className="row">
            {!loading &&
              articles.map((element, index) => {
                return (
                  <div key={index} className="col-md-4 my-3">
                    <NewsItem
                      myTitle={element.title}
                      mydesc={element.description}
                      ImgUrl={element.urlToImage}
                      NewsUrl={element.url}
                      author={!element.author ? "Unknown" : element.author}
                      date={element.publishedAt}
                      source={element.source.name}
                    />
                  </div>
                );
              })}
          </div>
        </div>
      </InfiniteScroll>
    </React.Fragment>
  );
}

News.propTypes = {
  category: PropTypes.string,
  pageSize: PropTypes.number,
};
