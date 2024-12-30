import React, { useEffect, useRef, useState } from "react";
import { Box, Heading, Text, Button } from "@chakra-ui/react";

const InvestmentInfo = ({ basketData }) => {
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
    }, [basketData.rationale]);
    

  return (
    <Box position="relative"
    mb={4}
  // border={"1px solid red"}
    className="investment-info" p={4} >
      <Heading
        as="h4"
        fontFamily={"Helvetica"}
        fontSize="17px"
        fontWeight="530"
        lineHeight="26px"
        textAlign="left"
        color="rgba(255, 255, 255, 1)"
      >
        Why you should invest in this basket?
      </Heading>

      <Text
        ref={textRef}
        fontSize="14px"
        fontWeight="300"
        lineHeight="22px"
        fontFamily={"Helvetica"}
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
        {basketData.rationale}
      </Text>
{isOverflowing && (
   <Button
   variant="link"
   color="rgba(0, 189, 214, 1)"
   position="absolute"
   fontFamily={"Helvetica"}
   right="30px"
   onClick={handleToggle}
   fontSize="14px"
   fontWeight="300"
   textDecoration="underline"
 >
   {isExpanded ? "See Less" : "See More"}
 </Button>
)}
     
    </Box>
  );
};

export default InvestmentInfo;
