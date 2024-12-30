import React from 'react';
import { Box, Heading, Text, Link } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

export default function AboutCentrum({ basketData, id }) {

  return (
    <Box p={4} mt={2}>
      <Box
        p={4}
        height="auto"
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

        {/* SEBI Information with specified layout and typography */}
        <Box
          mt={4}
          color="white"
          width="298px" // Set width
          // height="66px" // Set height
          fontFamily="Inter" // Set typography
          fontSize="14px"
          fontWeight="300"
          lineHeight="22px"
          textAlign="left"
        >
          <Text fontWeight="bold" fontSize="14px" lineHeight="22px" mb={2}>
            SEBI Registration No.: INH000001469
          </Text>
          <Text maxWidth="600px" mb={2}>
            We are SEBI registered Research advisory firm, creating thematic baskets of curated stocks.
          </Text>
        </Box>

        {/* Move this Box and make sure it's aligned properly below the text */}
        <Box display="flex" justifyContent="flex-start" marginTop="10px">
          <Link as={RouterLink} to={`/disclosure/${id}`} color="#A7ADB7">
            <Text fontSize="sm" fontWeight="400"   fontFamily="Inter"  lineHeight="22px" textDecoration="none">
               Disclosures
            </Text>
          </Link>
        </Box>
      </Box>
    </Box>
  );
}
