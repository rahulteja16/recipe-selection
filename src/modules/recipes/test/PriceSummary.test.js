import { render, screen } from'@testing-library/react';
import "@testing-library/jest-dom/extend-expect";

import PriceSummary from '../PriceSummary';
import React from 'react';

const props = {
  summary: [
    {id: "5f4d4a7e62fb0224951e7ec4", name: "Chicken Sausage & Spinach Ravioli", amount: 1798, qty: 1},
    {id: "5f4d4aa9f4508b34e9680613", name: "Gouda Vibes Burgers", amount: 1798, qty: 1},
    {id: "5f4d4acdab96be0cd6073022", name: "Figgy Balsamic Pork", amount: 1798, qty: 1}
  ],
  totalPrice: '$66.92',
  shippingPrice: '$12.98',
}

describe('Price Summary Component', ()=> {
  test('it renders the recipe item div',  () =>  {
      render(<PriceSummary {...props} />);
      expect(screen.getAllByTestId('price-summary-item')).toHaveLength(3);
  });
  test('it should render shipping price div', ()=> {
    render(<PriceSummary {...props} />);
    expect(screen.getAllByTestId('price-summary-shipping')).toHaveLength(1);
  });
  test('it should render shipping price item', ()=> {
    render(<PriceSummary {...props} />);
    expect(screen.getByTestId('price-summary-shipping-item')).toHaveTextContent(
      "$12.98"
    );;
  });
  test('it should render total price div', ()=> {
    render(<PriceSummary {...props} />);
    expect(screen.getAllByTestId('price-summary-total')).toHaveLength(1);
  });

  test('it should render total price item', ()=> {
    render(<PriceSummary {...props} />);
    expect(screen.getByTestId('price-summary-total-item')).toHaveTextContent(
      "$66.92"
    );;
  });

  test('it should render empty cart message, if no items in the cart', () => {
    const emptyProps = {...props};
    emptyProps.summary = [];
    render(<PriceSummary {...emptyProps} />);
    expect(screen.getAllByTestId('price-summary-empty')).toHaveLength(1);
  });
  test('it should not render shipping price, if shipping is 0', () => {
    const noShippingProps = {...props};
    noShippingProps.shippingPrice = 0;
    render(<PriceSummary {...noShippingProps} />);
    expect(screen.queryByTestId('price-summary-shipping')).not.toBeInTheDocument();
  });
  test('it should have a correct summary length', () => {
    render(<PriceSummary {...props} />);
    expect(screen.queryAllByTestId('price-summary-item')).toHaveLength(3);
  })
  test('it should match snapshot', ()=> {
    expect(render(<PriceSummary {...props} />)).toMatchSnapshot();
  });
  test('it should match empty state snapshot', () => {
    const emptyProps = {...props};
    emptyProps.summary = [];
    expect(render(<PriceSummary {...emptyProps} />)).toMatchSnapshot();
  });
});
