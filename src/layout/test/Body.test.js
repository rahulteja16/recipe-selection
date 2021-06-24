import {render, screen} from '@testing-library/react';
import Body from '../Body';
import React from 'react';

describe('Body Component', ()=> {

  test('it should match snapshot', () => {
    expect(render(<Body />)).toMatchSnapshot();
  })
})
