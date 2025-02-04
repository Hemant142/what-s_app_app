import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Input,
  FormControl,
  FormLabel,
  Text,
  useToast,
  Image,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import OtpVerification from "../Components/Login/OtpVerification";
import { AiOutlineUser, AiOutlineIdcard } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { clientToken, otpSend, otpVarificationClient } from "../Redux/authReducer/action";
import Logo from "../Assets/logo.png";

const Login = () => {
  const [userId, setUserId] = useState("");
  const [panCard, setPanCard] = useState("");
  const [authToken, setAuthToken] = useState(null);
  const [isOTPDrawerOpen, setIsOTPDrawerOpen] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [lockoutTimer, setLockoutTimer] = useState(0);
  const toast = useToast();
  const dispatch = useDispatch();
  const navigate=useNavigate()
  const { id } = useParams();
  const token = Cookies.get('whats_app_token');

 

  useEffect(() => {
    if (id) {
    
        // If basketId is present, set it in cookies
        Cookies.set("basketId", id);
     
    }
    if(token&&id){
      navigate(`/basket/${id}`)
    }
   

  }, [id,token]);

  // Handle 5-minute lockout timer
  useEffect(() => {
    if (lockoutTimer > 0) {
      const countdown = setInterval(() => {
        setLockoutTimer((prev) => {
          if (prev === 1) {
            setAttempts(0); // Reset attempts to 0 when timer reaches 0
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(countdown);
    }
  }, [lockoutTimer]);

  const handleLogin = () => {
    if (userId && panCard) {
      const data = {
        userId: userId,
        panCard: panCard,
      };
   

      // Dispatch action and handle the promise
      dispatch(clientToken(data))
      .then((res) => {
console.log(res,"clientToken")
   Cookies.set('userId',userId)
          // setIsOTPDrawerOpen(true); // Open OTP drawer if login is successful
          if(res.data.status==="failed"){
            toast({
              title: res.data.message,
              position: "bottom",
              status: "error",
              duration: 2000,
              isClosable: true,
            });
          }
          if(res.data.status==="success"&&res.data.data.otp_access_token){
            
            let token=res.data.data.otp_access_token
       
            setAuthToken(token)
            toast({
              title: "Please Wait",
              position: "bottom",
              status: "success",
              duration: 2000,
              isClosable: true,
            });
  
            toast({
                      title: "OTP sent to your registered Mobile!",
                      position: "bottom",
                      status: "success",
                      duration: 2000,
                      isClosable: true,
                    });
                    setIsOTPDrawerOpen(true)
            // Send OTP request using the Bearer token
          // dispatch(otpSend(token))
          //     .then((otpResponse) => {
              
          //       toast({
          //         title: "OTP sent to your registered Mobile!",
          //         position: "bottom",
          //         status: "success",
          //         duration: 2000,
          //         isClosable: true,
          //       });
          //       setIsOTPDrawerOpen(true)
             
              
               
               
          //     })
          //     .catch((otpError) => {
          //       toast({
          //         title: "Failed to send OTP",
          //         position: "bottom",
          //         status: "error",
          //         duration: 2000,
          //         isClosable: true,
          //       });
          //     });
          }
       
        
      })
      .catch((error) => {
        console.log(error, "Error");
        toast({
          title: "Login failed.",
          description: error.message || "An error occurred.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      });
    } else {
      toast({
        title: "Please fill in all fields.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const resendOTP = ()=>{
    handleLogin()
    console.log("resending OTP")
  }
  // Handle OTP verification
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
        const { verifiedAccessToken, centrumId, username } = response.data.data;

        Cookies.set("whats_app_token", verifiedAccessToken);

        Cookies.set("userId_client", centrumId);
        Cookies.set("username_client", username);

        toast({
          title: "OTP verified successfully!",
          status: "success",
          duration: 2000,
          isClosable: true,
        });

        // Redirect or do something after successful login
        setTimeout(() => {
          toast({
            title: "Login successful",
            status: "success",
            duration: 2000,
            isClosable: true,
          });
        }, 1000);
      } else {
        toast({
          title: response.data.message,
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "Failed to verify OTP",
        description: "An error occurred",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  return (
    <Box
    display="flex"
    flexDirection="column"
    justifyContent="space-between"
    bg="#171A1F"
    height="100vh"
    // p={{ base: "4", md: "6" }} // Padding changes based on screen size
  >
    {/* Logo Section */}
    <Box as="header" width="100%" textAlign="center" mb={{ base: 4, md: 6 }}>
      <Image
        src={Logo}
        alt="Logo"
        mt={{ base: "10%", md: "5%" }}
        width={{ base: "70%", md: "85%" }} // Adjust width for responsiveness
        mx="auto"
        mb={4}
      />
    </Box>

    {/* OTP Verification Component */}
    {isOTPDrawerOpen ? (
      <OtpVerification onVerify={handleOtpVerify} authToken={authToken} onResend={resendOTP} />
    ) : (
      <Box
        bg="#262A33"
        borderRadius="md"
        border="1px solid #BCC1CA"
        width={{ base: "100%", md: "80%", lg: "50%" }} // Responsive width
        mx="auto"
        boxShadow="0px 2px 5px rgba(0, 0, 0, 0.2)"
        p={4}
        as="form"
        mt="auto"
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
            fontSize={{ base: "20px", md: "25px" }} // Responsive font size
            fontWeight="bold"
            color="white"
            lineHeight={{ base: "28px", md: "36px" }} // Responsive line height
          >
            Login
          </Text>
        </Box>

        {/* Form Controls */}
        <Box p={{ base: 2, md: 4 }}>
          <FormControl id="userId" isRequired mb={4}>
            <FormLabel color="#FFFFFF">User ID</FormLabel>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <AiOutlineUser size={24} color="#BCC1CA" />
              </InputLeftElement>
              <Input
                value={userId}
                fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif"
                onChange={(e) => setUserId(e.target.value.toUpperCase())}
                placeholder="Enter UserID"
                color="white"
                _placeholder={{ color: "white.500" }}
                focusBorderColor="#1DD75B"
                borderColor="#1DD75B"
                borderRadius="md"
                fontSize={{ base: "md", md: "lg" }} // Responsive font size
                px={4}
                py={3}
                _hover={{ borderColor: "#1DD75B" }}
              />
            </InputGroup>
          </FormControl>

          <FormControl id="panCard" isRequired mb={8}>
            <FormLabel color="#FFFFFF">PAN</FormLabel>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <AiOutlineIdcard size={24} color="#BCC1CA" />
              </InputLeftElement>
              <Input
                value={panCard}
                onChange={(e) => setPanCard(e.target.value.toUpperCase())}
                placeholder="Enter PAN Card Number"
                color="white"
                _placeholder={{ color: "white.500" }}
                focusBorderColor="#1DD75B"
                borderColor="#1DD75B"
                borderRadius="md"
                fontSize={{ base: "md", md: "lg" }} // Responsive font size
                px={4}
                py={3}
                _hover={{ borderColor: "#1DD75B" }}
              />
            </InputGroup>
          </FormControl>

          {/* Button */}
          <Button
            color="#1DD75B"
            fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif"
            border="1px solid #1DD75B"
            size="lg"
            w="full"
            variant="outline"
            onClick={handleLogin}
            fontWeight="normal"
            borderRadius="md"
            py={6}
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
            Get OTP
          </Button>
        </Box>
      </Box>
    )}
  </Box>
  );
};

export default Login;
