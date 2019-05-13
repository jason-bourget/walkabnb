import React from 'react';
import Listing from './Listing.jsx';
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile';
import logo from '../assets/logo.png';

const Listings = ({ listings }) => {
  if (listings.length > 0) {
    return (
      <GridList cols={3} cellHeight={500} style={{position: 'absolute', top: '75px'}}>
        {listings.map((listing, index) => {
          return (
            <GridListTile key={index}>
              <Listing listing={listing} key={index}/>
            </GridListTile>
          )
        })}
      </GridList>
    );
  }
  return (
    <img src={logo} alt='logo' height='200px' style={{margin: 'auto', display: 'block', position: 'relative', top: '100px'}}/>
  )
};

export default Listings;