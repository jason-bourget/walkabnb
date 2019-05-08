import React from 'react';
import Listing from './Listing.jsx';
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile';

const Listings = ({ listings }) => {
  return (
    <GridList cols={3} cellHeight={550} style={{position: 'absolute', top: '75px'}}>
      {listings.map((listing, index) => {
        return (
          <GridListTile key={index}>
            <Listing listing={listing} key={index}/>
          </GridListTile>
        )
      })}
    </GridList>
  );
};

export default Listings;