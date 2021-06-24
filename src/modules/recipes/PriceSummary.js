import Box from '../../components/Box';
import Flex from '../../components/Flex';
import React from 'react';
import Text from '../../components/Text';
import { parseRawPrice } from './price';

const SummaryList = ({summary,shippingPrice,totalPrice }) => {
  return <Box width={['290px', '450px']} padding="md">
  {summary.map((item,index) =>
  (
    <Box key={index} data-testid="price-summary-item">
      <Flex justifyContent='space-between'>
        <Text fontSize="sm" fontWeight="regular">{item.name}  { item.qty !== 1 &&  ` x ${item.qty}`}</Text>
        <Text fontSize="sm" fontWeight="regular">{parseRawPrice(item.amount)}</Text>
      </Flex>
      <Box paddingTop="xs"></Box>
    </Box>
  )
  )}
  {shippingPrice !== 0 ?
    <Flex justifyContent='space-between' data-testid="price-summary-shipping" >
      <Text fontSize="sm" fontWeight="regular">Shipping</Text>
      <Text fontSize="sm" fontWeight="regular" data-testid="price-summary-shipping-item" >{shippingPrice}</Text>
    </Flex>
    : null}

  <Box paddingTop="xs"></Box>
  <Box borderTopWidth="sm" borderTopColor="border" borderTopStyle="solid" borderColor='#E4E4E4'></Box>
  <Box paddingTop="xs"></Box>
  <Flex justifyContent='space-between' data-testid="price-summary-total">
    <Text fontSize="sm" fontWeight="bold">Total</Text>
    <Text fontSize="sm" fontWeight="bold" data-testid="price-summary-total-item">{totalPrice}</Text>
  </Flex>
</Box>
}

const EmptySummary  = () => {
  return <Box width={['290px', '450px']} padding={16}>
    <Flex justifyContent='center' data-testid="price-summary-empty">
      <Text fontSize="sm" fontWeight="bold">Cart is Empty!!</Text>
    </Flex>
  </Box>
}


// Create PriceSummary user interface
const PriceSummary = ({ summary, totalPrice, shippingPrice }) => {

  if(summary.length !== 0) {
    return <SummaryList summary = {summary} totalPrice = {totalPrice} shippingPrice = {shippingPrice}/>;
  } else {
    return <EmptySummary />;
  }
};

export default PriceSummary;
