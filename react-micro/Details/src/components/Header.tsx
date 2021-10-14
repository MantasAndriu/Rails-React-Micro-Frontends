import React from 'react'
import '../styles/Header.css';

const Header = ({attributes, reviews, average, ...props}) => {
  const { image_url, name } = attributes

  return (
    <div className="wrapper">
      <h1><img src={image_url} height="50" width="50" alt={name} /> {name}</h1>
      <div>
        <div className="userReviewCount">
          <span>{reviews ? reviews.length : 0}</span> user reviews
        </div>
        <div>{average}</div>
        <div className="scoreOutOf">{average.toFixed(1)} out of 5 stars</div>       
      </div>
    </div> 
  )
}

export default Header