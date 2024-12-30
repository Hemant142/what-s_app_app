import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  FormControl,
  Text,
  useToast,
  InputGroup,
  PinInput,
  PinInputField,
  HStack,
} from "@chakra-ui/react";
import Cookies from "js-cookie";
import { AiOutlineLock } from "react-icons/ai"; // Importing lock icon
import { useDispatch } from "react-redux";
import { otpSend, otpVarificationClient } from "../../Redux/authReducer/action";
import { useNavigate } from "react-router-dom";

const OtpVerification = ({ onVerify, authToken, onResend }) => {
//   const id='66ed3d8ef9b8a3af370f10bf'  

  const [otp, setOtp] = useState("");
  const [countdown, setCountdown] = useState(60); // Start with a 60-second timer for resend
  const [error, setError] = useState("");
  const toast = useToast();
  const dispatch = useDispatch();
  const navigate=useNavigate()
  const basicAuth = "Basic " + btoa("A1" + ":" + "thisisadmin");
  // Countdown for resend button
  let basketId = Cookies.get('basketId');



  useEffect(() => {
    if (countdown > 0) {
      const timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [countdown]);

  const handleOtpComplete = (value) => {
    setOtp(value);
    setError(""); // Clear error on new input
    if (value.length === 4) {
      handleOtpVerify(value); // Pass 'value' instead of 'otp'
    }
  };
  

  const handleOtpVerify = async (otp) => {
    if (!otp || otp.length < 4) {
      toast({
        title: "Please enter a valid OTP",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      return;
    }
  

    try {
      const response = await dispatch(otpVarificationClient(otp, authToken));

      if (response.data.status === "success") {
        const { otp_access_token, centrumId, username } = response.data.data;

        // Store tokens and user data in cookies
        Cookies.set("whats_app_token", otp_access_token);
        Cookies.set("userId_client", centrumId);
        Cookies.set("username_client", username);

        toast({
          title: "OTP verified successfully!",
          status: "success",
          duration: 2000,
          isClosable: true,
        });

        // // Retrieve the basketId from localStorage after login
        // const storedBasketId = localStorage.getItem('basketIdToRedirect');
        // if (storedBasketId) {
        //   // Remove basketId from localStorage to prevent reuse
        //   localStorage.removeItem('basketIdToRedirect');
        //   // Redirect to the BasketDetails page with the id
        //   navigate(`/basket/${basketId}`);
        // } else {
        //   // If no basketId is found, redirect to the login page or show an error
        //   toast({
        //     title: "Error: Missing Basket ID",
        //     description: "You will be redirected to login.",
        //     status: "error",
        //     duration: 3000,
        //     isClosable: true,
        //   });
        //   // Redirect to login page since basketId is missing
        //   navigate("/login");
        // }

        navigate(`/basket/${basketId}`);
      } else {
        toast({
          title: response.data.message,
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.log(error,"Error")
      toast({
        title: "Failed to verify OTP",
        description: "An error occurred",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };



//   const handleResendOTP = async () => {
//     try {
//       onResend(); // Call resend OTP function
//       toast({
//         title: "OTP sent to your registered email!",
//         position: "bottom",
//         status: "success",
//         duration: 2000,
//         isClosable: true,
//       });
//       setCountdown(60); // Reset the timer to 60 seconds
//     } catch (error) {
//       toast({
//         title: "Failed to send OTP",
//         position: "bottom",
//         status: "error",
//         duration: 2000,
//         isClosable: true,
//       });
//     }
//   };



 // Handle OTP Resend
 const handleResendOTP = async () => {
    try {
      await dispatch(otpSend(authToken));
setOtp("")
      toast({
        title: "OTP sent to your registered mobile!",
        position: "bottom",
        status: "success",
        duration: 2000,
        isClosable: true,
      });

    //   setTimer(60);
    //   setIsSubmitting(false);
    } catch (error) {
      toast({
        title: "Failed to send OTP",
        position: "bottom",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };
  


  return (
    <Box
    bg="#262A33"
    borderRadius="md"
    border="1px solid #BCC1CA"
    width={{ base: "100%", md: "400px" }} // Responsive width for mobile and larger screens
    boxShadow="0px 2px 5px rgba(0, 0, 0, 0.2)"
    p={4}
    as="form"
    mt="auto"
    mx="auto" // Centers the box on mobile screens
    display="flex"
    flexDirection="column"
    justifyContent="center"
    alignItems="center" // Center items
  >
    {/* Header */}
    <Box textAlign="center" mb={6}>
      <Box
        border="3px solid #DEE1E6"
        width="50px"
        bg="#DEE1E6"
        height="5px"
        mt={2}
        mx="auto"
        mb={2}
      />
      <Text
        fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif"
        fontSize={{ base: "20px", md: "25px" }} // Adjust font size based on screen size
        fontWeight="bold"
        color="white"
        lineHeight="36px"
      >
        Login
      </Text>
    </Box>
  
    <Box textAlign="center" my={4}>
      <Text
        fontSize={{ base: "12px", md: "14px" }} // Adjust font size for readability on small screens
        lineHeight="22px"
        textAlign="center"
        fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif"
      >
        Please enter the verification code <strong>we sent to your mobile address</strong> to complete the verification process.
      </Text>
    </Box>
  
    {/* Form Controls */}
    <Box p={4} width="full">
      <FormControl id="otp" isRequired mb={4}>
        <InputGroup justifyContent="center">
          <HStack spacing={6} justify="center" alignItems="center">
            <PinInput
              value={otp}
              onChange={handleOtpComplete}
              fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif"
              size="lg"
              focusBorderColor="#1DD75B"
            >
              {[...Array(4)].map((_, index) => (
                <PinInputField
                  fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif"
                  key={index}
                  bg="white"
                  color="black"
                  borderColor="#1DD75B"
                  borderRadius="md"
                  height={{ base: "50px", md: "60px" }} // Adjust height for mobile screens
                  width={{ base: "50px", md: "60px" }} // Adjust width for mobile screens
                  fontSize={{ base: "xl", md: "2xl" }} // Adjust font size for better readability
                />
              ))}
            </PinInput>
          </HStack>
        </InputGroup>
      </FormControl>
  
      {/* Error Message */}
      {error && (
        <Text
          color="red.400"
          fontSize="14px"
          textAlign="center"
          mb={2}
          fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif"
        >
          {error}
        </Text>
      )}
  
      {/* Resend OTP Button */}
      <Button
        color="#1DD75B"
        border="1px solid #1DD75B"
        size="lg"
        w="full"
        variant="outline"
        onClick={onResend}
        fontWeight="normal"
        borderRadius="md"
        py={6}
        mt={4}
        isDisabled={countdown > 0} // Disable button if countdown is active
        _hover={{
          boxShadow: "0 0 10px #1DD75B",
          transform: "scale(1.05)",
          bg: "rgba(29, 215, 91, 0.05)",
        }}
        _active={{
          boxShadow: "0 0 12px #1DD75B",
          transform: "scale(0.95)",
        }}
      >
        {countdown > 0 ? `Resend OTP in ${countdown}s` : "Resend OTP"}
      </Button>
    </Box>
  </Box>
  
  );
};

export default OtpVerification;
