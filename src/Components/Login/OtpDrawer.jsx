import React, { useEffect, useState } from "react";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  PinInput,
  PinInputField,
  HStack,
  Text,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";
import Cookies from "js-cookie";
import { otpSend, otpVarificationClient } from "../../Redux/authReducer/action";
import { useDispatch } from "react-redux";

const OTPDrawer = ({ isOpen, onClose, onFailure, onSuccess, attempts, authToken }) => {
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(60);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const toast = useToast();
  const dispatch = useDispatch();

  // Timer Effect
  useEffect(() => {
    if (isOpen && timer > 0) {
      const countdown = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(countdown);
    }
  }, [isOpen, timer]);

  const basicAuth = "Basic " + btoa("A1" + ":" + "thisisadmin");

  // Handle OTP submission
  const handleSubmitOTP = async () => {
    if (!otp || otp.length < 4) {
      toast({
        title: "Please enter a valid OTP",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await dispatch(otpVarificationClient(otp, authToken));

      if (response.data.status === "success") {
        const { verifiedAccessToken, centrumId, username } = response.data.data;

        Cookies.set("login_token_client", verifiedAccessToken);
        Cookies.set("userId_client", centrumId);
        Cookies.set("username_client", username);
        Cookies.set("login_token_stoqclub", basicAuth);

        toast({
          title: "OTP verified successfully!",
          status: "success",
          duration: 2000,
          isClosable: true,
        });

        onSuccess();

        setTimeout(() => {
          toast({
            title: "Login successful",
            status: "success",
            duration: 2000,
            isClosable: true,
          });
        }, 1000);
      } else {
        handleFailure(response.data.message);
      }
    } catch (error) {
      toast({
        title: "Failed to verify OTP",
        description: "An error occurred",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle OTP expiration or invalid OTP
  const handleFailure = (message) => {
    onFailure();
    setIsSubmitting(false);

    let toastStatus = message === "OTP Expired" ? "warning" : "error";
    toast({
      title: message,
      status: toastStatus,
      duration: 2000,
      isClosable: true,
    });
  };

  // Handle OTP Resend
  const handleResendOTP = async () => {
    try {
      await dispatch(otpSend(authToken));

      toast({
        title: "OTP sent to your registered email!",
        position: "bottom",
        status: "success",
        duration: 2000,
        isClosable: true,
      });

      setTimer(60);
      setIsSubmitting(false);
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
    <Drawer isOpen={isOpen} placement="bottom" onClose={onClose} size="full">
      <DrawerOverlay />
      <DrawerContent bg="#171A1F" borderTopRadius="lg">
        <DrawerCloseButton color="white" />
        <DrawerHeader color="white">Enter OTP</DrawerHeader>
        <DrawerBody>
          <Stack spacing={6} align="center">
            <HStack spacing={4} justify="center">
              <PinInput
                value={otp}
                onChange={setOtp}
                size="lg"
                focusBorderColor="blue.500"
              >
                {[...Array(4)].map((_, index) => (
                  <PinInputField
                    key={index}
                    bg="gray.800"
                    color="white"
                    borderColor="blue.600"
                  />
                ))}
              </PinInput>
            </HStack>
            <Text mt={4} color="gray.400">
              Time remaining: {timer} seconds
            </Text>
            <Text color="white">You have attempt {attempts}/3.</Text>
            <Button
              variant="link"
              colorScheme="blue"
              onClick={handleResendOTP}
              isDisabled={timer === 60} // Disable resend if timer has just started
            >
              Resend OTP
            </Button>
          </Stack>
        </DrawerBody>
        <DrawerFooter justifyContent="space-between">
          <Button color="white" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
          color={"#1DD75B"}
          border={"1px solid #1DD75B"}
            variant="outline"
            _hover={{
              boxShadow: "0 0 10px rgba(29, 215, 91, 0.7)",
              transform: "scale(1.05)",
            }}
            _active={{
              boxShadow: "0 0 15px #1DD75B",
              transform: "scale(0.95)",
            }}
            onClick={handleSubmitOTP}
            isDisabled={timer === 0 || isSubmitting}
            isLoading={isSubmitting}
            rightIcon={<CheckIcon />}
          >
            Submit
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default OTPDrawer;
