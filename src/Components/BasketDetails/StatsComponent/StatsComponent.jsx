import React, { useEffect, useState } from "react";
import { Box, Text, Heading, Flex, Image } from "@chakra-ui/react";
import Cookies from "js-cookie";
import { IoIosSpeedometer } from "react-icons/io";



const StatsComponent = ({ basketData,minAmount,upsidePotential,upsidePotentialPercentage ,threeYearCAGR, oneYearReturn }) => {

  return (
    <Box   padding={4} >
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
          Min Amount
        </Text>
        <Flex alignItems="center"  marginTop={1}>
          <Text color="#1DD75B" fontSize="16px"
            fontWeight="500" fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif"
             position="relative" >
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
            {minAmount !==undefined ?minAmount.toLocaleString('en-IN'):0}
          
          </Heading>
        </Flex>
      </Box>

      {/* UPSIDE POTENTIAL */}
      {upsidePotential !== undefined && (
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
       
            Potential UPSIDE
          </Text>
          <Heading
       
            as="h3"
           
            fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif"
            fontSize="16px"
            fontWeight="500"
            // color="rgba(255, 255, 255, 1)"
            color="#1DD75B"
            marginTop={1}
          >
            {/* 87% */}
            {upsidePotential.toLocaleString('en-IN')} ({upsidePotentialPercentage}%)
            {/* {basketData.CAGR} */}
            {/* 2,000 (20%) */}
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
          borderRadius="sm"
          boxShadow="0px 0px 2px rgba(23, 26, 31, 0.12)"
          fontFamily={"Epilogue"}
         
          padding={1} // Adding some padding for better spacing
        >
          <Flex alignItems="center">
            {/* Icon with color change based on the volatility level */}
            <IoIosSpeedometer
              color={
                basketData.riskLevel === "Low"
                  ? "green"
                  : basketData.riskLevel === "Medium"
                  ? "orange"
                  : "red"
              }
              size={18} // Adjust the size of the icon as needed
              style={{ marginRight: "8px" }} // Add space between icon and text
            />
            <Text
            fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif"
            
            fontSize="12px"
            fontWeight="600"
            lineHeight="22px"
              color={
                basketData.riskLevel === "Low"
                  ? "green"
                  : basketData.riskLevel === "Medium"
                  ? "orange"
                  : "red"
              }
            >
              {basketData.riskLevel == "High"
                ? "High Risk"
                : ""}
                   {basketData.riskLevel == "Medium"
                ? "Medium Risk"
                : ""}

               
                   {basketData.riskLevel == "Low"
                ? "Low Risk"
                : ""}
            </Text>
          </Flex>
        </Box>
      </Box>

      
    </Flex>


    <Box display={"flex"} justifyContent={"space-between"} mt={4}>
  <Box
    minWidth={["140px", "144px", "154px"]}
    height="73px"
    textAlign="center"
    padding="10px 18px"
    borderRadius="8px"
    border="1px solid #565E6C"
    bg="#262A33"
    p={2}
    boxShadow="0px 2px 5px 0px #171A1F17"
    display="flex"
    flexDirection="column"
    justifyContent="center"
    alignItems="center"
  >
    <Text
      fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif"
      fontSize={["10px", "12px", "14px"]}
      fontWeight="400"
      lineHeight="20px"
      textAlign="center"
      color="white"
      marginBottom={1}
    >
      3Y CAGR
    </Text>
    <Text
      fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif"
      fontSize={["14px", "16px", "18px"]}
      fontWeight="500"
      lineHeight="20px"
      textAlign="center"
      color="white"
      whiteSpace="nowrap"
      overflow="hidden"
      textOverflow="ellipsis"
    >
      {threeYearCAGR.toLocaleString('en-IN')}%
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
    bg="#262A33"
    boxShadow="0px 2px 5px 0px #171A1F17"
  >
    <Text
      fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif"
      fontSize="12px"
      fontWeight="400"
      lineHeight="20px"
      textAlign="center"
      color="white"
      marginBottom={1}
    >
      1 Year Return
    </Text>
    <Text
      fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif"
      fontSize="16px"
      fontWeight="500"
      lineHeight="20px"
      textAlign="center"
      color="white"
    >
      {Number(oneYearReturn).toFixed(2).toLocaleString('en-IN')}%
    </Text>
  </Box>
</Box>




      

    </Box>
  );
};

export default StatsComponent;
