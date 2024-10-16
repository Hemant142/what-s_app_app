import React from 'react';
import { Box, Heading, Text, Link } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

export default function AboutCentrum({ basketData, id }) {
  return (
    <Box p={4} mt={2}>
    <Box
    
   
    p={4}
      height="200px"
      borderRadius="8px"
      margin="20px 0"
      backgroundColor="rgba(38, 42, 51, 1)"
      border="1px solid rgba(86, 94, 108, 1)"
      boxShadow="0px 2px 5px rgba(23, 26, 31, 0.09), 0px 0px 2px rgba(23, 26, 31, 0.12)"
      paddingLeft="10px"
    >
      <Heading
        as="h3"
        fontSize="16px"
        fontWeight="500"
        lineHeight="22px"
        paddingBottom="10px"
        borderBottom="2px solid rgba(86, 94, 108, 1)"
        width="50%"
      >
        About Centrum
      </Heading>
      <Box
        dangerouslySetInnerHTML={{ __html: basketData.aboutCentrum }}
        marginTop="10px"
        color="white"
        fontSize="14px"
        fontWeight="300"
      />
      <Box display="flex" justifyContent="flex-end" marginTop="10px">
        <Link as={RouterLink} to={`/disclosure/${id}`} color="rgba(167, 173, 183, 1)">
          <Text fontSize="14px" fontWeight="400" textDecoration="none">
            Cost & Disclosures
          </Text>
        </Link>
      </Box>
    </Box>
    </Box>
  );
}
