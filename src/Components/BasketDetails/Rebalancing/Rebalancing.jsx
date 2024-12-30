import { Box, Button, Flex, Icon, Text, useToast } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { BsArrowUpRightCircle } from 'react-icons/bs';
import Cookies from "js-cookie";
import { RebalancingNewOrder } from '../../../Redux/basketReducer/action';
import { useDispatch } from 'react-redux';

export default function Rebalancing({ rebalancingList,id ,RebalancingSuccess}) {
    const [timeRemaining, setTimeRemaining] = useState(null);
    const token = Cookies.get("whats_app_token");
    const dispatch = useDispatch();
    const toast = useToast();
    useEffect(() => {
      if (rebalancingList.length > 0) {
        // Sort the rebalancing list by statusDate to find the last (most recent) one
        const sortedList = [...rebalancingList].sort(
          (a, b) => new Date(b.statusDate) - new Date(a.statusDate)
        );
        
        const lastItem = sortedList[0]; // The most recent item
        const statusDate = new Date(lastItem.statusDate); // Get the last status date
        const endTime = new Date(statusDate.getTime() + 12 * 60 * 60 * 1000); // Add 12 hours
  
        const updateTimer = () => {
          const now = new Date();
          const remainingTime = endTime - now;
  
          if (remainingTime <= 0) {
            setTimeRemaining("00:00:00"); // Timer finished
            clearInterval(timer);
          } else {
            const hours = Math.floor((remainingTime / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((remainingTime / (1000 * 60)) % 60);
            const seconds = Math.floor((remainingTime / 1000) % 60);
            setTimeRemaining(`${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`);
          }
        };
  
        const timer = setInterval(updateTimer, 1000);
        updateTimer(); // Initialize immediately
  
        return () => clearInterval(timer); // Cleanup timer on unmount
      }
    }, [rebalancingList]);



   

  const handleUpsidePotentialPercentage = (instrumentListData) => {
    const cmp = Number(instrumentListData.currentPrice);
    const takeProfit = Number(instrumentListData.takeProfit);
  
    const upsidePotential = ((takeProfit - cmp) / cmp) * 100;
    const upsidePotentialPercentage = Math.floor(upsidePotential);
  
    return upsidePotentialPercentage < 0 ? 0 : upsidePotentialPercentage; // Avoid negative values
  };

  const handleUpsidePotential = (instrumentListData) => {
    const cmp = Number(instrumentListData.currentPrice);
    const takeProfit = Number(instrumentListData.takeProfit);
    const qty = Number(instrumentListData.quantity);
  
    return ((takeProfit - cmp) * qty).toFixed(2);
  };


  const handleRebalancing=()=>{
  
      dispatch(RebalancingNewOrder(id,token))
      .then((res)=>{
        if(res.data.detail){
          RebalancingSuccess()
          toast({
            title: res.data.detail,
            position: "bottom",
            status: "warning",
            duration: 2000,
            isClosable: true,
          });
        }

        if(res.data.status=="success"){
          RebalancingSuccess()
          toast({
            title: res.data.message,
            position: "bottom",
            status: "success",
            duration: 2000,
            isClosable: true,
          });
        }


      })
      .catch((error)=>{
        console.log(error)
      })
        
    
  }

  return (
    <Box p={4}>
      <Text fontSize="xl" fontWeight="bold" mb={4}>
        Rebalancing
      </Text>
      {rebalancingList.length > 0 ? (
        rebalancingList.map((inst, index) => (
          <Box
            key={`inst_${index}`}
            className="new-constituent-item"
            mb={4}
            p={4}
            mt={4}
            bg="#262A33"
            borderWidth="1px"
            borderRadius="md"
            boxShadow="md"
          >
            <Flex justify="space-between" width="100%">
              <Flex align="center" flexBasis="40%">
                <Icon
                  as={BsArrowUpRightCircle}
                  boxSize={6}
                  color="#1DD75B"
                  mr={2}
                />
                <Text
                  fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif"
                  fontSize={["xs", "sm"]}
                  lineHeight="20px"
                  noOfLines={1}
                >
                  {inst?.instrument}
                </Text>
              </Flex>

              <Flex
                align="center"
                justify="space-between"
                flexBasis="60%"
                flexShrink={0}
                textAlign="right"
              >
                <Text
                  fontSize={["xs", "sm"]}
                  fontFamily="Inter"
                  fontWeight="normal"
                  lineHeight="15px"
                  textAlign="left"
                  isTruncated
                >
                  Upside Potential
                </Text>
                <Text
                  fontSize={["xs", "sm"]}
                  fontFamily="Inter"
                  fontWeight="normal"
                  lineHeight="15px"
                  color="#1DD75B"
                  ml={2}
                >
                  ₹ {handleUpsidePotential(inst).toLocaleString("en-IN")} (
                  {handleUpsidePotentialPercentage(inst)}%)
                </Text>
              </Flex>
            </Flex>

            <Box
              mt={2}
              display="flex"
              width="90%"
              ml="10%"
              gap={5}
              alignItems="center"
            >
              <Box display="flex" gap={2} alignItems="center" width="30%">
                <Text
                  fontFamily="Inter"
                  fontSize="11px"
                  fontWeight="400"
                  lineHeight="18px"
                  color="#BCC1CA"
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
                  2%
                </Text>
              </Box>

              <Box display="flex" alignItems="center" gap={2} width="30%">
                <Text
                  fontFamily="Inter"
                  fontSize="11px"
                  fontWeight="400"
                  lineHeight="18px"
                  color="#BCC1CA"
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
                  {inst?.quantity}
                </Text>
              </Box>

              <Box
                textAlign="left"
                width="90%"
                alignItems="center"
                backgroundColor="rgba(238, 253, 243, 1)"
                borderWidth="1px"
                borderColor="rgba(184, 245, 205, 1)"
                borderRadius="sm"
                boxShadow="0px 0px 2px rgba(23, 26, 31, 0.12)"
                fontFamily="Epilogue"
                padding={1}
              >
                <Text
                  fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif"
                  fontSize="12px"
                  fontWeight="600"
                  lineHeight="22px"
                  textAlign="center"
                  color= {inst?.orderType=="Entry"? "#117B34": "#DB4437"}
                >
                  {inst?.orderType}
                </Text>
              </Box>
            </Box>
          </Box>
        ))
      ) : ""}

      <Box display="flex" justifyContent="space-between" gap={2}>
        <Text
          width="183px"
          height="52px"
          fontFamily="Inter"
          fontSize="16px"
          fontWeight="400"
          lineHeight="26px"
          textAlign="left"
          color="#A7ADB7"
        >
          {timeRemaining ? `Rebalancing period ends in ${timeRemaining}` : "Loading..."}
        </Text>

        <Button
          color="#1DD75B"
          size="lg"
          height="60px"  // Adjusted height
          width="160px"  // Adjusted width
          border="1px solid #1DD75B"
          variant="outline"
          _hover={{
            boxShadow: "0 0 10px rgba(29, 215, 91, 0.7)",
            transform: "scale(1.05)",
          }}
          _active={{
            boxShadow: "0 0 15px rgba(29, 215, 91, 1)",
            transform: "scale(0.95)",
          }}
          onClick={handleRebalancing}
        >
          Rebalancing
        </Button>
      </Box>
    </Box>
  );
}
