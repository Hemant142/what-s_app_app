import React, { useEffect, useState } from "react";
import {
  useToast,
  Box,
  Button,
  Input,
  Text,
  VStack,
  HStack,
  Flex,
  Icon,
  Heading,
  Divider,
} from "@chakra-ui/react";
import moment from "moment";
import axios from "axios";
import Cookies from "js-cookie";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import CustomToast from "../../ConfirmOrder/CustomToast";
import { useDispatch } from "react-redux";
import { OrderPlaced } from "../../../Redux/basketReducer/action";

const InvestmentSection = (props) => {
  const toast = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const minReqAmt = parseInt(props.minReq, 10) || 0; // Ensure base 10 and default value
  const currentBalance = parseInt(props.currentBalance, 10) || 0;

  const [showInvestmentOptions, setShowInvestmentOptions] = useState(false);
  const [amountToInvest, setAmountToInvest] = useState(minReqAmt); // Set initial amount based on minReqAmt
  const [lots, setLots] = useState(1); // Initial lot size as 1
  const [apiLoader, setApiLoader] = useState(false);
  const [brokerage, setBrokerage] = useState(345); // Default value can be set here instead of `useEffect`
  const [othercharges, setOtherCharges] = useState(237); // Same for other charges
  const [total, setTotal] = useState(brokerage + othercharges + minReqAmt);
  const [rating, setRating] = useState(null);
  const [tempRating, setTempRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [upsidePotential,setUpsidePotential]=useState(0)
  const [upsidePotentialPercentage,setUpsidePotentialPercentage]=useState(0)

  const basketId = props.basketId || ''; // Ensure a default value if props.basketId is undefined
  let token = Cookies.get("whats_app_token");
  let userName = Cookies.get("user-name");

  // Update total amount when amountToInvest, brokerage, or other charges change
  useEffect(() => {
    setTotal(brokerage + othercharges + amountToInvest);
  }, [brokerage, othercharges, amountToInvest]);

  // Optional: Use this effect if `minReqAmt` changes during the lifecycle of the component
  useEffect(() => {
    if (minReqAmt) {
      setAmountToInvest(minReqAmt);
    }
  }, [minReqAmt]);


  useEffect(() => {
    if (props) {
      // Calculate the total required fund
   
  
      // Calculate the sum of all upside potential percentages
      const totalUpsidePotentialPercentage = props.instrumentList.reduce(
        (acc, instrument) => acc + handleUpsidePotentialPercentage(instrument),
        0
      );
  
      const totalUpsidePotential = props.instrumentList.reduce(
        (acc, instrument) => acc + handleUpsidePotential(instrument),
        0
      );
  
      // Set the calculated values in the state
  
      setUpsidePotentialPercentage(totalUpsidePotentialPercentage); // Assuming you have a state for upside potential
      setUpsidePotential(totalUpsidePotential)
  
    }
  }, [props]);


  const handleInvestClick = () => {
    setShowInvestmentOptions(true);
    setAmountToInvest(minReqAmt); // Reset amount to minimum requirement
  };

  const handleSuccessfulTransaction = (amt) => {
    toast({
      title: "Invested successfully",
      description: (
        <Box>
          <Text>{moment().format("ddd MMM DD")}</Text>
          <Text>{props.basketName}</Text>
          <Text>Amount: ₹{amt}</Text>
        </Box>
      ),
      status: "success",
      duration: 5000,
      isClosable: true,
      position: "top-center",
    });
  };

  const handleFailedTransaction = (msg) => {
    toast({
      title: "Transaction Failed",
      description: msg,
      status: "error",
      duration: 4000,
      isClosable: true,
      position: "top-center",
    });
  };

  const handleInsufficientBalance = (msg) => {
    toast({
      title: "Insufficient Balance",
      description: msg,
      status: "warning",
      duration: 3000,
      isClosable: true,
      position: "top-center",
    });
  };

  const handleInvalidAmount = (msg, amt) => {
    toast({
      title: "Invalid Amount",
      description: `${msg} ${amt}`,
      status: "error",
      duration: 3000,
      isClosable: true,
      position: "top-center",
    });
  };

  const increaseLot = () => {
    const newLots = lots + 1;
    const newAmount = minReqAmt * newLots;
const newUpsidePotential=parseFloat((upsidePotential*newLots).toFixed(2));
const newUpsidePotentialPercentage=parseFloat((upsidePotentialPercentage * newLots).toFixed(2));
    if (newAmount <= currentBalance) {
      setLots(newLots);
      setAmountToInvest(newAmount);
      setUpsidePotential(newUpsidePotential)
      setUpsidePotentialPercentage(newUpsidePotentialPercentage)
    } else {
      handleInsufficientBalance("Cannot exceed current balance.");
    }
  };

  const decreaseLot = () => {
    if (lots > 1) {
      const newLots = lots - 1;
      const newAmount = minReqAmt / newLots;
      const newUpsidePotential=parseFloat((upsidePotential/lots).toFixed(2))
      const newUpsidePotentialPercentage=parseFloat((upsidePotentialPercentage/lots).toFixed(2))
      setLots(newLots);
      setAmountToInvest(newAmount);
      setUpsidePotential(newUpsidePotential)
      setUpsidePotentialPercentage(newUpsidePotentialPercentage)
    } else {
      handleInvalidAmount("Cannot have less than one lot.", minReqAmt);
    }
  };

  // Use fallback values to prevent errors
  const formattedAmountToInvest = (amountToInvest || 0).toLocaleString();
  const formattedTotal = (total || 0).toLocaleString();

  const handleBuyClick = () => {
    if (amountToInvest < minReqAmt) {
      handleInvalidAmount(
        "Invalid Amount, please check min amount, you have entered ₹",
        amountToInvest
      );
      return false;
    } else if (amountToInvest > currentBalance) {
      handleInvalidAmount(
        "Insufficient Balance, you have entered ₹",
        amountToInvest
      );
      return false;
    } else {
      // Pass lot and amount to the Confirm Order page
      navigate("/confirm-order", {
        state: {
          lots: lots,
          currentBalance: currentBalance,
          amountToInvest: amountToInvest,
          basketId: props.id,
          basketName: props.basketName, // In case you want to pass the basket name too
          instrumentList: props.instrumentList,
        },
      });
    }
    // else {
    //   const userId = localStorage.getItem("userId");
    //   let config = {
    //     method: "post",
    //     maxBodyLength: Infinity,
    //     url: `https://centrum-app-api.vercel.app/api/centrum/STOQCLUB/add-clients/v2?user_id=${userId}&basket_id=${id}&investment_amount=${amountToInvest}`,
    //     headers: {},
    //   };
    //   setApiLoader(true);
    //   axios
    //     .request(config)
    //     .then((response) => {
    //       setApiLoader(false);
    //       if (response.data.status === "SUCCESS") {
    //         handleSuccessfulTransaction(amountToInvest);
    //       } else {
    //         handleInsufficientBalance(response.data.data);
    //       }
    //     })
    //     .catch(() => {
    //       setApiLoader(false);
    //       handleFailedTransaction("Transaction could not be completed.");
    //     });
    // }
  };

  const handleConfirmOrder = () => {
    if (total > currentBalance) {
      toast({
        title: "Warning",
        description: "Your total exceeds your current balance.",
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
      return;
    }
 
 
    dispatch(OrderPlaced(basketId, lots, token))
      .then((res) => {
       
console.log(res.data,"response")
        if(res.data.status==="failed"){
          toast({
            title: "Warning",
            description: res.data.message,
            status: "warning",
            duration: 5000,
            isClosable: true,
          });
        }


        if (res.data.status === "success") {
          toast({
            duration: 10000,
            position: "bottom",
            render: (props) => (
              <CustomToast
                userName={userName}
                rating={rating}
                tempRating={tempRating}
                setTempRating={setTempRating}
                handleStarClick={handleStarClick}
                onClose={props.onClose}
              />
            ),
          });
        
          // Clear the token
          Cookies.set('whats_app_token', "");
          
          // Navigate back to /basketId after 10 seconds
          setTimeout(() => {
            navigate(`/basketId`);  // Redirect to /basketId
          }, 10000);
        }
        
      })
      .catch((error) => {
        console.log(error, "error confirm order ");
      });

  };

  const handleStarClick = (starRating) => {
    setRating(starRating); // Set rating immediately
  };



  const handleUpsidePotentialPercentage = (instrumentListData) => {
    let cmp = Number(instrumentListData.currentPrice);
    let takeProfit = Number(instrumentListData.takeProfit);
  
    let upsidePotential = ((takeProfit - cmp) / cmp) * 100;
    let upsidePotentialPercentage = Math.floor(upsidePotential);
  
    // If the upside potential is less than 0, return 0 to avoid summing a negative value
    if (upsidePotentialPercentage < 0) {
      return 0; // or you can handle this differently based on your requirement
    }

    return upsidePotentialPercentage;
  };



  const handleUpsidePotential = (instrumentListData) => {

    let cmp = Number(instrumentListData.currentPrice);
    let takeProfit = Number(instrumentListData.takeProfit);
    let qty=Number(instrumentListData.quantity)
  
    let upsidePotential = ((takeProfit - cmp)*qty).toFixed(2)
 
    return Number(upsidePotential);
  };

  return (
    <Box >
       <Box
          mt={8}
          width={"100%"}
          bg={"#D3F9E0"}
          display="flex" // Ensure content aligns in one line
          alignItems="center" // Vertically align the text in the center
          padding="7px 12px" // Add padding to give spacing similar to top and left
        >
          <Text
            fontFamily="Inter"
            fontSize="14px"
            fontWeight="400"
            lineHeight="22px"
            textAlign="left"
            color="#117B34"
          >
            Complete your transaction in 5:00 before the session expires
          </Text>
        </Box>
      <Box
 
        className="investment-section"
        p={5}
        // borderWidth="1px"
        // borderRadius="lg"
        // boxShadow="lg"
      >
       


  
        <Box display={"flex"} justifyContent={"space-between"} mt={4} mb={6}>
        

          <Box display={"flex"} width={"100%"} justifyContent={"space-between"} mt={4}  >
          <Box>
            <HStack spacing={4} mt={4}>
              <Button
                colorScheme="white"
                variant="outline"
                _hover={{
                  boxShadow: "0 0 10px white",
                  transform: "scale(1.05)",
                }}
                size="sm"
                _active={{
                  boxShadow: "0 0 15px white",
                  transform: "scale(0.95)",
                }}
                onClick={decreaseLot}
                disabled={lots <= 1}
              >
                <Icon as={MinusIcon} />
              </Button>
              <Input
                value={lots}
                readOnly
                textAlign="center"
                width="50px"
                   size="sm"
                //   bg="white"
                fontWeight="bold"
              />
              <Button
                size="sm"
                color={"#1DD75B"}
                border={"1px solid #1DD75B"}
                _hover={{
                  boxShadow: "0 0 10px rgba(29, 215, 91, 0.7)",
                  transform: "scale(1.05)",
                }}
                _active={{
                  boxShadow: "0 0 15px rgba(29, 215, 91, 1)",
                  transform: "scale(0.95)",
                }}
                variant="outline"
                onClick={increaseLot}
                disabled={amountToInvest >= currentBalance}
              >
                <Icon as={AddIcon} />
              </Button>
            </HStack>
            <Text
              fontSize="14px"
              fontFamily="Inter"
              fontWeight="400"
              lineHeight="22px"
              textAlign="left"
              color="#FFFFFF"
              mt={4}
            >
              Basket Multiple
            </Text>
          </Box>
    <Box
      width="154px"
      // height="73px"
      // top="326px"
      // left="44px"
      textAlign={"center"}
      alignItems={"center"}
      padding="10px 23px 11px 18px"
      borderRadius="8px"
      border="1px solid #565E6C"
      bg=" #262A33"
      p={4}
      boxShadow="0px 2px 5px 0px #171A1F17"
     
    >
      <Box >
      <Text
        fontFamily="Inter"
        fontSize="12px"
        fontWeight="400"
        lineHeight="20px"
       
        textAlign="center"
        color="white" // Change text color as needed
        marginBottom={1} // Add spacing between the two text elements
      >
        {/*Potential UPSIDE*/}
        Potential UPSIDE
      </Text>
      <Text
        fontFamily="Inter"
        fontSize="16px" // You can adjust this size based on your design preference
        fontWeight="500" // Change weight as needed
        lineHeight="20px"
        textAlign="center"
        color="#1DD75B" // Change text color as needed
      >
        {/* {basketData.basketInfo.cagr} */}
      {upsidePotential} ({upsidePotentialPercentage}%)
      </Text>
      </Box>
    </Box>
    </Box>


      
         
      
        </Box>

        <Text
          fontSize="sm"
          fontFamily="Inter"
          fontWeight="noraml"
          lineHeight="22px"
          textAlign="left"
        >
          Basket Minimum Amount : {amountToInvest.toLocaleString('en-IN')}
        </Text>

   

        <Box mt={2}  >
          {/* Brokerage Section */}
          <Box
            display="flex"
            gap={6}

            alignItems="center"
            color={"white"}
            width={"100%"}
            
            justifyContent={"space-between"}
            height="40px"
          >
            <Text
              fontFamily="Inter"
              fontSize="sm"
            
              fontWeight="bold"
              lineHeight="40px"
              textAlign="left"
              height="40px"
              color="white" // Updated height
            >
              Amount :
            </Text>

            <Text
      
              fontFamily="Inter"
              width={'30%'}
              fontSize="sm"
              fontWeight="bold"
              lineHeight="40px"
              textAlign="left"
              height="40px"
              color="white" // Ensure the amountToInvest text is white
            >
              {amountToInvest.toLocaleString('en-IN')}
            </Text>
          </Box>

          <Box
            display="flex"
           
            gap={6}
            alignItems="center"
            color={"white"}
            width={"100%"}
            justifyContent={"space-between"}
            height="40px"
          >
            <Text
              fontFamily="Inter"
              fontSize="sm"
              fontWeight="noraml"
              lineHeight="22px"
              textAlign="left"
              color="white" // Updated height
            >
              Brokerage :
            </Text>

            <Text
              fontFamily="Inter"
              fontSize="sm"
              width={'30%'}
              // fontFamily="Inter"
              fontWeight="noraml"
              lineHeight="22px"
              textAlign="left"
              color="white" // Ensure the amountToInvest text is white
            >
              {brokerage.toLocaleString('en-IN')}
            </Text>
          </Box>

          {/* Other Charges Section */}
          <Box
            mb={4}
            display="flex"
          
            gap={6}
            alignItems="center"
            color={"white"}
            width={"100%"}
            justifyContent={"space-between"}
            height="40px"
          >
            <Text
              fontSize="sm"
              fontFamily="Inter"
              fontWeight="noraml"
              lineHeight="22px"
              textAlign="left"
              color="white" // Updated height
            >
              Other Charges :
            </Text>

            <Text
              fontSize="sm"
              fontFamily="Inter"
              fontWeight="noraml"
              lineHeight="22px"
              textAlign="left"
              width={'30%'}
              // height="40px"
              color="white" // Ensure the amountToInvest text is white
            >
              {othercharges.toLocaleString('en-IN')}
            </Text>
          </Box>

          <Divider
            ml={2}
            mr={2}
            m={"auto"}
            // width="350px" // Sets the width
            border="1px solid #BCC1CA" 
            position="relative"
          />

          {/* Total Section */}
          <Box
            // mb={4}
            display="flex"
          mt={4}
            gap={6}
            alignItems="center"
            color={"white"}
            width={"100%"}
            justifyContent={"space-between"}
            height="40px"
        
        
          >
            <Text
              fontFamily="Inter"
              fontSize="md"
              fontWeight="normal"
              lineHeight="22px"
              textAlign="left"
              height="40px"
              color="white" 
            >
              Total Amt :
            </Text>

            <Text
              fontFamily="Inter"
              fontSize="md"
              fontWeight="400"
            
              lineHeight="22px"
           
              width={'30%'}
              textAlign="left"
              height="40px"
              color="white" 
            >
              {formattedTotal}
            </Text>
          </Box>

          <Divider
            ml={2}
            mr={2}
            m={"auto"}
            // width="350px" // Sets the width
            border="1px solid #BCC1CA" // Adds the solid border with the specified color
            position="relative"
          />

          {/* Current Balance Section */}
          <Box
            mt={4}
            display="flex"
            // gap={6}
            alignItems="center"
           
            color={"white"}
            justifyContent={"space-between"}
            width={"100%"}
            height="40px"
          >
            <Text
              fontFamily="Inter"
              fontSize="md"
              fontWeight="normal"
              lineHeight="22px"
              textAlign="left"
              height="40px"
              color="white" // Updated height
            >
              Current Balance :
            </Text>

            <Text
              fontFamily="Inter"
              fontSize="md"
              fontWeight="400"
              lineHeight="22px"
             
              textAlign="left"
              height="40px"
              width={"30%"}
              color="white" // Ensure the amountToInvest text is white
            >
              {currentBalance.toLocaleString('en-IN')}
            </Text>
          </Box>
        </Box>
      </Box>


      <Box
  border="2px solid #9095A0"
  boxShadow="px 2px 5px 0px #171A1F17, 0px 0px 2px 0px #171A1F1F"
  p={2}
  width="100%" // Ensure the container spans full width
  alignItems="center"
>
{(() => {
  const currentTime = new Date();
  const currentHour = currentTime.getHours();
  const currentMinute = currentTime.getMinutes();
  
  const isMarketOpen = 
    (currentHour > 9 || (currentHour === 9 && currentMinute >= 15)) &&
    (currentHour < 15 || (currentHour === 15 && currentMinute <= 20));

  return !isMarketOpen && (
    <Box p={2} textAlign="center">
      <Text
        fontFamily="Inter"
        fontSize={["10px", "12px"]}
        fontWeight="normal"
        lineHeight={["16px", "18px"]}

        color="#A7ADB7"
      >
        You are placing an{" "}
        <Text as="span" fontWeight="bold" color="white">
          order after market hours
        </Text>{" "}
        for these {props.instrumentList.length} stocks. Your order will be executed on the next market day.
      </Text>
    </Box>
  );
})()}


  <Box
    display="flex"
    justifyContent="center"
    alignItems="center"
    height="100px"
    mt={2}
    width="100%" // Ensure the box spans full width to avoid cutoff
  >
    <Button
      color="#1DD75B"
      border="1px solid #1DD75B"
      variant="outline"
      width={["90%", "80%"]} // Responsive width
      height={["50px", "60px"]}
      _hover={{
        boxShadow: "0 0 10px rgba(29, 215, 91, 0.7)",
        transform: "scale(1.05)",
      }}
      _active={{
        boxShadow: "0 0 15px rgba(29, 215, 91, 1)",
        transform: "scale(0.95)",
      }}
      onClick={handleConfirmOrder}
      isLoading={isSubmitting}
    >
      Confirm Order
    </Button>
  </Box>
</Box>


    </Box>
  );
};

export default InvestmentSection;
