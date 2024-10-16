import React from 'react';
import { Box } from '@chakra-ui/react';

function SectionLoader() {
  return (
    <Box width="100%" height="200px" textAlign="center" lineHeight="200px">
      <Box
        as="div"
        width="2em"
        height="2em"
        borderWidth="1px"
        borderColor="currentColor"
        borderRadius="full"
        position="relative"
        animation="spin 1s linear infinite"
        sx={{
          '@keyframes spin': {
            '0%': { transform: 'rotate(0deg)' },
            '100%': { transform: 'rotate(360deg)' },
          },
        }}
      >
        <Box
          as="div"
          content=""
          display="block"
          width="0"
          height="0"
          position="absolute"
          top="-0.2em"
          left="50%"
          borderWidth="0.2em"
          borderColor="currentColor"
          borderRadius="full"
          sx={{
            transform: 'translateX(-50%)',
          }}
        />
      </Box>
    </Box>
  );
}

export default SectionLoader;
