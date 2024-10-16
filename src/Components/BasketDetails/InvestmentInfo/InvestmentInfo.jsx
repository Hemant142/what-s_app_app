import React, { useState } from "react";
import { Box, Heading, Text, Button } from "@chakra-ui/react";

const InvestmentInfo = ({ basketData }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <Box position="relative" mb="45px"  className="investment-info" p={4} >
      <Heading
        as="h4"
        fontSize="17px"
        fontWeight="530"
        lineHeight="26px"
        textAlign="left"
        color="rgba(255, 255, 255, 1)"
      >
        Why you should invest in this basket?
      </Heading>

      <Text
        fontSize="14px"
        fontWeight="300"
        lineHeight="22px"
        textAlign="left"
        color="rgba(144, 149, 160, 1)"
        noOfLines={isExpanded ? null : 4} // Handle truncation with Chakra's noOfLines prop
        overflow="hidden"
        textOverflow="ellipsis"
        display="-webkit-box"
        sx={{
          WebkitBoxOrient: "vertical",
          WebkitLineClamp: isExpanded ? "unset" : "4", // Custom line clamp
        }}
      >
        {basketData.rational}
      </Text>

      <Button
        variant="link"
        color="rgba(0, 189, 214, 1)"
        position="absolute"
        right="30px"
        onClick={handleToggle}
        fontSize="14px"
        fontWeight="300"
        textDecoration="underline"
      >
        {isExpanded ? "See Less" : "See More"}
      </Button>
    </Box>
  );
};

export default InvestmentInfo;
