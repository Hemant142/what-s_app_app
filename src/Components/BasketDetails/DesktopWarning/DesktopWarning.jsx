import React from 'react';
import { Box, Text, useMediaQuery } from '@chakra-ui/react';

const DesktopWarning = () => {
  const [isDesktop] = useMediaQuery("(min-width: 768px)");

  return (
    <>
      {isDesktop && (
        <Box
          className="desktop-warning"
          textAlign="center"
          fontSize="24px"
          fontWeight="bold"
          display="block" // Ensures it's displayed as a block element
        >
          Your warning message goes here.
        </Box>
      )}
    </>
  );
};

export default DesktopWarning;
