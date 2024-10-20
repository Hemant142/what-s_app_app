// CustomToast.js
import React, { useEffect, useState } from "react";
import {
  Box,
  HStack,
  Icon,
  IconButton,
  Text,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import { FaCircleCheck, FaStar } from "react-icons/fa6";
import { CiCircleCheck } from "react-icons/ci";

const CustomToast = ({ userName, rating, handleStarClick, onClose }) => {
  const [tempRating, setTempRating] = useState(0);
  const [orderStatus, setOrderStatus] = useState("Pending"); // Default status as 'Pending'
  const [countdown, setCountdown] = useState(10); // Countdown state for 10 seconds

  useEffect(() => {
    const currentTime = new Date();
    const currentHours = currentTime.getHours();
    const currentMinutes = currentTime.getMinutes();

    // Convert 9:15 AM to 3:20 PM into minutes for easier comparison
    const startTime = 9 * 60 + 15; // 9:15 AM
    const endTime = 15 * 60 + 20; // 3:20 PM
    const currentTimeInMinutes = currentHours * 60 + currentMinutes;

    // Check if current time is within the market hours
    if (currentTimeInMinutes >= startTime && currentTimeInMinutes <= endTime) {
      setOrderStatus("Completed");
    } else {
      setOrderStatus("Pending");
    }
  }, []);

  useEffect(() => {
    // Timer for 10-second countdown
    const timer = setInterval(() => {
      setCountdown((prevCountdown) => {
        if (prevCountdown > 1) {
          return prevCountdown - 1;
        } else {
          clearInterval(timer); // Stop the timer at 0
          onClose(); // Close the toast after 10 seconds
          return 0;
        }
      });
    }, 1000);

    return () => clearInterval(timer); // Cleanup the interval on component unmount
  }, [onClose]);

  return (
    <Box
      bg="#262A33"
      borderRadius="md"
      width={"100%"}
      border="1px solid #BCC1CA"
      boxShadow="0px 2px 5px rgba(0, 0, 0, 0.2)"
      p={4}
      position="relative"
    >
      {/* Close Button */}
      <IconButton
        aria-label="Close Toast"
        icon={<CloseIcon />}
        size="sm"
        position="absolute"
        top="10px"
        right="10px"
        onClick={onClose}
        variant="ghost"
      />

      {/* Content */}
      <Box display="flex" alignItems="center" p={2}>
        <HStack spacing={3}>
          <Icon as={FaCircleCheck} color="#17A948" boxSize={12} />
          <Text
            fontFamily="Epilogue"
            fontSize="18px"
            fontWeight="normal"
            lineHeight="28px"
            textAlign="left"
            color="white"
          >
            {orderStatus === "Completed"
              ? "Your order has been successfully placed."
              : "Your order will be processed at the next market open."}
          </Text>
        </HStack>
      </Box>

      <HStack justifyContent="space-between" width="50%" margin="auto">
        <Text
          fontFamily="Inter"
          fontSize="14px"
          fontWeight="normal"
          lineHeight="22px"
          textAlign="left"
          color="#9095A0"
          width="103px"
          height="22px"
        >
          Batch
        </Text>
        <Text
          fontFamily="Inter"
          fontSize="14px"
          fontWeight="normal"
          lineHeight="22px"
          textAlign="left"
          color="#9095A0"
          width="103px"
          height="22px"
        >
          Status
        </Text>
      </HStack>

      <HStack justifyContent="space-between" width="50%" margin="auto">
        <Text
          fontFamily="Inter"
          fontSize="16px"
          fontWeight="normal"
          lineHeight="26px"
          textAlign="left"
          color="white"
          width="103px"
          height="26px"
        >
          Invest
        </Text>
        <Text
          fontFamily="Inter"
          fontSize="16px"
          fontWeight="normal"
          lineHeight="26px"
          textAlign="left"
          color="white"
          width="103px"
          height="26px"
        >
          {orderStatus}
        </Text>
      </HStack>

      <Box width={"90%"} margin={"auto"} mt={4}>
        <Box display={"flex"} gap={2}>
          <Text
            fontFamily="Inter"
            fontSize="14px"
            fontWeight="normal"
            lineHeight="22px"
            textAlign="left"
            color="#A7ADB7"
          >
            Well Done,{" "}
          </Text>
          <Box display={"flex"} gap={2}>
            <Text
              fontFamily="Inter"
              fontSize="14px"
              fontWeight="normal"
              lineHeight="22px"
              textAlign="left"
              color="#FFFFFF"
            >
              {userName}
            </Text>
            <Icon as={CiCircleCheck} boxSize={6} color="#17A948" />
          </Box>
        </Box>
        <Text
          fontFamily="Inter"
          fontSize="14px"
          fontWeight="normal"
          lineHeight="22px"
          textAlign="left"
          color="#A7ADB7"
        >
          {orderStatus === "Completed"
            ? "Your order has been successfully placed."
            : "Your order's status will be updated once the markets open."}
        </Text>

        <Text
          fontFamily="Inter"
          fontSize="14px"
          fontWeight="normal"
          lineHeight="24px"
          textAlign="left"
          color="#A7ADB7"
        >
          You'll be redirected back in {countdown}s {/* Countdown display */}
        </Text>
      </Box>

      <Box
        width={"90%"}
        margin={"auto"}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Text
          mt={4}
          color="white"
          fontFamily="Inter"
          fontSize="14px"
          fontWeight="normal"
          lineHeight="22px"
          textAlign="left"
          width="178px"
        >
          How was your experience?
        </Text>

        {/* Star rating section */}
        <HStack spacing={1}>
          {[1, 2, 3, 4, 5].map((star) => (
            <Icon
              key={star}
              as={FaStar}
              color={
                star <= (tempRating !== null ? tempRating : rating)
                  ? "#F3C63F"
                  : "#A7ADB7"
              } // Gold for selected stars, gray for unselected
              boxSize={6}
              cursor="pointer"
              onClick={() => {
                setTempRating(star); // Set temp rating on click
                handleStarClick(star); // Call the function to handle the click event
              }}
            />
          ))}
        </HStack>
      </Box>
    </Box>
  );
};

export default CustomToast;
