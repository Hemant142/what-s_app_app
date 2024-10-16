import React from 'react';
import { Box } from '@chakra-ui/react';
import { keyframes } from '@emotion/react';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

function Loader() {
  return (
    <Box
      position="fixed"
      top="0"
      left="0"
      width="100%"
      height="100%"
      zIndex="1000"
      backgroundColor="#000"
    >
      <Box
        position="relative"
        left="50%"
        top="50%"
        width="150px"
        height="150px"
        margin="-75px 0 0 -75px"
        border="3px solid transparent"
        borderTopColor="#fff"
        borderRadius="50%"
        animation={`${spin} 2s linear infinite`}
        _before={{
          content: `""`,
          position: 'absolute',
          top: '5px',
          left: '5px',
          right: '5px',
          bottom: '5px',
          border: '3px solid transparent',
          borderTopColor: '#fff',
          borderRadius: '50%',
          animation: `${spin} 3s linear infinite`,
        }}
        _after={{
          content: `""`,
          position: 'absolute',
          top: '15px',
          left: '15px',
          right: '15px',
          bottom: '15px',
          border: '3px solid transparent',
          borderTopColor: '#fff',
          borderRadius: '50%',
          animation: `${spin} 1.5s linear infinite`,
        }}
      />
    </Box>
  );
}

export default Loader;
