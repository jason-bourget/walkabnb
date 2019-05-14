import React from 'react';
import Listings from '../src/components/Listings.jsx';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

const listings = [
  {
    airbnbId: 13815789,
    city: "denver",
    coordinates: (2) ["39.73175", "-104.94928"],
    createdAt: "2019-05-11T03:34:58.241Z",
    id: 54,
    image: "https://a0.muscache.com/im/pictures/7ca1d55d-9f8a-47f1-9819-b4970df3825e.jpg",
    price: 59,
    rating: "5",
    reviews: 272,
    size: ["6 guests", "3 bedrooms", "5 beds", "1 bath"],
    title: "Cozy Craftsman Bungalow near City Center",
    updatedAt: "2019-05-11T03:34:58.241Z",
    url: "https://www.airbnb.com/rooms/13815789",
    walkscore: 70
  },
  {
    airbnbId: 6883917,
    city: "denver",
    coordinates: (2) ["39.71935", "-105.0365"],
    createdAt: "2019-05-11T03:34:58.241Z",
    id: 53,
    image: "https://a0.muscache.com/im/pictures/87153622/85341615_original.jpg",
    price: 43,
    rating: "5",
    reviews: 239,
    size: ["2 guests", "1 bedroom", "1 bed", "1 private bath"],
    title: "Private room, private bathroom and great backyard!",
    updatedAt: "2019-05-11T03:34:58.241Z",
    url: "https://www.airbnb.com/rooms/6883917",
    walkscore: 68
  }
]

test('renders correctly', () => {
  const component = renderer.create(
    <Listings listings={listings}/>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

describe('Listings component', () => {
  it('should render a Card component', () => {
    const wrapper = shallow(<Listings listings={listings}/>);
    expect(wrapper.children()).toHaveLength(2);
  })
})
