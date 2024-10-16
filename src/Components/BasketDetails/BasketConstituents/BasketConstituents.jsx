import React from "react";
import { Box, Text, Flex, Progress, Icon } from "@chakra-ui/react";
import { MdCheckCircle, MdCancel } from "react-icons/md"; // Importing icons
import { CiCircleCheck } from "react-icons/ci";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { BsPatchCheck } from "react-icons/bs";


const BasketConstituents = ({ basketData }) => {
  console.log(basketData.instrumentList, "basketData.instrumentList");

  return (
    <Box className="basket-constituents" p={4} mt={4}>
      <Text fontSize="lg" fontWeight="bold" mb={4}>
        Basket Constituents & Weights
      </Text>
      {basketData.instrumentList.length > 0 ? (
        basketData.instrumentList.map((inst, index) => {
          return inst?.isInvested ? (
            // <Box key={`inst_${index}`} className="new-constituent-item" mb={4} p={4} borderWidth="1px" borderRadius="md" boxShadow="md">
            //   <Flex justify="space-between" align="center">
            //     <Flex align="center">
            //       <Icon
            //         as={inst.avrageReturnsFlag === "green" ? MdCheckCircle : MdCancel}
            //         boxSize={6}
            //         color={inst.avrageReturnsFlag === "green" ? "green.500" : "red.500"}
            //         mr={2}
            //       />
            //       <Text fontSize="md" fontWeight="semibold">
            //         {inst?.security}
            //       </Text>
            //     </Flex>
            //     <Text>{inst?.avgReturn || ""}</Text>
            //   </Flex>
            //   <Box mt={2}>
            //     <Text fontSize="sm" mb={1}>
            //       Weight:
            //     </Text>
            //     <Progress value={inst?.weight} size="sm" colorScheme="blue" />
            //   </Box>
            // </Box>

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
                        ? BsPatchCheck
                        : BsPatchCheck
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
                      inst.avrageReturnsFlag === "gray"
                        ? BsPatchCheck
                        : BsPatchCheck
                    }
                    boxSize={6}
                    
                    color={
                      inst.avrageReturnsFlag === "gray"
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
                </Box>
              </Flex>
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
