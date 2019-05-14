import React from 'react';
import Title from '../src/components/Title.jsx';
import renderer from 'react-test-renderer';

test('renders correctly', () => {
  const component = renderer.create(
    <Title/>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});