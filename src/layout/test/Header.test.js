import {render, screen} from '@testing-library/react';
import Header from '../Header';
import React from 'react';

describe('Header Component', ()=> {
  test('it should render Header', ()=> {
    render(<Header />);
    const header = screen.getByRole('img');
    expect(header).toHaveAttribute('src', '/HelloFreshLogo.png');
    expect(header).toHaveAttribute('alt', 'HelloFresh Logo');
  })

  test('it should match snapshot', () => {
    expect(render(<Header />)).toMatchSnapshot();
  })
})
