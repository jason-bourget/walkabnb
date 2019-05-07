import React from 'react';

const Listing = ({ listing }) => {
  const { title, url, walkscore, size, reviews, rating, image } = listing;
  return (
    <div>
      <img src={ image } alt="Smiley face" height="42" width="42"/>
      <div>{title}</div>
      <div>$99/night</div>
      <div>Link: {url}</div>
      <div>Walk score: {walkscore}</div>
      <div>Reviews: {reviews}</div>
      <div>Rating: {rating}</div>
    </div>
  )
}

export default Listing;