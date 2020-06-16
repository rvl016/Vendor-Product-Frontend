import React from 'react';
import { render } from '@testing-library/react';
import HomeView from './HomeView';

test( 'renders thing', () => {
  const { getByText } = render( <HomeView />);
  const element = getByText( /regex/i);
  expect( element).toBeInTheDocument();
});

