import React, { useState } from "react";
import { Box, Text, Flex, Icon, IconButton } from "@chakra-ui/react";
import { CiCircleCheck } from "react-icons/ci";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { motion } from "framer-motion";  // Import motion from framer-motion

export default function YourActivity({ basketHistory }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(basketHistory.length / itemsPerPage);

  const historyFormatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "short", day: "numeric" };
    const formattedDate = date.toLocaleDateString("en-US", options);
    const formattedTime = date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
    return `${formattedDate} ${formattedTime}`;
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      setDirection("next"); // Set direction for next page
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      setDirection("previous"); // Set direction for previous page
    }
  };

  const [direction, setDirection] = useState("next"); // Direction of page transition

  // Determine the range of items for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = basketHistory.slice(startIndex, endIndex);

  return (
    <Box p={4}>
      <Text fontSize="md" fontWeight="bold" mb={4} fontFamily={"Helvetica"}>
        Your Activity
      </Text>
      <Box
        backgroundColor="rgba(38, 42, 51, 1)"
        border="1px solid rgba(86, 94, 108, 1)"
        borderRadius="md"
        boxShadow="md"
      >
        <motion.div
          key={currentPage}  // Key to trigger re-mounting for animation on page change
          initial={{ x: direction === "next" ? "100%" : "-100%" }}  // Start from left or right based on direction
          animate={{ x: 0 }}  // Move to the center
          exit={{ x: direction === "next" ? "-100%" : "100%" }}  // Slide out to the opposite side
          transition={{ type: "spring", stiffness: 300, damping: 30 }} // Animation timing
        >
          {currentItems?.length > 0 ? (
            currentItems.map((inst, index) => (
              <Box
                key={`inst_${index}`}
                m={"4%"}
                display="flex"
                alignItems="center"
                gap={2}
                width="100%"
              >
                <Flex align="center" gap={2} width="48%" >
                  <Icon as={CiCircleCheck} boxSize={5} color="#1DD75B" />
                  <Text fontFamily="Inter" fontSize="12px" fontWeight="500" textAlign="left">
                    {historyFormatDate(inst?.createdAt)}
                  </Text>
                </Flex>

                <Text
              
                  fontFamily="Inter"
                  fontSize="12px"
                  fontWeight="500"
                  textAlign="left"
                  width="50%"
                >
                  {inst?.instrument}
                  {/* ({inst?.lotMultiplier}) */}
                  {" "}
                  {inst?.orderType === "ENTRY" ? "Invested" : "Basket Exit"}
                </Text>
              </Box>
            ))
          ) : (
            <Text fontSize="18px" textAlign="center" color="gray.500">
              You never invested in this basket
            </Text>
          )}
        </motion.div>
      </Box>

      {/* Pagination Controls */}
      {totalPages>1&&(
          <Flex alignItems="center" justifyContent="center" mt={4} gap={4}>
          <IconButton
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            icon={<FaChevronLeft />}
            size="sm"
            colorScheme="white"
            variant="outline"
            _hover={{ backgroundColor: "#171A1F", color: "#ffffff" }}
            borderColor="rgba(86, 94, 108, 1)"
          />
          <Text fontSize="14px">
            Page {currentPage} / {totalPages}
          </Text>
          <IconButton
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            icon={<FaChevronRight />}
            size="sm"
            colorScheme="white"
            variant="outline"
            _hover={{ backgroundColor: "#171A1F", color: "#ffffff" }}
            borderColor="rgba(86, 94, 108, 1)"
          />
        </Flex>
      )}
    
    </Box>
  );
}
