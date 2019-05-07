import React from 'react';
import Listing from './Listing.jsx';

const Listings = ({ listings }) => {
  return (
    <div>
      { listings.map((listing, index) => <Listing listing={listing} key={index}/> )}
    </div>
  );
};

export default Listings;