import React from 'react';
import Listing from './Listing.jsx';
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile';
import logo from '../assets/logo.png';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';

const Listings = (props) => {

  const getGridListCols = () => {
    if (isWidthUp('xl', props.width)) {
      return 4;
    }
    if (isWidthUp('lg', props.width)) {
      return 3;
    }
    if (isWidthUp('md', props.width)) {
      return 2;
    }
    return 1;
  }

  /* Each listing is represented by a GridListTile,
  which the GridList comprises. */
  if (props.listings.length > 0) {
    return (
      <GridList cols={getGridListCols()} cellHeight='auto' style={{position: 'absolute', top: '75px'}}>
        {props.listings.map((listing, index) => {
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

export default withWidth()(Listings);