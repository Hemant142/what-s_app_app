import React from "react";
import { Box, Text, Flex, Stack, Icon } from "@chakra-ui/react";
import { MdCheckCircle } from "react-icons/md";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";

const Activity = ({ basketData }) => {
    console.log(basketData.activity,"basketData.activity")
    let firstData=basketData.activity
    let secondData=basketData.activity
    let finalData=[...firstData,...secondData]
    console.log(finalData,"Final ")
  return (
    <Box marginY={8} p={4} >
      <Text fontSize="xl" fontWeight="bold" mb={4}>
        Activity
      </Text>
      <Box   backgroundColor="rgba(38, 42, 51, 1)"
    //    boxShadow="0px 2px 5px rgba(23, 26, 31, 0.09), 0px 0px 2px rgba(23, 26, 31, 0.12)"
    //    borderRadius="8px"
       border="1px solid rgba(86, 94, 108, 1)"
        borderWidth="1px"
        borderRadius="md"
              boxShadow="md"
      >
      {basketData.activity.length > 0 ? (
        finalData.map((act, indx) => (
            
            <Flex
            key={`act_${indx}`}
            // backgroundColor="rgba(38, 42, 51, 1)"
            padding={4}
            justifyContent="space-between"
            alignItems="center"
            // marginBottom={4}
            // height="68px"
            // boxShadow="0px 2px 5px rgba(23, 26, 31, 0.09), 0px 0px 2px rgba(23, 26, 31, 0.12)"
            // borderRadius="8px"
            // border="1px solid rgba(86, 94, 108, 1)"
          >

            <Flex alignItems="center">
              <Icon
                as={IoIosCheckmarkCircleOutline}
                boxSize={6}
                // bg={"rgba(86, 94, 108, 1)"}
                borderRadius={"50%"}
                color={"#1DD75B"}
                marginRight={3}
              />
              <Box>
                <Text
                  fontSize="11px"
                  fontWeight="400"
                  lineHeight="18px"
                  color="rgba(255, 255, 255, 1)"
                >
                  {act.orderExecutionDate}
                 
                </Text>
              </Box>
            </Flex>
            <Text
                    as="span"
                    color="white"
                    marginLeft={2}
                    fontWeight="400"
                    fontSize="11px"
                  >
                     {act.orderTitle}
                  </Text>
            <Box>
              <Text
                fontSize="11px"
                fontWeight="400"
                color="rgba(255, 255, 255, 1)"
                textAlign="right"
              >
                {/* You can add additional information here if needed */}
              </Text>
            </Box>
          </Flex>
        ))
      ) : (
        <Text className="no_data_box">Please Start Investment</Text>
      )}
      </Box>
    </Box>
  );
};

export default Activity;
