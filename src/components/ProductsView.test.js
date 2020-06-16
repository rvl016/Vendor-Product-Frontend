import React from 'react';
import { render } from '@testing-library/react';
import LocationView from './LocationView';

test( 'renders thing', () => {
  const { getByText } = render( <LocationView />);
  const element = getByText( /regex/i);
  expect( element).toBeInTheDocument();
});

