import React from 'react';
import App from './App';
import 'core-js/fn/symbol/iterator';
import 'core-js/es6/symbol';
import "core-js/es6/set";
import 'es6-symbol';


import renderer from 'react-test-renderer';

it('renders without crashing', () => {
  const rendered = renderer.create(<App />).toJSON();
  expect(rendered).toBeTruthy();
});
