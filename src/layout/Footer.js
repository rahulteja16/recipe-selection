import React from 'react';
import Flex from '../components/Flex';
import Text from '../components/Text';

const Footer = () => (
  <Flex
    borderTopWidth="sm"
    borderTopColor="border"
    borderTopStyle="solid"
    backgroundColor="white"
    justifyContent="center"
    alignItems="center"
    padding="sm">
    <Text fontSize="sm">© HelloFresh 2020</Text>
  </Flex>
);

export default Footer;
