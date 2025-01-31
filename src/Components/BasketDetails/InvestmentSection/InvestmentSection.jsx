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
  const upsidePotential = parseFloat(props.upsidePotential);


  
const upsidePotentialPercentage=parseInt(props.upsidePotentialPercentage)
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
  // const [upsidePotential,setUpsidePotential]=useState(0)
  const [newUpsidePotential,setNewUpsidePotential]=useState(upsidePotential)
  const [bufferAmount,setBufferAmount]=useState(0)
  // const [isMarketOpen,setisMarketOpen]=useState(false)
  const [isMarketOpen, setIsMarketOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState(900); // 15 minutes = 900 seconds

  const basketId = props.basketId || ''; // Ensure a default value if props.basketId is undefined
  let token = Cookies.get("whats_app_token");
  let userName = Cookies.get("user-name");

  // Update total amount when amountToInvest, brokerage, or other charges change
  useEffect(() => {
    setTotal(brokerage + othercharges + amountToInvest);
if(brokerage + othercharges + amountToInvest){
  const result =Math.floor(0.05*(brokerage + othercharges + amountToInvest))

  setBufferAmount(result)
}


  }, [brokerage, othercharges, amountToInvest]);

  // Optional: Use this effect if `minReqAmt` changes during the lifecycle of the component
  useEffect(() => {
    if (minReqAmt) {
      setAmountToInvest(minReqAmt);
    }
  }, [minReqAmt]);


  // useEffect(() => {
  //   const checkTimeAndDate = () => {
  //     const now = new Date();
  
  //     // Get the current UTC time
  //     const utcHours = now.getUTCHours();
  //     const utcMinutes = now.getUTCMinutes();
  
  //     // Convert UTC time to Indian Standard Time (IST) by adding 5 hours 30 minutes
  //     const istHours = utcHours + 5;
  //     const istMinutes = utcMinutes + 30;
  
  //     // Adjust for overflow if minutes exceed 60
  //     let currentISTHours = istHours;
  //     let currentISTMinutes = istMinutes;
  //     if (istMinutes >= 60) {
  //       currentISTHours += 1;
  //       currentISTMinutes = istMinutes - 60;
  //     }
  
  //     // Adjust for overflow if hours exceed 24 (next day)
  //     if (currentISTHours >= 24) {
  //       currentISTHours = currentISTHours - 24;
  //     }
  
  //     // Convert the time to minutes from midnight (IST)
  //     const currentTimeInMinutes = currentISTHours * 60 + currentISTMinutes;
  
  //     const marketOpenTime = 9 * 60 + 15; // 9:15 AM IST in minutes
  //     const marketCloseTime = 15 * 60 + 20; // 3:20 PM IST in minutes
  
  //     // Get the current day in IST (0 = Sunday, 6 = Saturday)
  //     const istDay = (now.getUTCDay() + 5 / 24 + 30 / 1440) % 7; // Adjust for IST day offset
  
  //     // Check if it's a weekday (Monday to Friday)
  //     if (istDay >= 1 && istDay <= 5) {
  //       // Check if the current time is between market open and close times in IST
  //       if (currentTimeInMinutes >= marketOpenTime && currentTimeInMinutes <= marketCloseTime) {
  //         setisMarketOpen(true);  // Market is open
  //       } else {
  //         setisMarketOpen(false);  // Market is closed
  //       }
  //     } else {
  //       setisMarketOpen(false);  // It's a weekend
  //     }
  //   };
  
  //   checkTimeAndDate();
  // }, []);
  
  useEffect(() => {
    const checkTimeAndDate = () => {
      // Get current time in IST directly
      const nowIST = new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" });
      const now = new Date(nowIST);

      const currentISTHours = now.getHours(); // Get IST hours
      const currentISTMinutes = now.getMinutes(); // Get IST minutes
      const currentDay = now.getDay(); // Get IST day (0 = Sunday, 6 = Saturday)

      console.log(currentISTHours, "currentISTHours");
      console.log(currentISTMinutes, "currentISTMinutes");

      // Convert the time to minutes from midnight (IST)
      const currentTimeInMinutes = currentISTHours * 60 + currentISTMinutes;
      const marketOpenTime = 9 * 60 + 15; // 9:15 AM IST in minutes
      const marketCloseTime = 15 * 60 + 20; // 3:20 PM IST in minutes

      console.log(marketOpenTime, "marketOpenTime");
      console.log(currentTimeInMinutes, "currentTimeInMinutes");

      // Check if it's a weekday (Monday to Friday)
      if (currentDay >= 1 && currentDay <= 5) {
        // Check if the current time is between market open and close times in IST
        if (currentTimeInMinutes >= marketOpenTime && currentTimeInMinutes <= marketCloseTime) {
          setIsMarketOpen(true); // Market is open
        } else {
          setIsMarketOpen(false); // Market is closed
        }
      } else {
        setIsMarketOpen(false); // It's a weekend
      }
    };

    checkTimeAndDate();
  }, []);
  
  useEffect(() => {
    if (token) {
      const timerId = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timerId); // Stop the timer when it reaches 0

            // Show toast notification
            toast({
              title: "Session expired",
              description: "Your session has expired due to inactivity.",
              status: "error",
              duration: 5000, // Show toast for 5 seconds
              isClosable: true,
            });

            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);

      // Cleanup function to clear interval when component unmounts
      return () => clearInterval(timerId);
    }
  }, [token, toast]);

  // Format time as MM:SS
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
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

    if (newAmount <= currentBalance) {
      setLots(newLots);
      setAmountToInvest(newAmount);
      setNewUpsidePotential(newUpsidePotential)

    } else {
      handleInsufficientBalance("Cannot exceed current balance.");
    }
  };

  const decreaseLot = () => {
    if (lots > 1) {
      const newLots = lots - 1;
      const newAmount = minReqAmt / newLots;
      const latestUpsidePotential=parseFloat((newUpsidePotential-upsidePotential).toFixed(2))
   
      setLots(newLots);
      setAmountToInvest(newAmount);
      setNewUpsidePotential(latestUpsidePotential)
   
    } else {
      handleInvalidAmount("Cannot have less than one lot.", minReqAmt);
    }
  };

  // Use fallback values to prevent errors
  const formattedAmountToInvest = (amountToInvest || 0).toLocaleString();
  const formattedTotal = (total || 0).toLocaleString();



  const handleConfirmOrder = () => {
    setIsSubmitting(true)
    // if (total > currentBalance) {
    //   toast({
    //     title: "Warning",
    //     description: "Your total exceeds your current balance.",
    //     status: "warning",
    //     duration: 5000,
    //     isClosable: true,
    //   });
    //   return;
    // }
 
    dispatch(OrderPlaced(basketId, lots, token))
      .then((res) => {

        if(res.data.status==="failed"){
          setIsSubmitting(false)
          toast({
            title: "",
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
             // Set a timer to navigate back after 10 seconds
             setTimeout(() => {
              setIsSubmitting(false)
              navigate(`/${basketId}`); // Redirect to /basketId
            }, 10000); // 10 seconds delay
    
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



  // const currentTime = new Date();
  // const currentHour = currentTime.getHours();
  // const currentMinute = currentTime.getMinutes();
  
  // const isMarketOpen = 
  //   (currentHour > 9 || (currentHour === 9 && currentMinute >= 15)) &&
  //   (currentHour < 15 || (currentHour === 15 && currentMinute <= 20));

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
        {token && (
        <Text
          fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif"
          
          fontSize="14px"
          fontWeight="400"
          lineHeight="22px"
          textAlign="left"
          color="#117B34"
        >
          Complete your transaction in {formatTime(timeLeft)} before the session expires
        </Text>
      )}
        </Box>
      <Box
 
        className="investment-section"
        p={5}
        // borderWidth="1px"
        // borderRadius="lg"
        // boxShadow="lg"
      >
       


  
        <Box display={"flex"} justifyContent={"space-between"} mt={4} mb={6}>
        

        <Box 
  display="flex" 
  width="100%" 
  justifyContent="space-between" 
  gap={[2,4]} 
  mt={4} 
 
>
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
        fontFamily={"system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif"}
        textAlign="center"
        width="50px"
        size="sm"
        fontWeight="bold"
      />
      <Button
        size="sm"
        color="#1DD75B"
        border="1px solid #1DD75B"
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
    minWidth={["140px", "144px", "154px"]}
    height="73px"  // Set the height for uniformity
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
      fontSize={["10px", "12px", "14px"]} // Responsive font size for small to large screens
      fontWeight="400"
      lineHeight="20px"
      textAlign="center"
      color="white"
      marginBottom={1}
    >
      Potential UPSIDE
    </Text>
    <Text
      fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif"
      fontSize={["14px", "16px", "18px"]} // Responsive font size based on screen size
      fontWeight="500"
      lineHeight="20px"
      textAlign="center"
      color="#1DD75B"
      whiteSpace="nowrap"
      overflow="hidden"
      textOverflow="ellipsis" // Handle overflow with ellipsis for long text
    >
      {newUpsidePotential===0?upsidePotential:newUpsidePotential} ({upsidePotentialPercentage.toLocaleString('en-IN')}%)
    </Text>
  </Box>
</Box>



      
         
      
        </Box>

        <Text
          fontSize="sm"
          fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif"
          fontWeight="noraml"
          lineHeight="22px"
          textAlign="left"
        >
          Basket Minimum Amount : {minReqAmt.toLocaleString('en-IN')}
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
              // fontFamily="Inter"
              fontSize="sm"
             fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif"
      
              fontWeight="bold"
              lineHeight="40px"
              textAlign="left"
              height="40px"
              color="white" // Updated height
            >
              Amount :
            </Text>

            <Text
      
              fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif"
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
              fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif"
              fontSize="sm"
              fontWeight="noraml"
              lineHeight="22px"
              textAlign="left"
              color="white" // Updated height
            >
            Approx Brokerage :
            </Text>

            <Text
              fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif"
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
              fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif"
              fontWeight="noraml"
              lineHeight="22px"
              textAlign="left"
              color="white" // Updated height
            >
            Approx Other Charges :
            </Text>

            <Text
              fontSize="sm"
              fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif"
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
              fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif"
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
              fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif"
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
              fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif"
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
              fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif"
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
  margin={"auto"}
  width="98%" // Ensure the container spans full width
  alignItems="center"
>
{ !isMarketOpen && (
    <Box p={2} textAlign="left">
      <Text
        fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif"
        fontSize={["10px", "12px"]}
        fontWeight="normal"
        lineHeight={["16px", "18px"]}

        color="#A7ADB7"
      >
        You are placing an{" "}
        <Text as="span" fontWeight="bold"
        fontFamily={"system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif"}
        color="white">
          order after market hours
        </Text>{" "}
        for these {props.instrumentList.length} stocks. Your order will be executed on the next market day.  Please keep some  
        <Text as="span" fontWeight="bold"
        fontFamily={"system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif"}
        color="white">
        {" "}   buffer amount of {bufferAmount} {" "}
        </Text>
     
        
        
        
        for next day market movement.
      </Text>
    </Box>
  )}


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
      fontFamily={"system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif"}
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
