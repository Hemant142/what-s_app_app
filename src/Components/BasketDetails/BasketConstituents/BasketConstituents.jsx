import React from "react";
import { Box, Text, Flex, Progress, Icon } from "@chakra-ui/react";
import { MdCheckCircle, MdCancel } from "react-icons/md"; // Importing icons
import { CiCircleCheck } from "react-icons/ci";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { BsArrowUpRightCircle, BsPatchCheck } from "react-icons/bs";


const BasketConstituents = ({ basketData }) => {
  console.log(basketData.instrumentList, "basketData.instrumentList");

  const handleUpsidePotential = (instrumentListData) => {
    console.log(instrumentListData,"instrumentListData")
    let cmp = Number(instrumentListData.currentPrice);
    // let takeProfit = Number(instrumentListData.takeProfit);
    
    let takeProfit = Number(instrumentListData.profitLossAmount);
    let upsidePotential = ((takeProfit - cmp) / cmp) * 100;

    let upsidePotentialPercentage = Math.floor(upsidePotential);

    if (upsidePotentialPercentage < 0) {
      return `Target Achieved`;
    }

    return `${upsidePotentialPercentage}%`;
  };

  return (
    <Box className="basket-constituents" p={4} mt={4}   >
      <Text fontSize="lg" fontWeight="bold" mb={4}>
        Basket Constituents & Weights
      </Text>
      {basketData.instrumentList.length > 0 ? (
        basketData.instrumentList.map((inst, index) => {
          return inst?.isInvested ? (
     

            <Box
          
              key={`inst_${index}`}
              className="new-constituent-item"
              mb={4}
              p={4}
              bg={"#262A33"}
              borderWidth="1px"
              borderRadius="md"
              boxShadow="md"
            >
              <Flex justify="space-between" align="center">
                <Flex align="center">
                  <Icon
                    as={
                      inst.avrageReturnsFlag === "green"
                        ? BsArrowUpRightCircle
                        : BsArrowUpRightCircle
                    }
                    boxSize={6}
                    // bg={"#D3F9E0"}
                    // borderRadius={"50%"}
                    color={
                      inst.avrageReturnsFlag === "green"
                        ? "#1DD75B"
                        : "#1DD75B"
                    }
                    mr={2}
                  />
                  <Text fontSize="md" fontWeight="semibold">
                    {inst?.name}
                  </Text>
                </Flex>
                <Box>
                  <Box display="flex" alignItems="center">
                    <Text
                      fontFamily="Inter"
                      fontSize="11px"
                      fontWeight="400"
                      lineHeight="18px"
                    >
                      Weightage:
                    </Text>
                    <Text
                      fontFamily="Inter"
                      fontSize="11px"
                      fontWeight="400"
                      lineHeight="18px"
                      width="85px"
                    >
                      {inst?.allocation}%
                    </Text>
                  </Box>
                  <Box display="flex" alignItems="center">
                    <Text
                      fontFamily="Inter"
                      fontSize="11px"
                      fontWeight="400"
                      lineHeight="18px"
                    >
                      Shares:
                    </Text>
                    <Text
                      fontFamily="Inter"
                      fontSize="11px"
                      fontWeight="400"
                      lineHeight="18px"
                      width="85px"
                    >
                      {inst?.shares}
                    </Text>
                  </Box>
                </Box>
              </Flex>
            </Box>
          ) : (
            <Box
              key={`inst_${index}`}
              className="new-constituent-item"
              mb={4}
              p={2}
              bg={"#262A33"}
              borderWidth="1px"
              borderRadius="md"
              boxShadow="md"
            >
             <Flex
  justify="space-between"
  // align="center"
  // flexWrap="wrap"          // Ensures it wraps on smaller screens if necessary
  width="100%"             // Full width for mobile screens
  // p={2}                    // Padding for mobile-friendly spacing
>
  {/* Left side: Icon and Name */}
  <Flex
    align="center"
  
    flexBasis="40%"        // Take up 70% of the width
  >
    <Icon
      as={BsArrowUpRightCircle}  // You can modify based on logic later
      boxSize={6}
      color="#1DD75B"           // Default color as provided
      mr={2}
    />
    <Text
      fontFamily="Inter"
      fontSize={["xs", "sm"]}   // xs for smaller screens, sm for larger mobiles
      lineHeight="20px"
      // fontWeight="bold"         // 'bold' instead of "12px" for text weight
      noOfLines={1}             // Ensure it doesn’t wrap to multiple lines
    >
      {inst?.name}
    </Text>
  </Flex>

  {/* Right side: Upside Potential */}
  <Flex
    align="center"
    justify="space-between"
  
    flexBasis="60%"           // Take up 30% of the width
    flexShrink={0}            // Prevents shrinking on small screens
    textAlign="right"
    p={1}
  >
    <Text
      fontSize={["xs", "sm"]}  // Responsive font sizes for mobile
      fontFamily="Inter"
      fontWeight="normal"
      lineHeight="15px"
      textAlign="left"
      isTruncated            // Truncate text if it's too long for mobile
    >
      Upside Potential
    </Text>
    <Text
  
      fontSize={["xs", "sm"]}
      fontFamily="Inter"
      fontWeight="normal"
      lineHeight="15px"
      color="#1DD75B"
      ml={2}                 // Add spacing between texts
    >
      ₹{inst.profitLossAmount.toLocaleString('en-IN')} ({handleUpsidePotential(inst)})
    </Text>
  </Flex>
</Flex>

<Box mt={2} 
  display="flex" 
  width="90%" 
  ml={"10%"}
  gap={5} 
 
  // justifyContent="flex-end"  // Aligns content to the left
  alignItems="center" >
<Box display="flex" alignItems="center"   width={"30%"}>
                    <Text
                      fontFamily="Inter"
                      fontSize="11px"
                      fontWeight="400"
                      lineHeight="18px"
                      color={"#BCC1CA"}
                      //   width="85px"

                      //   height="36px"
                    >
                      Weightage:
                    </Text>
                    <Text
                      fontFamily="Inter"
                      fontSize="11px"
                      fontWeight="400"
                      lineHeight="18px"
                      width="85px"
                      //   height="36px"
                    >
                      {inst?.allocation}%
                    </Text>
                  </Box>

                  <Box display="flex" alignItems="center" width={"30%"}>
                    <Text
                fontFamily="Inter"
                fontSize="11px"
                fontWeight="400"
                lineHeight="18px"
                color={"#BCC1CA"}
                    >
                      Shares:
                    </Text>
                    <Text
                      fontFamily="Inter"
                      fontSize="11px"
                      fontWeight="400"
                      lineHeight="18px"
                      width="85px"
                      //   height="36px"
                    >
                      {inst?.shares}
                    </Text>
                  </Box>
                  <Box
                
                    textAlign={"left"}
                    width="90%"
                    alignItems="center"
                    backgroundColor="rgba(238, 253, 243, 1)"
                    borderWidth="1px"
                    borderColor="rgba(184, 245, 205, 1)"
                    borderRadius="sm"
                    boxShadow="0px 0px 2px rgba(23, 26, 31, 0.12)"
                    fontFamily={"Epilogue"}
                   
                    padding={1} 
                  >
                    <Text
                      fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif"
                      fontSize="12px"
                      fontWeight="600"
                      lineHeight="22px"
                      textAlign={"center"}
                      color={"#117B34"}
                    >

Enter
                    </Text>
                  </Box>

</Box>

            </Box>
          );
        })
      ) : (
        <Text>No constituents available.</Text>
      )}
    </Box>
  );
};

export default BasketConstituents;



  {/* <Box>
                  <Box display="flex" alignItems="center">
                    <Text
                      fontFamily="Inter"
                      fontSize="11px"
                      fontWeight="400"
                      lineHeight="18px"
                      //   width="85px"

                      //   height="36px"
                    >
                      Weightage:
                    </Text>
                    <Text
                      fontFamily="Inter"
                      fontSize="11px"
                      fontWeight="400"
                      lineHeight="18px"
                      width="85px"
                      //   height="36px"
                    >
                      {inst?.allocation}%
                    </Text>
                  </Box>
                  <Box display="flex" alignItems="center">
                    <Text
                      fontFamily="Inter"
                      fontSize="11px"
                      fontWeight="400"
                      lineHeight="18px"
                      //   width="85px"
                      //   height="36px"
                    >
                      Shares:
                    </Text>
                    <Text
                      fontFamily="Inter"
                      fontSize="11px"
                      fontWeight="400"
                      lineHeight="18px"
                      width="85px"
                      //   height="36px"
                    >
                      {inst?.shares}
                    </Text>
                  </Box>
                </Box> */}