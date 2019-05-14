import React from 'react';
import Listing from '../src/components/Listing.jsx';
import Card from '@material-ui/core/Card';
import { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer';

const listing = {
  airbnbId: 13815789,
  city: "denver",
  coordinates: ["39.73175", "-104.94928"],
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
}

test('renders correctly', () => {
  const component = renderer.create(
    <Listing listing={listing}/>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

describe('Listing component', () => {

  it('should render the correct price', () => {
    const wrapper = mount(<Listing listing={listing}/>);
    expect(wrapper.containsMatchingElement(
      <div>$59/night</div>
    )).toBe(true);
  });

  it('should render the correct description', () => {
    const wrapper = mount(<Listing listing={listing}/>);
    expect(wrapper.containsMatchingElement(
      <span className="MuiTypography-root-41 MuiTypography-body2-49 MuiCardHeader-title-36">
        Cozy Craftsman Bungalow near City Center
      </span>
    )).toBe(true);
  });
});
