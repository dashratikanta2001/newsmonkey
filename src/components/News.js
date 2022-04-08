import React, { Component } from 'react'
import NewsItem from './NewsItem'

export class News extends Component {
    
    constructor() {
        super();
        this.state = {
            articles: [],
            loading: false
        }
    }
    async componentDidMount(){
        let url = "https://newsapi.org/v2/top-headlines?country=in&apiKey=2256ad5e5f244b52a3630a37c3b7b837";
        let data = await fetch(url);
        let parsedata = await data.json()
        console.log(parsedata);
        this.setState({articles:parsedata.articles})
    }
    render() {
        return (
            <div className="container my-3">
                <h1>NewsMonkey - Top Headlines</h1>
                <div className="row">
                    {this.state.articles.map((element) => {
                        return <div key={element.url} className="col-md-4">
                            <NewsItem  title={element.title?element.title:""} description={element.description?element.description:""} imageUrl={element.urlToImage} newsUrl={element.url} />
                        </div>
                    })}
                </div>

            </div>
        )
    }
}

export default News