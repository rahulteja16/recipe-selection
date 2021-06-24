import { parseRawPrice } from '../price';

describe('price', () => {
  describe('parseRawPrice', () => {
    it('should return the raw price with the currency symbol and converted to decimals', () => {
      const price = 1000;
      const parsedPrice = parseRawPrice(price);

      expect(parsedPrice).toBe('$10.00');
    });
  });
});
