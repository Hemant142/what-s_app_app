import React from "react";
import { Box, Text, Heading, Flex, Image } from "@chakra-ui/react";

import { IoIosSpeedometer } from "react-icons/io";

const StatsComponent = ({ basketData }) => {
  const indicatorText = basketData.graphIndicator.includes("Risk")
    ? basketData.graphIndicator
        .replace(" Risk high", "")
        .replace(" Risk medium", "")
        .replace(" Risk low", "")
    : basketData.graphIndicator;
  console.log(basketData, "basketData");
  return (
    <Box   padding={4}>
    <Flex
 
      className="stats"
      justifyContent="space-between"
    //   marginTop={2}
    
     
     
    >
      {/* Investment Value */}
      <Box
 
        className="stat-item"
        flex="1"
        textAlign="left"
        paddingTop={2}
       
      >
        <Text
          fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif"
          fontSize="12px"
          fontWeight="600"
          lineHeight="20px"
          textAlign="left"
          color="rgba(144, 149, 160, 1)"
        >
          Min Ammount
        </Text>
        <Flex alignItems="center" marginTop={1}>
          <Text color="green.400" fontSize="xl" position="relative" top={1}>
            ₹
          </Text>
          <Heading
            as="h3"
            fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif"
            fontSize="16px"
            fontWeight="500"
            color="rgba(255, 255, 255, 1)"
            marginLeft={1} // Space between Rupee symbol and value
          >
            {basketData.fundRequired}
          </Heading>
        </Flex>
      </Box>

      {/* 3Y CAGR */}
      {basketData.CAGR !== undefined && (
        <Box
       
          className="stat-item"
          flex="1"
          textAlign="left"
          paddingTop={2}
      
        >
          <Text
            fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif"
            fontSize="12px"
            fontWeight="600"
            lineHeight="20px"
            textAlign="left"
            color="rgba(144, 149, 160, 1)"
          >
            Potential Upside
          </Text>
          <Heading
            as="h3"
            fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif"
            fontSize="16px"
            fontWeight="500"
            // color="rgba(255, 255, 255, 1)"
            color="green.400"
            marginTop={1}
          >
            {/* {basketData.CAGR} */}
            2000 (20%)
          </Heading>
        </Box>
      )}

      {/* Volatility Item */}
      <Box
        className="stat-item volatility"
        flex="1"
       
        textAlign="center"
        mt={5}
      
      
      >
     
        <Box
          textAlign={"left"}
          width="100%"
          alignItems="center"
          backgroundColor="rgba(238, 253, 243, 1)"
          borderWidth="1px"
          borderColor="rgba(184, 245, 205, 1)"
          borderRadius="8px"
          boxShadow="0px 0px 2px rgba(23, 26, 31, 0.12)"
          fontFamily={"Epilogue"}
         
          padding={2} // Adding some padding for better spacing
        >
          <Flex alignItems="center">
            {/* Icon with color change based on the volatility level */}
            <IoIosSpeedometer
              color={
                basketData.graphIndicatorCheck === "low"
                  ? "green"
                  : basketData.graphIndicatorCheck === "medium"
                  ? "orange"
                  : "red"
              }
              size={18} // Adjust the size of the icon as needed
              style={{ marginRight: "8px" }} // Add space between icon and text
            />
            <Text
              // fontSize="normal" // Smaller text size
              color={
                basketData.graphIndicatorCheck === "low"
                  ? "green"
                  : basketData.graphIndicatorCheck === "medium"
                  ? "orange"
                  : "red"
              }
            >
              {basketData.graphIndicator == "Equity Risk high"
                ? "High Risk"
                : ""}
                   {basketData.graphIndicator == "Equity Risk medium"
                ? "Medium Risk"
                : ""}

               
                   {basketData.graphIndicator == "Equity Risk low"
                ? "Low Risk"
                : ""}
            </Text>
          </Flex>
        </Box>
      </Box>

      
    </Flex>
    <Box display={"flex"} justifyContent={"space-between"} mt={4}>
    <Box
      width="154px"
      height="73px"
      top="326px"
      left="44px"
      padding="10px 23px 11px 18px"
      borderRadius="8px"gtr
      border="1px solid #565E6C"
      bg=" #262A33;
"
      boxShadow="0px 2px 5px 0px #171A1F17"
     
    >
      <Text
        fontFamily="Inter"
        fontSize="12px"
        fontWeight="400"
        lineHeight="20px"
        textAlign="center"
        color="white" // Change text color as needed
        marginBottom={1} // Add spacing between the two text elements
      >
        3 Year CAGR
      </Text>
      <Text
        fontFamily="Inter"
        fontSize="16px" // You can adjust this size based on your design preference
        fontWeight="500" // Change weight as needed
        lineHeight="20px"
        textAlign="center"
        color="white" // Change text color as needed
      >
        {basketData.basketInfo.cagr}
      </Text>
    </Box>
    <Box
      width="154px"
      height="73px"
      top="326px"
      left="44px"
      padding="10px 23px 11px 18px"
      borderRadius="8px"
      border="1px solid #565E6C"
       bg=" #262A33"
      boxShadow="0px 2px 5px 0px #171A1F17"
     
    >
      <Text
        fontFamily="Inter"
        fontSize="12px"
        fontWeight="400"
        lineHeight="20px"
        textAlign="center"
        color="white" // Change text color as needed
        marginBottom={1} // Add spacing between the two text elements
      >
        1 Year Return
      </Text>
      <Text
        fontFamily="Inter"
        fontSize="16px" // You can adjust this size based on your design preference
        fontWeight="500" // Change weight as needed
        lineHeight="20px"
        textAlign="center"
        color="white" // Change text color as needed
      >
        {basketData.basketInfo.annualReturns}
      </Text>
    </Box>

    </Box>

    </Box>
  );
};

export default StatsComponent;
