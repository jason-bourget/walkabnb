import React from 'react';
import AutoSuggest from '../src/components/AutoSuggest.jsx';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

const cities = ['denver', 'boulder', 'santa fe']

test('renders correctly', () => {
  const component = renderer.create(
    <AutoSuggest cities={cities}/>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});