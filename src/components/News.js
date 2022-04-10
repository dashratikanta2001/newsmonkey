import React, { useEffect,useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";
// let originalapi = "2256ad5e5f244b52a3630a37c3b7b837"
// let 2nd api key = "6491759904354a60a913e5929818df26"
let i=1
const News =(props)=> {

    const [articles, setarticles] = useState([])
    const [loading, setloading] = useState(true)
    const [page, setpage] = useState(1)
    const [totalResults, settotalResults] = useState(0)
    
    
    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const updateNews = async()=> {
        props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
        setloading(true)
        let data = await fetch(url);
        props.setProgress(30);
        let parsedata = await data.json()
        props.setProgress(70);
        setarticles(parsedata.articles)
        settotalResults(parsedata.totalResults)
        setloading(false)
        props.setProgress(100);
    }
    useEffect(() => {
        document.title = `${capitalizeFirstLetter(props.category)} - NewsMonkey`;
        updateNews();
        //  eslint-disable-next-line
    }, [])
    
    const fetchMoreData = async () => {
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
        setpage(page + 1)
        setloading(true)
        let data = await fetch(url);
        let parsedata = await data.json()
        setarticles(articles.concat(parsedata.articles))
        settotalResults(parsedata.totalResults)
        setloading(false)
    };
    
        return (
            <>
                <h1 className='text-center' style={{ marginTop: "70px" , backgroundColor:props.mode==='dark'?'#202124':'white', color:props.mode==='dark'?'white':'black' }}>NewsMonkey - Top {capitalizeFirstLetter(props.category)} Headlines</h1>
                {loading && <Spinner />}
                <InfiniteScroll
                    dataLength={articles.length}
                    next={fetchMoreData}
                    hasMore={articles.length !== totalResults }
                    loader={loading && <Spinner />}
                >
                    <div className="container" style={{backgroundColor : props.mode==='dark'?'#202124':'white', color:props.mode==='dark'?'white':'black'}}>
                        <div className="row">
                            {articles.map((element) => {
                                return <div key={`${element.url}${i= i+1}`} className="col-md-3" >
                                    <NewsItem mode={props.mode} title={element.title ? element.title : ""} description={element.description ? element.description : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                                </div>
                            })}
                        </div>
                    </div>
                </InfiniteScroll>
                {/* <div className="container d-flex justify-content-between">
                    <button disabled={page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
                    <button disabled={page + 1 > Math.ceil(totalResults / props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
                </div> */}
            </>
        )
}

News.defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'general'
}

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
}

export default News