import React from 'react';
import axios from 'axios';
import Search from './Search.jsx';
import Listings from './Listings.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listings: []
    }
    this.getListings = this.getListings.bind(this);
  }

  async getListings(city) {
    const { data } = await axios.get('/api/listings', { params: { city } });
    this.setState({ listings: data });
  };

  render() {
    return (
      <div>
        <Search getListings={this.getListings}/>
        <Listings listings={this.state.listings}/>
      </div>
    )
  };
}

export default App;