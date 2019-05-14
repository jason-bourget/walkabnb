import React from 'react';
import App from '../src/components/App.jsx';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

test('renders correctly', () => {
  const component = renderer.create(
    <App/>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});