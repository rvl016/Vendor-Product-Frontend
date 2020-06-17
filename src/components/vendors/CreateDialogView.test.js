import React from 'react';
import { render } from '@testing-library/react';
import MyView from './MyView';

test( 'renders thing', () => {
  const { getByText } = render( <MyView />);
  const element = getByText( /regex/i);
  expect( element).toBeInTheDocument();
});

