import React from 'react';
import axios from 'axios';
import Listings from './Listings.jsx';
import Title from './Title.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listings: []
    }
  }

  getListings = async (city) => {
    const { data } = await axios.get('/api/listings', { params: { city } });
    this.setState({ listings: data });
  };

  render() {
    return (
      <div>
        <Title getListings={this.getListings}/>
        <Listings listings={this.state.listings}/>
      </div>
    )
  };
}

export default App;