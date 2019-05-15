import React from 'react';
import axios from 'axios';
import Listings from './Listings.jsx';
import Title from './Title.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listings: [],
      cities: []
    }
  }

  getListings = async (city) => {
    const { data } = await axios.get('/api/listings', { params: { city } });
    this.setState({ listings: data });
  };

  /* Retrieves all the unique cities in our database,
  which are used to populate our Autosuggest list. */
  getCities = async () => {
    const { data } = await axios.get('/api/cities');
    this.setState({ cities: data });
  }

  componentDidMount() {
    this.getCities();
  }

  render() {
    return (
      <div>
        <Title getListings={this.getListings} cities={this.state.cities}/>
        <Listings listings={this.state.listings}/>
      </div>
    )
  };
}

export default App;