import React from 'react';
import AllRoutes from './Routes/AllRoutes';
import { Box } from '@chakra-ui/react';

function App() {
  return (
    <Box bg="darkBackground" color="white">
      {/* Render all routes */}
      <AllRoutes />
    </Box>
  );
}

export default App;
