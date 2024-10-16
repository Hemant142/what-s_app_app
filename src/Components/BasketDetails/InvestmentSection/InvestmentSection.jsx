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
  const minReqAmt = parseInt(props.minReq);
  const currentBalance = parseInt(props.currentBalance);
  // const instrumentList=  parseInt(props.instrumentList);
  // const { id } = useParams();
  const [showInvestmentOptions, setShowInvestmentOptions] = useState(false);
  const [amountToInvest, setAmountToInvest] = useState(minReqAmt);
  const [lots, setLots] = useState(1); // Initial lot size as 1
  const [apiLoader, setApiLoader] = useState(false);
  const [brokerage, setBrokerage] = useState(0);
  const [othercharges, setOtherCharges] = useState(0);
  const [total, setTotal] = useState(0);
  const [rating, setRating] = useState(null);
  const [tempRating,setTempRating] =useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false);
 const basketId=props.basketId
 let token =Cookies.get('whats_app_token')
 let userName = Cookies.get("user-name");

  const location = useLocation();

  const dispatch = useDispatch();
  console.log(currentBalance, "currentBalance");
  




  useEffect(() => {
    setTotal(brokerage + othercharges + amountToInvest);
  }, [brokerage, othercharges,lots]);

  
  useEffect(() => {
    setBrokerage(345);
    setOtherCharges(237);
  }, []);


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

    if (newAmount <= currentBalance) {
      setLots(newLots);
      setAmountToInvest(newAmount);
    } else {
      handleInsufficientBalance("Cannot exceed current balance.");
    }
  };

  const decreaseLot = () => {
    if (lots > 1) {
      const newLots = lots - 1;
      const newAmount = minReqAmt / newLots;
      setLots(newLots);
      setAmountToInvest(newAmount);
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
        title: 'Warning',
        description: "Your total exceeds your current balance.",
        status: 'warning',
        duration: 5000,
        isClosable: true,
      });
      return;
    }
// console.log(basketId,lots,token)
    // Cookies.set('whats_app_token',"")
    // Cookies.set('basketId',"")
    dispatch(OrderPlaced(basketId,lots,token))
    .then((res)=>{
      console.log(res,"REsponse")
      
    })
    .catch((error)=>{
      console.log(error,"error confirm order ")
    })

    
    toast({
      duration: 10000,
      position: 'bottom',
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


};

const handleStarClick = (starRating) => {
  setRating(starRating); // Set rating immediately
};

  return (
    <Box>

<Box
      className="investment-section"
      p={5}
      // borderWidth="1px"
      // borderRadius="lg"
      // boxShadow="lg"
    >
     

  
     <Box
        // mt={2}
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


      {/* <Text
        fontSize="lg"
        fontFamily="Inter"
        fontWeight="400"
        lineHeight="22px"
        textAlign="left"
      >
        Basket Minimum Amount: ₹{minReqAmt}
      </Text> */}
   

      {/* <Box display={"flex"} justifyContent={"space-between"}>
        <Text
          fontSize="14px"
          fontFamily="Inter"
          fontWeight="400"
          lineHeight="22px"
          textAlign="left"
          color="#FFFFFF"
          mt={4}
        >
          Amount: <strong>₹{amountToInvest}</strong>
        </Text>
        <Text
          fontSize="14px"
          fontFamily="Inter"
          fontWeight="400"
          lineHeight="22px"
          textAlign="left"
          color="#FFFFFF"
          mt={4}
        >
          Current Balance: <strong>₹{currentBalance}</strong>
        </Text>
        <Text fontSize="lg"></Text>
      </Box> */}

      <Box display={"flex"} justifyContent={"space-between"}mt={4} mb={6}>
        <Box>
          <HStack spacing={4} mt={4}>
            <Button
              colorScheme="white"
              variant="outline"
              _hover={{
                boxShadow: "0 0 10px white",
                transform: "scale(1.05)",
              }}
              size="md"
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
              //   bg="white"
              fontWeight="bold"
            />
            <Button
              size="md"
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
        {/* <Box mt={4}>
          <Button
            color={"#1DD75B"}
            size="lg"
            height="60px" // Increase button height
            width="160px" // Increase button width
            border={"1px solid #1DD75B"}
            variant="outline"
            _hover={{
              boxShadow: "0 0 10px rgba(29, 215, 91, 0.7)",
              transform: "scale(1.05)",
            }}
            _active={{
              boxShadow: "0 0 15px rgba(29, 215, 91, 1)",
              transform: "scale(0.95)",
            }}
            onClick={handleBuyClick}
            isLoading={apiLoader}
          >
            Invest
          </Button>
        </Box> */}
      </Box>


        <Text
        fontSize="sm"
        fontFamily="Inter"
        fontWeight="noraml"
        lineHeight="22px"
        textAlign="left"
      >
        Basket Minimum Amount : {amountToInvest}
      </Text>

     
      {/* <Divider
        ml={2}
        mr={2}
        m={"auto"}
        width="350px" // Sets the width
        border="1px solid #BCC1CA" // Adds the solid border with the specified color
        position="relative"
      /> */}

      <Box mt={2} p={2}>
        {/* Brokerage Section */}
        <Box
          display="flex"
          gap={6}
          alignItems="center"
          color={"white"}
          width={"60%"}
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
            fontSize="sm"
            fontWeight="bold"
            lineHeight="40px"
            textAlign="right"
            height="40px"
            color="white" // Ensure the amountToInvest text is white
          >
            {amountToInvest}
          </Text>
        </Box>


        <Box
          display="flex"
          gap={6}
          alignItems="center"
          color={"white"}
          width={"60%"}
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
            // fontFamily="Inter"
            fontWeight="noraml"
            lineHeight="22px"
            textAlign="left"
            color="white" // Ensure the amountToInvest text is white
          >
            {brokerage}
          </Text>
        </Box>

        {/* Other Charges Section */}
        <Box
          mb={4}
          display="flex"
          gap={6}
       
          alignItems="center"
          color={"white"}
          width={"60%"}
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
         
            textAlign="right"
            // height="40px"
            color="white" // Ensure the amountToInvest text is white
          >
            {othercharges}
          </Text>
        </Box>

        <Divider
          ml={2}
          mr={2}
          m={"auto"}
          width="350px" // Sets the width
          border="1px solid #BCC1CA" // Adds the solid border with the specified color
          position="relative"
        />

        {/* Total Section */}
        <Box
          mt={4}
          display="flex"
          gap={6}
          alignItems="center"
          color={"white"}
          justifyContent={"space-between"}
          width={"70%"}
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
            Total Amt :
          </Text>

          <Text
            fontFamily="Inter"
            fontSize="md"
            fontWeight="400"
            lineHeight="22px"
            textAlign="right"
            height="28px"
            color="white" // Ensure the amountToInvest text is white
          >
            ₹ {formattedTotal}
          </Text>
        </Box>

        <Divider
          ml={2}
          mr={2}
          m={"auto"}
          width="350px" // Sets the width
          border="1px solid #BCC1CA" // Adds the solid border with the specified color
          position="relative"
        />

        {/* Current Balance Section */}
        <Box
          mt={4}
          display="flex"
          gap={6}
          alignItems="center"
          color={"white"}
          justifyContent={"space-between"}
          width={"70%"}
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
            textAlign="right"
            height="28px"
            color="white" // Ensure the amountToInvest text is white
          >
            ₹ {currentBalance}
          </Text>
        </Box>
      </Box>


     

    </Box>
       <Box
         position="relative" // Fix the box at the bottom of the screen
         bottom="0" // Align it to the bottom
         left="0" // Make sure it spans the full width
         right="0"
         border="2px solid #9095A0"
         boxShadow="0px 2px 5px 0px #171A1F17, 0px 0px 2px 0px #171A1F1F"
         p={4}
         width={"100%"}
         alignItems={"center"}
      >
        <Box
          // left="20px"
          p={2}
        >
          <Text
            fontFamily="Inter"
            fontSize="12px"
            fontWeight="noral"
            lineHeight="18px"
            textAlign="left"
            color="#A7ADB7"
          >
            You are placing an order after market hours for these 3 stocks. Your
            order will be executed on next market day.
          </Text>
        </Box>

        <Box
          margin="auto"
          display="flex" // Enable Flexbox
          justifyContent="center" // Center the button horizontally
          alignItems="center" // Center the button vertically
          height="100px" // Set a height to ensure vertical centering
        >
          <Button
           color={"#1DD75B"}
           border={"1px solid #1DD75B"}
            variant="outline"
            width={"80%"}
            height={"60%"}
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
