import { Button, Text, Box } from '@chakra-ui/react';
import { useState, useEffect, useRef } from 'react';

const CompanyIntro = ({ description }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false); // For checking if content exceeds 4 lines
  const textRef = useRef(null); // Reference for the text element

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  // Check if content exceeds 4 lines
  useEffect(() => {
    const lineHeight = 22; // Line height used in Text component
    const maxLines = 4;
    const maxHeight = lineHeight * maxLines; // Maximum height for 4 lines

    if (textRef.current) {
      setIsOverflowing(textRef.current.scrollHeight > maxHeight); // Check if content overflows
    }
  }, [description]);

  return (
    <Box position="relative" mt={4} p={2}>
      <Text
        ref={textRef}
        fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif"
        noOfLines={isExpanded ? null : 4} // Handle truncation
        fontSize="14px"
        fontWeight="400"
        lineHeight="22px"
        textAlign="left"
        width="100%"
        color="rgba(222, 225, 230, 1)"
        sx={{
          WebkitBoxOrient: 'vertical',
          WebkitLineClamp: isExpanded ? 'unset' : '4', // Custom line clamp
        }}
      >
        {description}
      </Text>

      {isOverflowing && ( // Show button only if content exceeds 4 lines
        <Button
          variant="link"
          color="rgba(0, 189, 214, 1)"
          position="absolute"
          bottom={isExpanded ? '-20px' : '-10px'} // Adjust position based on text size
          right="30px"
          zIndex={1}
          fontFamily="Helvetica"
          onClick={handleToggle}
          fontSize="14px"
          fontWeight="400"
          textDecoration="underline"
        >
          {isExpanded ? 'See Less' : 'See More'}
        </Button>
      )}
    </Box>
  );
};

export default CompanyIntro;
