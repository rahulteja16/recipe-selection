import {render, screen} from '@testing-library/react';
import Footer from '../Footer';
import React from 'react';

describe('Footer Component', ()=> {
  test('it should render footer', ()=> {
    render(<Footer />);
    expect(screen.getByText(/HelloFresh/i)).toBeDefined()
  })

  test('it should match snapshot', () => {
    expect(render(<Footer />)).toMatchSnapshot();
  })
})
