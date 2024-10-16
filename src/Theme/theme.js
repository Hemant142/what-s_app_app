import { extendTheme } from '@chakra-ui/react';
import "@fontsource/epilogue/600.css"; // Import the semibold weight of the font

const config = {
  initialColorMode: 'dark', // Start in dark mode
  useSystemColorMode: false, // Set to true to respect system color mode preferences
};

const theme = extendTheme({
  config,
  fonts: {
    heading: "'Epilogue', sans-serif", // Use Epilogue for headings
    body: "'Epilogue', sans-serif", // Use Epilogue for body text
  },
  colors: {
    darkBackground: '#171A1F', // Your custom dark background color
  },
  styles: {
    global: (props) => ({
      body: {
        bg: props.colorMode === 'dark' ? 'darkBackground' : 'white', // Background color for dark mode
        color: props.colorMode === 'dark' ? 'white' : 'gray.800', // Text color for dark mode
      },
    }),
  },
});

export default theme;
