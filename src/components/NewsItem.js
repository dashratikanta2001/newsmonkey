import React from 'react'

const NewsItem =(props)=> {
        let { title, description, imageUrl, newsUrl, author, date,source} = props;
        return (
            <div className="my-3">
                <div className="card" style={{backgroundColor : props.mode==='dark'?'#202124':'white', color:props.mode==='dark'?'white':'black', border:props.mode==='dark'? '1px solid #737373':''}}>
                    <div style={{display:"flex", justifyContent:"flex-end", position:"absolute",right:"0"}}>
                        <span className="badge rounded-pill bg-danger" style={{left:"80%", zIndex:"1"}}>
                            {source}
                        </span>
                    </div>
                    <img src={imageUrl ? imageUrl : "https://www.niddk.nih.gov/-/media/Images/Components/Default-Social-Media-Images/News-Card.png"} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{description}</p>
                        <p className="card-text"><small className={`text-${{color:props.mode==='dark'?'':'muted'}}`} style={{color:props.mode==='dark'?'#e6e6e6':''}}>By {author ? author : "Unknown"} on {new Date(date).toGMTString()} </small></p>
                        <a href={newsUrl} target="_blank" rel="noreferrer" className={`btn btn-sm btn-${props.mode==='dark'?'light':'dark'}`}>Read More</a>
                    </div>
                </div>
            </div>
        )
}

export default NewsItem