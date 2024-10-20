import { Button, Text, Box } from '@chakra-ui/react';
import { useState } from 'react';

const CompanyIntro = ({ description }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <Box position="relative"  mt={4} p={2}>
      <Text
        // p={2}
        fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif"
        noOfLines={isExpanded ? null : 4} // Handle truncation
        fontSize="14px"
        fontWeight="400"
        lineHeight="22px"
        textAlign="left"
        width="100%"
        color="rgba(222, 225, 230, 1)"
        sx={{
          WebkitBoxOrient: "vertical",
          WebkitLineClamp: isExpanded ? "unset" : "4", // Custom line clamp
        }}
      >
        {description}
      </Text>

      <Button
        variant="link"
   
        color="rgba(0, 189, 214, 1)"
        position="absolute"
        bottom={isExpanded ? "-20px" : "-10px"} // Adjust position based on text size
        right="30px"
        zIndex={1}
        fontFamily="Helvetica"
        onClick={handleToggle}
        fontSize="14px"
        fontWeight="400"
        textDecoration="underline"
      >
        {isExpanded ? "See Less" : "See More"}
      </Button>
    </Box>
  );
};

export default CompanyIntro;
