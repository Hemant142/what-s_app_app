import React from "react";
import { Box, Text, Flex, Icon, Divider } from "@chakra-ui/react";
import { BsPatchCheck } from "react-icons/bs";

const BasketConstituents = ({ basketData, orderHistory, newInstrumentsData }) => {
  const orderHistoryInstruments = new Set(orderHistory.map((order) => order.instrument));

  const filteredInstruments = newInstrumentsData.filter(
    (inst) => !orderHistoryInstruments.has(inst.instrument)
  );

  const handleUpsidePotentialPercentage = (instrumentListData) => {
    let cmp = Number(instrumentListData.currentPrice);
    let takeProfit = Number(instrumentListData.takeProfit) || 986;
    let upsidePotential = ((takeProfit - cmp) / cmp) * 100;
    let upsidePotentialPercentage = Math.floor(upsidePotential);
    return upsidePotentialPercentage < 0 ? 0 : upsidePotentialPercentage;
  };

   // Calculate the total price of all instruments
   const totalPrice = filteredInstruments.reduce(
    (sum, inst) => sum + inst.creationPrice * inst.quantity,
    0
  );

  // Function to calculate weightage
  const calculateWeightage = (inst) => {
    const instrumentPrice = inst.creationPrice * inst.quantity;
    return ((instrumentPrice / totalPrice) * 100).toFixed(2);
  };

  return (
    <Box className="basket-constituents" p={4}>
      <Text fontSize="md" fontWeight="bold" mb={4} fontFamily={"Helvetica"}>
        Basket Constituents & Weights
      </Text>

      <Divider ml={2} mr={2} mb={4} m="auto" width="350px" border="1px solid #BCC1CA" />

      {filteredInstruments.length > 0 ? (
        filteredInstruments.map((inst, index) => (
          <Box
            key={`inst_${index}`}
            className="new-constituent-item"
            // mb={4}
            mt={4}
            p={4}
            bg={"#262A33"}
            border="1px solid rgba(86, 94, 108, 1)"
            borderRadius="md"
            boxShadow="md"
          >
            <Flex justify="space-between" align="center">
              <Flex align="center">
                <Icon
                  as={BsPatchCheck}
                  boxSize={6}
                  color={handleUpsidePotentialPercentage(inst) > 0 ? "#1DD75B" : "#1DD75B"}
                  mr={2}
                />
                <Text  fontSize="14px" fontWeight="500" lineHeight={"22px"} fontFamily={"Helvetica"}>
                  {inst?.instrument}
                </Text>
              </Flex>
              <Box>
                <Box display="flex" alignItems="center" gap={2}>
                  <Text fontFamily="Inter" fontSize="11px" fontWeight="400" color={"#BCC1CA"}>
                    Weightage:
                  </Text>
                  <Text fontFamily="Inter" fontSize="11px" fontWeight="400" width="85px">
                    {calculateWeightage(inst)}%
                  </Text>
                </Box>
                <Box display="flex" alignItems="center" gap={2}>
                  <Text fontFamily="Inter" fontSize="11px" fontWeight="400" color={"#BCC1CA"}>
                    Shares:
                  </Text>
                  <Text fontFamily="Inter" fontSize="11px" fontWeight="400" width="85px">
                    {inst?.quantity || "N/A"}
                  </Text>
                </Box>
              </Box>
            </Flex>
          </Box>
        ))
      ) : (
        <Text 
        mt={4}>No constituents available.</Text>
      )}
    </Box>
  );
};

export default BasketConstituents;
