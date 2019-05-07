import React from 'react';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({city: event.target.value})
  };

  handleSubmit(event) {
    this.props.getListings(this.state.city);
    this.setState({ city: '' });
    event.preventDefault();
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
      <label>
        Search:
        <input type="text" placeholder="Search for a city" value={this.state.city} onChange={this.handleChange} />
      </label>
      <input type="submit" value="Submit" />
    </form>
    )
  }

}

export default Search;